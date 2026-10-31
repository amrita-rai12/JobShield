import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function JobScanner() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    jobDescription: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!localStorage.getItem("jobshield_token")) {
      navigate("/login", { replace: true });
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest("/scan", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setResult(data.data);
    } catch (err) {
      setError(err.message || "Could not analyze this job posting.");

      if (
        err.message?.toLowerCase().includes("token") ||
        err.message?.toLowerCase().includes("unauthorized")
      ) {
        localStorage.removeItem("jobshield_token");
        localStorage.removeItem("jobshield_user");
        navigate("/login", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }

  const score = result?.riskScore;
  const riskLevel = result?.riskLevel;
  const flags = result?.detectedFlags ?? [];

  return (
    <div className="min-h-screen bg-[#070B18] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-xl font-bold">
            Job<span className="text-cyan-400">Shield</span>
          </Link>

          <Link
            to="/dashboard"
            className="text-sm text-slate-400 transition hover:text-cyan-400"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
          Job analysis
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Scan a job posting
        </h1>

        <p className="mt-4 leading-7 text-slate-400">
          Paste a job description below to check for potential recruitment
          red flags.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-white/10 bg-[#0D1426] p-6 sm:p-8"
        >
          <div>
            <label htmlFor="jobTitle" className="mb-2 block text-sm font-medium text-slate-300">
              Job title
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Frontend Developer Intern"
              className="w-full rounded-lg border border-white/10 bg-[#070B18] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-300">
              Company name
            </label>
            <input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              type="text"
              placeholder="Enter company name"
              className="w-full rounded-lg border border-white/10 bg-[#070B18] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="jobDescription" className="mb-2 block text-sm font-medium text-slate-300">
              Job description <span className="text-cyan-400">*</span>
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              rows={8}
              required
              minLength={20}
              placeholder="Paste the complete job description here..."
              className="w-full resize-y rounded-lg border border-white/10 bg-[#070B18] px-4 py-3 leading-7 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />
            <p className="mt-2 text-xs text-slate-500">
              Include as much relevant job information as possible.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-cyan-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Analyzing job..." : "Analyze Job Posting →"}
          </button>
        </form>

        {result && (
          <section
            aria-live="polite"
            className="mt-8 rounded-2xl border border-cyan-400/20 bg-[#0D1426] p-6 sm:p-8"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
              Analysis result
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              {riskLevel ?? "Risk assessment complete"} Risk Indicators
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
               {String(riskLevel).toLowerCase() === "low"
                 ? "Our current analyzer detected few or no configured warning signs in this job description. This does not guarantee the job is genuine."
                 : String(riskLevel).toLowerCase() === "medium"
                 ? "Our analyzer detected warning signs that deserve further investigation. Verify the employer and job details before proceeding."
                 : String(riskLevel).toLowerCase() === "high"
                 ? "Our analyzer detected multiple or serious warning signs. Treat this opportunity cautiously and verify it independently before proceeding."
                 : "Review the detected warning signs and verify the employer independently."}
            </p>

            {score !== undefined && score !== null && (
              <p className="mt-3 text-slate-300">
                Risk score: <span className="font-bold text-cyan-300">{score}</span>
              </p>
            )}

            {Array.isArray(flags) && flags.length > 0 ? (
              <div className="mt-5">
                <h3 className="font-semibold">Warning indicators</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                  {flags.map((flag, index) => (
                    <li key={index}>
                      {typeof flag === "string"
                        ? flag
                        : flag.message ?? flag.description ?? flag.type ?? JSON.stringify(flag)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">
                ✓ No configured warning signs detected. Verify the employer independently.
             </p>
            )}

            <p className="mt-5 text-xs leading-6 text-slate-500">
              This score represents rule-based risk indicators, not the
              probability that a job is fraudulent. It cannot guarantee that
              a posting is genuine or fraudulent.
            </p>

            <Link
              to="/history"
              className="mt-5 inline-block font-semibold text-cyan-300 hover:text-cyan-200"
            >
              View scan history →
            </Link>
          </section>
        )}

        <p className="mt-5 text-center text-xs leading-6 text-slate-500">
          JobShield provides risk indicators, not a guarantee that a job is
          genuine or fraudulent. Always verify opportunities independently.
        </p>
      </main>
    </div>
  );
}

export default JobScanner;
