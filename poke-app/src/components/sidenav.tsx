export default function SideNav() {
  return (
    <>
      <div className="md:fixed w-full md:w-1/12">
        <p className="text-lg md:text-xl uppercase tracking-wider mb-2 md:mb-4 border-b border-black inline-flex">types</p>
        <ul className="uppercase flex sm:flex-wrap">
          <li className="sm:mb-0 md:mb-2 mr-2">grass</li>
          <li className="sm:mb-0 md:mb-2 mr-2">fire</li>
          <li className="sm:mb-0 md:mb-2 mr-2">water</li>
          <li className="sm:mb-0 md:mb-2 mr-2">bug</li>
          <li className="sm:mb-0 md:mb-2 mr-2">normal</li>
        </ul>
        <p className="text-sm sm:hidden">etc</p>
      </div>
    </>
  )
}