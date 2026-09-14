import type { Asset } from "@/lib/api";

export interface AssetInputProps {
  label: string;
  value: Asset;
  onChange: (asset: Asset) => void;
}

function isNative(asset: Asset): asset is { native: null } {
  return "native" in asset;
}

/**
 * Structured input for a Stellar Asset: a toggle between "native" (XLM)
 * and "issued" (code + issuer), rather than making callers hand-build
 * the Asset union themselves.
 */
export function AssetInput({ label, value, onChange }: AssetInputProps) {
  const native = isNative(value);
  const code = native ? "" : value.issued.code;
  const issuer = native ? "" : value.issued.issuer;

  return (
    <fieldset style={{ border: "1px solid #d0d7de", borderRadius: 8, padding: 12 }}>
      <legend>{label}</legend>
      <label style={{ display: "block", marginBottom: 8 }}>
        <input
          type="checkbox"
          checked={native}
          onChange={(e) => {
            if (e.target.checked) {
              onChange({ native: null });
            } else {
              onChange({ issued: { code: "", issuer: "" } });
            }
          }}
        />{" "}
        Native (XLM)
      </label>
      {!native && (
        <div style={{ display: "flex", gap: 8 }}>
          <input
            aria-label={`${label} asset code`}
            placeholder="Asset code (e.g. USDC)"
            value={code}
            onChange={(e) => onChange({ issued: { code: e.target.value, issuer } })}
          />
          <input
            aria-label={`${label} asset issuer`}
            placeholder="Issuer (G...)"
            value={issuer}
            onChange={(e) => onChange({ issued: { code, issuer: e.target.value } })}
          />
        </div>
      )}
    </fieldset>
  );
}
