import { fetchRouteQuality } from "@/lib/api";
import { useAsyncRouteQuality, type UseAsyncRouteQualityResult } from "@/lib/useAsyncRouteQuality";
import type { QuoteRequest } from "@/lib/api";

export type UseRouteQualityResult = UseAsyncRouteQualityResult<QuoteRequest>;

/** Request lifecycle for the single-hop /v1/route-quality endpoint. */
export function useRouteQuality(): UseRouteQualityResult {
  return useAsyncRouteQuality(fetchRouteQuality);
}
