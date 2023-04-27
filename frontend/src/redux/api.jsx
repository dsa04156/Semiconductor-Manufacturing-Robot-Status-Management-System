import axios from 'axios'

const api = axios.create({
  baseURL:"http://3.36.125.122:8082"
})

export default api;
