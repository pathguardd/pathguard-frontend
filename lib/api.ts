export type Asset =
  | { native: null }
  | { issued: { code: string; issuer: string } };

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

const API_URL =
  process.env.NEXT_PUBLIC_PATHGUARD_API_URL ?? "http://localhost:8080";

export async function fetchRouteQuality(
  req: QuoteRequest,
): Promise<RouteQuote> {
  const res = await fetch(`${API_URL}/v1/route-quality`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error(`route-quality request failed: ${res.status}`);
  }

  return res.json();
}
