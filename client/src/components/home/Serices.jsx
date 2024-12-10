import React from "react";
import { SERVICES } from "../../constants";
import { Link } from "react-router-dom";

const Serices = () => {
  return (
    <section id="services" className="md:mt-56">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mt-20 tracking-tighter text-white">
            {SERVICES.sectionTitle}
          </h2>
          <p className="mt-4 text-light/50 max-w-xl mx-auto">
            {SERVICES.sectionDescription}
          </p>
        </div>

        {/* items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.services.map((service, index) => (
            <div
              key={index}
              className="bg-light/20 p-6 rounded-xl shadow-lg flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl text-white font-semibold mb-4">
                  {service.title}
                </h3>
                <p>{service.description}</p>
              </div>
              <Link
                className="bg-light px-2 py-3 rounded-lg mt-4 text-secondary hover:text-white text-center transition-all duration-300 hover:bg-primary"
                to={service.link.to}
              >
                {service.link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Serices;
