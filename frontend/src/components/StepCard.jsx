function StepCard({ number, title, description }) {
  return (
    <div className="flex gap-5 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-cyan-400/30">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 font-bold text-cyan-300">
        {number}
      </div>

      <div>
        <h3 className="font-bold text-white">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default StepCard;
