import { Client } from '@googlemaps/google-maps-services-js';
import { NextRequest, NextResponse } from 'next/server';

async function getCoordinates(req: NextRequest) {
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

  const { address } = (await req.json()) as { address: string };
  const client = new Client({});
  const response = await client.geocode({
    params: {
      address,
      key:
        process.env.GOOGLE_MAPS_API_KEY ||
        'AIzaSyAIAxu9rSTpzfa_kkep1niIDxKvMtypqXM',
    },
  });

  return NextResponse.json(response.data.results[0].geometry.location, {
    status: 200,
  });
}

export { getCoordinates as POST };
