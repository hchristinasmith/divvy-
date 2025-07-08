import * as React from "react"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(event.target.checked)
      }
    }

    return (
      <div className={`inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-[var(--primary)]' : 'bg-[var(--muted)]'} ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className || ""}`}>
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div
          aria-hidden="true"
          className={`${
            checked ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </div>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
