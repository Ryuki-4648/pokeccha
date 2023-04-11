import { NextPage } from 'next';
import { useEffect, useState } from 'react'

// const inter = Inter({ subsets: ['latin'] })

interface Pokemon {
  id: number;
  name: string;
  image : string;
  types: string;
  height: number;
  weight: number;
}
const PokemonList: NextPage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => { // asyncを書いて非同期（async）関数であることを宣言
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10"); // PokeAPI取得
      const data = await response.json();

      const results = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          const res = await fetch(pokemon.url);
          const pokemonData = await res.json();

          const pokemonSpecies = await fetch(pokemonData.species.url);
          // console.log(data);
          return { 
            id: pokemonData.id, 
            name: pokemonData.name,
            image: pokemonData.sprites.other['official-artwork'].front_default,
            types: pokemonData.types,
            height: pokemonData.height,
            weight: pokemonData.weight,
          };
          // ドット絵の場合は pokemonData.sprites.front_default
        })
      );

      setPokemonList(results);
    };

    fetchPokemon();
  }, []);

  return (
    <div>
      <h1 className="text-center text-4xl">pokeccha</h1>
      <ul>
        {pokemonList.map((pokemon) => (
        <li key={pokemon.id}>
          <p>No. {pokemon.id}</p>
          <p>{pokemon.name}</p>
          <img src={pokemon.image} alt={`${pokemon.name} Image`} />
          {/* <Image src={pokemon.image} alt={`${pokemon.name} Image`} width={100} height={100} /> */}
        </li>
      ))}
      </ul>
    </div>
  );
};

export default PokemonList;