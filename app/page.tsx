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
      "Upload raw, unedited footage from your phone camera roll or video archives.",
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
      "Categorize the video to ensure proper AI dataset labeling.",
    icon: Tags,
  },
  {
    step: "Step 4",
    title: "Submit & Get Paid",
    description:
      "Submit for quality review and receive payment.",
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

      <main className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 py-12 lg:grid-cols-12 lg:px-6 lg:py-16">
        {/* Left column: content */}
        <div className="flex flex-col gap-8 lg:col-span-7">
          <header>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-[1.15] lg:text-5xl">
              oceansourceai-UGC- project{" "}
              <span className="text-sky-600">$55/video</span>
            </h1>

            <div className="mt-6 rounded-2xl border border-sky-100 bg-white/90 p-6 shadow-xl shadow-sky-100/40 backdrop-blur-md sm:p-7">
              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                OceanSource AI is looking for creators to help in training AI by
                uploading, describing and categorising their videos. We use
                authentic, pre-recorded user-generated footage from your phone
                camera roll or video archives.
              </p>
            </div>

            <div
              role="note"
              className="mt-4 flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50/90 px-5 py-4 shadow-sm shadow-sky-100/50"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-white text-sky-600">
                <BadgeDollarSign className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm leading-6 text-slate-700">
                Earn up to{" "}
                <strong className="font-semibold text-sky-700">$550/week</strong>{" "}
                — Creators can upload up to{" "}
                <strong className="font-semibold text-slate-900">
                  10 accepted videos per week
                </strong>{" "}
                ($55 per video).
              </p>
            </div>
          </header>

          <section aria-labelledby="what-you-will-do-heading">
            <h2
              id="what-you-will-do-heading"
              className="text-2xl font-semibold tracking-tight text-slate-900"
            >
              What You Will Do On The Project
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Once accepted into the OceanSource AI creator network, your
              workflow consists of four straightforward steps:
            </p>

            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {steps.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.step}
                    className="rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-xl shadow-sky-100/40 backdrop-blur-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
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
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </section>

          <aside
            aria-labelledby="payout-details-heading"
            className="rounded-2xl border border-sky-100 bg-white/90 p-6 shadow-xl shadow-sky-100/40 backdrop-blur-md"
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
                  Payout &amp; Schedule Details
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Balance paid out every Friday.
                </p>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  Supported channels:{" "}
                  <strong className="font-semibold text-slate-900">
                    PayPal, Airtm, or Cryptocurrency
                  </strong>
                  .
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Right column: sticky form */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-8">
            <ApplicationForm />
          </div>
        </div>
      </main>
    </div>
  );
}
