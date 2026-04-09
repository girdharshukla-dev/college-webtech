import { Link } from "react-router"

export default function Navbar(){

  return (

    <div className="border-b border-zinc-800">

      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <Link to="/" className="text-red-500 font-bold text-lg">
          EduPortal
        </Link>

        <div className="flex gap-6 text-sm">

          <Link to="/courses" className="hover:text-red-500">
            Courses
          </Link>

          <Link to="/dashboard" className="hover:text-red-500">
            Dashboard
          </Link>

          <Link to="/login" className="hover:text-red-500">
            Login
          </Link>

        </div>

      </div>

    </div>

  )
}