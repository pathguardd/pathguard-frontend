import { useCallback, useState } from "react";
import type { RouteQuote } from "@/lib/api";

export type RouteQualityStatus = "idle" | "loading" | "success" | "error";

export interface UseAsyncRouteQualityResult<TReq> {
  status: RouteQualityStatus;
  quote: RouteQuote | null;
  error: string | null;
  check: (req: TReq) => Promise<void>;
}

/**
 * Shared request-lifecycle state machine (idle/loading/success/error)
 * for any endpoint that takes a request and returns a RouteQuote.
 * useRouteQuality and useMultiHopRouteQuality are both thin wrappers
 * around this with their own fetcher.
 */
export function useAsyncRouteQuality<TReq>(
  fetcher: (req: TReq) => Promise<RouteQuote>,
): UseAsyncRouteQualityResult<TReq> {
  const [status, setStatus] = useState<RouteQualityStatus>("idle");
  const [quote, setQuote] = useState<RouteQuote | null>(null);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(
    async (req: TReq) => {
      setStatus("loading");
      setError(null);
      try {
        const result = await fetcher(req);
        setQuote(result);
        setStatus("success");
      } catch (e) {
        setError(e instanceof Error ? e.message : "unknown error");
        setStatus("error");
      }
    },
    [fetcher],
  );

  return { status, quote, error, check };
}
