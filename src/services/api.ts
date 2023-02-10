import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_SOCKET_URL,
  withCredentials: true,
  headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
})
