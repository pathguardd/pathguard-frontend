import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchMultiHopRouteQuality, fetchRouteQuality, type RouteQuote } from "./api";

const quote: RouteQuote = {
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

describe("fetchRouteQuality", () => {
  it("posts to /v1/route-quality and returns the parsed quote", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => quote });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchRouteQuality({
      send_asset: { native: null },
      dest_asset: { issued: { code: "USDC", issuer: "GISSUER" } },
      send_amount: "100",
    });

    expect(result).toEqual(quote);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/v1/route-quality"),
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("throws with the status code when the response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 429 }));

    await expect(
      fetchRouteQuality({
        send_asset: { native: null },
        dest_asset: { issued: { code: "USDC", issuer: "GISSUER" } },
        send_amount: "100",
      }),
    ).rejects.toThrow(/429/);
  });
});

describe("fetchMultiHopRouteQuality", () => {
  it("posts to /v1/route-quality/multi-hop", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => quote });
    vi.stubGlobal("fetch", fetchMock);

    await fetchMultiHopRouteQuality({
      path: [{ native: null }, { issued: { code: "USDC", issuer: "GISSUER" } }],
      send_amount: "100",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/v1/route-quality/multi-hop"),
      expect.anything(),
    );
  });
});
