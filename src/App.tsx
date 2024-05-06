import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpellList from "./components/SpellList";
import SpellDetails from "./components/SpellDetails";
import Favorites from "./components/Favorites";
import Header from "./components/Header";
import { fetchSpells } from "./api/spellApi"; // Import the fetchSpells function
import { fetchSpellDetails } from "./api/spellApi"; // Import the fetchSpellDetails function
import SpellBook from "./components/SpellBook";

function App(): JSX.Element {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  useEffect(() => {
    fetchSpellData();
    updateFavoriteCount();
  }, []);

  const fetchSpellData = async () => {
    const spellsData = await fetchSpells();
    setSpells(spellsData);
  };

  const updateFavoriteCount = () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favoriteIndexes = storedFavorites.split(",");
      setFavoriteCount(favoriteIndexes.length);
    }
  };

  const toggleFavorite = (spellIndex: string) => {
    if (favorites.includes(spellIndex)) {
      setFavorites(favorites.filter((index) => index !== spellIndex));
      setFavoriteCount((prevCount) => prevCount - 1); // Decrease favorite count when removing from favorites
    } else {
      setFavorites([...favorites, spellIndex]);
      setFavoriteCount((prevCount) => prevCount + 1); // Increase favorite count when adding to favorites
    }
  };
  const handleSpellClick = async (spellIndex: string) => {
    const spellDetails = await fetchSpellDetails(spellIndex);
    setSelectedSpell(spellDetails);
  };

  const closeSpellDetails = () => {
    setSelectedSpell(null);
  };

  return (
    <Router>
      <div className="container mx-auto mt-8">
        <Header favoriteCount={favoriteCount} />
        <Routes>
          {/* <Route
            path="/"
            element={
              <SpellList
                spells={spells}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                handleSpellClick={handleSpellClick}
              />
            }
          /> */}
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                handleSpellClick={handleSpellClick}
              />
            }
          />
          <Route path="/spells/:spellIndex" element={<SpellDetails />} />
          <Route
            path="/"
            element={
              <SpellBook
                spells={spells}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                handleSpellClick={handleSpellClick}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
