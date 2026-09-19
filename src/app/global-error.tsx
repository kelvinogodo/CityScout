"use client";

// Last-resort boundary: replaces the root layout, so it must render its own
// <html> and <body> and cannot rely on Tailwind theme tokens or fonts.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 24,
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Something went wrong</h1>
        <p style={{ color: "#555", marginBottom: 20 }}>
          Please try again in a moment.
        </p>
        <button
          onClick={reset}
          style={{
            background: "#0d0d0d",
            color: "white",
            border: 0,
            borderRadius: 6,
            padding: "10px 18px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
