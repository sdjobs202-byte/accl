import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "ACCL - AI 학습 및 자격증 센터";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // OG 이미지는 빌드 시 정적 생성되므로, 빌드 시점에 레포의 로고 파일을 읽어 base64로 임베드
  const logoData = readFileSync(join(process.cwd(), "src/app/accl-logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFFFFF",
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={680} height={340} style={{ objectFit: "contain" }} alt="ACCL" />
        <div
          style={{
            width: 220,
            height: 10,
            background: "#A92B2B",
            borderRadius: 999,
            marginTop: 8,
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 38,
            fontWeight: 600,
            color: "#1A1A1A",
            marginTop: 34,
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
            marginTop: 14,
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
