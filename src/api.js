const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4055/api';

async function get(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const api = {
  listProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/products${qs ? `?${qs}` : ''}`);
  },
  getProduct: (slug) => get(`/products/${slug}`),
  listCategories: () => get('/categories'),
  getContent: (key) => get(`/content/${key}`),
};
