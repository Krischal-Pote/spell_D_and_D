import axios from "axios";

export const fetchSpells = async () => {
  try {
    const response = await axios.get<{ results: Spell[] }>(
      "https://www.dnd5eapi.co/api/spells"
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching spells:", error);
    return [];
  }
};

export const fetchSpellDetails = async (spellIndex: string) => {
  try {
    const response = await axios.get<Spell>(
      `https://www.dnd5eapi.co/api/spells/${spellIndex}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching spell ${spellIndex}:`, error);
    return null;
  }
};
