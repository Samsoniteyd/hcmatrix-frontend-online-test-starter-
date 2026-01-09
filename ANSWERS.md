# Answers (keep concise)

## Q1 — Frontend structure (5–10 mins)
How would you structure a large React SaaS frontend (features/shared/api/permissions)?
   
   queryKey: ["employees", companyId, ...filters]


## Q2 — Multi-tenant handling (5–10 mins)
How would you isolate cached data per tenant and prevent cross-tenant leaks?

 When switching tenants, invalidate all queries for the previous tenant:ipt
   queryClient.removeQueries({ queryKey: ["employees", previousCompanyId] })

## Q3 — Performance (5–10 mins)
What are common causes of slow tables/lists and what fixes would you apply?

 I ensure auth context provides tenant-scoped permissions and data.

## Q4 — Debugging & judgment (10–15 mins)
For each issue, identify likely cause + fix:
1) API calls firing multiple times unnecessarily
Query key doesn't include all dependencies (companyId, search, status)
Component re-renders causing query refetch
fix
Include all parameters in query key: ["employees", companyId, search, status]
Set appropriate staleTime (30s-1min) to prevent unnecessary refetches
2) UI freezing when filters are applied
Synchronous filtering of large dataset (1000+ rows) blocking main thread
Re-rendering all rows on every filter change
fix
Debounce search input (300-500ms) using useDebouncedValue hook
3) stale data after company switch

Query key doesn't include companyId, so React Query uses cached data from previous tenant
fix
Include companyId in query key: ["employees", companyId, ...]