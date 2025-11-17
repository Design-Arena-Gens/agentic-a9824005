import Link from 'next/link';
import { Listing } from '@/lib/types';

export default function ListingCard({ listing }: { listing: Listing }) {
  const img = listing.images[0] ?? 'https://picsum.photos/800/600';
  return (
    <div className="card">
      <img src={img} alt={listing.title} className="listing-img" />
      <div className="card-body vstack" style={{ gap: 6 }}>
        <div className="hstack" style={{ justifyContent: 'space-between' }}>
          <strong>{listing.title}</strong>
          <span className="small">? {listing.rating.toFixed(1)}</span>
        </div>
        <span className="muted">{listing.city}, {listing.country}</span>
        <div className="hstack" style={{ justifyContent: 'space-between' }}>
          <span className="price">R$ {listing.pricePerNight}/noite</span>
          <Link className="button secondary" href={`/listings/${listing.id}`}>Ver detalhes</Link>
        </div>
      </div>
    </div>
  );
}
