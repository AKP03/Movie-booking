import { Stack } from '@mui/material'
import { MovieContainer } from '../../components'

export const Movies = () => {
  return (
    <Stack direction='row' gap={4} flexWrap='wrap'>
      <MovieContainer />
      <MovieContainer />
      <MovieContainer />
      <MovieContainer />
      <MovieContainer />
      <MovieContainer />
    </Stack>
  )
}
