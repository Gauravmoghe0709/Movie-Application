import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {

 const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


   const handleform = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://movie-application-vha9.onrender.com/user/login",{
        email: email,
        password: password, 
      },{withCredentials:true});
      const user = res.data.user
      if (user) {
        await login(user)
        if (user.role === 'admin') navigate('/admindashboard')
        else navigate('/')
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }

  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f1021] via-[#14162e] to-[#1b1e3c] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-red-500 text-2xl">🎬</span>
          <h1 className="text-2xl font-bold text-white">MovieApp</h1>
        </div>

        <h2 className="text-xl font-semibold text-white mb-6">
          User Login
        </h2>
        <form onSubmit={handleform}>
            <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
        />
        <button className="w-full rounded-lg bg-linear-to-r from-red-600 to-red-500 py-3 font-semibold text-white transition hover:opacity-90" >
          Login
        </button>
         </form>
      <div className="mt-6 text-center text-sm text-gray-300">
        <h2> If you don't have an account ? </h2>
           <a href="/register" className="text-red-500 cursor-pointer hover:underline">
             Register
          </a>
      </div>
      </div>
    </div>
  );
};


export default Login
