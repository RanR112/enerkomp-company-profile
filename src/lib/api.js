const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const publicApi = async (endpoint, options = {}) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });
    if (!res.ok) {
        const error = await res
            .json()
            .catch(() => ({ error: "Request failed" }));
        throw error;
    }
    return res.json();
};
