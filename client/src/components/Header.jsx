import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo_light.png";
import { RiCloseFill, RiMenu3Line } from "@remixicon/react";
import { useAuthStore } from "../store/authStore";
import DefaultAvatar from "../assets/avatar.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout(); // Call your logout function to clear the authentication state
    setIsDropdownOpen(false); // Close the dropdown after logout
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false); // Close the dropdown when a link is clicked
  };

  const userAvatar = user?.avatar
    ? `http://localhost:5000/uploads/${user.avatar}` // Construct the URL for the avatar
    : DefaultAvatar; // Default avatar

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 m-2">
      <div className="text-neutral-50 backdrop-blur-md max-w-7xl mx-auto px-4 py-3 flex justify-between items-center ">
        {/* logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" width={120} height={24} />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            className="hover:text-primary translate-all duration-300"
            to="about"
          >
            Apropos
          </Link>
          <Link
            className="hover:text-primary translate-all duration-300"
            to="hosting"
          >
            Hosting
          </Link>
          <Link
            className="hover:text-primary translate-all duration-300"
            to="/register-domain"
          >
            Domaines
          </Link>
          <Link
            className="hover:text-primary translate-all duration-300"
            to="contact"
          >
            Contacts
          </Link>
        </div>

        {/* action buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          {isAuthenticated ? (
            <div className="relative">
              {/* User avatar and name */}
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  className="w-10 border border-secondary shadow-sm rounded-full"
                  src={userAvatar} // Dynamically fetch the user's avatar from the user object
                  alt="User Avatar"
                />
                <p>{user ? user.name : "User"}</p>
              </div>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-4 bg-white p-4 rounded-lg shadow-md w-48">
                  <Link
                    to="/dashboard"
                    className="block text-sm text-black hover:text-primary translate-all duration-300 mb-2"
                    onClick={handleLinkClick} // Close dropdown on link click
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout} // Close dropdown after logout
                    className="block text-sm text-black hover:text-primary translate-all duration-300 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Link
                className="bg-light hover:bg-primary text-black transition duration-300 px-9 py-2 rounded-lg text-sm"
                to="/login"
              >
                Connection
              </Link>
            </div>
          )}
        </div>

        {/* nav icons */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white  focus:outline-none"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <RiCloseFill /> : <RiMenu3Line />}
          </button>
        </div>
      </div>

      {/* mobile nav menu */}
      {isOpen && (
        <div className="md:hidden bg-light backdrop-blur-md p-4 rounded-xl mt-2">
          <div className="flex flex-col space-y-4">
            <Link
              className="hover:text-primary translate-all duration-300"
              to="about"
            >
              Apropos
            </Link>
            <Link
              className="hover:text-primary translate-all duration-300"
              to="hosting"
            >
              Hosting
            </Link>
            <Link
              className="hover:text-primary translate-all duration-300"
              to="domains"
            >
              Domaines
            </Link>
            <Link
              className="hover:text-primary translate-all duration-300"
              to="contact"
            >
              Contacts
            </Link>
            <Link
              className="hover:text-primary translate-all duration-300"
              to="login"
            >
              Connection
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
