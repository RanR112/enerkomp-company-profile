import React, { useState } from "react";
import "../sass/components/Form/Form.css";
import { catalogBanner, contactBanner } from "../assets/images";
import { useLanguage } from "../hooks/useLanguage";

const Form = ({ type }) => {
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        perusahaan: "",
        alamat: "",
        negara: "",
        nama: "",
        email: "",
        phone: "",
        fax: "",
        pesan: "",
    });

    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("");

    const requiredFields = [
        "perusahaan",
        "alamat",
        "negara",
        "nama",
        "email",
        "phone",
        "pesan",
    ];

    const banner = type === "catalog" ? catalogBanner : contactBanner;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Check required fields
        requiredFields.forEach((field) => {
            if (!formData[field].trim()) {
                newErrors[field] = t("form.validation.required");
            }
        });

        // Email validation
        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = t("form.validation.invalidEmail");
        }

        // Phone validation
        if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
            newErrors.phone = t("form.validation.invalidPhone");
        }

        // Terms agreement
        if (!agreedToTerms) {
            newErrors.terms = t("form.validation.termsRequired");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitToGoogleSheets = async (data) => {
        const SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycbwAqdAHVYvxMNVR4zjMmC-TE7o9tp2CUbt0Zq4BIdXpVrD1jWm1rYuY71WEn-YypfHL/exec";

        try {
            // Buat FormData untuk menghindari preflight request
            const formData = new FormData();

            // Tambahkan data sebagai JSON string dengan formType
            const dataWithType = {
                ...data,
                formType: type, // Tambahkan form type (catalog atau contact)
            };

            formData.append("data", JSON.stringify(dataWithType));

            console.log("Submitting data:", dataWithType); // Debug log

            const response = await fetch(SCRIPT_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            console.log("Response from server:", result); // Debug log

            if (result.success === false) {
                throw new Error(result.message || "Submission failed");
            }

            return result;
        } catch (error) {
            console.error("Error submitting form:", error);
            throw error;
        }
    };

    const downloadCatalog = () => {
        // Simulate catalog download
        const link = document.createElement("a");
        link.href = "#"; // Replace with actual catalog file URL
        link.download = "catalog.pdf";
        link.click();
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("");

        try {
            const submissionData = {
                ...formData,
                timestamp: new Date().toISOString(),
                agreedToTerms: agreedToTerms,
            };

            const result = await submitToGoogleSheets(submissionData);

            console.log("Submission successful:", result); // Debug log

            setSubmitStatus("success");

            // Download catalog hanya untuk form catalog
            if (type === "catalog") {
                setTimeout(() => {
                    downloadCatalog();
                }, 1000);
            }

            // Reset form
            setFormData({
                perusahaan: "",
                alamat: "",
                negara: "",
                nama: "",
                email: "",
                phone: "",
                fax: "",
                pesan: "",
            });
            setAgreedToTerms(false);

            // Clear success message setelah 5 detik
            setTimeout(() => {
                setSubmitStatus("");
            }, 5000);
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus("error");

            // Clear error message setelah 5 detik
            setTimeout(() => {
                setSubmitStatus("");
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="catalog-form-container">
            <div className="catalog-form-wrapper">
                <div className="form-section">
                    <div className="catalog-form">
                        <div className="form-group">
                            <label htmlFor="perusahaan">
                                {t("form.fields.company")}
                                <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="perusahaan"
                                name="perusahaan"
                                value={formData.perusahaan}
                                onChange={handleInputChange}
                                placeholder={t("form.placeholders.company")}
                                className={errors.perusahaan ? "error" : ""}
                            />
                            {errors.perusahaan && (
                                <span className="error-message">
                                    {errors.perusahaan}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="alamat">
                                {t("form.fields.address")}
                                <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="alamat"
                                name="alamat"
                                value={formData.alamat}
                                onChange={handleInputChange}
                                placeholder={t("form.placeholders.address")}
                                className={errors.alamat ? "error" : ""}
                            />
                            {errors.alamat && (
                                <span className="error-message">
                                    {errors.alamat}
                                </span>
                            )}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="negara">
                                    {t("form.fields.country")}
                                    <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="negara"
                                    name="negara"
                                    value={formData.negara}
                                    onChange={handleInputChange}
                                    placeholder={t("form.placeholders.country")}
                                    className={errors.negara ? "error" : ""}
                                />
                                {errors.negara && (
                                    <span className="error-message">
                                        {errors.negara}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="nama">
                                    {t("form.fields.name")}
                                    <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nama"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleInputChange}
                                    placeholder={t("form.placeholders.name")}
                                    className={errors.nama ? "error" : ""}
                                />
                                {errors.nama && (
                                    <span className="error-message">
                                        {errors.nama}
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
                                    placeholder={t("form.placeholders.email")}
                                    className={errors.email ? "error" : ""}
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
                                    placeholder={t("form.placeholders.phone")}
                                    className={errors.phone ? "error" : ""}
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
                            <label htmlFor="pesan">
                                {t("form.fields.message")}
                                <span className="required">*</span>
                            </label>
                            <textarea
                                id="pesan"
                                name="pesan"
                                value={formData.pesan}
                                onChange={handleInputChange}
                                rows="5"
                                placeholder={t("form.placeholders.message")}
                                className={errors.pesan ? "error" : ""}
                            />
                            {errors.pesan && (
                                <span className="error-message">
                                    {errors.pesan}
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
                            type="button"
                            className="submit-button"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                        >
                            {isSubmitting
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
