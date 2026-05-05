/**
 * api/survey.js
 * Thin wrapper around the FastAPI backend.
 *
 * During development, Vite proxies /submit and /admin/* to http://localhost:8000.
 * In production, set VITE_API_BASE_URL to your deployed API URL.
 */

const BASE = "https://commit-survey-app.onrender.com" ?? "";

/**
 * Submit survey answers.
 * @param {Record<string, string>} answers  { q1: "A", q2: "C", ... }
 * @returns {Promise<{ success: boolean; message: string; id?: string }>}
 */
export async function submitSurvey(answers) {
  const res = await fetch(`${BASE}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail ?? `HTTP ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch admin results.
 * @param {string} password  Admin password (sent as X-Admin-Password header)
 * @returns {Promise<AdminResultsResponse>}
 */
export async function fetchAdminResults(password) {
  const res = await fetch(`${BASE}/admin/results`, {
    headers: {
      "X-Admin-Password": password,
    },
  });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail ?? `HTTP ${res.status}`);
  }

  return res.json();
}