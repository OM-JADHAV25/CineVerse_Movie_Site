import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import movies from '../Data/movies.js';
import { FaStar, FaRegClock, FaCalendarAlt, FaPlay, FaPlus } from 'react-icons/fa';
import { MdOutlineTheaters, MdLanguage } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { Link } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const allMovies = Object.values(movies).flat();
  const movie = allMovies.find((m) => String(m.id) === id);
  const videoRef = useRef(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [id]);

  if (!movie) return <div className="p-10 text-red-500">Movie not found</div>;


  const genre = movie.genre || "";

  const cast = Array.isArray(movie.cast) ? movie.cast : [];
  const ageRating = movie.ageRating || 'N/A';
  const runtime = movie.runtime || 'N/A';
  const releaseYear = movie.releaseYear || 'N/A';
  const language = movie.language || 'N/A';
  const director = movie.director || 'N/A';
  const writers = Array.isArray(movie.writers) ? movie.writers : [];
  const releaseDate = movie.releaseDate || releaseYear;
  const budget = movie.budget || 'N/A';
  const revenue = movie.revenue || 'N/A';

  const openTrailer = () => {
    setShowTrailer(true);
  };

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <div className="relative min-h-screen text-white">


      {/* Header Component */}
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

      {/* Background Video */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center brightness-150"
          >
            <source src={movie.previewVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/100"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 pt-24 pb-16 px-6 bg-transparent min-h-screen">
        <div className="container mx-auto flex flex-col md:flex-row gap-10">
          {/* Poster */}
          <div className="md:w-1/3 lg:w-1/4 flex flex-col">
            <div className="rounded-2xl overflow-hidden shadow border-2 border-white/20 group cursor-pointer relative">
              <img
                src={`/movies/${genre}/${movie.image}`}
                alt={movie.title}
                className="w-full h-auto object-cover transition-all duration-300 group-hover:opacity-70"
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                onClick={openTrailer}
              >
                <div
                  className="relative group/play
                            p-4 rounded-full cursor-pointer 
                            bg-gradient-to-br from-red-600 to-red-800 
                          hover:from-red-500 hover:to-red-700
                            shadow-[0_0_12px_rgba(255,50,50,0.6)]
                            hover:shadow-[0_0_20px_rgba(255,0,0,0.9),0_0_40px_rgba(255,50,50,0.6)]
                            transform transition-all duration-500 
                            group-hover:scale-110
                            before:absolute before:inset-0 
                            before:rounded-full
                            before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)] 
                            before:opacity-0 group-hover/play:before:opacity-100 
                            before:transition-opacity before:duration-1000 
                            before:-translate-x-full group-hover/play:before:translate-x-full"
                >
                  <FaPlay className="text-white text-xl z-10 relative" />
                </div>
              </div>
            </div>

            <div className="bg-gray-900/80 mt-6 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm font-semibold">{movie.rating}/10</span>
                </div>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">{movie.ageRating}</span>
              </div>
              <div className="text-sm space-y-2 text-gray-300">
                <p><FaRegClock className="inline mr-2 text-gray-400" />{movie.runtime} min</p>
                <p><FaCalendarAlt className="inline mr-2 text-gray-400" />{movie.releaseYear}</p>
                <p><MdOutlineTheaters className="inline mr-2 text-gray-400" />{genre}</p>
                <p><MdLanguage className="inline mr-2 text-gray-400" />{movie.language}</p>
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="md:w-2/3 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">{movie.title}</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-red-600/90 text-xs px-3 py-1 rounded-full uppercase tracking-widest shadow">
                  {genre}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#333" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f5c518" strokeWidth="3" strokeDasharray={`${movie.rating * 10}, 100`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">{movie.rating}</div>
                </div>
                <span className="text-sm">User Score</span>
                <button
                  onClick={openTrailer}
                  className="relative overflow-hidden group
                            bg-gradient-to-br from-red-600 to-red-800 
                          hover:from-red-500 hover:to-red-700 
                          text-white text-sm px-6 py-3 
                            rounded-full flex items-center gap-2 
                            font-semibold shadow-[0_0_20px_rgba(255,50,50,0.6)] 
                            hover:shadow-[0_0_30px_rgba(255,0,0,0.9),0_0_60px_rgba(255,50,50,0.6)]
                            transition-all duration-500 transform 
                            hover:-translate-y-1 hover:scale-105
                            before:absolute before:inset-0 
                            before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)] 
                            before:opacity-0 hover:before:opacity-100 
                            before:transition-opacity before:duration-1000 
                            before:-translate-x-full hover:before:translate-x-full"
                            >
                  <FaPlay className="text-white" /> Play Trailer
                </button>
                <button
                  className="relative overflow-hidden group
                            border border-white/30 hover:border-white/60
                          text-white text-sm px-5 py-3 rounded-full
                            transition-all duration-500
                            flex items-center gap-2 font-medium
                            shadow-[0_0_8px_rgba(255,255,255,0.2)]
                            hover:shadow-[0_0_15px_rgba(255,255,255,0.4),0_0_25px_rgba(255,255,255,0.3)]
                          hover:bg-white/10
                            before:absolute before:inset-0 
                            before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)] 
                            before:opacity-0 hover:before:opacity-100 
                            before:transition-opacity before:duration-1000 
                            before:-translate-x-full hover:before:translate-x-full">
                  <FaPlus className="text-white" /> Watchlist
                </button>
              </div>
            </div>

            <div className="space-y-3 backdrop-blur-sm bg-black/30 p-6 rounded-xl border border-white/10">
              <h2 className="text-2xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed max-w-3xl text-justify">{movie.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="backdrop-blur-sm bg-black/30 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Top Cast</h3>
                <div className="grid grid-cols-2 gap-4">
                  {cast.slice(0, 6).map((actor, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 border border-white/20 flex items-center justify-center text-white text-lg font-bold shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                        {actor.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{actor}</p>
                        <p className="text-xs text-gray-400">Actor</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="backdrop-blur-sm bg-black/30 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Details</h3>
                <div className="space-y-3 text-gray-300">
                  <p><span className="text-gray-400 block text-sm">Director:</span> {director}</p>
                  <p><span className="text-gray-400 block text-sm">Release Date:</span> {releaseDate}</p>
                  <p><span className="text-gray-400 block text-sm">Genre:</span> {movie.Genre}</p>
                  <p><span className="text-gray-400 block text-sm">IMDB:</span> {movie.imdb}</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeTrailer}
              className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
            >
              <IoMdClose className="text-3xl" />
            </button>
            <div className="aspect-w-16 aspect-h-9 bg-black">
              <video
                controls
                autoPlay
                className="w-full h-full"
                src={movie.trailerVideo || movie.previewVideo}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
