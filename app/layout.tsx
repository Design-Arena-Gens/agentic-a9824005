import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Allugi - Alugu?is por Temporada',
  description: 'Encontre e hospede im?veis por temporada com a Allugi.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <header className="header">
          <div className="container header-inner">
            <a className="brand" href="/">Allugi</a>
            <nav className="nav">
              <a href="/listings">Im?veis</a>
              <a href="/host">Anuncie seu im?vel</a>
            </nav>
          </div>
        </header>
        <main className="container main">{children}</main>
        <footer className="footer">
          <div className="container footer-inner">
            <span>? {new Date().getFullYear()} Allugi</span>
            <a href="/">Termos</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
