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

type CountryCode = (typeof COUNTRIES)[number]["code"];

interface ApplicationFormState {
  full_name: string;
  email: string;
  phone_number: string;
  discord_username: string;
  discord_joined: boolean;
  country: CountryCode;
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
  portfolio_link: "",
  consent_accepted: false,
};

const inputClassName =
  "w-full rounded-lg border border-slate-700 bg-slate-900/90 p-3 text-sm text-white placeholder-slate-400 outline-none transition duration-200 focus:border-transparent focus:ring-2 focus:ring-sky-400 disabled:cursor-not-allowed disabled:opacity-60";

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
    if (!form.country) return "Please select a country.";
    if (!form.discord_username.trim()) {
      return "Discord username is required (e.g. @username or username#0000).";
    }
    if (!form.discord_joined) {
      return "You must confirm that you have joined the official OceanSource AI Discord server.";
    }
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
        className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-sky-800 bg-sky-950/60 text-sky-300">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2
            id="application-success-heading"
            className="text-xl font-semibold tracking-tight text-white"
          >
            Application received
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            {status.message}
          </p>
          <button
            type="button"
            onClick={() => setStatus({ type: "idle" })}
            className="mt-6 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 outline-none transition hover:border-slate-500 hover:text-white focus:ring-2 focus:ring-sky-400"
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
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl"
    >
      <header className="mb-6">
        <h2
          id="application-form-heading"
          className="text-xl font-semibold tracking-tight text-white"
        >
          Creator Application
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Join Discord, share your details, and submit a sample video link to
          apply at the $55 per accepted video rate.
        </p>
      </header>

      {status.type === "error" && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-5 rounded-xl border border-red-800/80 bg-red-950/50 px-4 py-3 text-sm text-red-200"
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label
            htmlFor="full_name"
            className="mb-1.5 block text-sm font-medium text-slate-200"
          >
            Full Name <span className="text-sky-400">*</span>
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
            className="mb-1.5 block text-sm font-medium text-slate-200"
          >
            Email Address <span className="text-sky-400">*</span>
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
            className="mb-1.5 block text-sm font-medium text-slate-200"
          >
            Phone Number <span className="text-sky-400">*</span>
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
            htmlFor="country"
            className="mb-1.5 block text-sm font-medium text-slate-200"
          >
            Country <span className="text-sky-400">*</span>
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

        <aside
          aria-labelledby="discord-mandatory-heading"
          className="rounded-xl border border-sky-800/80 bg-sky-950/60 p-5"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-sky-800 bg-slate-950 text-sky-300">
              <MessagesSquare className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h3
                id="discord-mandatory-heading"
                className="text-sm font-semibold text-white"
              >
                Mandatory Step: Join Our Official Discord Server
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                All creator onboarding, weekly briefing updates, support, and
                payout announcements are conducted exclusively inside our Discord
                community.
              </p>
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white outline-none transition duration-200 hover:bg-indigo-500 focus:ring-2 focus:ring-sky-400"
              >
                Join OceanSource AI Discord
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </aside>

        <div>
          <label
            htmlFor="discord_username"
            className="mb-1.5 block text-sm font-medium text-slate-200"
          >
            Discord Username <span className="text-sky-400">*</span>
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
            className={inputClassName}
            placeholder="@username or username#0000"
          />
          <p id={discordHelpId} className="mt-1.5 text-xs leading-5 text-slate-400">
            Enter your active Discord username exactly as it appears in the
            OceanSource AI server.
          </p>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-950/50 p-3">
          <input
            id={discordJoinedId}
            name="discord_joined"
            type="checkbox"
            required
            aria-required="true"
            disabled={isLoading}
            checked={form.discord_joined}
            onChange={(e) => updateField("discord_joined", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-500 outline-none focus:ring-2 focus:ring-sky-400"
          />
          <label
            htmlFor={discordJoinedId}
            className="text-sm leading-6 text-slate-200"
          >
            I confirm that I have joined the official OceanSource AI Discord
            server and provided my active Discord username.
          </label>
        </div>

        <div>
          <label
            htmlFor="portfolio_link"
            className="mb-1.5 block text-sm font-medium text-slate-200"
          >
            Sample / Portfolio Video Link{" "}
            <span className="text-sky-400">*</span>
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
            className="mt-1.5 text-xs leading-5 text-slate-400"
          >
            Share a Drive, TikTok, YouTube, or portfolio link to your sample
            footage.
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
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
              className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-500 outline-none focus:ring-2 focus:ring-sky-400"
            />
            <label htmlFor={consentId} className="text-sm leading-6 text-slate-200">
              I confirm that I own all rights to this footage and agree to the
              dataset terms.
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-lg bg-sky-500 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/20 outline-none transition-all hover:bg-sky-400 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
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
