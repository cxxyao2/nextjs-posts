type ButtonProps = {
  children: React.ReactNode
  className: string
  onClick: (e: any) => void
}

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`py-2 px-3 text-white rounded-md bg-indigo-400 ${className}`}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
