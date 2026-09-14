"use client";

import { useState } from "react";
import Link from "next/link";
import { PathBuilder } from "@/components/PathBuilder";
import { RouteQualityCard } from "@/components/RouteQualityCard";
import { useMultiHopRouteQuality } from "@/lib/useMultiHopRouteQuality";
import type { Asset } from "@/lib/api";

export default function MultiHopPage() {
  const [path, setPath] = useState<Asset[]>([
    { native: null },
    { issued: { code: "USDC", issuer: "" } },
  ]);
  const [sendAmount, setSendAmount] = useState("1000");
  const { status, quote, error, check } = useMultiHopRouteQuality();

  async function checkRoute() {
    await check({ path, send_amount: sendAmount, max_slippage_pct: "1.0" });
  }

  return (
    <main>
      <p>
        <Link href="/">← Single-hop lookup</Link>
      </p>
      <h1>PathGuard — Multi-hop route</h1>
      <p>
        Simulates a path payment across an explicit chain of assets, hop by hop, and reports the
        worst hop&apos;s liquidity signal for the whole route.
      </p>

      <div style={{ marginBottom: 16 }}>
        <PathBuilder path={path} onChange={setPath} />
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
