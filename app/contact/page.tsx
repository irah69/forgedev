"use client";

import { useState } from "react";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzm8cWWkFLycIzI2kqbk5sLRrh9oG1nON625GC8gmqRIFpB7CTODxRlOCxMl-7yyIdO/exec";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.mobile.replace(/\s/g, ""))) {
      newErrors.mobile = "Enter a valid mobile number.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .contact-root {
          min-height: 100vh;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
          position: relative;
          overflow: hidden;
        }
        .bg-orb {
          position: absolute; border-radius: 50%;
          filter: blur(90px); opacity: 0.18; pointer-events: none;
        }
        .bg-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #6c63ff, transparent);
          top: -120px; left: -100px;
        }
        .bg-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #00d4aa, transparent);
          bottom: -80px; right: -60px;
        }
        /* .bg-grid removed */
        .contact-card {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 24px; padding: 56px 52px;
          width: 100%; max-width: 520px;
          backdrop-filter: blur(20px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(108,99,255,0.1);
          animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(108,99,255,0.15);
          border: 1px solid rgba(108,99,255,0.3);
          color: #a89fff; font-size: 11px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 99px; margin-bottom: 20px;
        }
        .badge-dot {
          width: 6px; height: 6px; background: #6c63ff;
          border-radius: 50%; animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .contact-heading {
          font-family: 'Syne', sans-serif; font-size: 36px;
          font-weight: 800; color: #fff; line-height: 1.1;
          margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .contact-heading span {
          background: linear-gradient(135deg, #6c63ff 0%, #00d4aa 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-sub {
          color: rgba(255,255,255,0.45); font-size: 14.5px;
          line-height: 1.6; margin-bottom: 36px;
        }
        .form-group { margin-bottom: 20px; }
        .form-label {
          display: block; font-size: 12px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-bottom: 8px;
        }
        .input-wrap { position: relative; }
        .input-icon {
          position: absolute; left: 16px; top: 50%;
          transform: translateY(-50%); color: rgba(255,255,255,0.25);
          pointer-events: none; font-size: 16px; line-height: 1;
        }
        .form-input {
          width: 100%; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          padding: 14px 16px 14px 44px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 14.5px;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.2); }
        .form-input:focus {
          border-color: rgba(108,99,255,0.6);
          background: rgba(108,99,255,0.06);
          box-shadow: 0 0 0 3px rgba(108,99,255,0.12);
        }
        .form-input.error-field { border-color: rgba(255,80,80,0.5); }
        .error-msg { font-size: 12px; color: #ff6b6b; margin-top: 6px; padding-left: 4px; }
        .submit-btn {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #6c63ff 0%, #4a43cc 100%);
          color: #fff; font-family: 'Syne', sans-serif; font-size: 15px;
          font-weight: 700; letter-spacing: 0.04em; border: none;
          border-radius: 12px; cursor: pointer; margin-top: 8px;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          box-shadow: 0 8px 24px rgba(108,99,255,0.35);
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(108,99,255,0.5);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .submit-error {
          background: rgba(255,80,80,0.1);
          border: 1px solid rgba(255,80,80,0.3);
          border-radius: 10px; color: #ff6b6b; font-size: 13px;
          padding: 11px 14px; margin-top: 12px; text-align: center;
        }
        .divider {
          display: flex; align-items: center; gap: 12px;
          margin: 28px 0; color: rgba(255,255,255,0.2);
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
        }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(255,255,255,0.08);
        }
        .contact-chip {
          display: flex; align-items: center; gap: 10px;
          background: rgba(0,212,170,0.07);
          border: 1px solid rgba(0,212,170,0.2);
          border-radius: 12px; padding: 13px 16px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .contact-chip:hover {
          background: rgba(0,212,170,0.12);
          border-color: rgba(0,212,170,0.4);
        }
        .chip-icon {
          width: 34px; height: 34px;
          background: rgba(0,212,170,0.15); border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; flex-shrink: 0;
        }
        .chip-label {
          font-size: 11px; text-transform: uppercase;
          letter-spacing: 0.07em; color: rgba(255,255,255,0.35); margin-bottom: 2px;
        }
        .chip-value { font-size: 13.5px; color: #00d4aa; font-weight: 500; }
        .success-wrap { text-align: center; animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .success-icon {
          width: 72px; height: 72px;
          background: linear-gradient(135deg,rgba(0,212,170,0.2),rgba(108,99,255,0.2));
          border: 1px solid rgba(0,212,170,0.3); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 32px; margin: 0 auto 24px;
        }
        .success-title {
          font-family: 'Syne', sans-serif; font-size: 26px;
          font-weight: 800; color: #fff; margin-bottom: 10px;
        }
        .success-text {
          color: rgba(255,255,255,0.45); font-size: 14.5px;
          line-height: 1.7; margin-bottom: 32px;
        }
        .success-text strong { color: #00d4aa; }
        @media (max-width: 560px) {
          .contact-card { padding: 40px 28px; }
          .contact-heading { font-size: 28px; }
        }
      `}</style>

      <div className="contact-root">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />

        <div className="contact-card">
          {submitted ? (
            <div className="success-wrap">
              <div className="success-icon">✓</div>
              <div className="success-title">Message Received!</div>
              <p className="success-text">
                Thanks, <strong>{formData.name}</strong>! Our team will review your
                details and get in contact with you shortly.
              </p>
              <a href="mailto:irahtech69@gmail.com" className="contact-chip">
                <div className="chip-icon">✉</div>
                <div>
                  <div className="chip-label">Our Email</div>
                  <div className="chip-value">irahtech69@gmail.com</div>
                </div>
              </a>
              <a href="tel:+919014497622" className="contact-chip" style={{ marginTop: "10px" }}>
                <div className="chip-icon">📞</div>
                <div>
                  <div className="chip-label">Our Phone</div>
                  <div className="chip-value">+91 90144 97622</div>
                </div>
              </a>
            </div>
          ) : (
            <>
              <div className="badge"><span className="badge-dot" />Get in Touch</div>

              <h1 className="contact-heading">Let&apos;s <span>Talk</span></h1>
              <p className="contact-sub">
                Fill in your details and our team will reach out to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <div className="input-wrap">
                    <span className="input-icon">👤</span>
                    <input
                      id="name" name="name" type="text"
                      className={`form-input${errors.name ? " error-field" : ""}`}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                  </div>
                  {errors.name && <p className="error-msg">{errors.name}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="mobile">Mobile Number</label>
                  <div className="input-wrap">
                    <span className="input-icon">📱</span>
                    <input
                      id="mobile" name="mobile" type="tel"
                      className={`form-input${errors.mobile ? " error-field" : ""}`}
                      placeholder="+91 98765 43210"
                      value={formData.mobile}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </div>
                  {errors.mobile && <p className="error-msg">{errors.mobile}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <div className="input-wrap">
                    <span className="input-icon">✉</span>
                    <input
                      id="email" name="email" type="email"
                      className={`form-input${errors.email ? " error-field" : ""}`}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && <p className="error-msg">{errors.email}</p>}
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <><div className="spinner" /> Sending...</>
                  ) : (
                    "Send Message →"
                  )}
                </button>

                {submitError && <div className="submit-error">{submitError}</div>}
              </form>

              <div className="divider">or reach us directly</div>

              <a href="mailto:irahtech69@gmail.com" className="contact-chip">
                <div className="chip-icon">✉</div>
                <div>
                  <div className="chip-label">Our Email</div>
                  <div className="chip-value">irahtech69@gmail.com</div>
                </div>
              </a>
              <a href="tel:+919014497622" className="contact-chip" style={{ marginTop: "10px" }}>
                <div className="chip-icon">📞</div>
                <div>
                  <div className="chip-label">Our Phone</div>
                  <div className="chip-value">+91 90144 97622</div>
                </div>
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}