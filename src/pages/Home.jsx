import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Truck, BadgePercent, RotateCcw, Flame, LayoutGrid, ArrowRight } from 'lucide-react';
import { api } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';
import Carousel from '../components/Carousel.jsx';
import { CategoryIcon } from '../utils.jsx';

function SkeletonGrid({ count = 12 }) {
  return (
    <div className="grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skel-card" key={i}>
          <div className="skel img" />
          <div className="lines">
            <div className="skel l" style={{ width: '40%' }} />
            <div className="skel l" style={{ width: '90%' }} />
            <div className="skel l" style={{ width: '55%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const PROMOS = [
  { icon: Truck, t: 'Amazon Delivery', s: 'Fast & reliable shipping' },
  { icon: RotateCcw, t: 'Easy Returns', s: 'Hassle-free on Amazon' },
  { icon: BadgePercent, t: 'Best Prices', s: 'Curated deals & offers' },
];

export default function Home({ hero }) {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const activeCat = params.get('category') || '';
  const activeSub = params.get('subcategory') || '';

  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]); // managed: [{name, subcategories}]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listManagedCategories().then(setCategories).catch(() => {});
    api.listProducts({ featured: 'true' }).then((r) => setFeatured(r.items || [])).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const filter = {};
    if (q) filter.q = q;
    if (activeCat) filter.category = activeCat;
    if (activeSub) filter.subcategory = activeSub;
    api
      .listProducts({ ...filter, limit: 60 })
      .then((res) => setProducts(res.items || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [q, activeCat, activeSub]);

  // Navigate preserving search; selecting a category clears any subcategory.
  const go = ({ cat = activeCat, sub = '' }) => {
    const next = {};
    if (q) next.q = q;
    if (cat) next.category = cat;
    if (sub) next.subcategory = sub;
    setParams(next);
  };

  const activeCatObj = categories.find((c) => c.name === activeCat);
  const subs = activeCatObj?.subcategories || [];
  const showExtras = !q && !activeCat;

  return (
    <div className="container">
      {showExtras && (
        <>
          <section className="hero fade-up">
            <div className="hero-text">
              <span className="hero-badge"><Sparkles size={14} /> Curated everyday essentials</span>
              <h1>{hero?.title || 'Pawar Online Retail'}</h1>
              <p>{hero?.subtitle || 'Quality everyday products, delivered by Amazon.'}</p>
              <a className="btn btn-light" href="#products">
                {hero?.ctaText || 'Shop Now'} <ArrowRight size={18} />
              </a>
            </div>
          </section>

          <div className="promos">
            {PROMOS.map((p) => (
              <div className="promo" key={p.t}>
                <span className="ico"><p.icon size={22} /></span>
                <div>
                  <div className="t">{p.t}</div>
                  <div className="s">{p.s}</div>
                </div>
              </div>
            ))}
          </div>

          {categories.length > 0 && (
            <section className="section">
              <div className="section-head">
                <h2><LayoutGrid size={22} /> Shop by Category</h2>
              </div>
              <div className="cats">
                {categories.map((c) => (
                  <div key={c._id || c.name} className="cat" onClick={() => go({ cat: c.name })}>
                    <span className="ico"><CategoryIcon name={c.name} /></span>
                    <div className="nm">{c.name}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {featured.length > 0 && (
            <section className="section">
              <div className="section-head">
                <h2><Flame size={22} /> Featured Deals</h2>
                <a className="link" href="#products">View all <ArrowRight size={15} /></a>
              </div>
              <Carousel products={featured} />
            </section>
          )}
        </>
      )}

      <section className="section" id="products">
        <div className="section-head">
          <h2>
            {q ? `Results for “${q}”` : activeCat ? activeCat : 'All Products'}
            {activeSub && <span style={{ color: 'var(--muted)', fontWeight: 600 }}> · {activeSub}</span>}
          </h2>
        </div>

        {/* Category chips */}
        <div className="chips">
          <span className={`chip ${!activeCat ? 'active' : ''}`} onClick={() => go({ cat: '' })}>All</span>
          {categories.map((c) => (
            <span key={c._id || c.name} className={`chip ${activeCat === c.name ? 'active' : ''}`} onClick={() => go({ cat: c.name })}>
              {c.name}
            </span>
          ))}
        </div>

        {/* Subcategory chips (only when a category with subs is selected) */}
        {subs.length > 0 && (
          <div className="chips" style={{ marginTop: -8 }}>
            <span className={`chip ${!activeSub ? 'active' : ''}`} onClick={() => go({ cat: activeCat, sub: '' })}>All {activeCat}</span>
            {subs.map((s) => (
              <span key={s} className={`chip ${activeSub === s ? 'active' : ''}`} onClick={() => go({ cat: activeCat, sub: s })}>
                {s}
              </span>
            ))}
          </div>
        )}

        {loading ? (
          <SkeletonGrid />
        ) : products.length === 0 ? (
          <div className="state">No products found.</div>
        ) : (
          <div className="grid">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
