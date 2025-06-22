import Link from "next/link"

const Navbar = () => {
  return (
    <div className="bg-yellow-500 text-black p-3 flex">
        <div className="flex-1">
            <Link href="/">CarMart</Link>
        </div>
        <div>
            <Link href="/showroom" className="mr-2.5">Showroom</Link>
            <Link href="/auth">Login</Link>
        </div>
    </div>
  )
}

export default Navbar