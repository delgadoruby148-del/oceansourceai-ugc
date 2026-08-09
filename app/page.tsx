import ApplicationForm from "@/components/ApplicationForm";

const benefits = [
  {
    title: "Flexible Remote Work",
    description: "Work from anywhere on your schedule",
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
          d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
        />
      </svg>
    ),
  },
  {
    title: "Guaranteed Payouts",
    description: "$55 test video payout + scaled brand retainers",
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
          d="M12 3v18M17 8.5c0-1.9-2.2-3.5-5-3.5S7 6.6 7 8.5s2.2 3.5 5 3.5 5 1.6 5 3.5-2.2 3.5-5 3.5-5-1.6-5-3.5"
        />
      </svg>
    ),
  },
  {
    title: "Weekly Brand Briefs",
    description: "Direct script & product delivery",
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
          d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 7h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
] as const;

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-zinc-100">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(113,113,122,0.18),_transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_transparent,_rgba(9,9,11,0.85))]"
        aria-hidden="true"
      />

      <main className="relative mx-auto flex w-full max-w-5xl flex-col px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center border border-zinc-700/80 bg-zinc-900/70 px-3 py-1 text-xs font-medium tracking-[0.14em] text-zinc-300 uppercase">
            OceanSource AI Creator Network
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
            Create UGC. Get Paid $55+ Per Video.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            Join our network of UGC creators producing high-performing video ads
            for leading brands. Fast payouts and continuous brand deals.
          </p>
        </section>

        {/* Benefits */}
        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300 transition group-hover:border-zinc-700 group-hover:text-white">
                {benefit.icon}
              </div>
              <h2 className="text-sm font-semibold tracking-tight text-white">
                {benefit.title}
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-zinc-400">
                {benefit.description}
              </p>
            </article>
          ))}
        </section>

        {/* Application Form */}
        <section className="mx-auto mt-12 w-full max-w-xl">
          <ApplicationForm />
        </section>

        {/* FAQ / Trust Footer */}
        <footer className="mx-auto mt-14 max-w-2xl border-t border-zinc-800/80 pt-8 text-center">
          <h2 className="text-sm font-semibold tracking-tight text-zinc-200">
            What happens after I apply?
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Our talent team reviews your portfolio within 24-48 hours.
          </p>
        </footer>
      </main>
    </div>
  );
}
