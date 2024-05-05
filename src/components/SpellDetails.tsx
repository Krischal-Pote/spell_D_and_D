import React from "react";

interface Props {
  selectedSpell: any;
  closeSpellDetails: () => void;
}

const SpellDetails: React.FC<Props> = ({
  selectedSpell,
  closeSpellDetails,
}) => {
  if (!selectedSpell) {
    return null;
  }

  return (
    <div className="border border-gray-200 rounded p-4">
      <h2 className="text-2xl font-semibold mb-4">{selectedSpell?.name}</h2>
      <div className="text-gray-600">
        <p>{selectedSpell?.desc}</p>
        <p>Range: {selectedSpell?.range}</p>
        <p>Components: {selectedSpell?.components.join(", ")}</p>
        {selectedSpell?.material && <p>Material: {selectedSpell?.material}</p>}
        <p>Ritual: {selectedSpell?.ritual ? "Yes" : "No"}</p>
        <p>Duration: {selectedSpell?.duration}</p>
        <p>Concentration: {selectedSpell?.concentration ? "Yes" : "No"}</p>
        <p>Casting Time: {selectedSpell?.casting_time}</p>
        <p>Level: {selectedSpell?.level}</p>
        <p>Attack Type: {selectedSpell?.attack_type}</p>
        <p>School: {selectedSpell?.school.name}</p>
        <p>
          Classes:{" "}
          {selectedSpell?.classes
            .map((classItem: any) => classItem.name)
            .join(", ")}
        </p>
        <p>
          Subclasses:{" "}
          {selectedSpell?.subclasses
            .map((subclass: any) => subclass.name)
            .join(", ")}
        </p>
      </div>
    </div>
  );
};

export default SpellDetails;
