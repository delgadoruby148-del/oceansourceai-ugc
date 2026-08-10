'use client';

import { FormEvent, useId, useState } from "react";
import { CheckCircle2, ExternalLink, Loader2, MessagesSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";

const DISCORD_INVITE_URL =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || "https://discord.gg/";

const COUNTRIES = [
  { code: "US", label: "United States" },
  { code: "CA", label: "Canada" },
  { code: "GB", label: "United Kingdom" },
  { code: "AU", label: "Australia" },
  { code: "DE", label: "Germany" },
] as const;

const VIDEO_CATEGORIES = [
  "Unboxing / Product Demonstration",
  "Direct-to-Camera / Vlog",
  "Instructional / Step-by-Step Guide",
  "Pet or Animal Interaction",
  "Navigation / Walking Through a Space",
] as const;

type CountryCode = (typeof COUNTRIES)[number]["code"];
type VideoCategory = (typeof VIDEO_CATEGORIES)[number];

interface ApplicationFormState {
  full_name: string;
  email: string;
  phone_number: string;
  discord_username: string;
  discord_joined: boolean;
  country: CountryCode;
  video_category: VideoCategory | "";
  portfolio_link: string;
  consent_accepted: boolean;
}

/** Matches existing Supabase table columns only. */
interface ApplicationInsertPayload {
  email: string;
  phone_number: string;
  discord_username: string;
  country: string;
  portfolio_link: string | null;
  status: string;
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
  discord_joined: false,
  country: "US",
  video_category: "",
  portfolio_link: "",
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
    if (!form.discord_username.trim()) {
      return "Discord username is required (e.g. @username or username#0000).";
    }
    if (!form.discord_joined) {
      return "You must confirm that you have joined the official OceanSource AI Discord server.";
    }
    if (!form.country) return "Please select a country.";
    if (!form.video_category) return "Please select a video category.";
    if (!form.portfolio_link.trim()) {
      return "Please provide a portfolio or sample video link.";
    }
    if (!isValidUrl(form.portfolio_link.trim())) {
      return "Please enter a valid URL (including https://).";
    }
    if (!form.consent_accepted) {
      return "You must confirm ownership and consent before submitting.";
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

    // Insert only existing table columns to avoid schema changes.
    // Full name, video category, and consent are collected/validated in the UI.
    const payload: ApplicationInsertPayload = {
      email: form.email.trim(),
      phone_number: form.phone_number.trim(),
      discord_username: form.discord_username.trim(),
      country: form.country,
      portfolio_link: form.portfolio_link.trim(),
      status: "pending",
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
        "Application submitted successfully. Our team will review your submission and follow up soon.",
    });
  }

  const isLoading = status.type === "loading";
  const consentId = `${formId}-consent`;
  const discordJoinedId = `${formId}-discord-joined`;
  const discordHelpId = `${formId}-discord-help`;

  if (status.type === "success") {
    return (
      <section
        id="application-form"
        aria-labelledby="application-success-heading"
        className="scroll-mt-24 rounded-2xl border border-sky-100 bg-white/90 p-6 shadow-xl shadow-sky-100/40 backdrop-blur-md sm:p-8"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-600">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2
            id="application-success-heading"
            className="text-xl font-semibold tracking-tight text-slate-900"
          >
            Application received
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
      id="application-form"
      aria-labelledby="application-form-heading"
      className="scroll-mt-24 rounded-2xl border border-sky-100 bg-white/90 p-6 shadow-xl shadow-sky-100/40 backdrop-blur-md sm:p-8"
    >
      <header className="mb-7">
        <h2
          id="application-form-heading"
          className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
        >
          Application &amp; Submission
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Apply to the OceanSource AI UGC project and share a sample of your
          pre-recorded footage for the $55 per accepted video rate.
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
        <aside
          aria-labelledby="discord-mandatory-heading"
          className="rounded-2xl border border-sky-200 bg-sky-50/80 p-5 shadow-sm shadow-sky-100/40"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-white text-sky-600">
              <MessagesSquare className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h3
                id="discord-mandatory-heading"
                className="text-sm font-semibold text-slate-900 sm:text-base"
              >
                Mandatory Step: Join Our Official Discord Server
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                All creator onboarding, weekly briefing updates, support, and
                payout announcements are conducted exclusively inside our Discord
                community.
              </p>
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-sky-600/20 outline-none transition duration-200 hover:bg-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 sm:w-auto"
              >
                Join OceanSource AI Discord
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </aside>

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

        <fieldset className="rounded-2xl border border-sky-100 bg-white/70 p-4 sm:p-5">
          <legend className="px-1 text-sm font-semibold text-slate-900">
            Discord Username <span className="text-sky-600">*</span>
          </legend>
          <label htmlFor="discord_username" className="sr-only">
            Discord Username
          </label>
          <input
            id="discord_username"
            name="discord_username"
            type="text"
            required
            aria-required="true"
            aria-describedby={discordHelpId}
            disabled={isLoading}
            value={form.discord_username}
            onChange={(e) => updateField("discord_username", e.target.value)}
            className={`${inputClassName} mt-2`}
            placeholder="@username or username#0000"
          />
          <p id={discordHelpId} className="mt-1.5 text-xs leading-5 text-slate-500">
            Enter your active Discord username exactly as it appears in the
            OceanSource AI server.
          </p>

          <div className="mt-4 flex items-start gap-3 rounded-xl border border-sky-200/70 bg-sky-50/70 p-3">
            <input
              id={discordJoinedId}
              name="discord_joined"
              type="checkbox"
              required
              aria-required="true"
              disabled={isLoading}
              checked={form.discord_joined}
              onChange={(e) => updateField("discord_joined", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-sky-300 text-sky-600 outline-none focus:ring-2 focus:ring-sky-400"
            />
            <label
              htmlFor={discordJoinedId}
              className="text-sm leading-6 text-slate-700"
            >
              I confirm that I have joined the official OceanSource AI Discord
              server and provided my active Discord username.
            </label>
          </div>
        </fieldset>

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
            htmlFor="video_category"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Video Category <span className="text-sky-600">*</span>
          </label>
          <select
            id="video_category"
            name="video_category"
            required
            aria-required="true"
            disabled={isLoading}
            value={form.video_category}
            onChange={(e) =>
              updateField(
                "video_category",
                e.target.value as VideoCategory | ""
              )
            }
            className={inputClassName}
          >
            <option value="" disabled>
              Select a category...
            </option>
            {VIDEO_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="portfolio_link"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Portfolio / Sample Video Link{" "}
            <span className="text-sky-600">*</span>
          </label>
          <input
            id="portfolio_link"
            name="portfolio_link"
            type="url"
            required
            aria-required="true"
            disabled={isLoading}
            value={form.portfolio_link}
            onChange={(e) => updateField("portfolio_link", e.target.value)}
            className={inputClassName}
            placeholder="https://drive.google.com/... or TikTok / YouTube link"
            aria-describedby={`${formId}-portfolio-help`}
          />
          <p
            id={`${formId}-portfolio-help`}
            className="mt-1.5 text-xs leading-5 text-slate-500"
          >
            Share a Drive, TikTok, YouTube, or portfolio link to your sample
            footage.
          </p>
        </div>

        <div className="rounded-xl border border-sky-200/70 bg-sky-50/70 p-4">
          <div className="flex items-start gap-3">
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
              I confirm that I own all rights to this footage and agree to the
              dataset terms.
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-sky-600/20 outline-none transition duration-200 hover:bg-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Submitting...
            </span>
          ) : (
            "Submit Application ($55/Video Rate)"
          )}
        </button>
      </form>
    </section>
  );
}
