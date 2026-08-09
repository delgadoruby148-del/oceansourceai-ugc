import ApplicationForm from "@/components/ApplicationForm";
import CreatorInstructions from "@/components/CreatorInstructions";

const highlights = [
  {
    emoji: "💰",
    title: "$55 Flat Payout",
    description: "Paid directly upon quality control check.",
  },
  {
    emoji: "📁",
    title: "Raw Footage Only",
    description: "No editing, filters, or post-production needed.",
  },
  {
    emoji: "🔒",
    title: "Strict Data Privacy",
    description: "Data used exclusively for AI model weights training.",
  },
] as const;

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-slate-100 text-slate-900">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.18),_transparent_55%)]"
        aria-hidden="true"
      />

      <main className="relative mx-auto flex w-full max-w-5xl flex-col px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-sky-300/70 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-[0.08em] text-sky-700 uppercase shadow-[0_0_24px_rgba(56,189,248,0.35)] backdrop-blur-sm">
            OceanSource AI • Multimodal Dataset Initiative
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.1]">
            Train Next-Gen AI Models. Earn{" "}
            <span className="text-sky-600">$55 Per Video.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Submit raw, unedited video footage to help train multimodal AI
            systems in understanding human movement, speech alignment, and
            real-world spatial environments. Guaranteed $55 payout per approved
            video.
          </p>
        </header>

        <section
          aria-label="Key highlights"
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-xl shadow-sky-100/50 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-sky-200"
            >
              <div className="text-2xl" aria-hidden="true">
                {item.emoji}
              </div>
              <h2 className="mt-3 text-sm font-semibold tracking-tight text-slate-900">
                {item.title}
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </section>

        <div className="mt-12">
          <CreatorInstructions />
        </div>

        <section
          aria-label="Creator application form"
          className="mx-auto mt-10 w-full max-w-2xl"
        >
          <ApplicationForm />
        </section>

        <footer className="mx-auto mt-14 max-w-2xl border-t border-sky-100 pt-8 text-center">
          <h2 className="text-sm font-semibold tracking-tight text-slate-900">
            What happens after I apply?
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Our talent team reviews your application within 24–48 hours and
            shares next steps for your first paid recording brief.
          </p>
        </footer>
      </main>
    </div>
  );
}
