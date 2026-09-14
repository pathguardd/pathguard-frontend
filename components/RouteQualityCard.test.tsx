import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RouteQualityCard } from "./RouteQualityCard";
import type { RouteQuote } from "@/lib/api";

function makeQuote(overrides: Partial<RouteQuote> = {}): RouteQuote {
  return {
    send_asset: { native: null },
    dest_asset: { issued: { code: "USDC", issuer: "GISSUER" } },
    send_amount: "1000",
    estimated_dest_amount: "995",
    hops: [
      {
        venue: { order_book: null },
        source_asset: { native: null },
        destination_asset: { issued: { code: "USDC", issuer: "GISSUER" } },
      },
    ],
    price_impact_pct: "0.3",
    effective_slippage_pct: "0.5",
    liquidity_flag: "healthy",
    ...overrides,
  };
}

describe("RouteQualityCard", () => {
  it("renders the estimated amount and slippage figures", () => {
    render(<RouteQualityCard quote={makeQuote()} />);
    expect(screen.getByText("995")).toBeInTheDocument();
    expect(screen.getByText("0.5%")).toBeInTheDocument();
  });

  it("renders the liquidity flag label", () => {
    render(<RouteQualityCard quote={makeQuote({ liquidity_flag: "danger" })} />);
    expect(screen.getByText("danger")).toBeInTheDocument();
  });

  it.each(["healthy", "thin", "danger"] as const)(
    "renders without crashing for liquidity_flag=%s",
    (flag) => {
      render(<RouteQualityCard quote={makeQuote({ liquidity_flag: flag })} />);
      expect(screen.getByText(flag)).toBeInTheDocument();
    },
  );
});
