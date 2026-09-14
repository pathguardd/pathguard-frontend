export type Asset = { native: null } | { issued: { code: string; issuer: string } };

export type LiquidityFlag = "healthy" | "thin" | "danger";

export interface RouteHop {
  venue: { order_book: null } | { amm_pool: { pool_id: string } };
  source_asset: Asset;
  destination_asset: Asset;
}

export interface RouteQuote {
  send_asset: Asset;
  dest_asset: Asset;
  send_amount: string;
  estimated_dest_amount: string;
  hops: RouteHop[];
  price_impact_pct: string;
  effective_slippage_pct: string;
  liquidity_flag: LiquidityFlag;
}

export interface QuoteRequest {
  send_asset: Asset;
  dest_asset: Asset;
  send_amount: string;
  max_slippage_pct?: string;
}

export interface MultiHopRequest {
  /** Full asset path: [send, ...intermediates, dest]. At least 2 assets. */
  path: Asset[];
  send_amount: string;
  max_slippage_pct?: string;
}

function apiUrl(): string {
  return process.env.NEXT_PUBLIC_PATHGUARD_API_URL ?? "http://localhost:8080";
}

async function postJson<TResponse>(path: string, body: unknown): Promise<TResponse> {
  const res = await fetch(`${apiUrl()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`${path} request failed: ${res.status}`);
  }

  return res.json();
}

export function fetchRouteQuality(req: QuoteRequest): Promise<RouteQuote> {
  return postJson<RouteQuote>("/v1/route-quality", req);
}

export function fetchMultiHopRouteQuality(req: MultiHopRequest): Promise<RouteQuote> {
  return postJson<RouteQuote>("/v1/route-quality/multi-hop", req);
}
