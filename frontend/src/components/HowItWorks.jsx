import StepCard from "./StepCard";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Paste a job posting",
      description:
        "Copy the job description from any job portal or company website.",
    },
    {
      number: "02",
      title: "Analyze the risks",
      description:
        "JobShield checks for suspicious patterns and potential red flags.",
    },
    {
      number: "03",
      title: "Review your report",
      description:
        "Understand the warning signs and make a more informed decision.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-400">
            Simple process
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Three steps towards a more informed job search.
          </h2>

          <p className="mt-5 leading-8 text-slate-400">
            Whether a posting comes from a job portal or a company website,
            review its details carefully before sharing sensitive
            information or making payments.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
