import { useState } from "react"
import { register } from "../api/api"
import { useNavigate } from "react-router"

export default function Register(){

  const navigate = useNavigate()

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function handleSubmit(e){

    e.preventDefault()

    await register({username,email,password})

    navigate("/login")

  }

  return(

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 p-8 rounded w-96"
      >

        <h2 className="text-xl mb-6">
          Register
        </h2>

        <input
          className="w-full mb-4 p-2 bg-black border border-zinc-800 rounded"
          placeholder="Username"
          onChange={e=>setUsername(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 bg-black border border-zinc-800 rounded"
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-6 p-2 bg-black border border-zinc-800 rounded"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button className="w-full bg-red-500 py-2 rounded">
          Register
        </button>

      </form>

    </div>

  )

}