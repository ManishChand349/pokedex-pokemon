import React, { useState } from "react";
import Search from "../Search/Search";
import "./Pokedex.css";
import PokemonList from "../PokemonList/PokemonList";

function Pokedex() {
  const [searchTerm, setSearchTearm] = useState('')
  return (
    <div className="pokedex-wrapper">
      {" "}
     
      <Search updateSearchTerm={setSearchTearm} />
      {searchTerm}
     { (searchTerm.length === 0) ?  <PokemonList /> : ''}
    </div>
  );
}

export default Pokedex;
