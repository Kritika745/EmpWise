"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import LoginPage from "./pages/LoginPage"
import UsersPage from "./pages/UsersPage"
import EditUserPage from "./pages/EditUserPage"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/edit/:id"
        element={
          <ProtectedRoute>
            <EditUserPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App

