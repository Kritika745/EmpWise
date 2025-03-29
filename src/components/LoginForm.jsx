"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useToast } from "./ui/use-toast"
import { Loader2, UserCircle } from "lucide-react"

function LoginForm() {
  const [email, setEmail] = useState("eve.holt@reqres.in")
  const [password, setPassword] = useState("cityslicka")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Email and password are required",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await login(email, password)
      toast({
        title: "Login Successful",
        description: "Welcome back! You've been logged in successfully.",
      })
      navigate("/users")
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <div className="bg-indigo-100 p-3 rounded-full">
            <UserCircle className="h-10 w-10 text-indigo-600" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">EmployWise</CardTitle>
        <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3"  disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-gray-500 mt-4 w-full">
          Default credentials: eve.holt@reqres.in / cityslicka
        </p>
      </CardFooter>
    </Card>
  )
}

export default LoginForm

