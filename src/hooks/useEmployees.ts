import { useQuery } from "@tanstack/react-query";
import { listEmployees } from "../api/employees";
import type { CompanyId } from "../types";
import type { ApiError } from "../api/apiClient";




export type UseEmployeesParams = {
  companyId: CompanyId;
  search: string;
  status: "ACTIVE" | "INACTIVE" | "ALL";
};

/**
 * Intentionally flawed hook for the exercise.
 * Candidates should identify and fix issues:
 * - query key does not include companyId or filters (cache leakage risk)
 * - no abort/cancellation / no error typing
 * - no sensible caching/retry
 * - API logic not centralized enough for re-use
 */
export function useEmployees(params: UseEmployeesParams) {
  const { companyId, search, status } = params;
  return useQuery({
    queryKey: ["employees", companyId, search, status], // intentionally wrong
    queryFn: async () => {
      return listEmployees({ companyId, search, status });
    },
    retry: (failureCount, error) => {
      const apiError = error as ApiError;
      if (apiError?.status === 503 && failureCount < 2) {
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
