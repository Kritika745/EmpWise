const BASE_URL = "https://reqres.in/api"

// Login
export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }

  return response.json()
}

// Fetch users with pagination
export const fetchUsers = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/users?page=${page}`)

  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }

  return response.json()
}

// Fetch a single user
export const fetchUser = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch user")
  }

  const data = await response.json()
  return data.data
}

// Update user
export const updateUser = async (id, userData) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Failed to update user")
  }

  return response.json()
}

// Delete user
export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete user")
  }

  return true
}

