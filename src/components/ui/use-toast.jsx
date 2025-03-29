"use client"

import { useContext } from "react"
import { ToastContext } from "./toaster"

export const useToast = () => useContext(ToastContext)

