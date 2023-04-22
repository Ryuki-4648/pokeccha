import Header from '@/components/header';
import Loading from '@/components/loading';
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
  hp: number;
  offensivePower: number;
  defensePower: number;
  specialOffensivePower: number;
  specialDefensePower: number;
  speed: number;
  //japaneseName: string;
}

const PokemonList: NextPage = () => {

  // ポケモンリストを保持し、リストを更新する
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  // 選択されたポケモンの情報を保持
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  // モーダルウィンドウの表示
  const [showModal, setShowModal] = useState(false);

  // loading
  const [loading, setLoading] = useState(true);

  // 各ポケモンをクリックした時
  const pokemonElementClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  // モーダルを閉じる
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
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150"); // PokeAPI取得
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
            hp: pokemonData.stats[0].base_stat,
            offensivePower: pokemonData.stats[1].base_stat,
            defensePower: pokemonData.stats[2].base_stat,
            specialOffensivePower: pokemonData.stats[3].base_stat,
            specialDefensePower: pokemonData.stats[4].base_stat,
            speed: pokemonData.stats[5].base_stat,
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
      setLoading(false);

      // ポケモンのリストを更新
      //setPokemonList(results02);
      
    };

    // コンポーネントがマウントされた時だけfetchPokemon関数を実行
    fetchPokemon();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>pokeccha | お気に入りのポケモンを見つけよう</title>
        <meta name="description" content="pokeccha | React.js, TypeScript, Next.js, PokeAPIでポケモンリスト作成" />
        <meta property="og:title" content="pokeccha | お気に入りのポケモンを見つけよう" />
      </Head>
      <Header />
      
      <div className="px-4 md:px-10 pt-4 sm:pt-8 md:pt-24 flex justify-between flex-wrap md:flex-nowrap">
        <SideNav />
        <ul className="flex flex-wrap justify-between md:justify-start w-4/5 sm:w-10/12 mx-auto md:ml-auto md:mr-0 mt-8 md:mt-0">
          {pokemonList.map((pokemon) => (
          <li key={pokemon.id} className="mb-12 md:mb-24 px-4 md:px-12 sm:w-5/12 md:w-1/3 lg:w-1/4 cursor-pointer duration-300 hover:opacity-70" onClick={() => pokemonElementClick(pokemon)}>
            <img src={pokemon.image} alt={`${pokemon.name} Image`} />
            {/* <Image src={pokemon.image} alt={`${pokemon.name} Image`} width={100} height={100} /> */}
            <p className="mb-1">Order No. {pokemon.id}</p>
            <h2 className="text-2xl uppercase tracking-wider font-bold mb-2">{pokemon.name}</h2>
            <p className="tracking-wide">Type: <span className="uppercase">{pokemon.types01}{pokemon.types02}</span></p>
          </li>
          ))}
        </ul>
      </div>

      {selectedPokemon && (
        <>
          <div className="modal-overlay bg-black bg-opacity-70 cursor-pointer" onClick={pokemonModalClose}></div>
            <div className="flex justify-center items-center">
              <div className="rounded-3xl bg-main-color01 w-11/12 lg:w-3/4 h-5/6 lg:h-3/4 flex flex-col justify-center items-center p-6 fixed z-10 left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center flex-wrap justify-center md:justify-between md:flex-nowrap w-full">
                <img src={selectedPokemon.image} alt={`${selectedPokemon.name} Image`} className="w-3/4 sm:w-1/2 md:w-2/5 mb-2 md:mb-0 mr-0 md:mr-10" />
                <div className="w-full lg:w-2/4">
                  <p className="mb-1 md:mb-4 tracking-wider text-xl text-gray-700">Order Menu</p>
                  <h3 className="text-4xl md:text-5xl uppercase tracking-wider font-bold mb-6 md:mb-10 text-font-color01">{selectedPokemon.name}</h3>
                  <table className="tracking-wider text-left text-gray-700">
                    <tbody>
                      <tr>
                        <th className="mb-2 mr-4 md:mr-8 block text-lg md:text-xl">Type</th>
                        <td className="uppercase text-md md:text-lg">{selectedPokemon.types01}{selectedPokemon.types02}</td>
                      </tr>
                      <tr>
                        <th className="mb-2 mr-4 md:mr-8 block text-lg md:text-xl">Height</th>
                        <td className="text-md md:text-lg">{selectedPokemon.height}cm</td>
                      </tr>
                      <tr>
                        <th className="mb-2 mr-4 md:mr-8 block text-lg md:text-xl">Weight</th>
                        <td className="text-md md:text-lg">{selectedPokemon.weight}Kg</td>
                      </tr>
                      <tr>
                        <th className="mb-2 mr-4 md:mr-8 block text-lg md:text-xl">HP</th>
                        <td className="text-md md:text-lg">{selectedPokemon.hp}</td>
                      </tr>
                      <tr>
                        <th className="mb-2 mr-4 md:mr-8 block text-lg md:text-xl">Offensive Power</th>
                        <td className="text-md md:text-lg">{selectedPokemon.offensivePower}</td>
                      </tr>
                      <tr>
                        <th className="mb-2 mr-4 md:mr-8 block text-lg md:text-xl">Defense Power</th>
                        <td className="text-md md:text-lg">{selectedPokemon.defensePower}</td>
                      </tr>
                      <tr>
                        <th className="mb-2 mr-4 md:mr-8 block text-lg md:text-xl">Sp.Offensive Power</th>
                        <td className="text-md md:text-lg">{selectedPokemon.specialOffensivePower}</td>
                      </tr>
                      <tr>
                        <th className="mb-2 mr-4 md:mr-8 block text-lg md:text-xl">Sp.Defense Power</th>
                        <td className="text-md md:text-lg">{selectedPokemon.specialDefensePower}</td>
                      </tr>
                      <tr>
                        <th className="mr-8 block text-lg md:text-xl">Speed</th>
                        <td className="text-md md:text-lg">{selectedPokemon.speed}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </div>
        </>
      )}
    </>
  );
};

export default PokemonList;