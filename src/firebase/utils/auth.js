import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Toast } from '../../components'
import { auth, db } from '../firebaseInitialize'

const createUser = async (
  userData,
  dispatch,
  userLogin,
  loadingAuth,
  navigate,
  location
) => {
  const { firstname, lastname, email, password } = userData
  dispatch(loadingAuth(true))
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, 'users', res.user.uid), {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    })
    dispatch(userLogin(res.user.uid))
    localStorage.setItem('userId', res.user.uid)
    navigate(location.state?.from?.pathname || '/movies')
    Toast({ message: 'Signed up successfully', type: 'success' })
  } catch (error) {
    const errorCode = error.code
    switch (errorCode) {
      case 'auth/weak-password':
        return Toast({
          message: 'Password should have more than 6 characters.',
          type: 'error',
        })
      case 'auth/email-already-in-use':
        return Toast({
          message: 'This email is already in use.',
          type: 'error',
        })
      default:
        return Toast({
          message: 'Some error occured, please try again later.',
          type: 'warning',
        })
    }
  } finally {
    dispatch(loadingAuth(false))
  }
}

const loginUser = async (
  loginData,
  dispatch,
  userLogin,
  loadingAuth,
  navigate,
  location,
  isAdmin
) => {
  const { email, password } = loginData
  dispatch(loadingAuth(true))
  // console.log(isAdmin)
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    dispatch(userLogin(res.user.uid, isAdmin))
    localStorage.setItem('userId', res.user.uid)
    navigate(location.state?.from?.pathname || '/movies')
    Toast({ message: 'Logged in successfully', type: 'success' })
  } catch (error) {
    const errorCode = error.code
    switch (errorCode) {
      case 'auth/wrong-password':
        return Toast({
          message: 'Wrong credentails',
          type: 'error',
        })
      case 'auth/invalid-email':
        return Toast({
          message: 'Invalid email id',
          type: 'error',
        })
      case 'auth/user-not-found':
        return Toast({
          message: 'User not found',
          type: 'error',
        })
      default:
        return Toast({
          message: 'Some error occured, please try again later.',
          type: 'warning',
        })
    }
  } finally {
    dispatch(loadingAuth(false))
  }
}

// const guestLoginUser = async (
//   userData,
//   dispatch,
//   userLogin,
//   loadingAuth,
//   navigate,
//   location
// ) => {
//   const { email, password } = userData
//   dispatch(loadingAuth(true))
//   try {
//     const res = await signInWithEmailAndPassword(auth, email, password)
//     dispatch(userLogin(res.user.uid))
//     localStorage.setItem('userId', res.user.uid)
//     navigate(location.state?.from?.pathname || '/home')
//     Toast({ message: 'Logged in successfully', type: 'success' })
//   } catch (error) {
//     const errorCode = error.code
//     switch (errorCode) {
//       case 'auth/wrong-password':
//         return Toast({
//           message: 'Wrong credentails',
//           type: 'error',
//         })
//       case 'auth/invalid-email':
//         return Toast({
//           message: 'Invalid email id',
//           type: 'error',
//         })
//       case 'auth/user-not-found':
//         return Toast({
//           message: 'User not found',
//           type: 'error',
//         })
//       default:
//         return Toast({
//           message: 'Some error occured, please try again later.',
//           type: 'warning',
//         })
//     }
//   } finally {
//     dispatch(loadingAuth(false))
//   }
// }

const logoutUser = async (dispatch, userLogout, navigate) => {
  try {
    await signOut(auth)
    dispatch(userLogout())
    localStorage.removeItem('userId')
    navigate('/')
    Toast({
      message: 'Logout successful.',
      type: 'success',
    })
  } catch (error) {
    Toast({
      message: 'Some error occured, please try again later.',
      type: 'warning',
    })
  }
}

const getUserData = createAsyncThunk('auth/getUserData', async (userId) => {
  try {
    const docRef = doc(db, 'users', userId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      Toast({
        message: 'No such document!',
        type: 'warning',
      })
    }
  } catch (error) {}
})

export {
  createUser,
  loginUser,
  //   guestLoginUser,
  logoutUser,
  getUserData,
}
