"use client";

import { useState } from "react";
import { useRouteQuality } from "@/lib/useRouteQuality";
import { RouteQualityCard } from "@/components/RouteQualityCard";
import { AssetInput } from "@/components/AssetInput";
import type { Asset } from "@/lib/api";

export default function HomePage() {
  const [sendAsset, setSendAsset] = useState<Asset>({ native: null });
  const [destAsset, setDestAsset] = useState<Asset>({
    issued: { code: "USDC", issuer: "" },
  });
  const [sendAmount, setSendAmount] = useState("1000");
  const { status, quote, error, check } = useRouteQuality();

  async function checkRoute() {
    await check({
      send_asset: sendAsset,
      dest_asset: destAsset,
      send_amount: sendAmount,
      max_slippage_pct: "1.0",
    });
  }

  return (
    <main>
      <h1>PathGuard</h1>
      <p>DEX routing and slippage sentinel for Stellar path payments.</p>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <AssetInput label="Send" value={sendAsset} onChange={setSendAsset} />
        <AssetInput label="Destination" value={destAsset} onChange={setDestAsset} />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
          placeholder="Send amount"
          aria-label="Send amount"
        />
        <button onClick={checkRoute} disabled={status === "loading"}>
          {status === "loading" ? "Checking..." : "Check route quality"}
        </button>
      </div>

      {status === "error" && error && <p style={{ color: "#cf222e" }}>{error}</p>}
      {status === "success" && quote && <RouteQualityCard quote={quote} />}
    </main>
  );
}
