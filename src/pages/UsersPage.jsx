"use client"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import UserList from "../components/UserList"
import UserHeader from "../components/UserHeader"
import { useToast } from "../components/ui/use-toast"

function UsersPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    })
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader onLogout={handleLogout} />
      <main className="container mx-auto py-6 px-4">
        <UserList />
      </main>
    </div>
  )
}

export default UsersPage

