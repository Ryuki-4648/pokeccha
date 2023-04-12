import { NextPage } from 'next';
import { useEffect, useState } from 'react'

interface Pokemon {
  id: number;
  name: string;
  image : string;
  types01: string;
  //types02: string;
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

          //const pokemonSpecies = await fetch(pokemonData.species.url);
          // console.log(data);
          return { 
            id: pokemonData.id, 
            name: pokemonData.name,
            image: pokemonData.sprites.other['official-artwork'].front_default,
            types01: pokemonData.types[0].type.name,
            //types02: pokemonData.types[1].type.name,
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
      <div className="flex justify-between pt-10 pl-10">
        <div className="flex items-center">
          <h1 className="text-center text-4xl tracking-wider mr-6">pokeccha</h1>
          <h2 className="text-center text-1xl tracking-wider leading-loose">Pick your favorite Pokemon!</h2>
        </div>
        <div className="flex mr-10 text-sm">
          <div className="mr-6 tracking-wide">
            <p className="mb-1">Mon - Fri : 9AM - 11PM</p>
            <p className="">Sat - Sun : 8AM - 20PM</p>
          </div>
          <div className="tracking-wider">
            <p className="mb-1">The RESTful Pokémon API</p>
            <p>https://pokeapi.co/</p>
          </div>
          
        </div>
      </div>
      <div className="px-10 pt-24 flex justify-between">
        <div className="fixed w-1/12">
          <p className="text-xl uppercase tracking-wider">types</p>
          <ul>
            <li>grass</li>
            <li>fire</li>
            <li>water</li>
            <li>bug</li>
            <li>normal</li>
          </ul>
          <p>etc</p>
        </div>
        <ul className="flex flex-wrap justify-between w-11/12 ml-auto">
          {pokemonList.map((pokemon) => (
          <li key={pokemon.id} className="mb-24 my-auto px-16 w-1/4">
            <img src={pokemon.image} alt={`${pokemon.name} Image`} />
            {/* <Image src={pokemon.image} alt={`${pokemon.name} Image`} width={100} height={100} /> */}
            <p className="mb-2">Order No. {pokemon.id}</p>
            <p className="text-2xl uppercase tracking-wider font-bold">{pokemon.name}</p>
            <p>Type: {pokemon.types01}</p>
          </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PokemonList;