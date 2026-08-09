import {
  CheckCircle2,
  FolderSearch,
  Shield,
  Tags,
  Upload,
  Wallet,
} from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";

const steps = [
  {
    step: "Step 1",
    title: "Search your archives",
    description:
      "Search your camera roll or video archives for authentic, pre-recorded footage.",
    icon: FolderSearch,
  },
  {
    step: "Step 2",
    title: "Upload raw video",
    description: "Upload the raw, unedited video file through our portal.",
    icon: Upload,
  },
  {
    step: "Step 3",
    title: "Categorize your video",
    description: "Categorize the video using our category options.",
    icon: Tags,
  },
  {
    step: "Step 4",
    title: "Get paid $55",
    description:
      "Get paid $55 per accepted video directly to your preferred account.",
    icon: Wallet,
  },
] as const;

const qualityGuidelines = [
  "Authentic, previously recorded real-life footage only.",
  "Original audio intact with no added music or voiceovers.",
  "Minimum 1080p or 4K resolution preferred.",
  "No text overlays, beauty filters, watermarks, or post-processing edits.",
] as const;

const privacyCommitments = [
  "Used strictly for internal AI model training and dataset development.",
  "Never posted to social media or public platforms.",
  "Never used in advertisements or commercial promotions.",
  "Never sold to third-party data brokers.",
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
          <p className="inline-flex items-center rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-sky-700 uppercase shadow-sm backdrop-blur-sm">
            OceanSource AI UGC Project
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.1]">
            Monetize Your Camera Roll. Earn{" "}
            <span className="text-sky-600">$55 Per Video.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            OceanSource AI buys authentic, pre-recorded user-generated footage
            directly from your phone archive to train multimodal AI systems. No
            scripting, editing, or new filming required.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#application-form"
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-sky-600/25 outline-none transition duration-200 hover:bg-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              Jump to Application Form
            </a>
          </div>
        </header>

        {/* 2. Who We Are */}
        <section
          aria-labelledby="who-we-are-heading"
          className="rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-xl shadow-sky-100/30 backdrop-blur-md sm:p-8"
        >
          <h2
            id="who-we-are-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Who We Are
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            OceanSource AI develops next-generation artificial intelligence
            powered by real human experiences. We train multimodal models on
            real-world footage so AI can understand physical motion, human
            behavior, and environment lighting as they actually exist.
          </p>
        </section>

        {/* 3. Application Form */}
        <div className="mx-auto w-full max-w-2xl">
          <ApplicationForm />
        </div>

        {/* 4. Why We Collect Videos */}
        <section
          aria-labelledby="why-collect-heading"
          className="rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-xl shadow-sky-100/30 backdrop-blur-md sm:p-8"
        >
          <h2
            id="why-collect-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Why We Collect Real-World Videos
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Unscripted real-world footage with natural lighting, organic motion,
            and ambient audio teaches AI models to handle real-world complexity
            better than staged studio clips. These authentic recordings help
            multimodal systems learn how people move, speak, and interact inside
            everyday environments.
          </p>
        </section>

        {/* 5. What You Will Do */}
        <section aria-labelledby="what-you-will-do-heading">
          <h2
            id="what-you-will-do-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            What You Will Do On The Project
          </h2>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.step}
                  className="rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-xl shadow-sky-100/30 backdrop-blur-md"
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
        </section>

        {/* 6. Guidelines & Privacy */}
        <section aria-labelledby="guidelines-heading">
          <h2
            id="guidelines-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Submission Guidelines &amp; Privacy Guarantees
          </h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-xl shadow-sky-100/30 backdrop-blur-md">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sky-600">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold text-slate-900">
                  Quality Guidelines
                </h3>
              </div>
              <ul className="space-y-3">
                {qualityGuidelines.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-6 text-slate-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-xl shadow-sky-100/30 backdrop-blur-md">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sky-600">
                  <Shield className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold text-slate-900">
                  Privacy Commitments
                </h3>
              </div>
              <ul className="space-y-3">
                {privacyCommitments.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-6 text-slate-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
