import { useCallback, useState } from "react";
import { fetchRouteQuality, type QuoteRequest, type RouteQuote } from "@/lib/api";

export type RouteQualityStatus = "idle" | "loading" | "success" | "error";

export interface UseRouteQualityResult {
  status: RouteQualityStatus;
  quote: RouteQuote | null;
  error: string | null;
  check: (req: QuoteRequest) => Promise<void>;
}

/**
 * Encapsulates the request lifecycle for a route-quality lookup:
 * loading/success/error status plus the last quote or error message.
 * Kept separate from any one page so both the single-hop and (future)
 * multi-hop forms can share it.
 */
export function useRouteQuality(): UseRouteQualityResult {
  const [status, setStatus] = useState<RouteQualityStatus>("idle");
  const [quote, setQuote] = useState<RouteQuote | null>(null);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(async (req: QuoteRequest) => {
    setStatus("loading");
    setError(null);
    try {
      const result = await fetchRouteQuality(req);
      setQuote(result);
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown error");
      setStatus("error");
    }
  }, []);

  return { status, quote, error, check };
}
