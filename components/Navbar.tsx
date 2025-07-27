import Link from "next/link"
import AuthButtons from "./AuthButtons"

const Navbar = () => {
  return (
    <div className="bg-yellow-400 text-black p-5 h-18 flex items-center justify-between z-10 relative">
      <Link href="/" className="text-2xl tracking-widest font-bold uppercase">CarMart</Link>
      <ul className="flex gap-6 items-center uppercase tracking-widest">
        <li>
          <Link href="/vehicles">Vehicles</Link>
        </li>
        <li>
          <AuthButtons />
        </li>
      </ul>
    </div>
  )
}

export default Navbar