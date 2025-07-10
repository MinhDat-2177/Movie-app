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
      className={`fixed top-0 left-0 w-full transition-all duration-300 p-4 ${
        scrolled ? "bg-gray-800" : "bg-transparent"
      } text-white z-10`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">My Movie App</Link>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm phim..."
              className="w-full py-2 pl-10 pr-4 text-gray-900 bg-white border rounded-full focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 hover:text-red-500"
            >
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
            </button>
          </div>
        </form>

        <nav>
          <ul className="flex gap-4">
            <li>
              <Link
                to="/"
                className={`${isActive("/") ? "text-red-500" : "text-white"}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className={`${isActive("/movies") ? "text-red-500" : "text-white"}`}
              >
                Movies
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout} className="text-white">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className={`${isActive("/login") ? "text-red-500" : "text-white"}`}
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
