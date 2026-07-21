"use client";

import { GrainGradient } from "@paper-design/shaders-react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

// 👉 Replace this with your actual Google Apps Script Web App URL.
// (Deploy a script bound to your Google Sheet as a Web App, "Anyone" can access,
// and it should accept POST requests and append a row with the JSON body.)
const GOOGLE_SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxyV-7TJsnXVJ7KvaMf-DakMj6z_OFFYAXPEKnScJPnNrNgCtVci1JkEtilCygDJCUWvg/exec";



export default function AuthSectionOne() {
  const [showTerms, setShowTerms] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    subscribe: false,
    agreeTerms: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field: keyof typeof formData, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setErrorMessage("");

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all fields before submitting.");
      return;
    }
    if (!formData.agreeTerms) {
      setStatus("error");
      setErrorMessage("Please agree to the Terms & Conditions to continue.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(GOOGLE_SHEET_ENDPOINT, {
        method: "POST",
        // Apps Script web apps generally need this to avoid CORS preflight issues
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message,
          subscribe: formData.subscribe,
          agreeTerms: formData.agreeTerms,
          submittedAt: new Date().toISOString(),
        }),
      });

      // Apps Script web apps often respond with opaque/no-cors responses depending on
      // deployment settings, so we treat a resolved fetch as success unless it explicitly errors.
      if (!response.ok && response.status !== 0) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        subscribe: false,
        agreeTerms: false,
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section className="min-h-screen bg-white p-3 text-black antialiased [font-synthesis:none] dark:bg-[#050505] dark:text-white">
      <div className="grid min-h-[calc(100vh-1.5rem)] gap-6 lg:grid-cols-[0.94fr_1.06fr]">
        <div className="flex min-h-[760px] items-start rounded-md border border-black/20 bg-white px-6 py-12 sm:px-10 dark:border-white/10 dark:bg-[#0a0a0a] lg:min-h-0 lg:px-14 lg:py-28 xl:px-20">
          <div className="mx-auto w-full max-w-[590px]">
            <div>
              <h1 className="whitespace-nowrap text-3xl font-[Cinzel] tracking-[-0.04em] sm:text-4xl lg:text-[42px] lg:leading-[1.05] xl:text-[50px]">
                Contact Us
              </h1>
              <p className="font-[Cinzel] mt-3 text-lg leading-snug text-black/60 dark:text-white/55 sm:text-xl lg:text-2xl xl:text-3xl">
                Let's transform your ideas into exceptional digital experiences.
              </p>
            </div>

            <div className="my-10 text-center text-xl font-[Cinzel] text-black/60 dark:text-white/50"></div>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FieldBox
                  label="First Name"
                  value={formData.firstName}
                  onChange={(v) => updateField("firstName", v)}
                />
                <FieldBox
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(v) => updateField("lastName", v)}
                />
              </div>

              <FieldBox
                label="Email"
                value={formData.email}
                type="email"
                onChange={(v) => updateField("email", v)}
              />
              <FieldBox
                label="Message"
                value={formData.message}
                type="textarea"
                onChange={(v) => updateField("message", v)}
              />

              <div className="space-y-4 pt-2 text-sm leading-5 text-black/40 dark:text-white/40 sm:text-[15px]">
                <CheckboxLine
                  checked={formData.subscribe}
                  onChange={(v) => updateField("subscribe", v)}
                >
                  I agree to receive project updates, service announcements, offers, and
                  important communication via email.
                </CheckboxLine>

                <CheckboxLine
                  checked={formData.agreeTerms}
                  onChange={(v) => updateField("agreeTerms", v)}
                >
                  <>
                    I have read and agree to the{" "}
                    <button
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="font-[Cinzel] underline underline-offset-4 transition hover:opacity-70"
                    >
                      Terms & Conditions
                    </button>
                    .
                  </>
                </CheckboxLine>
              </div>

              {status === "error" && errorMessage && (
                <p className="text-sm font-[Cinzel] text-red-500">{errorMessage}</p>
              )}
              {status === "success" && (
                <p className="text-sm font-[Cinzel] text-emerald-500">
                  Thanks — your message has been sent.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-9 flex h-12 w-full items-center justify-center rounded-[10px] border border-black/40 bg-black text-xl font-[Cinzel] text-white transition-colors hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/40 dark:bg-white dark:text-black dark:hover:bg-white/85"
              >
                {status === "submitting" ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>

        <div className="relative flex min-h-[720px] overflow-hidden rounded-md bg-black p-8 text-white sm:p-12 lg:min-h-0">
          <GrainGradient
            speed={1}
            scale={1}
            rotation={0}
            offsetX={0}
            offsetY={0}
            softness={0.5}
            intensity={0.5}
            noise={0.25}
            shape="corners"
            colors={["#FFFFFF", "#2F5D50", "#1E4035", "#FFFFFF"]}
            frame={2854.5}
            colorBack="#00000000"
            className="absolute inset-0 bg-black"
          />

          <div className="relative z-10 flex h-full w-full flex-col justify-between">
            <h2 className="max-w-[620px] pt-0 text-5xl font-[Cinzel] tracking-[-0.05em] text-white sm:text-6xl lg:pt-16 lg:text-[64px] lg:leading-[0.98] xl:text-[70px]">
              Think fast,
              <br />
              Build faster
            </h2>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showTerms && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTerms(false)}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed left-1/2 top-1/2 z-[101] w-[92%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-[#0d0d0d] p-8 text-white shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-[Cinzel] text-3xl">Terms & Conditions</h2>

                <button
                  onClick={() => setShowTerms(false)}
                  className="text-2xl opacity-70 transition hover:opacity-100"
                >
                  ×
                </button>
              </div>

              <div className="max-h-[65vh] space-y-5 overflow-y-auto pr-3 text-sm leading-7 text-white/75">
                <p>
                  By submitting this form, you acknowledge that the information you
                  provide is accurate and intended solely for communication regarding
                  your project or inquiry.
                </p>

                <ul className="list-disc space-y-4 pl-5">
                  <li>
                    All quotations, timelines, and project estimates are subject to
                    review and mutual agreement before work begins.
                  </li>

                  <li>
                    Project commencement requires confirmation of scope and any
                    agreed advance payment.
                  </li>

                  <li>
                    Clients are responsible for providing accurate content, branding
                    assets, credentials, and feedback required for project completion.
                  </li>

                  <li>
                    Delays caused by missing content, approvals, or communication may
                    extend the delivery schedule.
                  </li>

                  <li>
                    Once the project is approved and delivered, responsibility for
                    website content updates, hosting configuration, domain management,
                    third-party services, or unauthorized modifications transfers to
                    the client unless a maintenance agreement has been signed.
                  </li>

                  <li>
                    IRAH TECH is not responsible for interruptions caused by third-
                    party hosting providers, domain registrars, payment gateways,
                    external APIs, or other services outside our direct control.
                  </li>

                  <li>
                    Any requested features beyond the agreed project scope may require
                    additional development time and cost.
                  </li>

                  <li>
                    All intellectual property rights for the delivered project are
                    transferred according to the agreed contract and after all
                    outstanding payments have been completed.
                  </li>

                  <li>
                    <strong>Limitation of Liability:</strong> After the project has
                    been successfully delivered and accepted, IRAH TECH shall not be
                    held liable for any direct, indirect, incidental, financial,
                    operational, business, or property loss arising from client
                    actions, third-party services, security breaches caused by
                    unauthorized modifications, payment issues, hosting failures, or
                    misuse of the delivered website or application.
                  </li>

                  <li>
                    Clients are encouraged to maintain regular backups, strong
                    security practices, and active maintenance to ensure the ongoing
                    stability of their website.
                  </li>
                </ul>

                <p>
                  Continued communication with IRAH TECH indicates acceptance of these
                  terms unless otherwise agreed in a written service contract.
                </p>
              </div>

              <button
                onClick={() => setShowTerms(false)}
                className="mt-8 w-full rounded-lg bg-white py-3 font-[Cinzel] text-black transition hover:opacity-90"
              >
                I Understand
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function FieldBox({
  label,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const commonProps = {
    "aria-label": label,
    value,
    onFocus: () => setIsEditing(true),
    onBlur: () => setIsEditing(value.length > 0),
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => onChange(event.target.value),
    className:
      "min-w-0 flex-1 truncate bg-transparent text-black outline-none placeholder:text-black/30 dark:text-white dark:placeholder:text-white/35",
  };

  if (type === "textarea") {
    return (
      <label className="flex min-h-14 items-start justify-between gap-4 rounded-[10px] border border-black/25 bg-white px-5 py-4 text-lg leading-snug dark:border-white/15 dark:bg-white/5 xl:text-xl">
        <textarea
          {...commonProps}
          rows={3}
          placeholder={isEditing ? "" : label}
          className={commonProps.className + " resize-none"}
        />
      </label>
    );
  }

  return (
    <label className="flex h-14 items-center justify-between gap-4 rounded-[10px] border border-black/25 bg-white px-5 text-lg leading-none dark:border-white/15 dark:bg-white/5 xl:text-xl">
      <input type={type} {...commonProps} placeholder={isEditing ? "" : label} />
    </label>
  );
}

function CheckboxLine({
  children,
  checked,
  onChange,
}: {
  children: ReactNode;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3">
      <span className="relative mt-1 size-3.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer size-full appearance-none rounded-[2px] border border-black/25 bg-white checked:border-black checked:bg-black dark:border-white/30 dark:bg-white/5 dark:checked:border-white dark:checked:bg-white"
        />
        <svg
          viewBox="0 0 12 12"
          className="pointer-events-none absolute inset-0 hidden size-full p-0.5 text-white peer-checked:block dark:text-black"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 6.2 5 8.1 9 3.9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{children}</span>
    </label>
  );
}