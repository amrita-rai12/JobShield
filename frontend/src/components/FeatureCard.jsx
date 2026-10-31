function FeatureCard({ number, icon, title, description }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-[#0D1426] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl text-cyan-300">
          {icon}
        </div>

        <span className="text-sm font-medium text-slate-600">
          {number}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>

      <p className="mt-3 leading-7 text-slate-400">{description}</p>
    </article>
  );
}

export default FeatureCard;
