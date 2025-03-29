"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { loginUser } from "../utils/api"

const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  login: async () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if token exists in localStorage
    const storedToken = localStorage.getItem("auth_token")
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email, password) => {
    const response = await loginUser(email, password)
    const { token } = response

    localStorage.setItem("auth_token", token)
    setToken(token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setToken(null)
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>{children}</AuthContext.Provider>
}

