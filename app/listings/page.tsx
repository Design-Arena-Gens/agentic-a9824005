import ListingCard from '@/components/ListingCard';
import { searchListings } from '@/data/listings';

export const dynamic = 'force-static';

export default function Listings({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const q = typeof searchParams?.q === 'string' ? searchParams!.q : undefined;
  const city = typeof searchParams?.city === 'string' ? searchParams!.city : undefined;
  const guests = typeof searchParams?.guests === 'string' ? Number(searchParams!.guests) : undefined;
  const minPrice = typeof searchParams?.minPrice === 'string' ? Number(searchParams!.minPrice) : undefined;
  const maxPrice = typeof searchParams?.maxPrice === 'string' ? Number(searchParams!.maxPrice) : undefined;

  const results = searchListings(q, { city, guests, minPrice, maxPrice });

  return (
    <div className="vstack" style={{ gap: 16 }}>
      <h2>Encontramos {results.length} op??es</h2>
      <div className="grid">
        {results.map((l) => (<ListingCard key={l.id} listing={l} />))}
      </div>
    </div>
  );
}
