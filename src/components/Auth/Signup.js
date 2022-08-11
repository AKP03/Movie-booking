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
import CircularProgress from '@mui/material/CircularProgress'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { createUser } from '../../firebase/utils/auth'
import { useDispatch, useSelector } from 'react-redux'
import { loadingAuth, userLogin } from '../../redux/features/auth/authSlice'
import { useLocation, useNavigate } from 'react-router-dom'

export const Signup = ({ setSignupForm }) => {
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
    const userData = {
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      email: data.get('email'),
      password: data.get('password'),
    }
    createUser(userData, dispatch, userLogin, loadingAuth, navigate, location)
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
          Sign Up
        </Typography>

        <Box component='form' textAlign='center' onSubmit={handleSubmit}>
          <TextField
            label='First Name'
            name='firstname'
            id='firstname'
            autoComplete='firstname'
            type='text'
            margin='normal'
            fullWidth
            required
            autoFocus
            focused
          />
          <TextField
            label='Last Name'
            name='lastname'
            id='lastname'
            autoComplete='lastname'
            type='text'
            margin='normal'
            fullWidth
            required
            focused
          />
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
              'Sign Up'
            )}
            {/* Sign Up */}
          </Button>
          <Button size='small' fullWidth onClick={() => setSignupForm(false)}>
            Already have an account? Login
          </Button>
        </Box>
      </Stack>
    </Container>
  )
}
