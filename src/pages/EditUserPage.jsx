"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Loader2, ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { useToast } from "../components/ui/use-toast"
import EditUserForm from "../components/EditUserForm"
import { fetchUser } from "../utils/api"

function EditUserPage() {
  const navigate = useNavigate()
  const params = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userId = params.id

    const loadUser = async () => {
      try {
        const userData = await fetchUser(userId)
        setUser(userData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load user data. Please try again.",
          variant: "destructive",
        })
        navigate("/users")
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [params.id, navigate, toast])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4">
        <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => navigate("/users")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit User</h1>
          {user ? <EditUserForm user={user} /> : <p className="text-red-500">User not found</p>}
        </div>
      </div>
    </div>
  )
}

export default EditUserPage

