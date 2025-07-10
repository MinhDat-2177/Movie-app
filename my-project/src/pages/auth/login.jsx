// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from "../../assets/i18n";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [language, setLanguage] = useState('en');
    
  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage(t('Both fields are required.'));
      return;
    }

    if (username === 'admin' && password === 'admin123') {
      alert(t("Login successful!"));
      localStorage.setItem("token","123");
      localStorage.removeItem("token");
      navigate('/movies');
    } else {
      setErrorMessage(t('Invalid username or password'));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://rare-gallery.com/uploads/posts/343920-Moon-Red-Night-Sky-Forest-Scenery.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="h-screen w-full relative"
    >
      <div className="absolute inset-0 z-10 bg-gray-500 opacity-15 backdrop-blur-sm" />
      <div className="flex flex-col w-full justify-center items-center h-full relative z-20">
        <div className="grid grid-cols-[60%_40%] h-2/3 w-4/5 relative z-20">
          <div className="flex flex-col items-start p-4 relative z-20 font-serif">
            <h1 className="text-4xl text-white mb-1">Netflix</h1>
            <span className="text-3xl text-white mt-1">And Chill</span>
          </div>
          <div className="flex items-center justify-center relative z-20">
            <div className="absolute inset-0 z-10 bg-white opacity-5" />
            <div className="flex flex-col h-full w-4/5 relative z-20 font-serif justify-center">
              <span className="text-4xl text-white mb-4">{t('signIn')}</span>
              <label className="text-gray-500 text-sm mb-1"></label>

              <label htmlFor="username" className="text-white text-base text-left py-1">{t('username')}</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border-b-2 text-white border-gray-400 bg-transparent w-full mb-2 focus:outline-none focus:border-blue-500"
              />

              <label htmlFor="password" className="text-white text-base text-left py-1">{t('password')}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border-b-2 text-white border-gray-400 bg-transparent w-full mb-2 focus:outline-none focus:border-blue-500"
              />

              {errorMessage && (
                <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
              )}

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 rounded-md border-gray-400 text-blue-500"
                />
                <label htmlFor="rememberMe" className="text-white text-sm">{t('rememberMe')}</label>
              </div>

              <button
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white text-sm m-2 py-2 px-4 rounded-lg transition duration-200"
              >
                {t('signIn')} &gt;
              </button>

            </div>
          </div>
        </div>

        {/* Select Language Dropdown */}
        <div className="absolute bottom-20 z-20 flex justify-center w-full">
          <div className="flex items-center justify-center">
            <label htmlFor="language" className="text-white mr-2">{t('language')}:</label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="bg-transparent border-b-2 bg-white text-black focus:outline-none"
            >
              <option value="en">English</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
