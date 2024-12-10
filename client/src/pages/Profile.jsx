import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { MdDashboard } from "react-icons/md";
import Profile from "./Profile";
import { User } from "lucide-react";
import { AiOutlineFullscreen, AiOutlineUser } from "react-icons/ai";

const ProfilePage = () => {
  const { user, logout } = useAuthStore();

  useEffect(() => {
    document.title = `Welcome - ${user.name}`;
  }, [user]);

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full bg-white/20 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="flex">
          {/* aside */}
          <div className="w-1/4 p-4 bg-primary flex flex-col justify-between">
            <div>
              <h1 className="text-center mb-8 text-[1.4rem] font-bold ">Mes Informations</h1>
              <ul>
                <li className="">
                  <Link
                    className="flex items-center mb-5 gap-3 bg-secondary text-white py-2 rounded-lg p-2"
                    to="/dashboard"
                  >
                    <MdDashboard />
                    My Dashboard
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="flex items-center mb-5 gap-3 bg-light text-white py-2 rounded-lg p-2"
                    to="/my-profile"
                  >
                    <AiOutlineUser />
                    Mes Information
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Main */}
          <div className="w-3/4 p-6"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProfilePage;
