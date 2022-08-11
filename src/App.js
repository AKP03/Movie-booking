import { Box, Grid } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import './App.css'
import { Header, SideNav } from './components'
import { getUserData } from './firebase/utils/auth'
import { Router } from './router/Router'

function App() {
  const { isLoggedIn } = useSelector((store) => store.auth)
  const dispatch = useDispatch()

  let userId = localStorage.getItem('userId')

  useEffect(() => {
    dispatch(getUserData(userId))
  }, [dispatch, userId])

  return (
    <div className='App'>
      <Header />
      <Box className={isLoggedIn ? 'main-container' : ''}>
        <Grid container justifyContent='center'>
          {isLoggedIn && <SideNav />}
          <Grid item className={isLoggedIn ? 'main-body' : ''}>
            <Router />
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </div>
  )
}

export default App
