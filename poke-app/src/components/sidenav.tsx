export default function SideNav() {
  return (
    <>
      <div className="fixed w-1/12">
        <p className="text-xl uppercase tracking-wider mb-4 border-b border-black inline-flex">types</p>
        <ul className="uppercase">
          <li className="mb-2">grass</li>
          <li className="mb-2">fire</li>
          <li className="mb-2">water</li>
          <li className="mb-2">bug</li>
          <li className="mb-2">normal</li>
        </ul>
        <p className="text-sm">etc</p>
      </div>
    </>
  )
}