import React, { useEffect } from "react";
import { Spotlight } from "../components/ui/Spotlight";
import GridBg from "../components/ui/GridBg";
import Herosection from "../components/home/Herosection";
import Serices from "../components/home/Serices";
import KeyFeatures from "../components/home/KeyFeatures";
import Pricing from "../components/home/Pricing";
import Testimonials from "../components/home/Testimonials";

const HomePage = () => {
  useEffect(() => {
    document.title = `Welcome - TopAiglons`;
  }, []);

  return (
    <div>
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

      {/* grid bg */}
      <GridBg />

      <Herosection />
      <Serices />
      <KeyFeatures />
      <Pricing />
      <Testimonials />
    </div>
  );
};

export default HomePage;
