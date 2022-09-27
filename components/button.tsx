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
  const baseClasses = ' text-sm rounded-md px-4 py-1 outline '
  const className = (
    isPrimary
      ? ' bg-indigo-400 text-white outline-indigo-200 '
      : ' bg-gray-200 text-gray-600 outline-gray-100 focus:outline-gray-600 active:outline-gray-600'
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
