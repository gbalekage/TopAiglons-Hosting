import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import DashboardPage from "./pages/DashboardPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/Profile";
import RegisterDomain from "./pages/RegisterDomain";
import PaymentCancel from "./pages/PaymentCancel";
import LoaderSpin from "./components/LoaderSpin";
import PaymentSuccess from "./pages/PaymentSuccess";

//protected Route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children;
};

//redirect the user if already authenticated
const RedirectUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoaderSpin />;
  }

  console.log("isAuthenticated: ", isAuthenticated);
  console.log("user", user);
  return (
    <div className="text-sm text-light">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<RedirectUser><SignIn /></RedirectUser>}/>
        <Route path="/register" element={<RedirectUser><Register /></RedirectUser>}/>
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}/>
        <Route path="/my-profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute> }/>
        <Route path="/register-domain" element={<ProtectedRoute><RegisterDomain /></ProtectedRoute>}/>
        <Route path="/verify-email" element={<RedirectUser><EmailVerificationPage /></RedirectUser>}/>
        <Route path="/forgot-password" element={<RedirectUser><ForgotPassword /></RedirectUser>}/>
        <Route path="/reset-password/:token" element={<RedirectUser><ResetPassword /></RedirectUser>}/>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/checkout/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>}/>
        <Route path="/checkout/cancel" element={<ProtectedRoute><PaymentCancel /></ProtectedRoute>}/>
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
