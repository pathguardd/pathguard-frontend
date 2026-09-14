import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AssetInput } from "./AssetInput";
import type { Asset } from "@/lib/api";

describe("AssetInput", () => {
  it("renders no code/issuer fields when the asset is native", () => {
    render(<AssetInput label="Send" value={{ native: null }} onChange={vi.fn()} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.queryByLabelText("Send asset code")).not.toBeInTheDocument();
  });

  it("renders code/issuer fields when the asset is issued", () => {
    const value: Asset = { issued: { code: "USDC", issuer: "GISSUER" } };
    render(<AssetInput label="Dest" value={value} onChange={vi.fn()} />);
    expect(screen.getByLabelText("Dest asset code")).toHaveValue("USDC");
    expect(screen.getByLabelText("Dest asset issuer")).toHaveValue("GISSUER");
  });

  it("switches to issued when the native checkbox is unchecked", () => {
    const onChange = vi.fn();
    render(<AssetInput label="Send" value={{ native: null }} onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith({ issued: { code: "", issuer: "" } });
  });

  it("switches to native when the checkbox is checked", () => {
    const onChange = vi.fn();
    const value: Asset = { issued: { code: "USDC", issuer: "GISSUER" } };
    render(<AssetInput label="Send" value={value} onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith({ native: null });
  });

  it("updates the code field independently of the issuer", () => {
    const onChange = vi.fn();
    const value: Asset = { issued: { code: "USDC", issuer: "GISSUER" } };
    render(<AssetInput label="Dest" value={value} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("Dest asset code"), {
      target: { value: "AQUA" },
    });
    expect(onChange).toHaveBeenCalledWith({ issued: { code: "AQUA", issuer: "GISSUER" } });
  });
});
