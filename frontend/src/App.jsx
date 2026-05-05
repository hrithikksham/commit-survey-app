import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SurveyPage from "./pages/SurveyPage.jsx";
import ThankYouPage from "./pages/ThankYouPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<SurveyPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/admin"    element={<AdminPage />} />
        <Route path="*"         element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}