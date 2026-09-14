# Contributing to pathguard-frontend

Thanks for considering a contribution. See the workspace-level
`PLAN.md` for the Wave Program's scoped-issue categories.

## Local setup

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Requires [`pathguard-backend`](../pathguard-backend) running locally
(defaults to `http://localhost:8080`) for the app itself; the test
suite does not need it (all API calls are mocked in tests).

## Before opening a PR

```bash
npm run format:check
npm run typecheck
npm run lint
npm test
npm run build
```

CI runs all five; a PR failing any of them won't be mergeable.

## Code organization

- `app/` — Next.js App Router pages
- `components/` — presentational components, each with a colocated
  `*.test.tsx`
- `lib/` — API client (`api.ts`) and data-fetching hooks
  (`useAsyncRouteQuality.ts` and its two thin wrappers)

## Testing conventions

Component tests use Vitest + React Testing Library + jsdom. Query by
accessible role/label where practical (`getByRole`, `getByLabelText`)
rather than test IDs, so tests double-check accessibility. Mock
`fetch` via `vi.stubGlobal("fetch", ...)` rather than a network mock
library — see `lib/api.test.ts` for the pattern.

## Commit style

One logical change per commit, subject + body explaining why. Squash
exploratory/fixup commits before opening a PR.
