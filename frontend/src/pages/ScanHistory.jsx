import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function ScanHistory() {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadHistory = useCallback(async () => {
    setError("");

    try {
      const data = await apiRequest("/scan");
      const items = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.scans)
        ? data.scans
        : Array.isArray(data.data?.scans)
        ? data.data.scans
        : [];

      setScans(items);
    } catch (err) {
      setError(err.message || "Could not load scan history.");

      if (
        err.message?.toLowerCase().includes("unauthorized") ||
        err.message?.toLowerCase().includes("token")
      ) {
        localStorage.removeItem("jobshield_token");
        localStorage.removeItem("jobshield_user");
        navigate("/login", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!localStorage.getItem("jobshield_token")) {
      navigate("/login", { replace: true });
      return;
    }

    loadHistory();
  }, [loadHistory, navigate]);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this scan from your history?"
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      await apiRequest(`/scan/${id}`, { method: "DELETE" });
      setScans((current) =>
        current.filter((scan) => (scan._id || scan.id) !== id)
      );
    } catch (err) {
      setError(err.message || "Could not delete this scan.");
    } finally {
      setDeletingId(null);
    }
  }

  function getRiskStyle(level) {
    switch (String(level || "").toLowerCase()) {
      case "low":
        return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
      case "medium":
        return "border-amber-400/30 bg-amber-400/10 text-amber-300";
      case "high":
        return "border-red-400/30 bg-red-400/10 text-red-300";
      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  }

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

      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
          Your activity
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Scan History
        </h1>

        <p className="mt-4 text-slate-400">
          Review your previously analyzed job postings in one place.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300"
          >
            {error}
            <button
              onClick={loadHistory}
              className="ml-3 font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0D1426]">
          <div className="hidden grid-cols-4 gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-slate-300 md:grid">
            <span>Job title</span>
            <span>Company</span>
            <span>Risk level</span>
            <span>Scan date</span>
          </div>

          {loading ? (
            <div className="px-6 py-16 text-center text-slate-400">
              Loading your scan history...
            </div>
          ) : scans.length === 0 && !error ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl text-cyan-300">
                ↗
              </div>

              <h2 className="mt-5 text-xl font-bold">No scans yet</h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Your analyzed job postings will appear here after you start
                scanning jobs.
              </p>

              <Link
                to="/scan"
                className="mt-6 inline-flex rounded-lg bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Scan your first job →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {scans.map((scan) => {
                const id = scan._id || scan.id;
                const title = scan.jobTitle || "Untitled job";
                const company = scan.companyName || "Not provided";
                const level = scan.riskLevel || "Unknown";
                const date = scan.createdAt
                  ? new Date(scan.createdAt).toLocaleDateString()
                  : "Unknown";

                return (
                  <div
                    key={id}
                    className="grid gap-3 px-6 py-5 md:grid-cols-4 md:items-center"
                  >
                    <div>
                      <p className="text-xs text-slate-500 md:hidden">
                        Job title
                      </p>
                      <p className="font-medium">{title}</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 md:hidden">
                        Company
                      </p>
                      <p className="text-sm text-slate-300">{company}</p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs text-slate-500 md:hidden">
                        Risk level
                      </p>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getRiskStyle(level)}`}
                      >
                        {level}
                      </span>
                      <p className="mt-1 text-xs text-slate-500">
                        Score: {scan.riskScore ?? "—"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-slate-500 md:hidden">
                          Scan date
                        </p>
                        <p className="text-sm text-slate-400">{date}</p>
                      </div>

                      <button
                        onClick={() => handleDelete(id)}
                        disabled={!id || deletingId === id}
                        className="text-sm text-red-300 transition hover:text-red-200 disabled:opacity-50"
                      >
                        {deletingId === id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <p className="mt-5 text-xs leading-6 text-slate-500">
          Risk levels reflect the current rule-based analyzer. A low score
          does not guarantee that a job is genuine.
        </p>
      </main>
    </div>
  );
}

export default ScanHistory;
