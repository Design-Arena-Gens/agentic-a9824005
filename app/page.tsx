import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard';
import { listings } from '@/data/listings';

export default function Home() {
  const featured = listings.slice(0, 6);
  return (
    <div className="vstack" style={{ gap: 20 }}>
      <section className="hero">
        <div className="hero-card">
          <div className="kicker">Allugi</div>
          <h1 className="hero-title">Alugue e hospede im?veis por temporada com praticidade</h1>
          <p className="hero-sub">Encontre lugares incr?veis no Brasil para sua pr?xima viagem.</p>
          <hr className="sep" />
          <SearchBar />
        </div>
        <div className="hero-card vstack" style={{ gap: 10 }}>
          <span className="badge">Destaques</span>
          <p className="muted">Op??es populares entre viajantes esta semana</p>
          <div className="grid">
            {featured.map((l) => (<ListingCard key={l.id} listing={l} />))}
          </div>
        </div>
      </section>
    </div>
  );
}
