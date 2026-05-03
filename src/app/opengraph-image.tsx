import { ImageResponse } from "next/og";

export const alt = "ACCL - AI 학습 및 자격증 센터";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F9FAFB",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(169, 43, 43, 0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(169, 43, 43, 0.08)",
          }}
        />
        <div
          style={{
            fontSize: 280,
            fontWeight: 900,
            color: "#A92B2B",
            letterSpacing: "-0.06em",
            lineHeight: 1,
            display: "flex",
          }}
        >
          ACCL.
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            color: "#1A1A1A",
            marginTop: 24,
            letterSpacing: "0.04em",
            display: "flex",
          }}
        >
          AI Learning Center
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#666",
            marginTop: 16,
            display: "flex",
          }}
        >
          accl.kr
        </div>
      </div>
    ),
    { ...size },
  );
}
