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
    const e: { [key: string]: string } = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.mobile.trim()) {
      e.mobile = "Mobile number is required.";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.mobile.replace(/\s/g, ""))) {
      e.mobile = "Enter a valid mobile number.";
    }
    if (!formData.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Enter a valid email address.";
    }
    return e;
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    setErrors({ ...errors, [ev.target.name]: "" });
    setSubmitError("");
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length > 0) { setErrors(ve); return; }
    setLoading(true);
    setSubmitError("");
    try {
      await fetch(SHEET_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /*
          Navbar is position:fixed, height:68px.
          This page must:
          1. Start at exactly 68px from top (padding-top: 68px)
          2. Fill the rest of the viewport (height: 100vh)
          3. Center the card in the remaining space
        */
        .cp-page {
          width: 100%;
          height: 100vh;
          padding-top: 68px; /* exact navbar height */
          background: #070810;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* ── ORBS ── */
        .cp-orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }
        .cp-o1 { width: min(55vw,580px); height: min(55vw,580px); background: radial-gradient(circle,rgba(124,111,255,.2),transparent 70%); top:-20%; left:-10%; }
        .cp-o2 { width: min(45vw,460px); height: min(45vw,460px); background: radial-gradient(circle,rgba(96,200,255,.14),transparent 70%); bottom:-15%; right:-8%; }
        .cp-o3 { width: min(30vw,300px); height: min(30vw,300px); background: radial-gradient(circle,rgba(124,111,255,.09),transparent 70%); bottom:12%; left:18%; }

        /* ── CARD ── */
        .cp-card {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,.038);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 22px;
          width: min(92vw, 488px);
          /*
            Card height is the viewport minus navbar (68px) minus vertical breathing (48px top + 48px bottom).
            All internal spacing uses flex + gap so everything distributes evenly.
          */
          max-height: calc(100vh - 68px - 48px);
          padding: 28px 36px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 0 0 1px rgba(124,111,255,.14), 0 32px 80px rgba(0,0,0,.55);
          animation: cp-rise .5s cubic-bezier(.16,1,.3,1) both;
          /* distribute content evenly inside the fixed height */
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* top shimmer */
        .cp-card::before {
          content:''; position:absolute; top:0; left:8%; right:8%; height:1px;
          background: linear-gradient(90deg,transparent,rgba(124,111,255,.65),rgba(96,200,255,.4),transparent);
          border-radius:1px;
        }

        @keyframes cp-rise {
          from { opacity:0; transform:translateY(18px) scale(.985); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }

        /* ── BADGE ── */
        .cp-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(124,111,255,.13); border: 1px solid rgba(124,111,255,.32);
          color: #a89fff; font-size: 10px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
          padding: 5px 13px; border-radius: 99px;
          margin-bottom: 14px;
          align-self: flex-start;
        }
        .cp-dot { width:6px; height:6px; background:#7c6fff; border-radius:50%; animation:cp-pulse 2s infinite; }
        @keyframes cp-pulse { 0%,100%{opacity:1} 50%{opacity:.3} }

        /* ── HEADING ── */
        .cp-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(30px, 5vw, 42px);
          font-weight: 900; color: #fff; line-height: 1;
          letter-spacing: -.025em; margin-bottom: 8px;
        }
        .cp-h1 span {
          background: linear-gradient(135deg, #7c6fff 0%, #60c8ff 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .cp-sub {
          color: rgba(255,255,255,.36); font-size: 13px; line-height: 1.5;
          margin-bottom: 18px;
        }

        /* ── FORM ── */
        .cp-form { display: flex; flex-direction: column; gap: 12px; }

        .cp-g { display: flex; flex-direction: column; gap: 5px; }
        .cp-lbl {
          font-size: 10px; font-weight: 600; letter-spacing: .09em;
          text-transform: uppercase; color: rgba(255,255,255,.4);
        }
        .cp-iw { position: relative; }
        .cp-ico {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          color: rgba(255,255,255,.22); pointer-events: none; font-size: 14px; line-height: 1;
        }
        .cp-input {
          width: 100%;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 10px;
          padding: 11px 13px 11px 40px;
          color: #fff; font-family: 'DM Sans', sans-serif; font-size: 13.5px;
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
          -webkit-text-size-adjust: 100%;
        }
        .cp-input::placeholder { color: rgba(255,255,255,.18); }
        .cp-input:focus {
          border-color: rgba(124,111,255,.55);
          background: rgba(124,111,255,.07);
          box-shadow: 0 0 0 3px rgba(124,111,255,.1);
        }
        .cp-input.fe { border-color: rgba(255,80,80,.45); }
        .cp-em { font-size: 11px; color: #ff6b6b; }

        /* ── BUTTON ── */
        .cp-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #7c6fff 0%, #4a43cc 100%);
          color: #fff; font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700; letter-spacing: .04em;
          border: none; border-radius: 10px; cursor: pointer;
          margin-top: 4px;
          transition: transform .15s, box-shadow .15s, opacity .15s;
          box-shadow: 0 6px 20px rgba(124,111,255,.38);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          -webkit-tap-highlight-color: transparent;
        }
        .cp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(124,111,255,.52); }
        .cp-btn:active:not(:disabled) { transform: translateY(0); }
        .cp-btn:disabled { opacity: .65; cursor: not-allowed; }
        .cp-spin { width:15px; height:15px; border:2px solid rgba(255,255,255,.28); border-top-color:#fff; border-radius:50%; animation:cp-s .7s linear infinite; }
        @keyframes cp-s { to { transform:rotate(360deg); } }
        .cp-serr { background:rgba(255,80,80,.09); border:1px solid rgba(255,80,80,.28); border-radius:8px; color:#ff6b6b; font-size:12px; padding:8px 12px; margin-top:6px; text-align:center; }

        /* ── DIVIDER ── */
        .cp-div {
          display: flex; align-items: center; gap: 10px;
          margin: 14px 0 12px;
          color: rgba(255,255,255,.18); font-size: 9.5px; letter-spacing:.1em; text-transform:uppercase;
        }
        .cp-div::before,.cp-div::after { content:''; flex:1; height:1px; background:rgba(255,255,255,.07); }

        /* ── CHIPS ── */
        .cp-chips { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        @media(max-width:360px){ .cp-chips { grid-template-columns:1fr; } }

        .cp-chip {
          display: flex; align-items: center; gap: 9px;
          background: rgba(0,212,170,.06); border: 1px solid rgba(0,212,170,.18);
          border-radius: 10px; padding: 10px 12px;
          text-decoration: none; transition: background .2s, border-color .2s;
          -webkit-tap-highlight-color: transparent; min-width: 0;
        }
        .cp-chip:hover { background: rgba(0,212,170,.11); border-color: rgba(0,212,170,.38); }
        .cp-cico {
          width: 28px; height: 28px; background: rgba(0,212,170,.13); border-radius: 7px;
          display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;
        }
        .cp-clbl { font-size: 9px; text-transform:uppercase; letter-spacing:.07em; color:rgba(255,255,255,.3); margin-bottom:1px; }
        .cp-cval { font-size: 11px; color:#00d4aa; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

        /* ── SUCCESS ── */
        .cp-ok {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; flex: 1;
          animation: cp-rise .5s cubic-bezier(.16,1,.3,1) both;
          gap: 0;
        }
        .cp-ok-ico {
          width: 64px; height: 64px;
          background: linear-gradient(135deg,rgba(0,212,170,.18),rgba(124,111,255,.18));
          border: 1px solid rgba(0,212,170,.3); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; margin-bottom: 18px;
        }
        .cp-ok-t { font-family:'Syne',sans-serif; font-size:24px; font-weight:800; color:#fff; margin-bottom:8px; }
        .cp-ok-p { color:rgba(255,255,255,.4); font-size:13.5px; line-height:1.65; margin-bottom:22px; }
        .cp-ok-p strong { color:#00d4aa; }

        /* ── MOBILE adjustments ── */
        @media (max-width: 480px) {
          .cp-card { padding: 22px 20px; border-radius: 18px; }
          .cp-h1 { font-size: 28px; }
        }
      `}</style>

      <div className="cp-page">
        <div className="cp-orb cp-o1" />
        <div className="cp-orb cp-o2" />
        <div className="cp-orb cp-o3" />

        <div className="cp-card">
          {submitted ? (
            /* ════ SUCCESS ════ */
            <div className="cp-ok">
              <div className="cp-ok-ico">✓</div>
              <div className="cp-ok-t">Message Received!</div>
              <p className="cp-ok-p">
                Thanks, <strong>{formData.name}</strong>! Our team will review
                your details and get in touch shortly.
              </p>
              <div className="cp-chips" style={{ width: "100%" }}>
                <a href="mailto:irahtech69@gmail.com" className="cp-chip">
                  <div className="cp-cico">✉</div>
                  <div style={{ minWidth: 0 }}>
                    <div className="cp-clbl">Email</div>
                    <div className="cp-cval">irahtech69@gmail.com</div>
                  </div>
                </a>
                <a href="tel:+919014497622" className="cp-chip">
                  <div className="cp-cico">📞</div>
                  <div style={{ minWidth: 0 }}>
                    <div className="cp-clbl">Phone</div>
                    <div className="cp-cval">+91 90144 97622</div>
                  </div>
                </a>
              </div>
            </div>
          ) : (
            /* ════ FORM ════ */
            <>
              {/* Badge */}
              <div className="cp-badge">
                <span className="cp-dot" />
                Get in Touch
              </div>

              {/* Heading */}
              <h1 className="cp-h1">Let&apos;s <span>Talk</span></h1>
              <p className="cp-sub">
                Fill in your details and our team will reach out to you as soon as possible.
              </p>

              {/* Form */}
              <form className="cp-form" onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="cp-g">
                  <label className="cp-lbl" htmlFor="name">Full Name</label>
                  <div className="cp-iw">
                    <span className="cp-ico">👤</span>
                    <input
                      id="name" name="name" type="text"
                      className={`cp-input${errors.name ? " fe" : ""}`}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                  </div>
                  {errors.name && <p className="cp-em">{errors.name}</p>}
                </div>

                {/* Mobile */}
                <div className="cp-g">
                  <label className="cp-lbl" htmlFor="mobile">Mobile Number</label>
                  <div className="cp-iw">
                    <span className="cp-ico">📱</span>
                    <input
                      id="mobile" name="mobile" type="tel"
                      className={`cp-input${errors.mobile ? " fe" : ""}`}
                      placeholder="+91 98765 43210"
                      value={formData.mobile}
                      onChange={handleChange}
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>
                  {errors.mobile && <p className="cp-em">{errors.mobile}</p>}
                </div>

                {/* Email */}
                <div className="cp-g">
                  <label className="cp-lbl" htmlFor="email">Email Address</label>
                  <div className="cp-iw">
                    <span className="cp-ico">✉</span>
                    <input
                      id="email" name="email" type="email"
                      className={`cp-input${errors.email ? " fe" : ""}`}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      inputMode="email"
                    />
                  </div>
                  {errors.email && <p className="cp-em">{errors.email}</p>}
                </div>

                {/* Submit */}
                <button type="submit" className="cp-btn" disabled={loading}>
                  {loading
                    ? <><div className="cp-spin" />Sending...</>
                    : "Send Message →"}
                </button>

                {submitError && <div className="cp-serr">{submitError}</div>}
              </form>

              {/* Divider + chips */}
              <div className="cp-div">or reach us directly</div>
              <div className="cp-chips">
                <a href="mailto:irahtech69@gmail.com" className="cp-chip">
                  <div className="cp-cico">✉</div>
                  <div style={{ minWidth: 0 }}>
                    <div className="cp-clbl">Email</div>
                    <div className="cp-cval">irahtech69@gmail.com</div>
                  </div>
                </a>
                <a href="tel:+919014497622" className="cp-chip">
                  <div className="cp-cico">📞</div>
                  <div style={{ minWidth: 0 }}>
                    <div className="cp-clbl">Phone</div>
                    <div className="cp-cval">+91 90144 97622</div>
                  </div>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}