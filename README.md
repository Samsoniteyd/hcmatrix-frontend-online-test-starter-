# HCMatrix – Senior Frontend Engineer (Online Test) – Starter Repo

**Stack:** React + TypeScript + TanStack Query (React Query)

## Quick start
```bash
npm install
npm run dev
```

Open the app URL printed in your terminal.

## Your task (90 minutes)
You’re given a small Employee List feature with **intentional issues**:
- data fetching and caching issues
- permission checks mixed into UI
- tenant/company switching with cache leakage risk
- performance issues (unstable props, unnecessary re-renders)

### What to do
1. Refactor the feature to improve **code quality, correctness, and maintainability**.
2. Make React Query usage production-grade (query keys, caching, retry/error handling).
3. Centralize permissions so UI components stay clean.
4. Ensure tenant/company switching does **not** leak cached data across tenants.
5. Apply practical performance improvements (memoization, stable props, cheap lookups).
6. (Optional) Add pagination or virtualization.

### Written answers
Add brief answers to the questions in `ANSWERS.md` (keep it short and clear).

## Submission
- Commit your changes to the provided repository (or submit a zip of the repo if requested).
- Ensure `npm install && npm run dev` works.

## Notes
- Internet is allowed for official docs (React, TypeScript, TanStack Query, MDN).
- Please do not use AI assistants during the timed test.
- You may add small libraries if necessary, but prefer minimal changes.

Good luck!
