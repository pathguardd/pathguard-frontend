"use client";

import { useState } from "react";
import { fetchRouteQuality, type RouteQuote } from "@/lib/api";
import { RouteQualityCard } from "@/components/RouteQualityCard";

export default function HomePage() {
  const [sendAmount, setSendAmount] = useState("1000");
  const [quote, setQuote] = useState<RouteQuote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function checkRoute() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchRouteQuality({
        send_asset: { native: null },
        dest_asset: { issued: { code: "USDC", issuer: "GA...ISSUER" } },
        send_amount: sendAmount,
        max_slippage_pct: "1.0",
      });
      setQuote(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>PathGuard</h1>
      <p>DEX routing and slippage sentinel for Stellar path payments.</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
          placeholder="Send amount (XLM)"
        />
        <button onClick={checkRoute} disabled={loading}>
          {loading ? "Checking..." : "Check route quality"}
        </button>
      </div>

      {error && <p style={{ color: "#cf222e" }}>{error}</p>}
      {quote && <RouteQualityCard quote={quote} />}
    </main>
  );
}
