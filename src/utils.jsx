import {
  Star, StarHalf, ShoppingBag, Utensils, Home, Smartphone, Dumbbell, Package,
} from 'lucide-react';

export function formatPrice(value, currency = 'INR') {
  if (value == null) return null;
  const symbol = currency === 'INR' ? '₹' : '';
  return `${symbol}${Number(value).toLocaleString('en-IN')}`;
}

export function discountPct(price, mrp) {
  if (price == null || mrp == null || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}

// Renders 5 stars (full / half / empty) for a 0–5 rating.
export function Stars({ value = 0, size = 14 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <Star key={i} size={size} fill="currentColor" strokeWidth={0} />;
        if (i === full && half) return <StarHalf key={i} size={size} fill="currentColor" strokeWidth={0} />;
        return <Star key={i} size={size} color="#d4d4d8" strokeWidth={1.5} />;
      })}
    </span>
  );
}

// Maps a category name to a lucide icon (falls back to a package).
const CATEGORY_ICONS = {
  Kitchen: Utensils,
  Home: Home,
  Electronics: Smartphone,
  Fitness: Dumbbell,
  General: ShoppingBag,
};

export function CategoryIcon({ name, size = 24 }) {
  const Icon = CATEGORY_ICONS[name] || Package;
  return <Icon size={size} />;
}
