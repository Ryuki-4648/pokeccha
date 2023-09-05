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
}

export const usePokemonHooks = () => {
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

      // ポケモンのリストを更新
      setPokemonList(results);
      setLoading(false);

      // ポケモンのリストを更新
      //setPokemonList(results02);
      
    };

    // コンポーネントがマウントされた時だけfetchPokemon関数を実行
    fetchPokemon();
  }, []);

  return {
    pokemonList,
    selectedPokemon,
    showModal,
    loading,
    pokemonElementClick,
    pokemonModalClose,
  }
};