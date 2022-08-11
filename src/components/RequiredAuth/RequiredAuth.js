import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

export const RequiredAuth = () => {
  const location = useLocation()
  const { isLoggedIn } = useSelector((state) => state.auth)

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  )
}
