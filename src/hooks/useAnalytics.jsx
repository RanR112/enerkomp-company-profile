import { useEffect, useRef } from "react";
import { publicApi } from "../lib/api";
import { getOrCreateSessionId } from "../lib/analytics";

/**
 * Hook untuk analytics tracking otomatis
 * - Mengirim page view saat halaman dimuat
 * - Mengirim durasi saat tab ditutup atau tab berpindah ke background
 * - Hindari duplikat tracking per halaman dalam 1 session
 */
export const useAnalytics = (page, title) => {
    // Gunakan useRef agar tidak memicu re-render & nilai tetap konsisten
    const startTimeRef = useRef(Date.now());

    // 🔹 1. Track page view (hanya sekali per halaman per session)
    useEffect(() => {
        const sessionId = getOrCreateSessionId();
        const pageKey = `${sessionId}:${page}`;
        const referrer = document.referrer || "direct";

        // Cegah double-tracking
        if (sessionStorage.getItem(pageKey)) return;

        const track = async () => {
            try {
                await publicApi("/analytics/track", {
                    method: "POST",
                    body: JSON.stringify({
                        page,
                        title,
                        sessionId,
                        referrer, // ✅ selalu terisi (tidak undefined/empty)
                    }),
                });
                sessionStorage.setItem(pageKey, "1"); // tandai sudah di-track
            } catch (err) {
                // Fail silently — jangan ganggu UX
                if (import.meta.env.NODE_ENV === "development") {
                    console.warn("[Analytics] Page view tracking failed:", err);
                }
            }
        };

        track();
    }, [page, title]);

    // 🔹 2. Track session duration (saat tab ditutup atau pindah ke background)
    useEffect(() => {
        const sessionId = getOrCreateSessionId();

        const endSession = async () => {
            const duration = Math.floor(
                (Date.now() - startTimeRef.current) / 1000
            );
            if (duration <= 0) return; // hindari duration 0/minus

            try {
                await publicApi("/analytics/end-session", {
                    method: "POST",
                    body: JSON.stringify({ sessionId, duration }),
                });
            } catch (err) {
                if (import.meta.env.NODE_ENV === "development") {
                    console.warn("[Analytics] Session end failed:", err);
                }
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                endSession();
            }
        };

        // Event: tab ditutup atau navigasi keluar
        window.addEventListener("beforeunload", endSession);
        // Event: tab pindah ke background (misal: ganti tab/app)
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("beforeunload", endSession);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, []);
};
