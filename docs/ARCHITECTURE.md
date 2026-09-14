# Architecture

## Data flow

```
app/page.tsx  ──┐
                 ├──▶ useRouteQuality ──▶ fetchRouteQuality ──┐
app/multi-hop/  │                                             │
  page.tsx    ──┘──▶ useMultiHopRouteQuality                  ├──▶ pathguard-backend
                      ──▶ fetchMultiHopRouteQuality ───────────┘
```

Both hooks are thin wrappers around `useAsyncRouteQuality<TReq>`,
which owns the actual idle/loading/success/error state machine. A
page never touches `fetch` directly — it calls a hook's `check()` and
renders based on `status`.

## Components

- `AssetInput` — a single Stellar `Asset` (native or issued),
  toggling between the two shapes.
- `PathBuilder` — a list of `AssetInput`s forming a multi-hop path,
  with add/remove for intermediates (send/dest are fixed endpoints).
- `HopList` — renders a `RouteQuote`'s `hops` array as an ordered
  list of source → destination legs with their venue.
- `RouteQualityCard` — the result display: estimated amount, price
  impact, effective slippage, the hop list, and the liquidity flag.

## Why two nearly-identical hooks instead of one

`useRouteQuality` and `useMultiHopRouteQuality` have the exact same
shape (`status`, `quote`, `error`, `check`) because they're both
thin instantiations of `useAsyncRouteQuality` with a different
fetcher. This keeps each page's import ("give me the single-hop
hook" vs "give me the multi-hop hook") self-documenting, rather than
having every call site pass a fetcher function into one generic
hook directly.

## Testing approach

No end-to-end/browser tests yet — everything is component-level
(Vitest + React Testing Library + jsdom) with `fetch` mocked via
`vi.stubGlobal`. This catches component logic and rendering bugs
cheaply, but won't catch integration issues with a real
`pathguard-backend` instance; that's what running the app against a
live backend locally (see `CONTRIBUTING.md`) is for until an e2e
suite exists.
