import React from 'react'
import { Grid, Chip, Stack } from '@mui/material'
import { NavLink } from 'react-router-dom'

export const SideNav = () => {
  const getActiveStyles = ({ isActive }) =>
    isActive
      ? {
          color: 'var(--black)',
          backgroundColor: 'var(--primary-light)',
          '&:hover': {
            backgroundColor: 'var(--primary-light-hover)',
          },
        }
      : { color: 'var(--white)', backgroundColor: 'transparent' }
  return (
    <Grid
      component='aside'
      item
      sx={{
        backgroundColor: 'var(--secondary-dark)',
        display: { xs: 'none', sm: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: '1rem',
        margin: '2rem 1rem 1rem 1rem',
        padding: '1rem 0.8rem',
        borderRadius: '10px',
        height: 'fit-content',
        position: 'fixed',
        left: '3rem',
      }}
    >
      <Stack direction={'column'} gap={4}>
        <Stack direction={'column'} gap={2}>
          <Chip
            component={NavLink}
            clickable
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              borderRadius: '5px',
              fontSize: '1.5rem',
              minWidth: '10rem',
            }}
            to='/movies'
            style={getActiveStyles}
            label='Movies'
          ></Chip>
        </Stack>
      </Stack>
    </Grid>
  )
}
