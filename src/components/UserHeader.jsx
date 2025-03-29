"use client"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"

function UserHeader({ onLogout }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">EmployWise</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}

export default UserHeader

