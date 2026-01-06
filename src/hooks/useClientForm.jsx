// src/hooks/useClientForm.js
import { useState } from "react";
import { submitClientForm } from "../lib/api";

export const useClientForm = () => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submit = async (formData) => {
        setSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            await submitClientForm(formData);
            setSuccess(true);
        } catch (err) {
            setError("Gagal mengirim. Silakan coba lagi.");
        } finally {
            setSubmitting(false);
        }
    };

    return { submitting, error, success, submit };
};
