import { useEffect } from "react";
import { publicApi } from "../lib/api";
import { getOrCreateSessionId } from "../lib/analytics";

export const useAnalytics = (page, title) => {
    useEffect(() => {
        const sessionId = getOrCreateSessionId();
        const pageKey = `${sessionId}:${page}`;
        const referrer = document.referrer || 'direct';

        if (sessionStorage.getItem(pageKey)) return;

        const track = async () => {
            try {
                await publicApi("/analytics/track", {
                    method: "POST",
                    body: JSON.stringify({
                        page,
                        title,
                        sessionId,
                        referrer,
                    }),
                });
                sessionStorage.setItem(pageKey, "1"); // Tandai sudah di-track
            } catch (err) {
                console.warn("Analytics failed:", err);
            }
        };

        track();
    }, [page, title]);

    useEffect(() => {
        const sessionId = getOrCreateSessionId();
        const startTime = Date.now();

        const endSession = async () => {
            const duration = Math.floor((Date.now() - startTime) / 1000);
            try {
                await publicApi("/analytics/end-session", {
                    method: "POST",
                    body: JSON.stringify({ sessionId, duration }),
                });
            } catch (err) {
                console.warn("Session end failed:", err);
            }
        };

        window.addEventListener("beforeunload", endSession);
        window.addEventListener("visibilitychange", () => {
            if (document.hidden) endSession();
        });

        return () => {
            window.removeEventListener("beforeunload", endSession);
        };
    }, []);
};
