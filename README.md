# Pawar Online — Storefront

Public storefront for **Pawar Online Retail LLP**. Products are listed here and
purchased on **Amazon** — each product links out via a "Buy on Amazon" button
(no cart/checkout on this site).

Built with **React + Vite + React Router**, styled as a modern marketplace
(category tiles, featured carousel, discount badges, ratings) using
[`lucide-react`](https://lucide.dev) icons.

## Setup

Requires **Node 18+** and a running [backend API](#backend).

```bash
cp .env.example .env   # set VITE_API_URL to your backend
npm install
npm run dev            # http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server (port 5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built `dist/` (port 4173) |

## Configuration

| Env var | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API (e.g. `http://localhost:4055/api`) |

> Note: `npm run preview` serves on port `4173` — make sure that origin is in the
> backend's `CORS_ORIGINS`, or the storefront won't load products.

## Backend

This is the frontend only. It consumes a REST API for products and CMS content
(`/products`, `/products/:slug`, `/categories`, `/content/:key`).

## Deploy

`npm run build`, then serve `dist/` as a static site. The app uses browser
routing, so add an SPA fallback (e.g. Nginx `try_files $uri /index.html`).
