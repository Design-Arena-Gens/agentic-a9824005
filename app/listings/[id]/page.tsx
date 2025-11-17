import { listings } from '@/data/listings';
import Link from 'next/link';

export async function generateStaticParams() {
  return listings.map((l) => ({ id: l.id }));
}

export default function ListingDetails({ params }: { params: { id: string } }) {
  const listing = listings.find((l) => l.id === params.id);
  if (!listing) {
    return <div className="vstack"><h2>Im?vel n?o encontrado</h2><Link href="/listings" className="button secondary">Voltar</Link></div>;
  }
  return (
    <div className="vstack" style={{ gap: 16 }}>
      <div className="hstack" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>{listing.title}</h1>
        <span className="small">{listing.city}, {listing.country} ? ? {listing.rating.toFixed(1)}</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="vstack" style={{ gap: 10 }}>
          {listing.images.map((src, i) => (
            <img key={i} src={src} alt={`${listing.title} ${i+1}`} className="listing-img" style={{ height: 280 }} />
          ))}
          <div className="card card-body">
            <div className="kicker">Sobre</div>
            <p className="muted">{listing.description}</p>
            <div className="hstack" style={{ gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              {listing.amenities.map((a) => (<span key={a} className="badge">{a}</span>))}
            </div>
          </div>
        </div>
        <div className="vstack" style={{ gap: 10 }}>
          <div className="card card-body vstack" style={{ gap: 10 }}>
            <div className="hstack" style={{ justifyContent: 'space-between' }}>
              <span className="price">R$ {listing.pricePerNight}/noite</span>
              <span className="small">At? {listing.maxGuests} h?spedes ? {listing.bedrooms} quartos</span>
            </div>
            <Link href={`/book/${listing.id}`} className="button">Reservar</Link>
          </div>
          <div className="card card-body">
            <div className="kicker">Regras</div>
            <ul className="small">
              <li>Check-in ap?s 15:00 ? Check-out at? 11:00</li>
              <li>Sem festas ou eventos</li>
              <li>Respeite a vizinhan?a</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
