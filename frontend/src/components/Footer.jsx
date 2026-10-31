function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <a href="#home" className="text-lg font-bold text-white">
          Job<span className="text-cyan-400">Shield</span>
        </a>

        <p className="text-sm text-slate-500">
          Helping job seekers recognize potential recruitment risks.
        </p>

        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} JobShield
        </p>
      </div>
    </footer>
  );
}

export default Footer;
