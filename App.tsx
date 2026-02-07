import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import InternshipsPage from "./pages/InternshipsPage";
import InternshipDetail from "./pages/InternshipDetail";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ApplyPage from "./pages/ApplyPage";
import PaymentPage from "./pages/PaymentPage";
import TestEngine from "./pages/TestEngine";
import ProfessionalTestEngine from "./pages/ProfessionalTestEngine";
import Tests from "./pages/Tests";
import ResultPage from "./pages/ResultPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import SuccessStories from "./pages/SuccessStories";
import TeamPage from "./pages/TeamPage";
import HiringProcess from "./pages/HiringProcess";
import AboutUs from "./pages/AboutUs";
import { User } from "./types";
import OfferLetterPage from './pages/OfferLetterPage';

/* Scroll To Top */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await new Promise(res => setTimeout(res, 1500));
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // FIX: Logout handling with explicit storage clearing and redirect
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.hash = "#/login";
  };

  /* 🔥 PRELOADER */
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
        <img
          src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
          alt="Internadda Logo"
          className="w-28 h-28 mb-10 object-contain animate-logo-float"
        />

        <div className="loader"></div>

        <p className="mt-6 text-gray-500 text-sm tracking-wide">
          Launching Internadda…
        </p>

        <style>{`
          @keyframes logo-float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          .animate-logo-float {
            animation: logo-float 2.4s ease-in-out infinite;
          }

          .loader {
            width: 130px;
            height: 14px;
            display: grid;
            box-shadow: 0 3px 0 #2563eb;
          }
          .loader:before,
          .loader:after {
            content: "";
            grid-area: 1/1;
            background:
              radial-gradient(circle closest-side, var(--c, #2563eb) 92%, #0000)
              0 0 / calc(100%/5) 100%;
            animation: l4 1s infinite linear;
          }
          .loader:after {
            --c: #1e40af;
            background-color: #ffffff;
            box-shadow: 0 -2px 0 0 #2563eb;
            clip-path: inset(-2px calc(50% - 12px));
          }
          @keyframes l4 {
            100% { background-position: calc(100%/4) 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header user={user} onLogout={handleLogout} />

        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <AuthPage mode="login" setUser={setUser} /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!user ? <AuthPage mode="signup" setUser={setUser} /> : <Navigate to="/dashboard" />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route path="/internship/:id" element={<InternshipDetail />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/hiring-process" element={<HiringProcess />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/offer-letter" element={<OfferLetterPage />} />

            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
            
            <Route path="/settings" element={user ? <Settings user={user} setUser={setUser} /> : <Navigate to="/login" />} />
            
            {/* Force login before accessing the application form */}
            <Route 
              path="/apply/:id" 
              element={user ? <ApplyPage /> : <Navigate to="/login" />} 
            />
            
            {/* Keep PaymentPage for direct access if needed */}
            <Route path="/payment/:id" element={user ? <PaymentPage user={user} /> : <Navigate to="/login" />} />
            
            {/* Payment Success Page */}
            <Route path="/payment-success" element={<PaymentSuccess />} />
            
            {/* TEST ROUTES */}
            <Route path="/test/:id" element={user ? <TestEngine user={user} /> : <Navigate to="/login" />} />
            <Route path="/test/practice/:id" element={user ? <TestEngine user={user} /> : <Navigate to="/login" />} />
            <Route path="/test/real/:id" element={user ? <ProfessionalTestEngine /> : <Navigate to="/login" />} />
            
            <Route path="/tests" element={user ? <Tests user={user} /> : <Navigate to="/login" />} />
            <Route path="/result/:id" element={user ? <ResultPage user={user} /> : <Navigate to="/login" />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
