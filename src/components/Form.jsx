import React, { useState } from "react";
import "../sass/components/Form/Form.css";
import { catalogBanner, contactBanner } from "../assets/images";
import { useLanguage } from "../hooks/useLanguage";
import { submitClientForm } from "../lib/api"; // ✅ Reuse hook yang sudah ada

const Form = ({ type, catalogId = null }) => {
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        company: "",
        address: "",
        country: "",
        name: "",
        email: "",
        phone: "",
        fax: "",
        message: "",
    });

    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(""); // idle | submitting | success | error

    const requiredFields = [
        "company",
        "address",
        "country",
        "name",
        "email",
        "phone",
        "message",
    ];

    const banner = type === "catalog" ? catalogBanner : contactBanner;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        requiredFields.forEach((field) => {
            if (!formData[field]?.trim()) {
                newErrors[field] = t("form.validation.required");
            }
        });

        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = t("form.validation.invalidEmail");
        }

        if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
            newErrors.phone = t("form.validation.invalidPhone");
        }

        if (!agreedToTerms) {
            newErrors.terms = t("form.validation.termsRequired");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Kirim ke backend Enerkomp
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setSubmitStatus("submitting");

        try {
            const payload = {
                ...formData,
                formType: type.toUpperCase(),
                agreedToTerms,
                source: window.location.href,
            };

            let catalogTab = null;

            // Jika tipe CATALOG → buka tab loader dulu
            if (type === "catalog" && catalogId) {
                payload.catalogId = catalogId;

                catalogTab = window.open("/catalog?status=loading", "_blank");
            }

            // Submit form ke backend
            const result = await submitClientForm(payload);

            if (catalogTab && result.emailSent) {
                catalogTab.location.href = "/catalog?status=emailsent";
            }

            if (catalogTab && result?.catalogUrl && !result.emailSent) {
                catalogTab.location.href = result.catalogUrl;
            }

            setSubmitStatus("success");

            // Reset form
            setFormData({
                company: "",
                address: "",
                country: "",
                name: "",
                email: "",
                phone: "",
                fax: "",
                message: "",
            });
            setAgreedToTerms(false);

            setTimeout(() => setSubmitStatus(""), 5000);
        } catch (err) {
            console.error("Form submission failed:", err);
            setSubmitStatus("error");
            setTimeout(() => setSubmitStatus(""), 5000);
        }
    };

    return (
        <div className="catalog-form-container">
            <div className="catalog-form-wrapper">
                <div className="form-section">
                    <div className="catalog-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="company">
                                    {t("form.fields.company")}
                                    <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    placeholder={t("form.placeholders.company")}
                                    className={errors.company ? "error" : ""}
                                    required
                                />
                                {errors.company && (
                                    <span className="error-message">
                                        {errors.company}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">
                                    {t("form.fields.address")}
                                    <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder={t("form.placeholders.address")}
                                    className={errors.address ? "error" : ""}
                                    required
                                />
                                {errors.address && (
                                    <span className="error-message">
                                        {errors.address}
                                    </span>
                                )}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="country">
                                        {t("form.fields.country")}
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        placeholder={t(
                                            "form.placeholders.country"
                                        )}
                                        className={
                                            errors.country ? "error" : ""
                                        }
                                        required
                                    />
                                    {errors.country && (
                                        <span className="error-message">
                                            {errors.country}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        {t("form.fields.name")}
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder={t(
                                            "form.placeholders.name"
                                        )}
                                        className={errors.name ? "error" : ""}
                                        required
                                    />
                                    {errors.name && (
                                        <span className="error-message">
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        {t("form.fields.email")}
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder={t(
                                            "form.placeholders.email"
                                        )}
                                        className={errors.email ? "error" : ""}
                                        required
                                    />
                                    {errors.email && (
                                        <span className="error-message">
                                            {errors.email}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">
                                        {t("form.fields.phone")}
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder={t(
                                            "form.placeholders.phone"
                                        )}
                                        className={errors.phone ? "error" : ""}
                                        required
                                    />
                                    {errors.phone && (
                                        <span className="error-message">
                                            {errors.phone}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="fax">
                                        {t("form.fields.fax")}
                                    </label>
                                    <input
                                        type="text"
                                        id="fax"
                                        name="fax"
                                        value={formData.fax}
                                        onChange={handleInputChange}
                                        placeholder={t("form.placeholders.fax")}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">
                                    {t("form.fields.message")}
                                    <span className="required">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="5"
                                    placeholder={t("form.placeholders.message")}
                                    className={errors.message ? "error" : ""}
                                    required
                                />
                                {errors.message && (
                                    <span className="error-message">
                                        {errors.message}
                                    </span>
                                )}
                            </div>

                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={agreedToTerms}
                                        onChange={(e) =>
                                            setAgreedToTerms(e.target.checked)
                                        }
                                        required
                                    />
                                    <span className="checkmark"></span>
                                    <span className="required">*</span>
                                    {t("form.termsAgreement")}
                                </label>
                                {errors.terms && (
                                    <span className="error-message">
                                        {errors.terms}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={submitStatus === "submitting"}
                                style={{
                                    cursor:
                                        agreedToTerms === false
                                            ? "not-allowed"
                                            : "pointer",
                                    opacity: agreedToTerms === false ? 0.6 : 1,
                                }}
                            >
                                {submitStatus === "submitting"
                                    ? t("form.buttons.submitting")
                                    : t("form.buttons.submit")}
                            </button>

                            {submitStatus === "success" && (
                                <div className="success-message">
                                    {type === "catalog"
                                        ? t("form.messages.catalogSuccess")
                                        : t("form.messages.contactSuccess")}
                                </div>
                            )}

                            {submitStatus === "error" && (
                                <div className="error-message">
                                    {t("form.messages.error")}
                                </div>
                            )}

                            {type === "catalog" && (
                                <p className="download-note">
                                    {t("form.catalogNote")}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                <div
                    className="info-card"
                    style={{
                        backgroundImage: `url(${banner})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        position: "relative",
                    }}
                >
                    <div className="info-card-overlay"></div>
                    {type === "catalog" ? (
                        <>
                            <h3>
                                {t("form.infoCard.catalog.title.part1")} <br />
                                <span className="highlight">
                                    {t("form.infoCard.catalog.title.highlight")}
                                </span>
                            </h3>
                            <p>{t("form.infoCard.catalog.description")}</p>
                        </>
                    ) : (
                        <>
                            <h3>
                                {t("form.infoCard.contact.title.part1")} <br />
                                <span className="highlight">
                                    {t("form.infoCard.contact.title.highlight")}
                                </span>
                            </h3>
                            <p>{t("form.infoCard.contact.description")}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Form;
