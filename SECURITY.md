# Security Policy

## Reporting a vulnerability

Please report privately rather than via a public issue:

- GitHub's "Report a vulnerability" flow under this repo's Security
  tab, or
- Email the maintainers listed in the repo's GitHub organization
  profile.

## Scope notes

- This is a client-side dashboard with no auth, no user data
  storage, and no server-side rendering of untrusted input beyond
  what it displays back from `pathguard-backend`'s own responses.
- Dependency vulnerabilities: run `npm audit` before reporting one
  here directly — most are already tracked upstream and fixed by a
  routine `npm update`. Report here if a fix genuinely requires a
  code change in this repo (e.g. unsafely rendering a backend
  response).
