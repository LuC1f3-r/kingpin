import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "KingpiN Vision Forge";
  const subtitle = searchParams.get("subtitle") ?? "Forging the future intelligence of brands";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 20%, rgba(19,224,178,.35), transparent 60%), #05060A",
          color: "#F2EEE4",
          fontFamily: "Space Grotesk, Inter, sans-serif",
          letterSpacing: "-0.04em",
          textTransform: "uppercase"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 32,
            padding: "80px 100px",
            backdropFilter: "blur(20px)",
            background: "rgba(14,28,36,0.8)",
            boxShadow: "0 0 120px rgba(111,0,255,0.45)"
          }}
        >
          <span style={{ color: "#13E0B2", fontSize: 36, marginBottom: 18 }}>KingpiN Vision Forge</span>
          <strong style={{ fontSize: 72, maxWidth: 780 }}>{title}</strong>
          <p style={{ fontSize: 32, opacity: 0.8, marginTop: 24, textTransform: "none" }}>{subtitle}</p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
