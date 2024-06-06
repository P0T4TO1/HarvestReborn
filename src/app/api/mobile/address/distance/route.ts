import { Client } from '@googlemaps/google-maps-services-js';
import { TravelMode } from '@googlemaps/google-maps-services-js/dist/common';
import { NextRequest, NextResponse } from 'next/server';

async function getDistance(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  const api_key = urlSearchParams.get('api_key');

  if (api_key !== process.env.API_KEY) {
    return NextResponse.json(
      {
        message:
          'You are not authorized to access this route. Please provide a valid API key.',
      },
      { status: 401 }
    );
  }

  const { origin, destination } = (await req.json()) as {
    origin: string;
    destination: string;
  };
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

  return NextResponse.json(response.data.rows[0].elements[0].distance, {
    status: 200,
  });
}

export { getDistance as POST };