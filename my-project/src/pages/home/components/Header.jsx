// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-gray-900 bg-opacity-90 text-white transition-all duration-300 p-4 ${
        scrolled
          ? "bg-gray-900/95 py-2 shadow-md backdrop-blur-sm"
          : "bg-gray-900/70 py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-red-500 hover:text-white transition-colors duration-200">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" fill="#ef4444" />
            <path d="M10 10h12v12H10z" fill="#fff" />
          </svg>
          <span>My Movie App</span>
        </Link>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm phim..."
              className="w-full py-2 pl-12 pr-4 rounded-full bg-white/90 text-gray-900 border-2 border-transparent focus:border-red-500 focus:bg-white shadow transition"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1 shadow transition"
            >
              Tìm
            </button>
          </div>
        </form>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-6 items-center">
            <li>
              <Link
                to="/"
                className={`px-3 py-1 rounded-full font-medium transition-colors duration-200 ${
                  isActive("/") ? "bg-red-500 text-white shadow" : "hover:bg-white/10"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className={`px-3 py-1 rounded-full font-medium transition-colors duration-200 ${
                  isActive("/movies") ? "bg-red-500 text-white shadow" : "hover:bg-white/10"
                }`}
              >
                Movies
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-full font-medium bg-gray-700 hover:bg-red-500 transition-colors duration-200 shadow"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className={`px-3 py-1 rounded-full font-medium transition-colors duration-200 ${
                    isActive("/login") ? "bg-red-500 text-white shadow" : "hover:bg-white/10"
                  }`}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
