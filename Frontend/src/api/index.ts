import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data
  },
  async function (error) {
    return Promise.reject(error?.response?.data || error)
  }
)
export default axiosInstance
