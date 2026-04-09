import { Link } from "react-router"
import { useEffect, useState } from "react"

export default function Navbar(){

  const [username,setUsername] = useState(null)
  const [instructor,setInstructor] = useState(null)

  useEffect(()=>{

    function syncUser(){

      setUsername(localStorage.getItem("username"))
      setInstructor(localStorage.getItem("instructor_name"))

    }

    syncUser()

    window.addEventListener("storage", syncUser)

    return ()=>window.removeEventListener("storage", syncUser)

  },[])

  function logout(){

    localStorage.removeItem("user_id")
    localStorage.removeItem("username")

    localStorage.removeItem("instructor_id")
    localStorage.removeItem("instructor_name")

    window.location.href="/"

  }

  return(

    <div className="border-b border-zinc-800">

      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <Link to="/" className="text-red-500 font-bold text-lg">
          EduPortal
        </Link>

        <div className="flex gap-6 text-sm items-center">

          <Link to="/courses" className="hover:text-red-500">
            Courses
          </Link>

          {username && (
            <Link to="/dashboard" className="hover:text-red-500">
              Dashboard
            </Link>
          )}

          {instructor && (
            <Link to="/instructor/dashboard" className="hover:text-red-500">
              Instructor Panel
            </Link>
          )}

          {(username || instructor) ? (
            <>
              <span className="text-gray-400">
                Logged in as{" "}
                <span className="text-red-500">
                  {username || instructor}
                </span>
              </span>

              <button
                onClick={logout}
                className="hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-red-500">
                Login
              </Link>

              <Link to="/register" className="hover:text-red-500">
                Register
              </Link>

              <Link to="/instructor/login" className="hover:text-red-500">
                Instructor Login
              </Link>

              <Link to="/instructor/register" className="hover:text-red-500">
                Instructor Register
              </Link>
            </>
          )}

        </div>

      </div>

    </div>

  )
}