import { useSession, singIn, singOut } from 'next-auth/react'

const LoginButton = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Singed in as {session?.user?.email} <br />
        <button onClick={() => singOut()}>Sign out</button>
      </>
    )
  }

  return (
    <>
      Not signed in
      <br />
      <button onClick={() => singIn()}>Sign in</button>
    </>
  )
}

export default LoginButton
