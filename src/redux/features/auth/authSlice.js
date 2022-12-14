import { createSlice } from '@reduxjs/toolkit'
import { getUserData } from '../../../firebase/utils/auth'

const initialState = {
  id: localStorage.getItem('userId') || null,
  user: {},
  isLoggedIn: localStorage.getItem('userId') === null ? false : true,
  isAuthLoading: false,
  isUserLoading: false,
  isAdmin: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userAdmin: (state, action) => {
      state.isAdmin = action.payload
    },
    userLogin: (state, action) => {
      state.id = action.payload
      state.isLoggedIn = true
    },
    userLogout: (state) => {
      state.id = null
      state.isLoggedIn = false
      state.isAdmin = false
      state.user = {}
      localStorage.removeItem('userId')
    },
    loadingAuth: (state, action) => {
      state.isAuthLoading = action.payload
    },
    loadingUser: (state, action) => {
      state.isUserLoading = action.payload
    },
  },
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.isUserLoading = true
    },
    [getUserData.fulfilled]: (state, action) => {
      state.isUserLoading = false
      state.user = action.payload
    },
    [getUserData.rejected]: (state) => {
      state.isUserLoading = false
    },
  },
})

export const { userAdmin, userLogin, userLogout, loadingAuth, loadingUser } =
  authSlice.actions
export default authSlice.reducer
