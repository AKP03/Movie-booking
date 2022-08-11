import { Route, Routes } from 'react-router-dom'
import { NonRequiredAuth, RequiredAuth } from '../components'

import { AddMovies, Auth, Booking, Error, Movies } from '../pages'

export const Router = () => {
  return (
    <Routes>
      <Route element={<NonRequiredAuth />}>
        <Route path='/' element={<Auth />} />
      </Route>
      <Route element={<RequiredAuth />}>
        <Route path='/movies' element={<Movies />} />
        <Route path='/addmovies' element={<AddMovies />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
  )
}
