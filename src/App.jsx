import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import About from './pages/About.jsx';
import { api } from './api.js';

export default function App() {
  // CMS-driven content blocks, hydrated once at startup.
  const [cms, setCms] = useState({ site: {}, home_hero: {}, about: {} });

  useEffect(() => {
    Promise.all([
      api.getContent('site').catch(() => ({ data: {} })),
      api.getContent('home_hero').catch(() => ({ data: {} })),
      api.getContent('about').catch(() => ({ data: {} })),
    ]).then(([site, hero, about]) => {
      setCms({ site: site.data || {}, home_hero: hero.data || {}, about: about.data || {} });
    });
  }, []);

  return (
    <Layout site={cms.site}>
      <Routes>
        <Route path="/" element={<Home hero={cms.home_hero} />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<About about={cms.about} />} />
        <Route path="*" element={<div className="state">Page not found.</div>} />
      </Routes>
    </Layout>
  );
}
