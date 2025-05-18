import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black/30 backdrop-blur-md text-white fixed top-0 left-0 w-full z-20 border-b border-white/10">
              <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link
                  to="/"
                  className="text-2xl font-bold text-red-500 hover:text-red-400 transition-colors duration-300"
                >
                  Cine<span className="text-white">Verse</span>
                </Link>
    
                <nav className="hidden md:flex gap-8 text-sm font-medium">
                  <Link
                    to="/"
                    className="relative py-1 group hover:text-white transition-colors duration-300"
                  >
                    Home
                    <span className="absolute bottom-0 left-0 h-0.5 bg-red-500 w-0 group-hover:w-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,0,0,0.6)] group-hover:shadow-[0_0_12px_rgba(255,0,0,0.8)]"></span>
                  </Link>
                  <Link
                    to="/movies"
                    className="relative py-1 group hover:text-white transition-colors duration-300"
                  >
                    Movies
                    <span className="absolute bottom-0 left-0 h-0.5 bg-red-500 w-0 group-hover:w-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,0,0,0.6)] group-hover:shadow-[0_0_12px_rgba(255,0,0,0.8)]"></span>
                  </Link>
                </nav>
    
                <div className="flex gap-3">
                  <button
                    className="px-4 py-1.5 rounded-full border border-white/30 hover:border-red-500 text-sm
                      transition-all duration-300 hover:text-white
                      relative overflow-hidden
                      hover:shadow-[0_0_8px_rgba(255,0,0,0.4)]
                      before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] 
                      before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700
                      before:-translate-x-full hover:before:translate-x-full"
                  >
                    <span className="relative z-10">Login</span>
                  </button>
                  <button
                    className="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold
                      transition-all duration-500
                      shadow-[0_0_8px_rgba(255,50,50,0.4)] hover:shadow-[0_0_15px_rgba(255,0,0,0.6),0_0_30px_rgba(255,50,50,0.4)]
                      relative overflow-hidden
                      before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] 
                      before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700
                      before:-translate-x-full hover:before:translate-x-full
                      animate-pulse hover:animate-none"
                  >
                    <span className="relative z-10">Get Premium</span>
                  </button>
                </div>
              </div>
            </header>
  );
};

export default Header;
