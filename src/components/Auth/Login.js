import { useState } from 'react'
import './Auth.css'
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import {
  loadingAuth,
  userAdmin,
  userLogin,
} from '../../redux/features/auth/authSlice'
import { loginUser } from '../../firebase/utils/auth'

export const Login = ({ setSignupForm }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthLoading } = useSelector((store) => store.auth)

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = (e) => {
    e.preventDefault()
    setShowPassword((showPassword) => !showPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    if (
      loginData.email === 'admin@gmail.com' &&
      loginData.password === 'Admin@1'
    ) {
      dispatch(userAdmin(true))
    }
    loginUser(loginData, dispatch, userLogin, loadingAuth, navigate, location)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Stack alignItems='center' mt={6}>
        <Typography
          component='h1'
          variant='h5'
          mt={3}
          style={{ color: 'var(--black)' }}
        >
          Login
        </Typography>

        <Box component='form' textAlign='center' onSubmit={handleSubmit}>
          <TextField
            label='Email'
            name='email'
            id='email'
            autoComplete='email'
            type='email'
            margin='normal'
            fullWidth
            required
            focused
          />
          <Box position='relative'>
            <TextField
              label='Password'
              name='password'
              id='password'
              autoComplete='password'
              type={showPassword ? 'text' : 'password'}
              margin='normal'
              fullWidth
              required
              focused
            />
            {showPassword ? (
              <IconButton
                onClick={(e) => toggleShowPassword(e)}
                className='password-icon'
                sx={{ position: 'absolute' }}
              >
                <VisibilityIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={(e) => toggleShowPassword(e)}
                className='password-icon'
                sx={{ position: 'absolute' }}
              >
                <VisibilityOffIcon />
              </IconButton>
            )}
          </Box>
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            {isAuthLoading ? (
              <CircularProgress sx={{ color: 'var(--white)' }} />
            ) : (
              'Login'
            )}
          </Button>
          <Button size='small' fullWidth onClick={() => setSignupForm(true)}>
            Don't have an account? Sign Up
          </Button>
        </Box>
        <Stack
          component='div'
          sx={{
            border: '2px solid var(--bg-dark)',
            borderRadius: '10px',
            padding: '10px',
            width: '100%',
          }}
          gap={1}
        >
          <Box
            component='p'
            sx={{ fontSize: '1rem', fontWeight: '500', textAlign: 'center' }}
          >
            Admin Credentials
          </Box>
          <Stack direction='row' gap={1}>
            <Box>Login Id:</Box>
            <Box sx={{ fontWeight: '600' }}>admin@gmail.com</Box>
          </Stack>
          <Stack direction='row' gap={1}>
            <Box>Password:</Box>
            <Box sx={{ fontWeight: '600' }}>Admin@1</Box>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
