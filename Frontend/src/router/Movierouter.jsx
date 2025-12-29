import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Searchmovie from '../pages/Searchmovie'
import Register from '../pages/Register'
import Addmovie from '../pages/Addmovie'
import Editmovie from '../pages/Editmovie'
import Admindashboard from "../pages/Admindashboard"
import ProtectedRoute from "../component/ProtectedRoute"

const Movierouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>} />
      <Route path='/login' element={<Login />} />
      <Route path='/searchmovie' element={<Searchmovie />} />
      <Route path='/register' element={<Register />} />
      <Route path='/addmovie' element={<Addmovie />} />
      <Route path='/editmovie/:id' element={<Editmovie />} />
      <Route path='editmovie/:id' element={<Editmovie />} />
        <Route path='/admindashboard' element={
          <ProtectedRoute role="admin">
            <Admindashboard/>
        </ProtectedRoute>} />
   </Routes>
  )
}

export default Movierouter