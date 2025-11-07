export const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
        // Generate UUID sederhana (atau gunakan library)
        sessionId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                const r = (Math.random() * 16) | 0;
                const v = c === "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
        localStorage.setItem("session_id", sessionId);
    }
    return sessionId;
};
