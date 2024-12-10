import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { Spotlight } from "../components/ui/Spotlight";

const SignIn = () => {
  useEffect(() => {
    document.title = `Connexion - TopAiglons`;
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const hanleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
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
            Bienvenue
          </h2>
          <form onSubmit={hanleLogin}>
            <Input
              icon={AiOutlineUser}
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

            <Link
              to="/forgot-password"
              className="text-light/50 mb-4 hover:underline"
            >
              Mot de passe Oublier
            </Link>

            {error && (
              <p className="text-colors text-sm font-semibold">{error}</p>
            )}

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
                "Connection"
              )}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-primary bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-300">
            Vous n'avez pas de compte?{""}{" "}
            <Link to="/register" className="hover:underline">
              Creer un compte
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
