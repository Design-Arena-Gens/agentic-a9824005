import { NextResponse } from 'next/server';
import { searchListings } from '@/data/listings';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || undefined;
  const city = searchParams.get('city') || undefined;
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const guests = searchParams.get('guests') ? Number(searchParams.get('guests')) : undefined;

  const results = searchListings(q, { city, minPrice, maxPrice, guests });
  return NextResponse.json(results);
}
