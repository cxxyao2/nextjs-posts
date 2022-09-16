import { useSession, signIn, signOut } from 'next-auth/react'
type LoginButtonProps = {
  className: string
}

const LoginButton = ({ className }: LoginButtonProps) => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <button
          className={className}
          onClick={() => signOut()}>
          <span className='mr-2'>{session?.user?.name}</span>Sign out
        </button>
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
