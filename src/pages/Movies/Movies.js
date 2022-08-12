import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { MovieCard } from '../../components'
import api from '../../api/moviesApi'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import AddIcon from '@mui/icons-material/Add'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'

export const Movies = () => {
  const { isAdmin } = useSelector((store) => store.auth)
  const [movies, setMovies] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const retriveMovies = async () => {
    const response = await api.get('/movies')
    return response.data
  }

  const decMovieSeat = async (movie) => {
    const response = await api.put(`/movies/${movie.id}`, movie)
    const { id } = response.data
    setMovies(
      movies.map((movie) => {
        return movie.id === id
          ? { ...response.data, seats: response.data.seats - 1 }
          : movie
      })
    )
  }

  const incMovieSeat = async (movie) => {
    const response = await api.put(`/movies/${movie.id}`, movie)
    const { id } = response.data
    setMovies(
      movies.map((movie) => {
        return movie.id === id
          ? { ...response.data, seats: response.data.seats + 1 }
          : movie
      })
    )
  }

  const deleteMovie = async (movie) => {
    const { id } = movie
    await api.delete(`/movies/${id}`)
    const newMovieList = movies.filter((movie) => {
      return movie.id !== id
    })
    setMovies(newMovieList)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const movieData = {
      name: data.get('name'),
      image: data.get('image'),
      seats: 60,
    }
    const request = {
      id: uuid(),
      ...movieData,
    }
    console.log('request', request)
    const response = await api.post('/movies', request)
    console.log('response', response)
    setMovies([...movies, response.data])
    setIsModalOpen(false)
  }

  useEffect(() => {
    const getAllMovies = async () => {
      const allMovies = await retriveMovies()
      if (allMovies) setMovies(allMovies)
    }
    getAllMovies()
  }, [])

  return (
    <>
      {isAdmin && (
        <Button
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'inherit',
            fontSize: '1.5rem',
            minWidth: '10rem',
            borderRadius: '10px',
            backgroundColor: 'var(--primary-dark)',
            color: 'var(--white)',
            marginBottom: '1rem',
            '&:hover': {
              backgroundColor: 'var(--primary-dark-hover)',
            },
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <AddIcon fontSize='large' />
          Add Movies
        </Button>
      )}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby='movie-modal-title'
        aria-describedby='movie-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            bgcolor: '#c9ddf8',
            border: '2px solid var(--black)',
            borderRadius: '10px',
            boxShadow: 24,
            p: 2,
          }}
        >
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{
              color: 'var(--black)',
              borderBottom: '2px solid var(--black)',
            }}
            mb={1}
          >
            <Typography id='movie-modal-title' variant='h6' component='h2'>
              Add Movie
            </Typography>
            <HighlightOffOutlinedIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => setIsModalOpen(false)}
            />
          </Stack>
          <Box
            id='movie-modal-description'
            component='form'
            textAlign='center'
            onSubmit={handleSubmit}
          >
            <TextField
              label='Movie Name'
              name='name'
              id='name'
              autoComplete='name'
              type='text'
              margin='normal'
              placeholder='Pathaan'
              fullWidth
              required
              focused
            />
            <TextField
              label='Movie Image Link'
              name='image'
              id='image'
              autoComplete='image'
              type='text'
              margin='normal'
              placeholder='https://ik.imagekit.io/akashpradhan/pathaan_jlObXacS6.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1660274742186'
              fullWidth
              required
              focused
            />
            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Add Movie
            </Button>
          </Box>
        </Box>
      </Modal>
      <Stack direction='row' gap={4} flexWrap='wrap'>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            incMovieSeat={incMovieSeat}
            decMovieSeat={decMovieSeat}
            isAdmin={isAdmin}
            deleteMovie={deleteMovie}
          />
        ))}
      </Stack>
    </>
  )
}
