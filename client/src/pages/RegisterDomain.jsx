import React from "react";
import { motion } from "framer-motion";
import { Spotlight } from "../components/ui/Spotlight";
import GridBg from "../components/ui/GridBg";
import useDomainStore from "../store/domainStore";

const RegisterDomain = () => {
  const {
    domain,
    isAvailable,
    isLoading,
    message,
    error,
    setDomain,
    checkDomainAvailability,
    registerDomain,
  } = useDomainStore();

  const handleCheckDomain = (e) => {
    e.preventDefault();
    checkDomainAvailability(domain);
  };

  const handleRegisterDomain = (e) => {
    e.preventDefault();
    if (isAvailable) {
      registerDomain(domain);
    }
  };

  return (
    <section className="pt-28 lg:pt-36 relative">
      {/* Spotlights */}
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

      {/* Grid background */}
      <GridBg />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl relative mx-auto px-4 flex flex-col items-center text-center"
      >
        <h1 className="text-5xl lg:text-8xl mt-20 my-4 font-bold tracking-tighter text-white">
          Enregistrez votre nom de domaine
        </h1>

        <p className="mt-6 text-light max-w-xl mb-6">
          Trouvez{" "}
          <span className="text-colors font-bold">un nom de domaine</span> pour
          votre présence en ligne.
        </p>

        <form onSubmit={handleCheckDomain}>
          <input
            placeholder="Recherchez votre domaine"
            type="text"
            className="m-[10px] w-[700px] py-3 px-4 bg-light/20 rounded-lg focus:bg-light/20 focus:outline text-white"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />

          <button
            className="mt-5 py-3 bg-light text-secondary text-center px-4 rounded-lg shadow-lg transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Vérification en cours..."
              : "Vérifiez la disponibilité"}
          </button>
        </form>

        {error && (
          <p style={{ color: "red", marginTop: "40px" }}>Erreur: {error}</p>
        )}
        {message && (
          <p
            style={{ color: isAvailable ? "green" : "red", marginTop: "40px" }}
          >
            {message}
          </p>
        )}

        {isAvailable && (
          <div className="bg-light/50 p-6 mt-8 rounded-lg shadow-lg flex flex-col justify-between">
            <h3 className="text-sm text-white mb-4">
              <small className="font-thin">
                Le domaine{" "}
                <span className="font-semibold text-secondary">{domain}</span>{" "}
                est disponible.
              </small>
            </h3>
            <button
              onClick={handleRegisterDomain}
              className="bg-primary text-white rounded-lg mt-4 border-none cursor-pointer py-2"
              disabled={isLoading}
            >
              {isLoading
                ? "Redirection vers le paiement..."
                : "Enregistrez le domaine"}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default RegisterDomain;
