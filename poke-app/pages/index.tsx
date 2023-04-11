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
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30"); // PokeAPI取得
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
            types: pokemonData.types[0].type.name,
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
    <div className="px-10 pt-20">
      <h1 className="text-center text-2xl mb-3 tracking-wider">pokeccha</h1>
      <h2 className="text-center text-7xl mb-28 uppercase tracking-wider">Menu</h2>
      <ul className="flex flex-wrap justify-between">
        {pokemonList.map((pokemon) => (
        <li key={pokemon.id} className="mb-24 my-auto px-20 w-1/4">
          <img src={pokemon.image} alt={`${pokemon.name} Image`} />
          {/* <Image src={pokemon.image} alt={`${pokemon.name} Image`} width={100} height={100} /> */}
          <p className="mb-2">Order No. {pokemon.id}</p>
          <p className="text-2xl uppercase tracking-wider">{pokemon.name}</p>
          <p>Type: {pokemon.types}</p>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default PokemonList;