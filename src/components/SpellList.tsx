import React, { useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  spells: any[];
  toggleFavorite: (index: string) => void;
  favorites: string[];
  handleSpellClick: (index: string) => void;
}

const SpellList: React.FC<Props> = ({
  spells,
  toggleFavorite,
  favorites,
  handleSpellClick,
}) => {
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favoriteIndexes = storedFavorites.split(",");
      favoriteIndexes.forEach((index) => {
        toggleFavorite(index);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", favorites.join(","));
  }, [favorites]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {spells.map((spell: any) => (
        <div key={spell.index} className="border border-gray-200 rounded p-4">
          <h3 className="text-xl font-semibold">{spell?.name}</h3>
          <p className="text-gray-600 mt-2">{spell?.desc}</p>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <button
              onClick={() => handleSpellClick(spell.index)}
              className="mt-4 md:mt-0 md:mr-2 px-4 py-2 rounded bg-blue-500 text-white"
            >
              <Link
                to={`/spells/${spell.index}`}
                className="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
              >
                View Details
              </Link>
            </button>
            <button
              onClick={() => toggleFavorite(spell.index)}
              className={`mt-4 md:mt-0 px-4 py-2 rounded ${
                favorites.includes(spell.index)
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {favorites.includes(spell.index)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpellList;
