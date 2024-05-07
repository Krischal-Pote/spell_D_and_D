import React, { useState, useEffect, useMemo } from "react";
import Pagination from "./Pagination";
import Loader from "./Loader";
import { fetchSpellDetails } from "../api/spellApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
interface Spell {
  spells: any[];
  toggleFavorite: (index: string) => void;
  favorites: string[];
  handleSpellClick: (index: string) => void;
}

const SpellBook: React.FC<{ spells: Spell[] }> = ({
  spells,
  toggleFavorite,
  favorites,
  handleSpellClick,
  mainLoading,
  favoriteCount,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24);
  const [loading, setLoading] = useState(false);
  const [selectedSpellsDetails, setSelectedSpellsDetails] = useState<any[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    // console.log(storedFavorites);
    // if (storedFavorites) {
    //   storedFavorites.forEach((index) => {
    //     toggleFavorite(index);
    //   });
    // }
  }, [favorites]);

  // useEffect(() => {
  //   localStorage.setItem("favorites", JSON.stringify(favorites));
  // }, [favorites]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSpells = spells.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchSpellDetails(pageNumber);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 4000);

  //   return () => clearTimeout(timeout);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const spellsToFetch = spells.slice(0, 50);

        const spellDetailsPromises = spellsToFetch.map(async (spell) => {
          const spellDetails = await fetchSpellDetails(spell.index);
          return spellDetails;
        });

        const spellDetails = await Promise.all(spellDetailsPromises);
        setSelectedSpellsDetails(spellDetails);
      } catch (error) {
        console.error(`Error fetching spell details:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [spells]);

  if (mainLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        <div className="flex flex-wrap justify-center">
          {currentSpells.map((spell: any, index: number) => (
            <div className="book mx-2 my-4" key={spell.index}>
              <div className="book-cover flex justify-center items-center absolute z-9 text-center bg-gradient-to-r from-black via-black to-transparent">
                <div key={spell.index}>
                  <h1 className="text-white text-4xl font-semibold">
                    {spell?.name}
                  </h1>
                  <div className="separator"></div>
                </div>
              </div>
              <div className="book-content transform scale-90 translate-y-30 bg-white">
                <div className="flex justify-between p-2">
                  <h2 className="text-2xl font-semibold  text-red-600">
                    {selectedSpellsDetails[index]?.name}
                  </h2>
                  <button
                    onClick={() => toggleFavorite(spell.index)}
                    title="Add Favorite"
                    className="mt-[-5px]"
                  >
                    {favorites.includes(spell.index) ? (
                      <FavoriteIcon
                        sx={{
                          fill: "red",
                        }}
                      />
                    ) : (
                      <>
                        <FavoriteBorderIcon />
                      </>
                    )}
                  </button>
                </div>
                {loading ? (
                  <Loader />
                ) : (
                  <div className="text-gray-600">
                    <p>{selectedSpellsDetails[index]?.desc}</p>
                    <p>Range: {selectedSpellsDetails[index]?.range}</p>
                    <p>
                      Components:{" "}
                      {selectedSpellsDetails[index]?.components.join(", ")}
                    </p>
                    {selectedSpellsDetails[index]?.material && (
                      <p>Material: {selectedSpellsDetails[index]?.material}</p>
                    )}
                    <p>
                      Ritual:{" "}
                      {selectedSpellsDetails[index]?.ritual ? "Yes" : "No"}
                    </p>
                    <p>Duration: {selectedSpellsDetails[index]?.duration}</p>
                    <p>
                      Concentration:{" "}
                      {selectedSpellsDetails[index]?.concentration
                        ? "Yes"
                        : "No"}
                    </p>
                    <p>
                      Casting Time: {selectedSpellsDetails[index]?.casting_time}
                    </p>
                    <p>Level: {selectedSpellsDetails[index]?.level}</p>
                    <p>
                      Attack Type: {selectedSpellsDetails[index]?.attack_type}
                    </p>
                    <p>School: {selectedSpellsDetails[index]?.school.name}</p>
                    <p>
                      Classes:{" "}
                      {selectedSpellsDetails[index]?.classes
                        .map((classItem: any) => classItem.name)
                        .join(", ")}
                    </p>
                    <p>
                      Subclasses:{" "}
                      {selectedSpellsDetails[index]?.subclasses
                        .map((subclass: any) => subclass.name)
                        .join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(spells.length / itemsPerPage)}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default SpellBook;
