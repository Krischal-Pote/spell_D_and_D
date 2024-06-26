import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpellList from "./components/SpellList";
import SpellDetails from "./components/SpellDetails";
import Favorites from "./components/Favorites";
import Header from "./components/Header";
import { fetchSpells } from "./api/spellApi";
import { fetchSpellDetails } from "./api/spellApi";
import SpellBook from "./components/SpellBook";

function App(): JSX.Element {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]") || []
  );
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpellData();
    updateFavoriteCount();
  }, []);

  const fetchSpellData = async () => {
    try {
      setLoading(true);

      const spellsData = await fetchSpells();
      setLoading(false);
      setSpells(spellsData);
      // updateFavoriteCount();
    } catch (err) {
      setLoading(false);
    }
  };

  const updateFavoriteCount = () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favoriteIndexes = storedFavorites.split(",");
      setFavoriteCount(favoriteIndexes.length);
    } else {
      setFavoriteCount(0);
    }
  };

  const toggleFavorite = (spellIndex: string) => {
    if (favorites.includes(spellIndex)) {
      setFavorites(favorites.filter((index) => index !== spellIndex));
      setFavoriteCount((prevCount) => prevCount - 1);
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((index) => index !== spellIndex))
      );
    } else {
      setFavorites([...favorites, spellIndex]);
      setFavoriteCount((prevCount) => prevCount + 1);
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, spellIndex])
      );
    }
  };

  const handleSpellClick = async (spellIndex: string) => {
    const spellDetails = await fetchSpellDetails(spellIndex);
    setSelectedSpell(spellDetails);
  };

  // const closeSpellDetails = () => {
  //   setSelectedSpell(null);
  // };

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
                mainLoading={loading}
                favoriteCount={favoriteCount}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
