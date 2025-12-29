import Navbar from "../component/Navbar"
import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Moviescontext } from "../context/MoviesContext";

const Admindashboard = () => {
   const { movie, loading, error, refresh } = useContext(Moviescontext)
   const [openMenuId, setOpenMenuId] = useState(null)
   const navigate = useNavigate()

   const handleUpdate = (id) => {
     navigate(`/editmovie/${id}`)
   }

   const handleDelete = async (id) => {
     if (!confirm('Delete this movie?')) return
     try {
       await axios.delete(`http://localhost:3000/movies/deletemovie/${id}`, { withCredentials: true })
       refresh()
     } catch (err) {
       console.error('delete failed', err)
       alert('Delete failed')
     }
   }

   return (
    <div className="min-h-screen bg-linear-to-br from-[#0b0f1a] via-[#0e1325] to-[#0b0f1a] text-white flex flex-col">
         <Navbar />

       <section className="px-4 md:px-8 mt-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Home - All Movies</h2>
          <button onClick={() => navigate('/addmovie')} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Add Movie</button>
        </div>

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
                className="bg-white/10 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition relative"
              >
                <button onClick={() => setOpenMenuId(openMenuId === (m._id || m.id) ? null : (m._id || m.id))} className="absolute top-2 right-2 z-20 text-white bg-black/40 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v.01M12 12v.01M12 18v.01" />
                  </svg>
                </button>
                {openMenuId === (m._id || m.id) && (
                  <div className="absolute top-10 right-2 z-30 bg-gray-800 rounded shadow-lg">
                    <button onClick={() => handleUpdate(m._id || m.id)} className="block px-4 py-2 text-left hover:bg-gray-700">Update Movie</button>
                    <button onClick={() => handleDelete(m._id || m.id)} className="block px-4 py-2 text-left text-red-500 hover:bg-gray-700">Delete Movie</button>
                  </div>
                )}
                <img
                  src={m.poster ? `http://localhost:3000${m.poster}` : "../../images/image1.jpg"}
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

export default Admindashboard
