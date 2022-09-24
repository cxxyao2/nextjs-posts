type ButtonProps = {
  isPrimary?: boolean
  className: string
  onClick: () => void
  children: React.ReactNode
}

const Button = ({
  isPrimary = true,
  className: addedClasses,
  onClick,
  children
}: ButtonProps) => {
  const baseClasses = ' text-sm rounded-md px-4 py-1 '
  const className = (
    isPrimary ? ' bg-indigo-400 text-white ' : ' bg-gray-200 text-gray-600'
  ).concat(baseClasses, ' ', addedClasses)
  return (
    <button
      className={className}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
