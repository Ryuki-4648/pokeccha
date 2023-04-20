export default function SideNav() {
  return (
    <>
      <div className="md:fixed w-full md:w-1/12">
        <p className="text-lg md:text-xl uppercase tracking-wider mb-2 md:mb-4 border-b border-black inline-flex">types</p>
        <ul className="uppercase flex flex-wrap">
          <li className="sm:mb-0 md:mb-2 mr-2 md:w-full">grass</li>
          <li className="sm:mb-0 md:mb-2 mr-2 md:w-full">fire</li>
          <li className="sm:mb-0 md:mb-2 mr-2 md:w-full">water</li>
          <li className="sm:mb-0 md:mb-2 mr-2 md:w-full">bug</li>
          <li className="sm:mb-0 md:mb-2 mr-2 md:w-full">grass</li>
          <li className="sm:mb-0 md:mb-2 mr-2 md:w-full">poison</li>
          <li className="sm:mb-0 md:mb-2 mr-2 md:w-full">flying</li>
          <li className="sm:mb-0 md:mb-2 mr-2 md:w-full">electric</li>
          <li className="sm:mb-0 md:mb-2 mr-2 md:w-full">normal</li>
        </ul>
        <p className="text-sm hidden md:block">etc</p>
      </div>
    </>
  )
}