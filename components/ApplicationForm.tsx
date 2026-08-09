'use client';

import { FormEvent, useId, useState } from "react";
import { supabase } from "@/lib/supabase";

const COUNTRIES = [
  { code: "US", label: "United States" },
  { code: "CA", label: "Canada" },
  { code: "GB", label: "United Kingdom" },
  { code: "AU", label: "Australia" },
  { code: "DE", label: "Germany" },
] as const;

const VIDEO_CATEGORIES = [
  "Direct-to-Camera / Conversational",
  "Object Interaction & Manipulation",
  "Spatial & Environmental Navigation",
  "Multi-Subject Interaction",
  "Instructional / Task-Based",
] as const;

type CountryCode = (typeof COUNTRIES)[number]["code"];
type VideoCategory = (typeof VIDEO_CATEGORIES)[number];

interface ApplicationFormState {
  full_name: string;
  email: string;
  phone_number: string;
  discord_username: string;
  country: CountryCode;
  portfolio_link: string;
  primary_video_category: VideoCategory | "";
  consent_accepted: boolean;
}

interface ApplicationInsertPayload {
  full_name: string;
  email: string;
  phone_number: string;
  discord_username: string;
  country: CountryCode;
  portfolio_link: string | null;
  primary_video_category: VideoCategory;
  consent_accepted: boolean;
}

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const INITIAL_FORM: ApplicationFormState = {
  full_name: "",
  email: "",
  phone_number: "",
  discord_username: "",
  country: "US",
  portfolio_link: "",
  primary_video_category: "",
  consent_accepted: false,
};

const inputClassName =
  "w-full rounded-xl border border-sky-100 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition duration-200 focus:border-transparent focus:ring-2 focus:ring-sky-400 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default function ApplicationForm() {
  const formId = useId();
  const [form, setForm] = useState<ApplicationFormState>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  function updateField<K extends keyof ApplicationFormState>(
    key: K,
    value: ApplicationFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): string | null {
    if (!form.full_name.trim()) return "Full name is required.";
    if (!form.email.trim()) return "Email address is required.";
    if (!isValidEmail(form.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!form.phone_number.trim()) return "Phone number is required.";
    if (!form.discord_username.trim()) return "Discord username is required.";
    if (!form.country) return "Please select a country.";
    if (!form.primary_video_category) {
      return "Please select a primary video category.";
    }
    if (form.portfolio_link.trim() && !isValidUrl(form.portfolio_link.trim())) {
      return "Please enter a valid portfolio URL (including https://).";
    }
    if (!form.consent_accepted) {
      return "You must agree to the Terms & Data Usage Policy to continue.";
    }
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validate();
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    setStatus({ type: "loading" });

    const payload: ApplicationInsertPayload = {
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone_number: form.phone_number.trim(),
      discord_username: form.discord_username.trim(),
      country: form.country,
      portfolio_link: form.portfolio_link.trim() || null,
      primary_video_category: form.primary_video_category as VideoCategory,
      consent_accepted: true,
    };

    const { error } = await supabase.from("oceansourceai-ugc").insert([payload]);

    if (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
      return;
    }

    setForm(INITIAL_FORM);
    setStatus({
      type: "success",
      message:
        "Application received. Our team will review your profile and follow up within 24–48 hours.",
    });
  }

  const isLoading = status.type === "loading";
  const consentId = `${formId}-consent`;

  if (status.type === "success") {
    return (
      <section
        aria-labelledby="application-success-heading"
        className="rounded-2xl border border-sky-100 bg-white/80 p-8 shadow-xl shadow-sky-100/50 backdrop-blur-md"
      >
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-600"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2
            id="application-success-heading"
            className="text-xl font-semibold tracking-tight text-slate-900"
          >
            Application submitted
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            {status.message}
          </p>
          <button
            type="button"
            onClick={() => setStatus({ type: "idle" })}
            className="mt-6 rounded-xl border border-sky-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition hover:border-sky-300 hover:text-slate-900 focus:ring-2 focus:ring-sky-400"
          >
            Submit another application
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="application-form-heading"
      className="rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-xl shadow-sky-100/50 backdrop-blur-md sm:p-8"
    >
      <header className="mb-7">
        <h2
          id="application-form-heading"
          className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
        >
          Creator Application
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Apply to contribute raw footage for multimodal AI training at the $55
          per approved video rate.
        </p>
      </header>

      {status.type === "error" && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="full_name"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Full Name <span className="text-sky-600">*</span>
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            disabled={isLoading}
            value={form.full_name}
            onChange={(e) => updateField("full_name", e.target.value)}
            className={inputClassName}
            placeholder="Jane Creator"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Email Address <span className="text-sky-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            disabled={isLoading}
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputClassName}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone_number"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Phone Number <span className="text-sky-600">*</span>
          </label>
          <input
            id="phone_number"
            name="phone_number"
            type="tel"
            autoComplete="tel"
            required
            aria-required="true"
            disabled={isLoading}
            value={form.phone_number}
            onChange={(e) => updateField("phone_number", e.target.value)}
            className={inputClassName}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label
            htmlFor="discord_username"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Discord Username <span className="text-sky-600">*</span>
          </label>
          <input
            id="discord_username"
            name="discord_username"
            type="text"
            required
            aria-required="true"
            disabled={isLoading}
            value={form.discord_username}
            onChange={(e) => updateField("discord_username", e.target.value)}
            className={inputClassName}
            placeholder="username"
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Country <span className="text-sky-600">*</span>
          </label>
          <select
            id="country"
            name="country"
            required
            aria-required="true"
            disabled={isLoading}
            value={form.country}
            onChange={(e) =>
              updateField("country", e.target.value as CountryCode)
            }
            className={inputClassName}
          >
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="portfolio_link"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Portfolio / Sample Work Link{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="portfolio_link"
            name="portfolio_link"
            type="url"
            disabled={isLoading}
            value={form.portfolio_link}
            onChange={(e) => updateField("portfolio_link", e.target.value)}
            className={inputClassName}
            placeholder="https://tiktok.com/@you or Drive / YouTube link"
            aria-describedby="portfolio-help"
          />
          <p id="portfolio-help" className="mt-1.5 text-xs leading-5 text-slate-500">
            Link your TikTok, Instagram, Google Drive, YouTube, or portfolio site
          </p>
        </div>

        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium text-slate-800">
            Primary Video Category <span className="text-sky-600">*</span>
          </legend>
          <label htmlFor="primary_video_category" className="sr-only">
            Primary Video Category
          </label>
          <select
            id="primary_video_category"
            name="primary_video_category"
            required
            aria-required="true"
            disabled={isLoading}
            value={form.primary_video_category}
            onChange={(e) =>
              updateField(
                "primary_video_category",
                e.target.value as VideoCategory | ""
              )
            }
            className={inputClassName}
          >
            <option value="" disabled>
              Select a category…
            </option>
            {VIDEO_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </fieldset>

        <aside
          className="rounded-xl border border-sky-200/60 bg-sky-50/70 p-5 text-sm text-slate-700"
          aria-labelledby="data-usage-heading"
        >
          <h3
            id="data-usage-heading"
            className="text-sm font-semibold text-slate-900"
          >
            Data usage & privacy
          </h3>
          <p className="mt-2 leading-6">
            Video and audio submissions are processed strictly for:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-6">
            <li>Training facial movement and expression tracking models.</li>
            <li>
              Multimodal audio/visual synchronization and speech alignment.
            </li>
            <li>
              Spatial mapping and real-world physical environment reasoning.
            </li>
          </ul>
          <p className="mt-3 leading-6">
            Your data is{" "}
            <strong className="font-semibold text-slate-900">
              strictly confidential
            </strong>
            :
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-6">
            <li>Used 100% internally for AI training.</li>
            <li>NEVER published on social media or public platforms.</li>
            <li>
              NEVER used for marketing, ad campaigns, or commercial promotion.
            </li>
            <li>NEVER sold to data brokers or third-party advertisers.</li>
          </ul>

          <div className="mt-4 flex items-start gap-3">
            <input
              id={consentId}
              name="consent_accepted"
              type="checkbox"
              required
              aria-required="true"
              disabled={isLoading}
              checked={form.consent_accepted}
              onChange={(e) => updateField("consent_accepted", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-sky-300 text-sky-600 outline-none focus:ring-2 focus:ring-sky-400"
            />
            <label htmlFor={consentId} className="text-sm leading-6 text-slate-700">
              I understand how my video data is processed for AI training and
              agree to the OceanSource AI Terms &amp; Data Usage Policy.
            </label>
          </div>
        </aside>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-sm font-medium text-white shadow-md shadow-sky-600/20 outline-none transition duration-200 hover:bg-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                aria-hidden="true"
              />
              Submitting…
            </span>
          ) : (
            "Submit Creator Application ($55/Video Rate)"
          )}
        </button>
      </form>
    </section>
  );
}
