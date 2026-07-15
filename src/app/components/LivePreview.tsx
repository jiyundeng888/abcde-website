"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LivePreview Component
 *
 * Only active in development mode. Polls the /api/content-version endpoint
 * every 3 seconds. When Prismic content changes (either published or draft
 * via preview mode), the page auto-refreshes to show the updated content.
 *
 * Workflow:
 * 1. User edits content in Prismic Page Builder
 * 2. User clicks "Save & Publish" (or "Save" in preview mode)
 * 3. Within 3 seconds, this component detects the change and auto-refreshes
 */
export default function LivePreview() {
  const versionRef = useRef<string>("");
  const [status, setStatus] = useState<"connecting" | "connected" | "updating">(
    "connecting"
  );
  const [lastCheck, setLastCheck] = useState<string>("");
  const [isPreview, setIsPreview] = useState<boolean>(false);

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== "development") return;

    let mounted = true;

    const checkForUpdates = async () => {
      try {
        const res = await fetch("/api/content-version", {
          cache: "no-store",
        });
        const data = await res.json();

        if (!mounted) return;

        const newVersion = data.version || "";
        setLastCheck(new Date().toLocaleTimeString());
        setIsPreview(!!data.isPreview);

        if (versionRef.current === "") {
          // First load - just record the version
          versionRef.current = newVersion;
          setStatus("connected");
        } else if (versionRef.current !== newVersion) {
          // Content has changed! Auto-refresh
          setStatus("updating");
          versionRef.current = newVersion;
          // Small delay so the user sees the "updating" state
          setTimeout(() => {
            window.location.reload();
          }, 300);
        } else {
          setStatus("connected");
        }
      } catch (e) {
        // Silently handle errors (e.g., dev server not ready)
        if (mounted) setStatus("connecting");
      }
    };

    // Initial check
    checkForUpdates();

    // Poll every 3 seconds
    const interval = setInterval(checkForUpdates, 3000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Don't render anything in production
  if (process.env.NODE_ENV !== "development") return null;

  const dotColor =
    status === "connected"
      ? isPreview
        ? "#f59e0b"
        : "#22c55e"
      : status === "updating"
      ? "#f59e0b"
      : "#94a3b8";

  const statusText =
    status === "updating"
      ? "Updating..."
      : status === "connected"
      ? isPreview
        ? "Draft Preview"
        : "Live Preview"
      : "Connecting...";

  const handleExitPreview = async () => {
    try {
      await fetch("/api/exit-preview", { method: "POST" });
      window.location.reload();
    } catch (e) {
      // ignore
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "12px",
        right: "12px",
        zIndex: 99999,
        background: "rgba(20, 20, 19, 0.92)",
        color: "#faf9f5",
        padding: "8px 14px",
        borderRadius: "8px",
        fontSize: "12px",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backdropFilter: "blur(8px)",
        userSelect: "none",
      }}
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: dotColor,
          display: "inline-block",
          animation:
            status === "updating" ? "none" : "pulse 2s ease-in-out infinite",
        }}
      />
      <span style={{ fontWeight: 500 }}>{statusText}</span>
      {lastCheck && status === "connected" && (
        <span style={{ opacity: 0.5, fontSize: "10px" }}>{lastCheck}</span>
      )}
      {isPreview && status === "connected" && (
        <button
          onClick={handleExitPreview}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#faf9f5",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "10px",
            cursor: "pointer",
            marginLeft: "4px",
          }}
        >
          Exit
        </button>
      )}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
