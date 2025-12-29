import { createContext, useState, useCallback } from "react";
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try{
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    }catch(e){ return null }
  });

  const login = async (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = async () => {
    try{
      await axios.post('http://localhost:3000/user/logout', {}, { withCredentials: true })
    }catch(err){
      console.error('Logout request failed', err)
    } finally {
      localStorage.removeItem('user')
      setUser(null)
    }
  }

  const fetchCurrentUser = useCallback(async () => {
    try{
      const res = await axios.get('http://localhost:3000/user/me', { withCredentials: true })
      if(res.data && res.data.user){
        setUser(res.data.user)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        return res.data.user
      }
    }catch(err){
      setUser(null)
      localStorage.removeItem('user')
    }
    return null
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
