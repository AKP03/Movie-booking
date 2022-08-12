import axios from 'axios'

export default axios.create({
  baseURL: 'https://presidio-movie-booking-api.herokuapp.com/',
})
