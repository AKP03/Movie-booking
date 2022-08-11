import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

export const NonRequiredAuth = () => {
  const location = useLocation()
  const { isLoggedIn } = useSelector((state) => state.auth)

  return !isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to='/movies' state={{ from: location }} replace />
  )
}
