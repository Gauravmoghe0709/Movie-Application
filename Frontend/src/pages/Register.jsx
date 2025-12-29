import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
 const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Role,setRole] = useState("")
  const [Password, setPassword] = useState("");

  async function handleregistration(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/user/register", {
        name: Name,
        email: Email,
        password: Password,
        role: Role
      },{withCredentials:true});
      console.log(res.data);
      navigate('/login');
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f1021] via-[#14162e] to-[#1b1e3c] px-4">
      
      
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-red-500 text-2xl">🎬</span>
          <h1 className="text-2xl font-bold text-white">MovieApp</h1>
        </div>

        <h2 className="text-xl font-semibold text-white mb-6">
          Create Account
        </h2>        
       <form onSubmit={handleregistration}>
         <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={Name}
          placeholder="Name"
          className="w-full mb-4 rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
          className="w-full mb-4 rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={Password}
          className="w-full mb-4 rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="Role"
          placeholder="Role"
          onChange={(e) => setRole(e.target.value)}
          value={Role}
          className="w-full mb-4 rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
        />
        <button className="w-full rounded-lg bg-linear-to-r from-red-600 to-red-500 py-3 font-semibold text-white transition hover:opacity-90">
          Register
        </button>
       </form>

       <div className="mt-6 text-center text-sm text-gray-300">
        <h2> you have already an account ? </h2>
           <a href="/login" className="text-red-500 cursor-pointer hover:underline">
             Login
          </a>
      </div>
    </div>
    </div>
    
  );
};

export default Register;
