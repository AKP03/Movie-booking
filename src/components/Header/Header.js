import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { logoutUser } from '../../firebase/utils/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../redux/features/auth/authSlice'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoggedIn, user } = useSelector((state) => state.auth)

  const logoutHandle = () => {
    logoutUser(dispatch, userLogout, navigate)
  }
  return (
    <AppBar
      component={'nav'}
      position='fixed'
      sx={{ backgroundColor: 'var(--black)', color: 'var(--primary-dark)' }}
    >
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 20px',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Typography
            variant='h6'
            noWrap
            onClick={() => navigate('/')}
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Movie Booking
          </Typography>
        </Box>
        {isLoggedIn && (
          <Stack
            sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}
            direction={'row'}
            flexWrap='wrap'
            justifyContent='flex-end'
            spacing={1}
          >
            {user?.firstname && (
              <Typography variant='h5' sx={{ color: 'var(--white)' }}>
                Hii {user?.firstname}!!
              </Typography>
            )}
            <Typography
              textAlign='center'
              sx={{
                color: 'var(--white)',
                cursor: 'pointer',
                fontSize: '24px',
                fontWeight: '500',
              }}
              onClick={logoutHandle}
            >
              Logout
            </Typography>
          </Stack>
        )}
      </Container>
    </AppBar>
  )
}
