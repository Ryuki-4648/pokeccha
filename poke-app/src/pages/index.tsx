import Header from '@/components/header';
import SideNav from '@/components/sidenav';
import { NextPage } from 'next';
import { useEffect, useState } from 'react'

interface Pokemon {
  id: number;
  name: string;
  image : string;
  types01: string;
  types02: string;
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
          return { 
            id: pokemonData.id, 
            name: pokemonData.name,
            image: pokemonData.sprites.other['official-artwork'].front_default,
            types01: pokemonData.types[0].type.name,
            types02: pokemonData.types[1] ? `, ${pokemonData.types[1].type.name}` : "",
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
    <>
      <Header />
      
      <div className="px-10 pt-24 flex justify-between">
        <SideNav />
        <ul className="flex flex-wrap justify-between w-11/12 ml-auto">
          {pokemonList.map((pokemon) => (
          <li key={pokemon.id} className="mb-24 my-auto px-16 w-1/4">
            <img src={pokemon.image} alt={`${pokemon.name} Image`} />
            {/* <Image src={pokemon.image} alt={`${pokemon.name} Image`} width={100} height={100} /> */}
            <p className="mb-1">Order No. {pokemon.id}</p>
            <p className="text-2xl uppercase tracking-wider font-bold mb-2">{pokemon.name}</p>
            <p className="tracking-wide">Type: <span className="uppercase">{pokemon.types01}{pokemon.types02}</span></p>
          </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PokemonList;