import React, { useCallback, useContext, useEffect, useState } from "react"
import { Route, Routes, Navigate, Outlet } from "react-router-dom"
import { Login } from "../pages/login/login"
import { Registration } from "../pages/registration/registration"

const storageName = "token"

const AuthContext = React.createContext()
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(storageName))

  const login = useCallback((jwtToken) => {
    setToken(jwtToken)
    localStorage.setItem(storageName, jwtToken)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const jwtToken = localStorage.getItem(storageName)
    if (jwtToken) {
      login(jwtToken)
    }
  }, [login])
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token: token,
      }}>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />}/>
            <Route path='/' element={<PrivateRoute />}>
               <Route path='/' element={children}/>
            </Route>
        </Routes> 
    </AuthContext.Provider>
  )
}

const PrivateRoute = ({...rest}) => {
    const {token} = useAuth()
    return token ? <Outlet/> : <Navigate to='/login' />
}
