import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon'

function PokemonList() {
     const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon'

     const [pokemonList, setPokemonList ] = useState([])
     const [isLoading, setIsLoading] = useState(true)

     async function downloadPokemons() {
          //This downloads list of 20 pokemons
          const response = await axios.get(POKEDEX_URL);
          const pokemonResults = response.data.results; // we get the array of pokemons from result

          //iterating over the array of pokemons, and using their url, to create an array of promises
          // that will download those 20 pokemons
          const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
          //passing that promise array to axios.all
          const pokemonData = await axios.all(pokemonResultPromise) // array of 20 pokemon detailed data
          console.log(pokemonData)
          // now iterate on the data of each pokemon, and extract id, name, image, types 
          const pokeListResult = (pokemonData.map((pokemonData) =>{
               const pokemon = pokemonData.data;
               return {
                    id: pokemon.id,
                    name: pokemon.name, 
                    image: pokemon.sprites.other.dream_world.front_default,
                    types: pokemon.types
               }
          }))
          setIsLoading(false)

          setPokemonList(pokeListResult)
     }

     useEffect(()=>{
          downloadPokemons()
     },[])
  return (
    <div className='pokemon-list-wrapper' >
   
  
<div className='pokemon-wrapper'>

 {(isLoading) ? 'Loading....' : pokemonList.map((p) =>
<Pokemon name={p.name} image={p.image} key={p.id}/>)}
</div>
    </div>
  )
}

export default PokemonList