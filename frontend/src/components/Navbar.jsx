import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-xl font-black text-slate-950">
            J
          </div>

          <span className="text-xl font-bold tracking-tight text-white">
            Job<span className="text-cyan-400">Shield</span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link to="/" className="transition hover:text-cyan-400">
            Home
          </Link>

          <Link
            to="/#features"
            className="transition hover:text-cyan-400"
          >
            Features
          </Link>

          <Link
            to="/#how-it-works"
            className="transition hover:text-cyan-400"
          >
            How it works
          </Link>
        </div>

        {/* Login navigation */}
        <Link
          to="/login"
          className="rounded-lg border border-cyan-400/50 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
        >
          Get Started →
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
