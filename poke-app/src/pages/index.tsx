import Header from '@/components/header';
import SideNav from '@/components/sidenav';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react'

interface Pokemon {
  id: number;
  name: string;
  image : string;
  types01: string;
  types02: string;
  height: number;
  weight: number;
  //japaneseName: string;
}

const PokemonList: NextPage = () => {

  // ポケモンリストを保持し、リストを更新する
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  // 選択されたポケモンの情報を保持
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [showModal, setShowModal] = useState(false);

  // 各ポケモンをクリックした時
  const pokemonElementClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  const pokemonModalClose = () => {
    setSelectedPokemon(null);
    setShowModal(false);
  }

  /**
   * useEffectに渡された関数は、レンダーの結果が画面に反映された後に動作する
   * 関数の実行タイミングをReactのレンダリング後まで遅らせる
  */

  // ポケモンのリストを取得するための非同期関数を定義
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
            height: pokemonData.height * 10,
            weight: pokemonData.weight / 10,
          };
          // ドット絵の場合は pokemonData.sprites.front_default
        })
        
      );


      // const response02 = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=30");
      // const data02 = await response02.json();

      // const results02 = await Promise.all(
      //   data02.results.map(async (pokemon: { url: string }) => {
      //     const res02 = await fetch(pokemon.url);
      //     const pokemonData02 = await res02.json();
      //     return {
      //       japaneseName: pokemonData02.name[0].name,
      //     };
      //   })
      // );

      // ポケモンのリストを更新
      setPokemonList(results);

      // ポケモンのリストを更新
      //setPokemonList(results02);
      
    };

    // コンポーネントがマウントされた時だけfetchPokemon関数を実行
    fetchPokemon();
  }, []);

  return (
    <>
      <Head>
        <title>pokeccha</title>
        <meta property="og:title" content="PokeAPIでポケモンリストをつくろう" />
      </Head>
      <Header />
      
      <div className="px-10 pt-24 flex justify-between">
        <SideNav />
        <ul className="flex flex-wrap justify-between w-11/12 ml-auto">
          {pokemonList.map((pokemon) => (
          <li key={pokemon.id} className="mb-24 my-auto px-16 w-1/4 cursor-pointer" onClick={() => pokemonElementClick(pokemon)}>
            <img src={pokemon.image} alt={`${pokemon.name} Image`} />
            {/* <Image src={pokemon.image} alt={`${pokemon.name} Image`} width={100} height={100} /> */}
            <p className="mb-1">Order No. {pokemon.id}</p>
            <p className="text-2xl uppercase tracking-wider font-bold mb-2">{pokemon.name}</p>
            <p className="tracking-wide">Type: <span className="uppercase">{pokemon.types01}{pokemon.types02}</span></p>
          </li>
          ))}
        </ul>
      </div>

      {selectedPokemon && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center" onClick={pokemonModalClose}>
          <div className="bg-white h-1/2 flex justify-center items-center">
            <div className="h-full flex flex-col justify-center items-center">
              <div className="flex items-center">
              <img src={selectedPokemon.image} alt={`${selectedPokemon.name} Image`} className="w-2/4 mr-5" />
              <div className="w-2/4">
                <p className="text-3xl uppercase tracking-wider font-bold mb-4">{selectedPokemon.name}</p>
                <table className="tracking-wide text-left">
                  <tbody>
                    <tr>
                      <th className="mr-4 block">Type</th>
                      <td>{selectedPokemon.types01}{selectedPokemon.types02}</td>
                    </tr>
                    <tr>
                      <th className="mr-4 block">Height</th>
                      <td>{selectedPokemon.height}cm</td>
                    </tr>
                    <tr>
                      <th className="mr-4 block">Weight</th>
                      <td>{selectedPokemon.weight}Kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonList;