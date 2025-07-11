// eslint-disable-next-line no-unused-vars
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <main className="flex flex-1 justify-center items-center bg-black">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
