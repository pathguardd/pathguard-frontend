import { AssetInput } from "@/components/AssetInput";
import type { Asset } from "@/lib/api";

export interface PathBuilderProps {
  path: Asset[];
  onChange: (path: Asset[]) => void;
}

/**
 * Editable list of assets forming a multi-hop path: send asset,
 * any number of intermediates, destination asset. Always keeps at
 * least 2 entries (send + dest).
 */
export function PathBuilder({ path, onChange }: PathBuilderProps) {
  function updateAt(index: number, asset: Asset) {
    onChange(path.map((a, i) => (i === index ? asset : a)));
  }

  function addIntermediate() {
    // Insert a new intermediate just before the destination asset.
    const next = [...path];
    next.splice(path.length - 1, 0, { native: null });
    onChange(next);
  }

  function removeAt(index: number) {
    if (path.length <= 2) return; // always keep send + dest
    onChange(path.filter((_, i) => i !== index));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {path.map((asset, i) => {
        const isEndpoint = i === 0 || i === path.length - 1;
        const label = i === 0 ? "Send" : i === path.length - 1 ? "Destination" : `Hop ${i}`;
        return (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <AssetInput label={label} value={asset} onChange={(a) => updateAt(i, a)} />
            {!isEndpoint && (
              <button type="button" onClick={() => removeAt(i)} aria-label={`Remove hop ${i}`}>
                ✕
              </button>
            )}
          </div>
        );
      })}
      <button type="button" onClick={addIntermediate}>
        + Add intermediate asset
      </button>
    </div>
  );
}
