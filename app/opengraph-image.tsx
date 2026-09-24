import { ImageResponse } from "next/og";

export const alt =
  "Adarsha Prasai — full-stack developer. I build native-feeling, keyboard-driven tools.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f3ec",
          color: "#1c1a17",
          padding: 80,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 30, color: "#5f584e" }}>
          Adarsha Prasai — full-stack developer at Corpsec
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 78, lineHeight: 1.02 }}>
            I build software that feels
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 78,
              lineHeight: 1.02,
              background: "#ffd23f",
              padding: "2px 18px",
              borderRadius: 10,
            }}
          >
            like it came with the computer.
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#5f584e" }}>
          Peel, a zero-dependency macOS app · Relay, real-time issue tracker
        </div>
      </div>
    ),
    { ...size },
  );
}
