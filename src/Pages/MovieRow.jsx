import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieRow = ({ genre, movies }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const scroll = (direction) => {
    const current = scrollRef.current;
    if (!current) return;

    const scrollAmount = window.innerWidth * 0.3;
    const newScrollLeft =
      direction === 'left'
        ? current.scrollLeft - scrollAmount
        : current.scrollLeft + scrollAmount;

    current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const current = scrollRef.current;
    if (!current) return;

    const handleScroll = () => {
      const maxScrollLeft = current.scrollWidth - current.clientWidth;
      setShowLeft(current.scrollLeft > 0);
      setShowRight(current.scrollLeft < maxScrollLeft - 1);
    };

    current.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => current.removeEventListener('scroll', handleScroll);
  }, [movies]);

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto relative group">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-4xl font-bold text-white">
          <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            {genre}
          </span>
          <span className="text-white/70 ml-2">Movies</span>
        </h2>
        <Link 
          to={`/genre/${genre.toLowerCase()}`} 
          className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center group/viewall"
        >
          View all
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1 group-hover/viewall:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Left Scroll Button */}
      {showLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute -left-12 top-[calc(50%+40px)] -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.8)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5 stroke-white hover:stroke-red-500 transition-colors duration-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Right Scroll Button */}
      {showRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute -right-12 top-[calc(50%+40px)] -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.8)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5 stroke-white hover:stroke-red-500 transition-colors duration-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      {/* Scrollable Movie Row */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth py-4 -mx-4 px-4"
      >
        {movies.map((movie) => (
          <Link 
            to={`/movie/${movie.id}`} 
            key={movie.id} 
            className="relative group/card transition-all duration-500 hover:z-10"
            onMouseEnter={() => setHoveredMovie(movie.id)}
            onMouseLeave={() => setHoveredMovie(null)}
          >
            <div className={`min-w-[220px] bg-gradient-to-br from-white/5 to-white/[0.01] rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 flex-shrink-0 relative ${hoveredMovie === movie.id ? 'scale-110 shadow-lg shadow-red-500/20' : 'scale-100'}`}>
              <div className="relative pt-[150%] overflow-hidden">
                {/* Poster Image with Parallax Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={`/movies/${genre}/${movie.image}`}
                    alt={movie.title}
                    onError={(e) => (e.target.src = '/fallback.jpg')}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 ${hoveredMovie === movie.id ? 'scale-110' : 'scale-100'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Rating Badge */}
                <div className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center border border-white/10">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white text-sm font-medium ml-1">{movie.rating || 'N/A'}</span>
                </div>

                {/* Hover Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                  <div className="mb-2">
                    <h3 className="text-white font-bold text-xl mb-1 line-clamp-2">{movie.title}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">{movie.description || 'No description available'}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {movie.genres?.slice(0, 3).map((genre, i) => (
                      <span 
                        key={i} 
                        className="px-2.5 py-1 bg-gradient-to-r from-red-500/30 to-purple-500/30 text-white/90 text-xs rounded-full backdrop-blur-sm border border-white/10"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                
                </div>
              </div>
              
              {/* Subtle Glow Effect */}
              <div className={`absolute inset-0 rounded-xl pointer-events-none overflow-hidden ${hoveredMovie === movie.id ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-purple-500/20 blur-md"></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MovieRow;