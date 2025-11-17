import { NextResponse } from 'next/server';
import { listings } from '@/data/listings';

export function GET(_: Request, { params }: { params: { id: string } }) {
  const listing = listings.find((l) => l.id === params.id);
  if (!listing) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(listing);
}
