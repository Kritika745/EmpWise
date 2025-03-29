"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useToast } from "./ui/use-toast"
import { Loader2 } from "lucide-react"
import { updateUser } from "../utils/api"

function EditUserForm({ user }) {
  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)
  const [email, setEmail] = useState(user.email)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!firstName || !lastName || !email) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await updateUser(user.id, {
        first_name: firstName,
        last_name: lastName,
        email: email,
      })

      toast({
        title: "Success",
        description: "User updated successfully",
      })

      navigate("/users")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-6">
      <div className="flex flex-col items-center">
        <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-indigo-100 mb-4">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={`${user.first_name} ${user.last_name}`}
            className="object-cover w-full h-full"
          />
        </div>
        <h2 className="text-lg font-medium text-gray-900">{`${user.first_name} ${user.last_name}`}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>

          <Button type="button" variant="outline" onClick={() => navigate("/users")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditUserForm

