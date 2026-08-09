'use client';

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

const COUNTRIES = [
  { code: "US", label: "United States" },
  { code: "CA", label: "Canada" },
  { code: "GB", label: "United Kingdom" },
  { code: "AU", label: "Australia" },
  { code: "DE", label: "Germany" },
] as const;

type CountryCode = (typeof COUNTRIES)[number]["code"];

type FormState = {
  email: string;
  phone_number: string;
  discord_username: string;
  country: CountryCode;
  portfolio_link: string;
};

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const INITIAL_FORM: FormState = {
  email: "",
  phone_number: "",
  discord_username: "",
  country: "US",
  portfolio_link: "",
};

const inputClassName =
  "w-full rounded-xl border border-zinc-700 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition duration-200 focus:border-transparent focus:ring-2 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-60";

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
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): string | null {
    if (!form.email.trim()) return "Email is required.";
    if (!isValidEmail(form.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!form.phone_number.trim()) return "Phone number is required.";
    if (!form.discord_username.trim()) return "Discord username is required.";
    if (!form.country) return "Please select a country.";
    if (form.portfolio_link.trim() && !isValidUrl(form.portfolio_link.trim())) {
      return "Please enter a valid portfolio URL (including https://).";
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

    const payload = {
      email: form.email.trim(),
      phone_number: form.phone_number.trim(),
      discord_username: form.discord_username.trim(),
      country: form.country,
      portfolio_link: form.portfolio_link.trim() || null,
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
        "Application submitted successfully. Our talent team will review your profile within 24–48 hours.",
    });
  }

  const isLoading = status.type === "loading";

  if (status.type === "success") {
    return (
      <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-xl shadow-black/20 transition">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 text-zinc-200">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            You&apos;re in the queue
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
            {status.message}
          </p>
          <button
            type="button"
            onClick={() => setStatus({ type: "idle" })}
            className="mt-6 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/20 sm:p-8">
      <div className="mb-7">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Creator Application
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Tell us how to reach you and where we can review your work.
        </p>
      </div>

      {status.type === "error" && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-zinc-200"
          >
            Email <span className="text-zinc-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
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
            className="mb-1.5 block text-sm font-medium text-zinc-200"
          >
            Phone Number <span className="text-zinc-500">*</span>
          </label>
          <input
            id="phone_number"
            type="tel"
            autoComplete="tel"
            required
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
            className="mb-1.5 block text-sm font-medium text-zinc-200"
          >
            Discord Username <span className="text-zinc-500">*</span>
          </label>
          <input
            id="discord_username"
            type="text"
            required
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
            className="mb-1.5 block text-sm font-medium text-zinc-200"
          >
            Country <span className="text-zinc-500">*</span>
          </label>
          <select
            id="country"
            required
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
            className="mb-1.5 block text-sm font-medium text-zinc-200"
          >
            Portfolio Link{" "}
            <span className="font-normal text-zinc-500">(optional)</span>
          </label>
          <input
            id="portfolio_link"
            type="url"
            disabled={isLoading}
            value={form.portfolio_link}
            onChange={(e) => updateField("portfolio_link", e.target.value)}
            className={inputClassName}
            placeholder="https://your-portfolio.com"
          />
          <p className="mt-1.5 text-xs leading-5 text-zinc-500">
            Link your TikTok, Instagram, Google Drive, or portfolio site
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-xl bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-950 transition duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-950" />
              Submitting…
            </span>
          ) : (
            "Submit Application"
          )}
        </button>
      </form>
    </div>
  );
}
