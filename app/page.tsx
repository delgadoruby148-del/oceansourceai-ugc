import {
  BadgeDollarSign,
  ClipboardCheck,
  FolderUp,
  Timer,
  Wallet,
} from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";

const steps = [
  {
    step: "Step 1",
    title: "Upload & Categorize",
    description:
      "Upload raw, unedited footage from your phone camera roll or video archives, write a brief description, and assign a category.",
    icon: FolderUp,
  },
  {
    step: "Step 2",
    title: "Submission & Upfront Payout",
    description:
      "Submit your 10 weekly videos. You can withdraw your initial $50 per video payment as soon as all 10 weekly videos have been submitted.",
    icon: Wallet,
  },
  {
    step: "Step 3",
    title: "Weekly Review",
    description: "Video reviews are conducted once per week.",
    icon: ClipboardCheck,
  },
  {
    step: "Step 4",
    title: "Post-Review Payout",
    description:
      "Accepted videos receive an additional $50 after-review payment. Rejected videos do not qualify for the $50 post-review payout.",
    icon: BadgeDollarSign,
  },
  {
    step: "Step 5",
    title: "Fast Withdrawals",
    description:
      "After-review earnings can be withdrawn at any time. All withdrawal requests are processed within 30 minutes via PayPal, Airtm, or Cryptocurrency.",
    icon: Timer,
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Content — Dark Blue Gradient */}
      <section className="flex flex-col justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-8 text-slate-100 lg:p-16">
        <div className="mx-auto w-full max-w-xl space-y-6">
          <header>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              oceansourceai-UGC- project{" "}
              <span className="text-sky-400">$100/video</span>
            </h1>
          </header>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-md">
            <p className="text-sm leading-7 text-slate-300 sm:text-base">
              OceanSource AI is looking for creators to help in training AI by
              uploading, describing and categorising their videos. We use
              authentic, pre-recorded user-generated footage from your phone
              camera roll or video archives.
            </p>
          </div>

          <div
            role="note"
            className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-md"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-sky-400">
              <BadgeDollarSign className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm leading-6 text-slate-300">
              <strong className="font-semibold text-white">
                $100 Per Video ($1,000/Week Max)
              </strong>{" "}
              — Earn{" "}
              <strong className="font-semibold text-sky-300">$50</strong> upon
              weekly submission and{" "}
              <strong className="font-semibold text-sky-300">$50</strong> upon
              review approval.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              What You Will Do On The Project
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Workflow and payout rules for accepted creators:
            </p>
            <ol className="mt-5 space-y-4">
              {steps.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.step} className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-sky-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-sky-400 uppercase">
                        {item.step}
                      </p>
                      <h3 className="mt-0.5 text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-sky-400">
                <BadgeDollarSign className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-white">
                  Payout Information
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  $50 upfront after your 10 weekly videos are submitted, plus $50
                  more for each accepted video after weekly review. Withdrawals
                  are processed within 30 minutes via{" "}
                  <strong className="font-semibold text-white">
                    PayPal, Airtm, or Cryptocurrency
                  </strong>
                  .
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Right: Form — Light Blue Gradient */}
      <section className="flex flex-col justify-center bg-gradient-to-br from-sky-50 via-blue-100 to-indigo-100 p-8 text-slate-900 lg:p-16">
        <div className="mx-auto w-full max-w-md">
          <ApplicationForm />
        </div>
      </section>
    </div>
  );
}
