import { useEffect, useState } from "react";

const SEED = [1, 0, 2, 1, 3, 0, 1, 2, 1, 0, 2, 1, 1, 3];

type Props = {
  handle: string;
  fallbackRepos?: string;
};

export default function GitHubSparkline({ handle, fallbackRepos = "" }: Props) {
  const [counts, setCounts] = useState(SEED);
  const [monthly, setMonthly] = useState<string>("…");
  const [label, setLabel] = useState("last 14 days");
  const [repos, setRepos] = useState(fallbackRepos);

  useEffect(() => {
    const username = handle.replace("@", "");
    const ctrl = new AbortController();
    const timeout = window.setTimeout(() => ctrl.abort(), 5000);

    const loadProfile = fetch(`https://api.github.com/users/${username}`, {
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((user: { public_repos?: number; created_at?: string }) => {
        const count = user.public_repos ?? 0;
        const year = user.created_at ? new Date(user.created_at).getFullYear() : null;
        if (count > 0) {
          setRepos(`${count} public repos${year ? ` since ${year}` : ""}`);
        }
      })
      .catch(() => {
        /* keep fallback */
      });

    const loadEvents = fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      { signal: ctrl.signal },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((events: Array<{ type: string; created_at: string; payload?: { commits?: unknown[] } }>) => {
        const days = new Array(14).fill(0);
        const now = Date.now();
        let month = 0;
        const monthAgo = now - 30 * 86400000;

        events.forEach((event) => {
          if (event.type !== "PushEvent") return;
          const commits = event.payload?.commits?.length ?? 1;
          const ts = new Date(event.created_at).getTime();
          const day = Math.floor((now - ts) / 86400000);
          if (day >= 0 && day < 14) days[13 - day] += commits;
          if (ts > monthAgo) month += commits;
        });

        if (days.some((d) => d > 0)) {
          setCounts(days);
          setMonthly(`${month} commit${month === 1 ? "" : "s"} this month`);
        } else {
          setMonthly("quiet on public · shipping private");
        }
        setLabel("last 14 days");
      })
      .catch(() => {
        setMonthly(handle);
        setLabel("last 14 days · cached");
      });

    Promise.allSettled([loadProfile, loadEvents]).finally(() =>
      window.clearTimeout(timeout),
    );

    return () => {
      ctrl.abort();
      window.clearTimeout(timeout);
    };
  }, [handle]);

  const max = Math.max(1, ...counts);

  return (
    <div className="bento-github">
      {repos && <p className="bento-proof-line">{repos}</p>}
      <div className="bento-github-meta">
        <span>{monthly}</span>
        <span>{label}</span>
      </div>
      <div className="bento-sparkline" aria-hidden="true">
        {counts.map((c, i) => {
          const height = c > 0 ? Math.max(16, Math.round((c / max) * 100)) : 16;
          return (
            <div
              key={i}
              className={`bento-spark-bar ${c > 0 ? "has-data" : ""}`}
              style={{ height: `${height}%` }}
              title={`${c} commit${c === 1 ? "" : "s"} · ${13 - i}d ago`}
            />
          );
        })}
      </div>
    </div>
  );
}
