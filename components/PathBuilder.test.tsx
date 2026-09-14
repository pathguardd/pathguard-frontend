import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PathBuilder } from "./PathBuilder";
import type { Asset } from "@/lib/api";

const twoAsset: Asset[] = [{ native: null }, { issued: { code: "USDC", issuer: "G1" } }];

describe("PathBuilder", () => {
  it("renders one AssetInput per path entry, with no remove button on endpoints", () => {
    render(<PathBuilder path={twoAsset} onChange={vi.fn()} />);
    expect(screen.getByText("Send")).toBeInTheDocument();
    expect(screen.getByText("Destination")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /remove/i })).not.toBeInTheDocument();
  });

  it("inserts a native intermediate before the destination when adding", () => {
    const onChange = vi.fn();
    render(<PathBuilder path={twoAsset} onChange={onChange} />);
    fireEvent.click(screen.getByText("+ Add intermediate asset"));
    expect(onChange).toHaveBeenCalledWith([
      { native: null },
      { native: null },
      { issued: { code: "USDC", issuer: "G1" } },
    ]);
  });

  it("shows a remove button for intermediate hops and removes them", () => {
    const path: Asset[] = [
      { native: null },
      { issued: { code: "USDC", issuer: "G1" } },
      { issued: { code: "yXLM", issuer: "G2" } },
    ];
    const onChange = vi.fn();
    render(<PathBuilder path={path} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("Remove hop 1"));
    expect(onChange).toHaveBeenCalledWith([
      { native: null },
      { issued: { code: "yXLM", issuer: "G2" } },
    ]);
  });

  it("does not shrink below 2 entries", () => {
    // removeAt guards internally; with only send+dest there's no remove
    // button rendered at all, so this documents the invariant rather
    // than exercising removeAt's early return directly.
    render(<PathBuilder path={twoAsset} onChange={vi.fn()} />);
    expect(screen.getAllByRole("group")).toHaveLength(2);
  });
});
