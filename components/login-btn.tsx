import { useSession, signIn, signOut } from 'next-auth/react'
type LoginButtonProps = {
  className: string
}

const LoginButton = ({ className }: LoginButtonProps) => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <div className={' relative '.concat(className)}>
          <span>{session?.user?.name}</span>
          <div className='absolute top-0 left-0 bg-white'>
            <div onClick={() => signOut()}>Sign Out</div>
            <div>Personal Setting TODO </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <button
        className={className}
        onClick={() => signIn()}>
        Sign in
      </button>
    </>
  )
}

export default LoginButton
