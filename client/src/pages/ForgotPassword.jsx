import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { Spotlight } from "../components/ui/Spotlight";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = `Mot de passe oublier`;
  }, []);
  const [email, setEmail] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmited(true);
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
            Mot de Passe Oublier
          </h2>

          {!isSubmited ? (
            <form onSubmit={handleSubmit}>
              <p className="text-light mb-6 text-center">
                Metter votre adresse email pour modifier votre mot de passe
              </p>
              <Input
                icon={Mail}
                placeholder="Adresse Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                  "Envoyer"
                )}
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>
              <div className="text-gray-300 mb-6">
                On a envoyer un message a {email} pour la modification de votre
                mot de passe
              </div>
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-primary bg-opacity-50 flex justify-center">
          <Link
            to={"/login"}
            className="text-sm text-light hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Connection
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
