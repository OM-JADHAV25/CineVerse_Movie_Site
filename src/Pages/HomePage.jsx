import React, { useRef } from "react";
import MovieRow from "./MovieRow";
import movies from "../Data/movies.js";
import { Link } from "react-router-dom";
import "../App.css";

function App() {

  const popularRef = useRef(null);


  const handleDiscoverClick = () => {
    if (popularRef.current) {
      popularRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('/Movies_Website_BG.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="relative z-10">
        {/* Header */}

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

        {/* Hero Section */}
        <main className="relative pt-28 px-4 text-white flex flex-col items-center justify-center text-center h-[600px] max-w-5xl mx-auto">
          {/* Glowing title with enhanced neon effect */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
            <span className="relative z-10">
              Welcome to <span className="text-red-500 neon-text">CineVerse</span>
            </span>
            <span
              className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20 -z-10 mx-auto w-3/4 h-16 top-1/2 transform -translate-y-1/2"
              aria-hidden="true"
            />
          </h1>

          {/* Glowing description with subtle animation */}
          <p className="max-w-2xl text-xl md:text-2xl text-gray-300 mb-10 relative">
            <span className="relative z-10 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Stream the latest movies and shows in stunning 4K HDR quality
            </span>
            <span
              className="absolute -inset-2 bg-red-500 rounded-full blur-md opacity-0 hover:opacity-10 transition-opacity duration-500 -z-10"
              aria-hidden="true"
            />
          </p>

          {/* button */}
          <button
            onClick={handleDiscoverClick}
            className="mt-6 px-10 py-4 bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 rounded-full text-white text-xl font-bold relative overflow-hidden
              transition-all duration-500
              shadow-[0_0_20px_rgba(255,50,50,0.7)] hover:shadow-[0_0_30px_rgba(255,0,0,0.9),0_0_60px_rgba(255,50,50,0.6)]
              transform hover:-translate-y-1 hover:scale-105
              before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)] 
              before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-1000
              before:-translate-x-full hover:before:translate-x-full
              group"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-white group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-shadow">DISCOVER NOW</span>
              <svg className="w-6 h-6 text-white group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </button>

          {/* Prominent tech badges */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
            {['4K ULTRA HD', 'HDR10+', 'DOLBY VISION', 'IMAX ENHANCED'].map((tech) => (
              <div key={tech} className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-red-400 transition-all duration-300 group">
                <span className="text-sm font-medium text-white group-hover:text-red-400 flex items-center gap-2">
                  <span className="text-red-400 group-hover:text-white transition-colors">▸</span>
                  {tech}
                </span>
              </div>
            ))}
          </div>

          {/* Custom styles for enhanced effects */}
          <style jsx>{`
    .neon-text {
      text-shadow: 0 0 10px rgba(255, 0, 0, 0.7), 
                   0 0 20px rgba(255, 0, 0, 0.5),
                   0 0 30px rgba(255, 0, 0, 0.3);
      animation: flicker 3s infinite alternate;
    }
    @keyframes flicker {
      0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
        text-shadow: 0 0 10px rgba(255, 0, 0, 0.7), 
                     0 0 20px rgba(255, 0, 0, 0.5),
                     0 0 30px rgba(255, 0, 0, 0.3);
      }
      20%, 24%, 55% {
        text-shadow: 0 0 5px rgba(255, 0, 0, 0.5), 
                     0 0 10px rgba(255, 0, 0, 0.3),
                     0 0 15px rgba(255, 0, 0, 0.2);
      }
    }
    .text-shadow {
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
  `}</style>
        </main>

        {/* Movie Sections */}
        {Object.entries(movies).map(([genre, movieList]) => {
          
          const ref = genre === "Popular" ? popularRef : null;
          return (
            <div key={genre} ref={ref}>
              <MovieRow genre={genre} movies={movieList} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
