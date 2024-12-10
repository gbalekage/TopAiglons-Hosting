import React from "react";
import { BRAND_LOGOS, HERO_CONTENT } from "../../constants";
import { Link } from "react-router-dom";
import HeroImage from "../../assets/hero.jpg.png";
import { motion } from "framer-motion";

const Herosection = () => {
  return (
    <section className="pt-28 lg:pt-36 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 border-light/40 border px-3 py-2 rounded-full text-xs"
        >
          {HERO_CONTENT.badgeText}
        </motion.div>

        <h1 className="text-5xl lg:text-8xl mt-20 my-4 font-bold tracking-tighter text-white">
          {HERO_CONTENT.mainHeading}
        </h1>
        <p className="mt-6 text-light max-w-xl mb-6">
          Solutions{" "}
          <span className="text-colors font-bold">d’hébergement web</span>{" "}
          performantes et des services de gestion de 
          <span className="text-colors font-bold"> noms de domaine</span> adaptés
          à vos besoins.
        </p>

        <div className="mt-6 space-x-4">
          <Link
            to="/hosting"
            className="inline-block bg-primary hover:bg-primary/70 transition-all duration-300 text-white py-3 px-6 rounded-lg"
          >
            {HERO_CONTENT.callToAction.primary}
          </Link>
          <Link
            to="/domains"
            className="inline-block border border-primary hover:border-light transition-all duration-300 hover:text-light py-3 px-6 rounded-lg"
          >
            {HERO_CONTENT.callToAction.secondary}
          </Link>
        </div>

        <div className="py-10 md:mt-10">
          <p className="text-gray-600 text-center mb-8">
            {HERO_CONTENT.trustedByText}
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {BRAND_LOGOS.map((logo, index) => (
              <img key={index} src={logo.src} className="h-8" alt={logo.alt} />
            ))}
          </div>
        </div>

        {/* <div className="mt-[-2rem]">
          <img src={HeroImage} alt="" />
        </div> */}
      </motion.div>
    </section>
  );
};

export default Herosection;
