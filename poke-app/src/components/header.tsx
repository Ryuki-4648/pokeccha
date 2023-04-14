export default function Header() {
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
            <a href="https://pokeapi.co/" target="_blank" className="underline">https://pokeapi.co/</a>
          </div>
          
        </div>
      </div>
    </>
  )
}
