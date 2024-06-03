'use server';

import { Client } from '@googlemaps/google-maps-services-js';
import { TravelMode } from '@googlemaps/google-maps-services-js/dist/common';

import { IPublicacion } from '@/interfaces';
import { getAllActiveStores, getActivePublicactionsByStore } from '@/actions';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

const getCoordinates = async (address: string) => {
  const client = new Client({});
  const response = await client.geocode({
    params: {
      address,
      key:
        process.env.GOOGLE_MAPS_API_KEY ||
        'AIzaSyAIAxu9rSTpzfa_kkep1niIDxKvMtypqXM',
    },
  });

  return response.data.results[0].geometry.location;
};

const getDistance = async (origin: string, destination: string) => {
  const client = new Client({});
  const response = await client.distancematrix({
    params: {
      origins: [origin],
      destinations: [destination],
      mode: TravelMode.walking,
      key:
        process.env.GOOGLE_MAPS_API_KEY ||
        'AIzaSyAIAxu9rSTpzfa_kkep1niIDxKvMtypqXM',
    },
  });

  return response.data.rows[0].elements[0].distance;
};

export const getStoresNearby = async (address: string) => {
  const coordinates = await getCoordinates(address);

  const stores = await getAllActiveStores();

  if (!stores) return;

  const storesWithDistance = await Promise.all(
    stores.map(async (store) => {
      const storeCoordinates = await getCoordinates(store.direccion_negocio);
      const distance = await getDistance(
        `${coordinates.lat},${coordinates.lng}`,
        `${storeCoordinates.lat},${storeCoordinates.lng}`
      );

      return {
        ...store,
        distance: distance.text,
      };
    })
  );

  const sortedStores = storesWithDistance
    .sort((a, b) => {
      const distanceA = parseFloat(a.distance.split(' ')[0]);
      const distanceB = parseFloat(b.distance.split(' ')[0]);

      return distanceA - distanceB;
    })
    .slice(0, 10);

  return sortedStores;
};

export const getPublicationsByStoresNearby = async (
  address: string,
  headers: ReadonlyHeaders
) => {
  const stores = await getStoresNearby(address);

  if (!stores) return;

  const publications = await Promise.all(
    stores.map(async (store) => {
      const storePublications = await getActivePublicactionsByStore(
        store.id_negocio,
        headers
      );
      if (!storePublications) return;

      return storePublications.slice(0, 3);
    })
  );

  return publications
    .flat()
    .filter((publication) => publication !== undefined) as IPublicacion[];
};
