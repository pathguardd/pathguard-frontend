import { fetchMultiHopRouteQuality } from "@/lib/api";
import { useAsyncRouteQuality, type UseAsyncRouteQualityResult } from "@/lib/useAsyncRouteQuality";
import type { MultiHopRequest } from "@/lib/api";

export type UseMultiHopRouteQualityResult = UseAsyncRouteQualityResult<MultiHopRequest>;

/** Request lifecycle for the /v1/route-quality/multi-hop endpoint. */
export function useMultiHopRouteQuality(): UseMultiHopRouteQualityResult {
  return useAsyncRouteQuality(fetchMultiHopRouteQuality);
}
