"use client"

import { createContext, useContext, useState } from "react"
import { cn } from "../../utils/cn"
import { X } from "lucide-react"

// Export the context so it can be imported in use-toast.js
export const ToastContext = createContext({
  toast: () => {},
})

// We'll keep this for backward compatibility, but it's also exported from use-toast.js now
export const useToast = () => useContext(ToastContext)

export const Toaster = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const toast = ({ title, description, variant = "default" }) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, variant }
    setToasts((prev) => [...prev, newToast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "bg-white rounded-lg border shadow-lg p-4 animate-in slide-in-from-right-5",
              toast.variant === "destructive" && "border-red-500 bg-red-50",
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className={cn("font-medium", toast.variant === "destructive" && "text-red-600")}>{toast.title}</h3>
                {toast.description && <p className="text-sm text-gray-500 mt-1">{toast.description}</p>}
              </div>
              <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

