import { Box, Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './MovieCard.css'

export const MovieCard = ({
  movie,
  incMovieSeat,
  decMovieSeat,
  isAdmin,
  deleteMovie,
}) => {
  const navigate = useNavigate()

  const { name, image, seats } = movie
  return (
    <>
      <Box className='card-container' sx={{ borderRadius: '5px' }}>
        <Box className='card-content' sx={{ borderRadius: '5px' }}>
          <Box
            component='img'
            src={image}
            alt={name}
            className='rounded-top-5'
            sx={{
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px',
              height: '50vh',
            }}
          />
          <Typography variant='h5' className='card-body'>
            {name}
          </Typography>
          <Typography variant='body2'>Available seats: {seats}</Typography>
          <Stack direction='row' gap={2} alignItems='center'>
            <Button
              sx={{ fontSize: '24px', fontWeight: '700' }}
              onClick={() => incMovieSeat(movie)}
              disabled={60 - seats <= 0 ? true : false}
            >
              -
            </Button>
            <Typography>{60 - seats}</Typography>
            <Button
              sx={{ fontSize: '24px', fontWeight: '700' }}
              onClick={() => decMovieSeat(movie)}
              disabled={seats <= 0 ? true : false}
            >
              +
            </Button>
          </Stack>
        </Box>
        <Box className='card-footer' mt={2}>
          <Button
            variant='contained'
            fullWidth
            onClick={() => navigate('/booked')}
          >
            Book Movie
          </Button>
          {isAdmin && (
            <Button
              variant='contained'
              fullWidth
              color='error'
              onClick={() => deleteMovie(movie)}
            >
              Delete Movie
            </Button>
          )}
        </Box>
      </Box>
    </>
  )
}
