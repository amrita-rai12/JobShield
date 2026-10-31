import FeatureCard from "./FeatureCard";

function Features() {
  const features = [
    {
      number: "01",
      icon: "⌕",
      title: "Smart Risk Analysis",
      description:
        "Analyze job descriptions for suspicious wording, unusual requests, and potential recruitment scams.",
    },
    {
      number: "02",
      icon: "◈",
      title: "Warning Indicators",
      description:
        "Understand why a posting may be risky with clear, easy-to-understand warning signals.",
    },
    {
      number: "03",
      icon: "↗",
      title: "Scan History",
      description:
        "Keep track of previously analyzed job postings and review your results whenever you need.",
    },
  ];

  return (
    <section
      id="features"
      className="border-y border-white/5 bg-white/[0.02] px-6 py-20 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-400">
            Why JobShield?
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            More clarity. Safer job searches.
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Understand potential warning signs before trusting an unfamiliar
            job opportunity.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.number}
              number={feature.number}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
