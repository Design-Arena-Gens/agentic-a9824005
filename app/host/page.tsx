export default function HostPage() {
  return (
    <div className="vstack" style={{ gap: 14 }}>
      <h1>Hospede seu im?vel na Allugi</h1>
      <div className="card card-body vstack" style={{ gap: 8 }}>
        <p className="muted">Cadastre seu im?vel e alcance milhares de viajantes. Defina pre?os, disponibilidade e receba pagamentos com seguran?a.</p>
        <ul className="small">
          <li>Anuncie gratuitamente e pague apenas quando reservar</li>
          <li>Suporte 7 dias por semana</li>
          <li>Ferramentas para gest?o de calend?rio e pre?os</li>
        </ul>
        <a className="button" href="mailto:hosts@allugi.app">Quero anunciar</a>
      </div>
    </div>
  );
}
