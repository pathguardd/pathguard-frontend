import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HopList } from "./HopList";
import type { RouteHop } from "@/lib/api";

describe("HopList", () => {
  it("renders nothing for an empty hop list", () => {
    const { container } = render(<HopList hops={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders one list item per hop with asset codes and venue", () => {
    const hops: RouteHop[] = [
      {
        venue: { order_book: null },
        source_asset: { native: null },
        destination_asset: { issued: { code: "USDC", issuer: "G1" } },
      },
      {
        venue: { amm_pool: { pool_id: "pool123" } },
        source_asset: { issued: { code: "USDC", issuer: "G1" } },
        destination_asset: { issued: { code: "yXLM", issuer: "G2" } },
      },
    ];

    render(<HopList hops={hops} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("XLM");
    expect(items[0]).toHaveTextContent("USDC");
    expect(items[0]).toHaveTextContent("order book");
    expect(items[1]).toHaveTextContent("pool123");
  });
});
