import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AiOutlineLock, AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { Spotlight } from "../components/ui/Spotlight";
import LoaderSpin from "../components/LoaderSpin";

const Register = () => {
  useEffect(() => {
    document.title = `Creer un compte`;
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
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
            Creer un Compte
          </h2>

          <form onSubmit={handleRegister}>
            <Input
              icon={AiOutlineUser}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre Nom complet"
            />
            <Input
              icon={AiOutlineMail}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre Email"
            />
            <Input
              icon={AiOutlineLock}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
            />

            {error && (
              <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}

            {/* password meter */}
            <PasswordStrengthMeter password={password} />

            <motion.button
              className="mt-5 w-full py-3 bg-light text-secondary text-center px-4 rounded-lg shadow-lg transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Creer"}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-primary bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-300">
            Vous avez deja un compte?{""}{" "}
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
