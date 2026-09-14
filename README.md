# pathguard-frontend

Next.js (TypeScript) dashboard for **PathGuard** — a DEX routing and
slippage sentinel for Stellar path payments.

Lets a user enter a send asset/amount and destination asset, calls
`pathguard-backend`'s route-quality API, and renders the simulated
route's price impact, effective slippage, and liquidity flag
(healthy / thin / danger).

## Layout

```
app/         Next.js App Router pages
components/   RouteQualityCard, etc.
lib/api.ts    Typed client for pathguard-backend's /v1/route-quality
```

## Running

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Requires [`pathguard-backend`](../pathguard-backend) running locally
(defaults to `http://localhost:8080`).

## Status

Scaffold: a single route-quality lookup form. Multi-hop route
visualization and historical liquidity charts are next.
