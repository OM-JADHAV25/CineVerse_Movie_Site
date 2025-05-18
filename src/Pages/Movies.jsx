import { useState, useEffect, useRef } from 'react';
import Header from '../Components/Header';
import MovieCard from '../Components/MovieCard';
import moviesData from '../Data/movies';

const MovieSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const wrapperRef = useRef(null);

  const allMovies = Object.values(moviesData).flat();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        fetchSuggestions(searchQuery);
      } else {
        setSuggestions([]);
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchSuggestions = (query) => {
    const lowerQuery = query.toLowerCase();
    const results = allMovies.filter(movie =>
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.cast.some(actor => actor.toLowerCase().includes(lowerQuery)) ||
      movie.director.toLowerCase().includes(lowerQuery)
    );
    setSuggestions(results.slice(0, 5));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const lowerQuery = searchQuery.toLowerCase();
    const results = allMovies.filter(movie =>
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.cast.some(actor => actor.toLowerCase().includes(lowerQuery)) ||
      movie.director.toLowerCase().includes(lowerQuery) ||
      movie.Genre.toLowerCase().includes(lowerQuery)
    );

    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSuggestionClick = (movie) => {
    setSearchQuery(movie.title);
    setSearchResults([movie]);
    setSuggestions([]);
    searchRef.current.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen relative text-white">
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
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="container mx-auto px-4 pt-28 pb-8">
          {/* Search Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Discover Your <span className="text-red-600">Next Favorite Movie</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Search by title, actor, director or genre
              </p>
            </div>

            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto" ref={wrapperRef}>
              <div className="relative">
                {/* Search Bar */}
                <div className={`relative flex items-center bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border ${isFocused ? 'border-red-500/60' : 'border-white/10'} transition-all duration-300 shadow-lg`}>
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsFocused(true);
                      if (searchQuery.trim() !== '') {
                        fetchSuggestions(searchQuery);
                      }
                    }}
                    onBlur={() => setIsFocused(false)}
                    placeholder="The Dark Knight, Christopher Nolan, Action..."
                    className="w-full p-4 pl-14 pr-16 bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
                    autoFocus
                  />
                  <div className="absolute left-4 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <button
                    type="submit"
                    className={`absolute right-2 px-3 py-1.5 bg-red-600/90 rounded-md text-sm font-medium transition-all duration-300
                      hover:bg-red-500 hover:shadow-[0_0_8px_2px_rgba(239,68,68,0.5)] hover:shadow-red-500/50
                      border border-red-400/30 hover:border-red-300`}
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div
                  className="absolute z-20 mt-2 w-full bg-gray-900/95 backdrop-blur-lg rounded-lg shadow-xl border border-gray-700 max-h-96 overflow-y-auto transition-all duration-200"
                  style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                >
                  <div className="divide-y divide-gray-700/50">
                    {suggestions.map((movie) => (
                      <div
                        key={movie.id}
                        onClick={() => handleSuggestionClick(movie)}
                        className="px-4 py-3 hover:bg-gray-800/70 cursor-pointer flex items-center gap-3 transition-all duration-150 group"
                        role="option"
                        tabIndex={0}
                      >
                        <div className="relative flex-shrink-0 w-10 h-14 overflow-hidden rounded">
                          <img
                            src={`/movies/${movie.genre || movie.Genre}/${movie.image}`}
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/movies/placeholder.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{movie.title}</p>
                          <p className="text-sm text-gray-400 truncate">
                            {movie.releaseYear} • {movie.Genre?.split(',')[0]} • {movie.director}
                          </p>
                        </div>
                        <div className="text-gray-500 group-hover:text-red-400 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>

            {/* Popular Searches */}
            {!searchQuery && (
              <div className="mt-6 text-center">
                <p className="text-gray-400 mb-2">Try these popular searches:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Action', 'Comedy', 'Sci-Fi', 'Leonardo DiCaprio', 'Christopher Nolan', 'Marvel'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 text-sm bg-gray-800/50 hover:bg-gray-700/70 rounded-full border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Results Section */}
          {isSearching ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : searchQuery && searchResults.length > 0 ? (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{searchQuery}"
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {searchResults.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          ) : searchQuery ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">No results found</h2>
              <p className="text-gray-400">Try different search terms</p>
            </div>
          ) : (
            Object.entries(moviesData).map(([genre, movies]) => (
              <section key={genre} className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{genre}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </section>
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default MovieSearchPage;
