import React from "react"
import { cn } from "../../utils/cn"

const AlertDialog = ({ children, open, onOpenChange }) => {
  if (!open) return null

  return <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">{children}</div>
}

const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-white rounded-lg border border-gray-200 shadow-lg max-w-lg w-full p-6", className)}
    {...props}
  />
))
AlertDialogContent.displayName = "AlertDialogContent"

const AlertDialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)

const AlertDialogFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className)} {...props} />
)

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
))
AlertDialogTitle.displayName = "AlertDialogTitle"

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-gray-500", className)} {...props} />
))
AlertDialogDescription.displayName = "AlertDialogDescription"

const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2",
      className,
    )}
    {...props}
  />
))
AlertDialogAction.displayName = "AlertDialogAction"

const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-100 h-10 px-4 py-2",
      className,
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = "AlertDialogCancel"

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

