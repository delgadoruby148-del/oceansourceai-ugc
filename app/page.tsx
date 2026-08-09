import {
  BadgeDollarSign,
  FolderUp,
  FileText,
  Tags,
  Wallet,
} from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";

const steps = [
  {
    step: "Step 1",
    title: "Upload",
    description:
      "Select and upload raw, unedited footage from your phone camera roll or video archives.",
    icon: FolderUp,
  },
  {
    step: "Step 2",
    title: "Describe",
    description:
      "Write a brief, accurate description detailing what is happening in the video.",
    icon: FileText,
  },
  {
    step: "Step 3",
    title: "Categorize",
    description:
      "Assign the appropriate video category to ensure proper AI dataset labeling.",
    icon: Tags,
  },
  {
    step: "Step 4",
    title: "Submit & Receive Payment",
    description:
      "Submit your video for quality review. Approved earnings are automatically credited to your OceanSource AI Creator's Dashboard.",
    icon: Wallet,
  },
] as const;

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-slate-50 to-blue-100/60 text-slate-900">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.14),_transparent_55%)]"
        aria-hidden="true"
      />

      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-14 px-4 py-14 sm:gap-16 sm:px-6 sm:py-20 lg:px-8">
        {/* 1. Hero */}
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.1]">
            oceansourceai-UGC- project{" "}
            <span className="text-sky-600">$55/video</span>
          </h1>

          <div className="mt-8 rounded-2xl border border-sky-100 bg-white/90 p-6 text-left shadow-xl shadow-sky-100/40 backdrop-blur-md sm:p-8">
            <h2 className="text-sm font-semibold tracking-[0.12em] text-sky-700 uppercase">
              What We Are Looking For
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              OceanSource AI is purchasing authentic, pre-recorded
              user-generated videos directly from your camera roll or video
              archive. Footage must feature real-world environments, unedited
              motion, and natural human interaction to train multimodal AI
              systems that understand how people move, speak, and operate in
              everyday spaces.
            </p>
          </div>

          <div
            role="note"
            className="mt-6 inline-flex w-full max-w-xl flex-col items-center gap-2 rounded-2xl border border-sky-200 bg-sky-50/90 px-5 py-4 text-center shadow-sm shadow-sky-100/50 sm:flex-row sm:justify-center sm:gap-3 sm:text-left"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-white text-sky-600">
              <BadgeDollarSign className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm leading-6 text-slate-700">
              Submit up to{" "}
              <strong className="font-semibold text-slate-900">
                10 videos per week
              </strong>{" "}
              and earn up to{" "}
              <strong className="font-semibold text-sky-700">
                $550 per week
              </strong>{" "}
              ($55 per approved video).
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="#application-form"
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-sky-600/25 outline-none transition duration-200 hover:bg-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              Fill Out Application Form
            </a>
          </div>
        </header>

        {/* 2. Application Form */}
        <div className="mx-auto w-full max-w-2xl">
          <ApplicationForm />
        </div>

        {/* 3. What You Will Do */}
        <section aria-labelledby="what-you-will-do-heading">
          <div className="max-w-3xl">
            <h2
              id="what-you-will-do-heading"
              className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
            >
              What You Will Do On The Project
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Once accepted into the OceanSource AI creator network, your
              workflow consists of four straightforward steps:
            </p>
          </div>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.step}
                  className="rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-xl shadow-sky-100/40 backdrop-blur-md"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sky-600">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-sky-600 uppercase">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ol>

          <aside
            aria-labelledby="payout-details-heading"
            className="mt-8 rounded-2xl border border-sky-100 bg-white/90 p-6 shadow-xl shadow-sky-100/40 backdrop-blur-md sm:p-8"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sky-600">
                <BadgeDollarSign className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3
                  id="payout-details-heading"
                  className="text-base font-semibold text-slate-900"
                >
                  Payment &amp; Payout Details
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Creator balances are paid out every Friday.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Supported payout methods:{" "}
                  <strong className="font-semibold text-slate-900">
                    PayPal, Airtm, or Cryptocurrency
                  </strong>
                  .
                </p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
