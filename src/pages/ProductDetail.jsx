import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ImageOff, Check, ShieldCheck, Truck, RotateCcw, ExternalLink } from 'lucide-react';
import { api } from '../api.js';
import { formatPrice, discountPct, Stars } from '../utils.jsx';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    window.scrollTo(0, 0);
    api
      .getProduct(slug)
      .then((p) => {
        setProduct(p);
        setActive(0);
        setStatus('ok');
      })
      .catch(() => setStatus('notfound'));
  }, [slug]);

  if (status === 'loading') return <div className="state">Loading…</div>;
  if (status === 'notfound')
    return (
      <div className="state">
        Product not found. <Link to="/" style={{ color: 'var(--brand)' }}>Back to shop</Link>
      </div>
    );

  const img = product.images?.[active];
  const off = discountPct(product.price, product.mrp);

  return (
    <div className="container">
      <nav className="crumbs">
        <Link to="/">Home</Link> <ChevronRight size={14} />
        <Link to={`/?category=${encodeURIComponent(product.category)}`}>{product.category}</Link> <ChevronRight size={14} />
        <span>{product.title}</span>
      </nav>

      <div className="detail">
        <div className="detail-panel">
          <div className="detail-gallery">
            {img ? <img src={img} alt={product.title} /> : <span className="ph" style={{ color: '#c4c4cc', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}><ImageOff size={32} /> No image</span>}
          </div>
          {product.images?.length > 1 && (
            <div className="thumbs">
              {product.images.map((src, i) => (
                <img key={src} src={src} alt="" onClick={() => setActive(i)} style={{ borderColor: i === active ? 'var(--brand)' : '' }} />
              ))}
            </div>
          )}
        </div>

        <div className="fade-up">
          <span className="card-cat">{product.category}</span>
          <h1>{product.title}</h1>
          {product.brand && <div className="brand">by {product.brand}</div>}

          {product.rating != null && (
            <div className="rating" style={{ marginBottom: 10 }}>
              <Stars value={product.rating} size={17} />
              <span className="count">{product.rating.toFixed(1)} · {product.ratingCount?.toLocaleString('en-IN') || 0} ratings</span>
            </div>
          )}

          {product.price != null && (
            <div className="price">
              <span className="now" style={{ fontSize: 28 }}>{formatPrice(product.price, product.currency)}</span>
              {product.mrp != null && product.mrp > product.price && (
                <>
                  <span className="mrp" style={{ fontSize: 16 }}>{formatPrice(product.mrp, product.currency)}</span>
                  {off != null && <span className="off" style={{ fontSize: 15 }}>{off}% off</span>}
                </>
              )}
            </div>
          )}

          {product.description && <p className="desc">{product.description}</p>}

          <ul className="feature-list">
            <li><Truck size={17} /> Fast Amazon delivery</li>
            <li><RotateCcw size={17} /> Easy returns & replacement</li>
            <li><ShieldCheck size={17} /> Secure checkout on Amazon</li>
            {product.tags?.slice(0, 3).map((t) => <li key={t}><Check size={17} /> {t}</li>)}
          </ul>

          <a className="btn btn-amazon" href={product.amazonUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 17, padding: '15px 30px' }}>
            Buy on Amazon <ExternalLink size={18} />
          </a>
          <p className="note">
            <ShieldCheck size={14} /> You’ll be redirected to Amazon to complete your purchase securely.
          </p>
        </div>
      </div>
    </div>
  );
}
