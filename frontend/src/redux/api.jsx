import axios from 'axios'

const api = axios.create({
  baseURL:"mongodb://ssafy:ssafy1111@3.36.125.122:27017/?authMechanism=DEFAULT&authSource=admin"
})

export default api;
