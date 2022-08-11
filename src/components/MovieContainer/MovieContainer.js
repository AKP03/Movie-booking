import { Box, Button, Stack, Typography } from '@mui/material'
import './MovieContainer.css'
import image from '../../asstes/1.jpeg'

export const MovieContainer = () => {
  return (
    <>
      <Box className='card-container' sx={{ borderRadius: '5px' }}>
        <Box className='card-content' sx={{ borderRadius: '5px' }}>
          <Box
            component='img'
            src={image}
            alt='camera_image'
            className='rounded-top-5'
            sx={{
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px',
              height: '50vh',
            }}
          />
          <Typography variant='body1' className='card-body'>
            Pathan
          </Typography>
          <Typography variant='body2'>Available seats: 60</Typography>
          <Stack direction='row' gap={2} alignItems='center'>
            <Button sx={{ fontSize: '24px', fontWeight: '700' }}>-</Button>
            <Typography>0</Typography>
            <Button sx={{ fontSize: '24px', fontWeight: '700' }}>+</Button>
          </Stack>
        </Box>
        <Box className='card-footer' mt={2}>
          <Button variant='contained' fullWidth>
            Book Movie
          </Button>
        </Box>
      </Box>
    </>
  )
}
