import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const genreFolder = movie.genre || movie.Genre || 'Unknown';
  const formattedGenre = genreFolder.split(',')[0].trim();
  const imagePath = `/movies/${formattedGenre}/${movie.image}`;

  return (
    <div className="relative group rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 shadow-lg bg-gray-900">
      {/* Movie Poster */}
      <div className="aspect-[2/3] w-full h-full relative">
        <img
          src={imagePath}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/movies/placeholder.jpg';
          }}
        />

        {/* Permanent subtle gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
        
        {/* Title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
          <h3 className="text-white text-sm font-semibold truncate drop-shadow-md">
            {movie.title}
          </h3>
        </div>
      </div>

      {/* Hover Overlay with Gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none group-hover:pointer-events-auto">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        
        {/* Content container */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end h-full">
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-white drop-shadow-md">
              {movie.title}
            </h3>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300 drop-shadow-md">
                {movie.releaseYear || 'N/A'}
              </span>
              {movie.rating && (
                <span className="bg-red-600 px-2 py-1 rounded text-xs font-semibold text-white">
                  {movie.rating}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-300 line-clamp-2 drop-shadow-md">
              {movie.Genre || movie.genre || 'No Genre'}
            </p>

            <Link
              to={`/movie/${movie.id}`}
              className="w-full bg-red-600/90 hover:bg-red-700 text-white text-center py-2 rounded font-medium text-sm 
                transition-all duration-500 block mt-2 relative overflow-hidden 
                shadow-[0_0_8px_rgba(255,50,50,0.6)] hover:shadow-[0_0_15px_rgba(255,0,0,0.8),0_0_30px_rgba(255,50,50,0.6)]
                hover:-translate-y-0.5
                before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] 
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700
                before:-translate-x-full hover:before:translate-x-full
                animate-pulse hover:animate-none"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;