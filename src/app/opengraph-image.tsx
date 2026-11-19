import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const alt = "ROMcraft Fieldnotes — Know the device. Own the process.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#0b2026", color: "#f1fffc", display: "flex", flexDirection: "column", padding: 82, justifyContent: "space-between", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 31, fontWeight: 800, color: "#8ceadb" }}><div style={{ width: 46, height: 46, border: "3px solid #8ceadb", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{"›_"}</div> ROMcraft <span style={{ fontSize: 18, opacity: 0.8, letterSpacing: 3 }}>FIELDNOTES</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 75, fontWeight: 800, letterSpacing: -2 }}>Know the device.</div><div style={{ fontSize: 75, fontWeight: 800, letterSpacing: -2, color: "#78d9ce" }}>Own the process.</div><div style={{ marginTop: 28, fontSize: 27, color: "#bfd2d2" }}>Recovery-first Android research · Device field studies · ROM security</div></div>
      <div style={{ fontSize: 18, letterSpacing: 2, opacity: 0.7 }}>OPEN RESEARCH · PRACTICAL EVIDENCE</div>
    </div>, size,
  );
}
