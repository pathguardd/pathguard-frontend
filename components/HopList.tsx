import type { Asset, RouteHop } from "@/lib/api";

function assetLabel(asset: Asset): string {
  if ("native" in asset) return "XLM";
  return asset.issued.code;
}

function venueLabel(hop: RouteHop): string {
  if ("order_book" in hop.venue) return "order book";
  return `AMM pool (${hop.venue.amm_pool.pool_id})`;
}

/**
 * Renders each hop of a (possibly multi-hop) route as an ordered list:
 * source asset -> destination asset via which venue.
 */
export function HopList({ hops }: { hops: RouteHop[] }) {
  if (hops.length === 0) {
    return null;
  }

  return (
    <ol style={{ paddingLeft: 20, margin: "8px 0" }}>
      {hops.map((hop, i) => (
        <li key={i}>
          {assetLabel(hop.source_asset)} → {assetLabel(hop.destination_asset)}{" "}
          <span style={{ color: "#57606a" }}>via {venueLabel(hop)}</span>
        </li>
      ))}
    </ol>
  );
}
