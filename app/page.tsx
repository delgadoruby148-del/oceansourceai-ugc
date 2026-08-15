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
    title: "Immediate Upfront Earnings",
    description:
      "Earn $50 upfront per video instantly upon submission.",
    icon: Wallet,
  },
  {
    step: "Step 3",
    title: "Flexible Withdrawals",
    description:
      "Withdraw any amount from your balance at any time, including your early upfront earnings. Zero minimum video or balance restrictions.",
    icon: Timer,
  },
  {
    step: "Step 4",
    title: "Weekly Quality Review",
    description: "Videos undergo review once per week.",
    icon: ClipboardCheck,
  },
  {
    step: "Step 5",
    title: "Post-Review Payout & 30-Min Cashout",
    description:
      "Approved videos receive an additional $50 post-review payment. All withdrawal requests are processed within 30 minutes via PayPal, Airtm, or Cryptocurrency.",
    icon: BadgeDollarSign,
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
            <div className="space-y-2 text-sm leading-6 text-slate-300">
              <p>
                <strong className="font-semibold text-white">
                  Withdraw Any Amount, Anytime.
                </strong>
              </p>
              <p>
                <strong className="font-semibold text-white">
                  $100 Per Video ($50 Upfront / $50 Post-Review)
                </strong>{" "}
                — Withdraw any amount, including early payments, at any time. No
                minimum thresholds. Submit up to 10 videos per week ($1,000/week
                max).
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              What You Will Do On The Project
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Workflow and flexible payout rules for accepted creators:
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
                  Earn $50 upfront as soon as a video is uploaded and
                  categorized, then $50 more after weekly review approval. Withdraw
                  any amount—including early payments—immediately with no waiting,
                  no minimum balance, and no minimum video count. All withdrawal
                  requests are processed within 30 minutes via{" "}
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
