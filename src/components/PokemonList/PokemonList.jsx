import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonListState, setpokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    prevUrl: "",
    nextUrl: "",
  });

  async function downloadPokemons() {
    setpokemonListState((state) => ({ ...state, isLoading: true }));

    //This downloads list of 20 pokemons
    const response = await axios.get(pokemonListState.pokedexUrl);
    const pokemonResults = response.data.results; // we get the array of pokemons from result

    setpokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));
    //iterating over the array of pokemons, and using their url, to create an array of promises
    // that will download those 20 pokemons
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    //passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
    console.log(pokemonData);
    // now iterate on the data of each pokemon, and extract id, name, image, types
    const pokeListResult = pokemonData.map((pokemonData) => {
      const pokemon = pokemonData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });

    setpokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);
  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading...."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={pokemonListState.prevUrl == null}
          onClick={() =>
            setpokemonListState({
              ...pokemonListState,
              pokedexUrl: pokemonListState.prevUrl,
            })
          }
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.nextUrl == null}
          onClick={() =>
            setpokemonListState({
              ...pokemonListState,
              pokedexUrl: pokemonListState.nextUrl,
            })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
