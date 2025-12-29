import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Navbar from "../component/Navbar"

const Searchmovie = () => {
  const [searchparams] = useSearchParams();
  const query = searchparams.get("name");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSearchResults = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      if (!query) {
        setResults([]);
        return;
      }

      const res = await axios.get(
        `http://localhost:3000/movies/searchmovie/search?query=${query}`,
        { withCredentials: true }
      );

      const movies = res.data?.searchmovie ?? [];
      if (!movies.length) {
        setResults([]);
        setError("Movie not found");
      } else {
        setResults(movies);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const refresh = () => fetchSearchResults();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0b0f1a] via-[#0e1325] to-[#0b0f1a] text-white">
        <p className="p-4">Loading...</p>
      </div>
    );

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-linear-to-br from-[#0b0f1a] via-[#0e1325] to-[#0b0f1a] text-white">
      <header className="w-full bg-transparent sticky top-0 z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm rounded-md"
          >
            Home
          </Link>
          <div className="text-sm text-gray-300">Search results for "{query ?? ''}"</div>
        </div>
      </header>
      <main className="p-4">
      {error ? (
        <div className="max-w-xl mx-auto text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            aria-label="Retry fetching movies"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h2 className="sr-only">Search results for {query}</h2>
          <div className="space-y-6">
            {(Array.isArray(results) ? results : []).map((m) => (
              <article
                key={m._id || m.id}
                className="bg-white/5 rounded-xl overflow-hidden shadow-md transition duration-200 p-4 flex flex-col sm:flex-row gap-4 items-start"
              >
                <div className="w-full sm:w-44 md:w-56 shrink-0 rounded-md overflow-hidden bg-gray-900">
                  <img
                    src={(m.poster && m.poster.startsWith && m.poster.startsWith('/')) ? `http://localhost:3000${m.poster}` : m.poster}
                    alt={m.name}
                    className="w-full h-full sm:h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{m.name}</h3>
                    {m.description && (
                      <p className="text-sm text-gray-300 mb-2 line-clamp-3">{m.description}</p>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-300">
                    <div className="flex items-center gap-2">⭐ <span>{m.rating ?? "N/A"}</span></div>
                    <div className="text-xs">{m.duration ?? "-"}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      </main>
    </div>
    </>
  );
};

export default Searchmovie;
