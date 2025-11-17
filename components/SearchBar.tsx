"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [city, setCity] = useState(params.get('city') ?? '');
  const [guests, setGuests] = useState(params.get('guests') ?? '');
  const [minPrice, setMinPrice] = useState(params.get('minPrice') ?? '');
  const [maxPrice, setMaxPrice] = useState(params.get('maxPrice') ?? '');

  useEffect(() => {
    setQ(params.get('q') ?? '');
  }, [params]);

  function submit() {
    const usp = new URLSearchParams();
    if (q) usp.set('q', q);
    if (city) usp.set('city', city);
    if (guests) usp.set('guests', guests);
    if (minPrice) usp.set('minPrice', minPrice);
    if (maxPrice) usp.set('maxPrice', maxPrice);
    router.push(`/listings?${usp.toString()}`);
  }

  return (
    <div className="card hero-card">
      <div className="kicker">Buscar estadias</div>
      <div className="hstack" style={{ gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
        <input className="input" placeholder="Cidade, bairro, ponto de interesse" value={q} onChange={(e) => setQ(e.target.value)} />
        <input className="input" placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} />
        <input className="input" placeholder="H?spedes" value={guests} onChange={(e) => setGuests(e.target.value)} type="number" min={1} />
        <input className="input" placeholder="Pre?o m?n." value={minPrice} onChange={(e) => setMinPrice(e.target.value)} type="number" min={0} />
        <input className="input" placeholder="Pre?o m?x." value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} type="number" min={0} />
        <button className="button" onClick={submit}>Pesquisar</button>
      </div>
    </div>
  );
}
