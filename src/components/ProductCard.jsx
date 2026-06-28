import { Link } from 'react-router-dom';
import { Heart, ImageOff } from 'lucide-react';
import { formatPrice, discountPct, Stars } from '../utils.jsx';

export default function ProductCard({ product }) {
  const img = product.images?.[0];
  const off = discountPct(product.price, product.mrp);

  return (
    <div className="card">
      <Link to={`/product/${product.slug}`} className="card-img">
        {off != null && <span className="discount-badge">{off}% OFF</span>}
        <button className="fav-btn" aria-label="Save" onClick={(e) => e.preventDefault()}>
          <Heart size={16} />
        </button>
        {img ? (
          <img src={img} alt={product.title} loading="lazy" />
        ) : (
          <span className="ph"><ImageOff size={26} /> No image</span>
        )}
      </Link>

      <div className="card-body">
        <span className="card-cat">{product.category}</span>
        <Link to={`/product/${product.slug}`} className="card-title">{product.title}</Link>

        {product.rating != null && (
          <div className="rating">
            <Stars value={product.rating} />
            <span className="count">{product.rating.toFixed(1)} ({product.ratingCount?.toLocaleString('en-IN') || 0})</span>
          </div>
        )}

        {product.price != null && (
          <div className="price">
            <span className="now">{formatPrice(product.price, product.currency)}</span>
            {product.mrp != null && product.mrp > product.price && (
              <span className="mrp">{formatPrice(product.mrp, product.currency)}</span>
            )}
          </div>
        )}
      </div>

      <div className="card-foot">
        <a className="btn btn-amazon" href={product.amazonUrl} target="_blank" rel="noopener noreferrer">
          Buy on Amazon
        </a>
      </div>
    </div>
  );
}
