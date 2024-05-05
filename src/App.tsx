// App.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SpellList from "./components/SpellList";
import SpellDetails from "./components/SpellDetails";
import Favorites from "./components/Favorites";
import Header from "./components/Header";

// Interface for Spell omitted for brevity

function App(): JSX.Element {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);

  useEffect(() => {
    fetchSpells();
  }, []);

  const fetchSpells = async () => {
    try {
      const response = await axios.get<{ results: Spell[] }>(
        "https://www.dnd5eapi.co/api/spells"
      );
      setSpells(response.data.results);
    } catch (error) {
      console.error("Error fetching spells:", error);
    }
  };

  const toggleFavorite = (spellIndex: string) => {
    if (favorites.includes(spellIndex)) {
      setFavorites(favorites.filter((index) => index !== spellIndex));
    } else {
      setFavorites([...favorites, spellIndex]);
    }
  };

  const handleSpellClick = async (spellIndex: string) => {
    try {
      const response = await axios.get<Spell>(
        `https://www.dnd5eapi.co/api/spells/${spellIndex}`
      );
      console.log(response.data);
      setSelectedSpell(response.data);
    } catch (error) {
      console.error(`Error fetching spell ${spellIndex}:`, error);
    }
  };

  const closeSpellDetails = () => {
    setSelectedSpell(null);
  };

  return (
    <Router>
      <div className="container mx-auto mt-8">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <SpellList
                spells={spells}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                handleSpellClick={handleSpellClick}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                handleSpellClick={handleSpellClick}
              />
            }
          />
          <Route
            path="/spells/:spellIndex"
            element={
              <SpellDetails
                selectedSpell={selectedSpell}
                closeSpellDetails={closeSpellDetails}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
