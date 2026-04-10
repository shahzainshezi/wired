import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      background: "#F2F3F5",
      color: "#141414",
      textAlign: "center",
      padding: "0 24px"
    }}>
      <h1 style={{ fontSize: "6rem", fontWeight: 900, color: "#c4db0d", lineHeight: 1, marginBottom: 16 }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 12 }}>Page Not Found</h2>
      <p style={{ fontSize: 16, color: "#555", marginBottom: 32 }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" style={{
        padding: "12px 28px",
        background: "linear-gradient(135deg, #8ea10a 0%, #c4db0d 100%)",
        color: "#000",
        fontWeight: 600,
        borderRadius: 8,
        textDecoration: "none",
        fontSize: 15,
      }}>
        Go Home
      </Link>
    </div>
  );
}
