"use client";
import { listings } from '@/data/listings';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function BookPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const sp = useSearchParams();
  const listing = useMemo(() => listings.find((l) => l.id === params.id), [params.id]);
  const [checkIn, setCheckIn] = useState(sp.get('checkIn') ?? '');
  const [checkOut, setCheckOut] = useState(sp.get('checkOut') ?? '');
  const [guests, setGuests] = useState(Number(sp.get('guests') ?? 1));
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  if (!listing) return <div className="vstack"><h2>Im?vel n?o encontrado</h2></div>;

  const nights = (() => {
    const ci = checkIn ? new Date(checkIn) : null;
    const co = checkOut ? new Date(checkOut) : null;
    if (!ci || !co || isNaN(ci.getTime()) || isNaN(co.getTime())) return 0;
    const diff = Math.ceil((co.getTime() - ci.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  })();
  const total = nights * listing.pricePerNight;

  async function submit() {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listing.id, checkIn, checkOut, guests, guestName, guestEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(`Reserva confirmada! C?digo: ${data.code}`);
        setTimeout(() => router.push(`/listings/${listing.id}`), 2500);
      } else {
        setResult(data.message || 'N?o foi poss?vel finalizar a reserva.');
      }
    } catch (e) {
      setResult('Erro ao processar a reserva.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="vstack" style={{ gap: 16 }}>
      <h1>Reservar: {listing.title}</h1>
      <div className="grid" style={{ gridTemplateColumns: '1.2fr .8fr' }}>
        <div className="card card-body vstack" style={{ gap: 10 }}>
          <div className="hstack" style={{ gap: 10 }}>
            <input className="input" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            <input className="input" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            <input className="input" type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
          </div>
          <div className="hstack" style={{ gap: 10 }}>
            <input className="input" placeholder="Seu nome" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
            <input className="input" placeholder="Seu e-mail" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
          </div>
          <button className="button" onClick={submit} disabled={loading || nights <= 0}>{loading ? 'Processando...' : 'Confirmar reserva'}</button>
          {result && <div className="card card-body" style={{ background: '#0f1522' }}>{result}</div>}
        </div>
        <div className="card card-body vstack" style={{ gap: 10 }}>
          <div className="kicker">Resumo</div>
          <span>{nights} noites x R$ {listing.pricePerNight} = <strong>R$ {isFinite(total) ? total : 0}</strong></span>
          <span className="small">At? {listing.maxGuests} h?spedes</span>
        </div>
      </div>
    </div>
  );
}
