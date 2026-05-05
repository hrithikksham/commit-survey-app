import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import SurveyPage from "./pages/SurveyPage.jsx";
import ThankYouPage from "./pages/ThankYouPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

const BACKEND_URL = "https://commit-survey-app.onrender.com";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const wakeBackend = async () => {
      let retries = 5;

      while (retries--) {
        try {
          const res = await fetch(`${BACKEND_URL}/health`);
          if (res.ok) {
            console.log("Backend is awake ✅");
            setIsReady(true);
            return;
          }
        } catch (err) {
          console.log("Waking backend...");
        }

        await new Promise((r) => setTimeout(r, 3000));
      }

      // even if failed, allow UI (fail gracefully)
      setIsReady(true);
    };

    wakeBackend();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}