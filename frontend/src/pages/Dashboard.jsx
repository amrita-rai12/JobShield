import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [totalScans, setTotalScans] = useState(0);
  const [latestScan, setLatestScan] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      if (!localStorage.getItem("jobshield_token")) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const [historyData, userData] = await Promise.all([
          apiRequest("/scan?limit=1"),
          apiRequest("/user/me"),
        ]);

        setTotalScans(historyData.total ?? 0);
        setLatestScan(historyData.data?.[0] ?? null);
        setUser(userData.user ?? null);
      } catch (err) {
        setError(err.message || "Unable to load dashboard.");

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
    }

    loadDashboard();
  }, [navigate]);

  function handleLogout() {
     localStorage.removeItem("jobshield_token");
     localStorage.removeItem("jobshield_user");

     navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#070B18] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          
          <Link to="/" className="text-xl font-bold">
            Job<span className="text-cyan-400">Shield</span>
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400/10"
          >
            Logout →
         </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div>
          <p className="text-sm font-medium text-cyan-400">
            YOUR DASHBOARD
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Welcome{user?.name ? `, ${user.name}` : " to JobShield"}!
          </h1>

          <p className="mt-3 text-slate-400">
            Review job postings and make more informed career decisions.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0D1426] p-6">
            <p className="text-sm text-slate-400">Total scans</p>
            <h2 className="mt-3 text-3xl font-bold">
              {loading ? "..." : totalScans}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Total job postings analyzed by you.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0D1426] p-6">
            <p className="text-sm text-slate-400">Latest activity</p>
            <h2 className="mt-3 text-xl font-bold">
              {loading
                ? "Loading..."
                : latestScan?.jobTitle || "No scans yet"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {latestScan
                ? `Risk level: ${latestScan.riskLevel || "Unknown"}`
                : "Your latest analysis will appear here."}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0D1426] p-6">
            <p className="text-sm text-slate-400">Account status</p>
            <h2 className="mt-3 text-2xl font-bold text-cyan-300">
              {loading ? "Loading..." : user ? "Verified" : "Unavailable"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {user?.email || "Account information unavailable"}
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Quick actions</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Link
              to="/scan"
              className="group rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 transition hover:border-cyan-400/50 hover:bg-cyan-400/10"
            >
              <span className="text-2xl text-cyan-300">⌕</span>
              <h3 className="mt-4 text-lg font-bold">
                Scan a job posting
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Analyze a job description for potential recruitment red flags.
              </p>
              <p className="mt-4 font-semibold text-cyan-300">
                Start scanning →
              </p>
            </Link>

            <Link
              to="/history"
              className="rounded-2xl border border-white/10 bg-[#0D1426] p-6 transition hover:border-cyan-400/40"
            >
              <span className="text-2xl text-cyan-300">↗</span>
              <h3 className="mt-4 text-lg font-bold">
                View scan history
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Review your previously analyzed job postings.
              </p>
              <p className="mt-4 font-semibold text-cyan-300">
                View history →
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
