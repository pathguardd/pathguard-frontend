# pathguard-frontend

[![CI](https://github.com/pathguardd/pathguard-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/pathguardd/pathguard-frontend/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Next.js (TypeScript) dashboard for **PathGuard** — a DEX routing and
slippage sentinel for Stellar path payments.

Lets a user build a send/destination asset pair (or a full multi-hop
path), calls `pathguard-backend`'s route-quality API, and renders the
simulated route's price impact, effective slippage, hop-by-hop path,
and liquidity flag (healthy / thin / danger).

## Layout

```
app/
  page.tsx           Single-hop lookup
  multi-hop/page.tsx Multi-hop path lookup
components/
  AssetInput.tsx      Native/issued asset entry
  PathBuilder.tsx      Editable multi-hop asset path
  HopList.tsx          Renders a RouteQuote's hops
  RouteQualityCard.tsx Result display
lib/
  api.ts                    Typed client for pathguard-backend
  useAsyncRouteQuality.ts   Shared idle/loading/success/error hook
  useRouteQuality.ts        Single-hop wrapper
  useMultiHopRouteQuality.ts Multi-hop wrapper
docs/       Architecture notes
```

## Running

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Or via Docker: `docker build -t pathguard-frontend . && docker run -p 3000:3000 pathguard-frontend`
(unverified in this environment — no Docker available; see the
Dockerfile's commit message).

Requires [`pathguard-backend`](../pathguard-backend) running locally
(defaults to `http://localhost:8080`).

## Development

```bash
npm run format:check
npm run typecheck
npm run lint
npm test           # 22 tests, Vitest + React Testing Library
npm run build
```

See [`CONTRIBUTING.md`](CONTRIBUTING.md) and
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Status

No end-to-end tests against a real backend yet (all API calls are
mocked in tests); no historical liquidity charts. See
[`pathguard-backend`](../pathguard-backend) for the indexing/
simulation service this UI depends on, and
[`pathguard-contract`](../pathguard-contract) for the on-chain
slippage guard that enforces what this dashboard only visualizes.
