"use client";

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
    if (!isValidEmail(form.email.trim())) return "Please enter a valid email address.";
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
      message: "Application submitted successfully. We'll be in touch soon!",
    });
  }

  const isLoading = status.type === "loading";

  return (
    <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Creator Application
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Apply to join the OceanSourceAI UGC creator program. We&apos;ll review
          your details and follow up shortly.
        </p>
      </div>

      {status.type === "success" && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          {status.message}
        </div>
      )}

      {status.type === "error" && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            disabled={isLoading}
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone_number"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone_number"
            type="tel"
            autoComplete="tel"
            required
            disabled={isLoading}
            value={form.phone_number}
            onChange={(e) => updateField("phone_number", e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label
            htmlFor="discord_username"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Discord Username <span className="text-red-500">*</span>
          </label>
          <input
            id="discord_username"
            type="text"
            required
            disabled={isLoading}
            value={form.discord_username}
            onChange={(e) => updateField("discord_username", e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
            placeholder="username"
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            required
            disabled={isLoading}
            value={form.country}
            onChange={(e) =>
              updateField("country", e.target.value as CountryCode)
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
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
            Portfolio Link{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="portfolio_link"
            type="url"
            disabled={isLoading}
            value={form.portfolio_link}
            onChange={(e) => updateField("portfolio_link", e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
            placeholder="https://your-portfolio.com"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
