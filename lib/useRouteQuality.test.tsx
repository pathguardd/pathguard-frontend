import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useRouteQuality } from "./useRouteQuality";
import type { RouteQuote } from "./api";

const okQuote: RouteQuote = {
  send_asset: { native: null },
  dest_asset: { issued: { code: "USDC", issuer: "GISSUER" } },
  send_amount: "100",
  estimated_dest_amount: "99",
  hops: [],
  price_impact_pct: "1",
  effective_slippage_pct: "1",
  liquidity_flag: "healthy",
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useRouteQuality", () => {
  it("starts idle", () => {
    const { result } = renderHook(() => useRouteQuality());
    expect(result.current.status).toBe("idle");
    expect(result.current.quote).toBeNull();
  });

  it("transitions to success with the fetched quote", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => okQuote,
      }),
    );

    const { result } = renderHook(() => useRouteQuality());
    act(() => {
      void result.current.check({
        send_asset: { native: null },
        dest_asset: { issued: { code: "USDC", issuer: "GISSUER" } },
        send_amount: "100",
      });
    });

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.quote).toEqual(okQuote);
    expect(result.current.error).toBeNull();
  });

  it("transitions to error with the failure message on a non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 502 }),
    );

    const { result } = renderHook(() => useRouteQuality());
    act(() => {
      void result.current.check({
        send_asset: { native: null },
        dest_asset: { issued: { code: "USDC", issuer: "GISSUER" } },
        send_amount: "100",
      });
    });

    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.quote).toBeNull();
    expect(result.current.error).toMatch(/502/);
  });
});
