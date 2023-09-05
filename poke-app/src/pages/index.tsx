import Header from '@/components/header';
import Loading from '@/components/loading';
import SideNav from '@/components/sidenav';
import { usePokemonHooks } from '@/hooks/usePokemonHooks';
import { NextPage } from 'next';

const PokemonList: NextPage = () => {
  const {
    pokemonList,
    selectedPokemon,
    loading,
    pokemonElementClick,
    pokemonModalClose,
  } = usePokemonHooks();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
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