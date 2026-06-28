import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard.jsx';

export default function Carousel({ products }) {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * 480, behavior: 'smooth' });
  };

  return (
    <div className="carousel">
      <button className="carousel-btn left" onClick={() => scroll(-1)} aria-label="Previous">
        <ChevronLeft size={20} />
      </button>
      <div className="carousel-track" ref={trackRef}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
      <button className="carousel-btn right" onClick={() => scroll(1)} aria-label="Next">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
