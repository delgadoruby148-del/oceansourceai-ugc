const requirements = [
  {
    title: "Audio & Environment",
    description:
      "Zero background noise, no music/TV, crisp and clear speech recording.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v3"
        />
      </svg>
    ),
  },
  {
    title: "Lighting & Framing",
    description:
      "Face the primary light source directly, stable tripod/camera setup, strictly NO beautification filters or AR overlays.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "Privacy Constraints",
    description:
      "No personal identifiable information spoken/shown, solo creators only (no unconsented bystanders), plain unbranded clothing.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3 4.5 6.5v5.2c0 4.7 3.2 7.9 7.5 9.3 4.3-1.4 7.5-4.6 7.5-9.3V6.5L12 3Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 12 1.8 1.8L15 10" />
      </svg>
    ),
  },
  {
    title: "Deliverable Specifications",
    description:
      "Minimum 1080p or 4K resolution, continuous single-take raw file with no cuts, trims, or transitions.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="3" y="6" width="13" height="12" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m16 10 5-2.5v9L16 14" />
      </svg>
    ),
  },
] as const;

export default function CreatorInstructions() {
  return (
    <section
      aria-labelledby="creator-instructions-heading"
      className="rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-xl shadow-sky-100/50 backdrop-blur-md sm:p-8"
    >
      <header className="mb-6 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.14em] text-sky-600 uppercase">
          Quality Control Checklist
        </p>
        <h2
          id="creator-instructions-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-slate-900"
        >
          Requirements for payout approval
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Videos must meet all four standards below before the $55 payout is
          released.
        </p>
      </header>

      <ol className="grid gap-4 sm:grid-cols-2">
        {requirements.map((item, index) => (
          <li
            key={item.title}
            className="rounded-2xl border border-sky-100/80 bg-sky-50/50 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-sky-100 bg-white text-sky-600 shadow-sm">
                {item.icon}
              </span>
              <div>
                <span className="text-xs font-medium text-sky-600">
                  Step {index + 1}
                </span>
                <h3 className="text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-600">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
