import { Link } from "react-router"

export default function Home(){

  return(

    <div className="max-w-5xl mx-auto text-center mt-32">

      <h1 className="text-4xl font-bold mb-6">
        Online Learning Portal
      </h1>

      <p className="text-gray-400 mb-8">
        Learn new technologies through structured courses.
      </p>

      <Link
        to="/courses"
        className="bg-red-500 px-6 py-3 rounded hover:opacity-90"
      >
        Explore Courses
      </Link>

    </div>

  )

}