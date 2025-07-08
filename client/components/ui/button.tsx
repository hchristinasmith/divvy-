import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    
    const variantStyles = {
      default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90",
      outline: "border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--accent)]/10 text-[var(--foreground)]",
      ghost: "hover:bg-[var(--accent)]/10 text-[var(--foreground)]",
      link: "underline-offset-4 hover:underline text-[var(--foreground)]"
    }
    
    const sizeStyles = {
      default: "h-10 py-2 px-4",
      sm: "h-8 px-3 text-sm",
      lg: "h-11 px-8",
      icon: "h-10 w-10"
    }
    
    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ""}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
