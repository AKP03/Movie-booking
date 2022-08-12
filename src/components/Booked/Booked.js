import { Box, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'

export const Booked = () => {
  useEffect(() => {
    alert('Are you sure about your booking?')
  }, [])
  return (
    <>
      <Stack gap={4} alignItems='center'>
        <Box
          component='img'
          src='https://ik.imagekit.io/akashpradhan/check-mark_caUBbmwEI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660339813450'
          alt='check-mark'
        ></Box>
        <Typography variant='h1'>Your ticket booked🥳!!</Typography>
      </Stack>
    </>
  )
}
