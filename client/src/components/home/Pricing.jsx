import { motion } from "framer-motion";
import React from "react";
import { PLANS_CONTENT } from "../../constants";

const Pricing = () => {
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold mt-20 tracking-tighter text-white">
            {PLANS_CONTENT.sectionTitle}
          </h2>
          <p className="mt-4">{PLANS_CONTENT.sectionDescription}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{ visible: { transition: { staggerChildren: 0.5 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {PLANS_CONTENT.plans.map((plan, index) => (
            <motion.div
              key={plan.id || index} // Use a unique identifier or fallback to index
              custom={index}
              variants={childVariants}
              className={`p-8 rounded-xl shadow-lg bg-light/20 ${
                plan.popular
                  ? "border border-primary/80"
                  : "border border-light/40"
              }`}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-primary text-white text-xs py-1 px-3 rounded-full uppercase">
                    {PLANS_CONTENT.popularBadge}
                  </span>
                </div>
              )}

              <h3 className="text-lg lg:text-xl mb-4 tracking-tighter uppercase">
                {plan.name}
              </h3>
              <p className="mb-6 text-light/40">{plan.description}</p>
              <div className="text-2xl lg:text-3xl font-bold mb-6">
                {plan.price}
              </div>
              <ul className="mb-8 space-y-2 text-light">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-neutral-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-4 bg-primary hover:bg-light text-white rounded-lg hover:text-secondary">
                {PLANS_CONTENT.ctaText}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
