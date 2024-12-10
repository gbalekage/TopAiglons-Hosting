import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spotlight } from "../components/ui/Spotlight";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mot de passes sont pas identique");
    }
    try {
      await resetPassword(token, password);

      toast.success("Mot de passe changer");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
        console.log(error)
        toast.error(error.message || "Error reseting your password")
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* spotlights */}
      <div className="overflow-x-auto">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="#0ea5e9"
        />
        <Spotlight
          className="top-40 left-80 h-[80vh] w-[50vw]"
          fill="#d20096"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-md w-full bg-secondary bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-light to-primary text-transparent bg-clip-text">
            Modifier le mot de passe
          </h2>
          {error && (
            <p className="text-colors text-sm font-semibold">{error}</p>
          )}
          {message && (
            <p className="text-green-500 text-sm font-semibold">{message}</p>
          )}
          <form onSubmit={handleSubmit}>
            <Input
              icon={Lock}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nouveau mot de passe"
            />
            <Input
              icon={Lock}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Votre mot de passe"
            />

            <motion.button
              className="mt-5 w-full py-3 bg-light text-secondary text-center px-4 rounded-lg shadow-lg transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className=" animate-spin mx-auto" size={24} />
              ) : (
                "Modifier"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
