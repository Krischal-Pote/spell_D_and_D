import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  handleSpellClick: (index: string) => void;
}

const Favorites: React.FC<Props> = ({ handleSpellClick }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
    setLoading(false);
  }, []);

  return (
    <div>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
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
