import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  favorites: any[];
  handleSpellClick: (index: string) => void;
}

const Favorites: React.FC<Props> = ({ favorites, handleSpellClick }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [favorites]);

  return (
    <div>
      {loading ? (
        <div className="text-center my-8">
          <div className="spinner-border text-purple-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((favoriteIndex: string) => (
            <div
              key={favoriteIndex}
              className="border border-gray-200 rounded p-4"
            >
              <h3 className="text-xl font-semibold">{favoriteIndex}</h3>
              <button
                onClick={() => handleSpellClick(favoriteIndex)}
                className="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
              >
                <Link to={`/spells/${favoriteIndex}`}>View Details</Link>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
