function Hero() {
  return (
    <section
      id="home"
      className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:px-10"
    >
      {/* Left content */}
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          A smarter way to evaluate job postings
        </div>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Your next job should be an{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            opportunity,
          </span>{" "}
          not a risk.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
          JobShield helps you identify suspicious job postings by analyzing
          warning signs and potential recruitment scams before you apply.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#how-it-works"
            className="rounded-xl bg-cyan-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Explore JobShield →
          </a>

          <a
            href="#features"
            className="rounded-xl border border-white/10 px-6 py-3.5 font-semibold text-white transition hover:border-cyan-400/50"
          >
            Discover Features
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-400">
          <span>✓ Clear risk indicators</span>
          <span>✓ Easy-to-understand reports</span>
        </div>
      </div>

      {/* Right preview card */}
      <div className="rounded-2xl border border-white/10 bg-[#0D1426] p-6 shadow-2xl shadow-cyan-950/20 sm:p-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">
              JobShield preview
            </p>
            <h2 className="mt-2 text-xl font-bold">Job risk report</h2>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl text-cyan-300">
            ◈
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-slate-400">Example job posting</p>
          <h3 className="mt-2 font-semibold">
            Work-from-home opportunity
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Sample description awaiting analysis...
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Analysis status</p>
            <p className="mt-2 font-semibold text-cyan-300">
              Preview only
            </p>
          </div>

          <div className="rounded-xl bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Risk indicators</p>
            <p className="mt-2 font-semibold">Not analyzed</p>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          Illustrative preview · No live analysis performed
        </p>
      </div>
    </section>
  );
}

export default Hero;
