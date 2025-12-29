import { Search } from "lucide-react";
import Navbar from "../component/Navbar";
import { useContext, useState } from "react"
import { Moviescontext } from "../context/MoviesContext";
import {useNavigate} from "react-router-dom"
import axios from 'axios'

export default function Home() {
  const navigate=useNavigate()

  const [query, setquery] = useState("")
  const { movie, loading, error, refresh } = useContext(Moviescontext)


  const searchmovie = async () => {
    navigate(`/searchmovie?name=${query}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b0f1a] via-[#0e1325] to-[#0b0f1a] text-white flex flex-col">
      <Navbar />
      <section className="px-4 md:px-8 mt-4 flex flex-col md:flex-row gap-3">
        <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 flex-1">
          <Search className="w-4 h-4 text-gray-300" />
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setquery(e.target.value)}
            className="bg-transparent outline-none px-2 text-sm w-full"
          />
          <button className="bg-gray-700 px-4 py-2 rounded-xl transition-transform hover:scale-105" onClick={searchmovie}>Search</button>
        </div>
        <select className="bg-gray-700 rounded-lg px-4 py-2 text-sm outline-none" value={""} onChange={(e)=>{}}
        >
          <option value="">Sort</option>
        </select>
        <div className="ml-2">
          <select className="bg-gray-700 rounded-lg px-4 py-2 text-sm outline-none" onChange={async (e)=>{
            const val = e.target.value;
            if(!val){
              refresh();
              return;
            }
            const [by, order] = val.split("_")
            try{
              const res = await axios.get('http://localhost:3000/movies/sortedmovie', { params: { by, order }, withCredentials: true })
              const data = res.data
              if(data.sortedmovies){
                setmovie(data.sortedmovies)
              }
            }catch(err){
              console.error('Sort request failed', err)
              alert('Failed to sort movies')
            }
          }}>
            <option value="">Default</option>
            <option value="rating_desc">Rating (High → Low)</option>
            <option value="rating_asc">Rating (Low → High)</option>
            <option value="duration_desc">Duration (Long → Short)</option>
            <option value="duration_asc">Duration (Short → Long)</option>
            <option value="name_asc">Name (A → Z)</option>
            <option value="name_desc">Name (Z → A)</option>
          </select>
        </div>
      </section>
      <section className="px-4 md:px-8 mt-6 flex-1">
        <h2 className="text-lg font-semibold mb-4">Home - All Movies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="text-gray-300">Loading movies...</div>
          ) : error ? (
            <div className="text-red-400">
              Error loading movies.
              <button className="ml-3 px-3 py-1 bg-gray-700 rounded" onClick={refresh}>Retry</button>
            </div>
          ) : (
            (Array.isArray(movie) ? movie : []).map((m) => (
              <div
                key={m._id || m.id}
                className="bg-white/10 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
              >
                <img
                  src={(m.poster && m.poster.startsWith && m.poster.startsWith('/')) ? `http://localhost:3000${m.poster}` : m.poster}
                  alt={m.name}
                  className="h-100 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-base mb-2">{m.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>⭐ {m.rating}</span>
                    <span>{m.duration}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="mt-10 py-6 text-center text-sm text-gray-400 border-t border-white/10">
        <p>© 2024 MovieApp. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
