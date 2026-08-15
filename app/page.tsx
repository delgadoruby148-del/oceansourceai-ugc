import {
  BadgeDollarSign,
  FileText,
  FolderUp,
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
    title: "Describe & Categorize",
    description:
      "Write a brief, accurate description detailing what is happening in the video and assign a category.",
    icon: FileText,
  },
  {
    step: "Step 3",
    title: "Earn",
    description:
      "Earn $50 upon video submission and an additional $50 upon weekly review approval.",
    icon: BadgeDollarSign,
  },
  {
    step: "Step 4",
    title: "Get Paid",
    description:
      "Receive payouts directly via PayPal, Airtm, or Cryptocurrency.",
    icon: Wallet,
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
            className="rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4 shadow-xl backdrop-blur-md"
          >
            <p className="text-sm font-medium leading-6 text-slate-200">
              $100 Per Video ($50 upfront / $50 post-review) • Up to 10 videos
              per week
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              What You Will Do On The Project
            </h2>
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
                  Payouts
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Up to $1,000 per week. Paid via PayPal, Airtm, or
                  Cryptocurrency.
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
