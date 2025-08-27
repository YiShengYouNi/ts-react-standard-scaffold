import React from 'react'

export type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export default function Button({ children, onClick, disabled = false }: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className="btn border-gray-300 bg-white hover:bg-gray-50"
    >
      {children}
    </button>
  )
}
