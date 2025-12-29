import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Dropdown() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
         Menu
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-700  rounded-md shadow-lg z-50">
          <button
            onClick={()=>{navigate("/addmovie")}}
            className="block w-full text-left px-4 py-2 hover:bg-gray-600"
          >
            Add Movie
          </button>

          <button
            onClick={()=>{navigate("")}}
            className="block w-full text-left px-4 py-2 hover:bg-gray-600"
          >
            Editmovie
          </button>

          <button
            onClick={""}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
