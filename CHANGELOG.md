# Changelog

## [Unreleased]

### Security
- Upgraded Next.js 14.2.5 → 16.3.5, fixing several critical/high
  advisories (cache poisoning, DoS, auth bypass, SSRF). `npm audit`:
  0 vulnerabilities (was 1 critical, 1 high, 3 moderate, 2 low).

### Added
- Vitest + React Testing Library test setup; 22 tests across
  `RouteQualityCard`, `AssetInput`, `HopList`, `PathBuilder`,
  `lib/api.ts`, and `useRouteQuality`.
- `useAsyncRouteQuality` shared request-lifecycle hook, with
  `useRouteQuality` and `useMultiHopRouteQuality` as thin wrappers.
- `AssetInput`, `HopList`, `PathBuilder` components.
- `fetchMultiHopRouteQuality` API client function.
- `/multi-hop` page: build and check an explicit multi-asset path.
- CI workflow (format check, typecheck, lint, test, build), Prettier
  config.

### Changed
- ESLint 8 → 9.39.5; migrated `.eslintrc.json` to flat-config
  `eslint.config.mjs` (required by `eslint-config-next` 16).
- TypeScript 5.5.3 → 6.0.3.
- `lint` script now runs `eslint .` directly (`next lint` no longer
  works this way in Next 16).

## [0.1.0] - 2026-09-14

### Added
- Initial scaffold: single-hop lookup page, `RouteQualityCard`,
  `lib/api.ts` client for `pathguard-backend`'s `/v1/route-quality`.
