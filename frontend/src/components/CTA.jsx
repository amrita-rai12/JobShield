function CTA() {   //Call To Action
  return (
    <section className="px-6 pb-20 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-[#0D1426] to-blue-500/10 px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-3xl text-cyan-300">
          ⛨
        </div>

        <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
          Be informed before you apply.
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
          Learn to recognize recruitment red flags and take a more
          careful approach to your next opportunity.
        </p>

        <a
          href="#home"
          className="mt-8 inline-flex items-center gap-3 rounded-xl bg-cyan-400 px-7 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </section>
  );
}

export default CTA;
