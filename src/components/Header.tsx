import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface Props {
  favoriteCount: number;
}

const Header: React.FC = ({ favoriteCount }) => {
  return (
    <header className="bg-gray-800 text-white py-4 px-4 mb-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">
          <Link to="/">Spell Listing App</Link>
        </h1>
        <nav>
          <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <li>
              <Badge badgeContent={favoriteCount} color="primary">
                <Link to="/favorites" className="hover:text-gray-300">
                  <FavoriteBorderIcon />
                </Link>
              </Badge>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
