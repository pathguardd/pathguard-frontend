import type { RouteQuote } from "@/lib/api";
import { HopList } from "@/components/HopList";

const flagColor: Record<RouteQuote["liquidity_flag"], string> = {
  healthy: "#1a7f37",
  thin: "#9a6700",
  danger: "#cf222e",
};

export function RouteQualityCard({ quote }: { quote: RouteQuote }) {
  return (
    <div
      style={{
        border: "1px solid #d0d7de",
        borderRadius: 8,
        padding: 16,
        maxWidth: 480,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Estimated received</strong>
        <span>{quote.estimated_dest_amount}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Price impact</span>
        <span>{quote.price_impact_pct}%</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Effective slippage</span>
        <span>{quote.effective_slippage_pct}%</span>
      </div>
      <HopList hops={quote.hops} />
      <div
        style={{
          marginTop: 8,
          fontWeight: 600,
          color: flagColor[quote.liquidity_flag],
          textTransform: "uppercase",
          fontSize: 12,
        }}
      >
        {quote.liquidity_flag}
      </div>
    </div>
  );
}
