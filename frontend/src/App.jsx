import { Routes, Route } from "react-router"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Courses from "./pages/Courses"
import Dashboard from "./pages/Dashboard"
import InstructorLogin from "./pages/InstructorLogin"
import InstructorDashboard from "./pages/InstructorDashboard"
import InstructorRegister from "./pages/InstructorRegister"

export default function App() {

  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/instructor/login" element={<InstructorLogin />} />
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor/register" element={<InstructorRegister />} />

      </Routes>
    </>
  )
}