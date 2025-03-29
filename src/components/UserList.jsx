"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useToast } from "./ui/use-toast"
import { Loader2, Search, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { fetchUsers, deleteUser } from "../utils/api"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredUsers, setFilteredUsers] = useState([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    loadUsers(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (users.length > 0) {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredUsers(filtered)
    }
  }, [searchQuery, users])

  const loadUsers = async (page) => {
    setLoading(true)
    try {
      const data = await fetchUsers(page)
      setUsers(data.data)
      setFilteredUsers(data.data)
      setTotalPages(data.total_pages)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (userId) => {
    navigate(`/users/edit/${userId}`)
  }

  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!userToDelete) return

    try {
      await deleteUser(userToDelete.id)
      setUsers(users.filter((user) => user.id !== userToDelete.id))
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userToDelete.id))
      toast({
        title: "User Deleted",
        description: `${userToDelete.first_name} ${userToDelete.last_name} has been deleted successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredUsers.length === 0 && !loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-24 flex items-center justify-center">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-white bg-white">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{`${user.first_name} ${user.last_name}`}</h3>
                  <p className="text-gray-500 mb-4">{user.email}</p>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleEdit(user.id)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                      onClick={() => handleDeleteClick(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {userToDelete?.first_name} {userToDelete?.last_name}'s account. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default UserList

