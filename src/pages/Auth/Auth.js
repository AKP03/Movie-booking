import { Stack } from '@mui/material'
import { useState } from 'react'
import { Login, Signup } from '../../components'

export const Auth = () => {
  const [signupForm, setSignupForm] = useState(false)

  return (
    <Stack
      direction='row'
      alignItems='center'
      alignContent='center'
      minHeight='100vh'
    >
      {signupForm ? (
        <Signup setSignupForm={setSignupForm} />
      ) : (
        <Login setSignupForm={setSignupForm} />
      )}
    </Stack>
  )
}
