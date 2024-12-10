import { motion } from "framer-motion";
import Header from "../components/dashboard/Header";

const DashboardPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-1xl md:max-w-4xl w-full bg-white/20 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        {/* <Header /> */}
        <div className="flex">
          {/* aside */}
          <div className="w-1/4 p-4 bg-primary ">Aside</div>

          {/* Main */}
          <div className="w-3/4 p-6">Main</div>
        </div>
      </motion.div>
    </section>
  );
};

export default DashboardPage;
