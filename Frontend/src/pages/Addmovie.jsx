import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Addmovie = () => {
  
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    relesedate: '',
    rating: '',
    duration: '',
    poster: ''
  }); 
  const [busy, setBusy] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data } = await axios.post('https://movie-application-vha9.onrender.com/movies/addmovies' ,form, { withCredentials: true })
      console.log(data)
      navigate("/Admindashboard")
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Request failed'
      alert('Failed: ' + msg)
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setSelectedFile(file)
    const fd = new FormData()
    fd.append('image', file)
    try {
      const res = await axios.post('https://movie-application-vha9.onrender.com/movies/upload', fd, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } })
      const fileUrl = res.data.fileUrl
      setForm(prev => ({ ...prev, poster: fileUrl }))
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Upload failed'
      alert('Image upload failed: ' + msg)
    }
  }

  return (
    <div className="min-h-screen p-4 bg-[#071021] text-white">
      <div className="max-w-2xl mx-auto bg-white/5 rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Add Movie</h2>
        <form onSubmit={submit} className="space-y-3">
          <input name="name" value={form.name} onChange={handle} placeholder="Title" className="w-full px-3 py-2 rounded bg-white/5" />
          <textarea name="description" value={form.description} onChange={handle} placeholder="Description" className="w-full px-3 py-2 rounded bg-white/5" rows={4} />
          <div className="grid grid-cols-2 gap-2">
            <input type="date" name="relesedate" value={form.relesedate} onChange={handle} placeholder="Release Date" className="px-3 py-2 rounded bg-white/5" />
            <input name="duration" value={form.duration} onChange={handle} placeholder="Duration" className="px-3 py-2 rounded bg-white/5" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input name="rating" value={form.rating} onChange={handle} placeholder="Rating" className="px-3 py-2 rounded bg-white/5" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Poster Image</label>
            <input type="file" accept="image/*" onChange={handleFile} className="w-full" />
            {form.poster && (
              <img src={form.poster} alt="poster" className="mt-2 max-h-40 object-contain" />
            )}
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={busy} className="bg-blue-600 px-4 py-2 rounded">{busy ? 'Saving...' : 'Add Movie'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Addmovie

