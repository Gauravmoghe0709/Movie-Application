import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext);

  const goHome = () => navigate('/')


  const handleLogout = async () => {
    await logout();
    alert("Logout successful")
    navigate("/login");
  }

  return (
    <nav className="w-full bg-[#071021] text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={goHome} className="text-xl font-bold">🎬 MovieApp</button>
      </div>
      <div className="flex items-center gap-3">

        {user ? (
          <button onClick={handleLogout} className='bg-red-600 px-4'>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")} className='bg-red-600 px-4'>Login</button>
        )}
      </div>
    </nav>
  )
}
