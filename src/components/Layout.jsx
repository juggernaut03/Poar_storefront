import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search, Home, Info, Truck, ShieldCheck } from 'lucide-react';

function LogoMark() {
  // The Pawar "P○" mark from the brand SVG.
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="24" y="18" width="17" height="64" rx="8.5" fill="#fff" />
      <circle cx="50" cy="39" r="17" stroke="#fff" strokeWidth="17" fill="none" />
    </svg>
  );
}

export default function Layout({ children, site }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const brandName = site?.brandName || 'Pawar Online Retail LLP';

  const onSearch = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/?q=${encodeURIComponent(q.trim())}` : '/');
  };

  return (
    <>
      <div className="topstrip">
        <span>
          <ShieldCheck size={13} style={{ verticalAlign: '-2px', marginRight: 5 }} />
          Trusted listings — <strong>shop securely on Amazon</strong> with fast delivery & easy returns
        </span>
      </div>

      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <span className="logo-mark"><LogoMark /></span>
            <span>{brandName.split(' ')[0]} <span style={{ color: 'var(--brand)' }}>Online</span></span>
          </Link>

          <form className="search" onSubmit={onSearch}>
            <Search size={18} />
            <input
              placeholder="Search for products, brands and more…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </form>

          <nav className="nav">
            <Link to="/"><Home size={17} /><span>Home</span></Link>
            <Link to="/about"><Info size={17} /><span>About</span></Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <div className="footer-cols">
            <div>
              <div className="logo">
                <span className="logo-mark"><LogoMark /></span>
                <span style={{ color: '#fff' }}>{brandName.split(' ')[0]} Online</span>
              </div>
              <p>{brandName}</p>
              <p style={{ marginTop: 8 }}>
                <Truck size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                Products fulfilled & delivered by Amazon.
              </p>
            </div>
            <div>
              <h4>Company</h4>
              <Link to="/about">About us</Link>
              <Link to="/">Products</Link>
            </div>
            <div>
              <h4>Contact</h4>
              {site?.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
              {site?.phone && <p>{site.phone}</p>}
              {site?.address && <p>{site.address}</p>}
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {brandName}. All rights reserved.</span>
            <span>Amazon and the Amazon logo are trademarks of Amazon.com, Inc.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
