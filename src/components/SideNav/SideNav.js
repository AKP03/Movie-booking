import React from 'react'
import { Grid, Chip, Stack, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const SideNav = () => {
  const { isAdmin } = useSelector((store) => store.auth)

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
              '&:hover': {
                backgroundColor: 'var(--primary-dark-hover)',
              },
            }}
          >
            <AddIcon fontSize='large' />
            Add Movies
          </Button>
        )}
      </Stack>
    </Grid>
  )
}
