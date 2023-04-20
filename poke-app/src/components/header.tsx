export default function Header() {
  return (
    <>
      <div className="flex justify-between pt-8 md:pt-10 pl-4 md:pl-10 flex-wrap lg:flex-nowrap">
        <div className="flex items-center mb-4 w-full md:w-auto md:mr-2">
          <h1 className="text-center text-3xl md:text-4xl tracking-wider mr-4 md:mr-6">pokeccha</h1>
          <h2 className="text-center text-sm md:text-1xl tracking-wider leading-loose">Pick your favorite Pokemon!</h2>
        </div>
        <div className="flex flex-wrap md:flex-nowrap md:mr-10 text-sm md:justify-end">
          <div className="sm:mr-6 tracking-wide w-full md:w-auto mb-2 md:mb-0">
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
