import { NextResponse } from 'next/server';
import { BookingRequest, BookingResponse } from '@/lib/types';

export async function POST(request: Request) {
  const body = (await request.json()) as BookingRequest;
  if (!body.listingId || !body.checkIn || !body.checkOut || !body.guests || !body.guestName || !body.guestEmail) {
    return NextResponse.json<BookingResponse>({ success: false, message: 'Dados incompletos' }, { status: 400 });
  }
  const ci = new Date(body.checkIn);
  const co = new Date(body.checkOut);
  if (!(ci instanceof Date) || !(co instanceof Date) || isNaN(ci.getTime()) || isNaN(co.getTime()) || co <= ci) {
    return NextResponse.json<BookingResponse>({ success: false, message: 'Datas inv?lidas' }, { status: 400 });
  }
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();
  return NextResponse.json<BookingResponse>({ success: true, code });
}
