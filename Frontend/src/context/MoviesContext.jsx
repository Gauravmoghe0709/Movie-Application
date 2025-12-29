import React, { createContext, useState, useEffect, useCallback } from "react"
import axios from "axios";

export const Moviescontext = createContext();

const MoviesProvider = ({ children }) => {
  const [movie, setmovie] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMovies = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get("http://localhost:3000/movies/allmovies", { withCredentials: true });
      const data = response.data
      console.log(data);
      const moviesArray = data.allmovies ?? data.sortedmovies ?? data.searchmovie ?? (Array.isArray(data) ? data : [])
      setmovie(moviesArray)
    } catch (err) {
      setError(err)
      console.error('Error fetching movies:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <Moviescontext.Provider value={{ movie, setmovie, loading, error, refresh: fetchMovies }}>
      {children}
    </Moviescontext.Provider>
  )
}

export default MoviesProvider
