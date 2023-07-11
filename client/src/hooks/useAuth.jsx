import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use-storage'
import { route } from '@/routes'
 
export function useAuth() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage('access_token', '')
  const [role, setRole, removeRole] = useLocalStorage('role', '')
 
  const navigate = useNavigate()
 
  const isLoggedIn = useMemo(() => !!accessToken, [accessToken])
  const isSuperAdmin = useMemo(() => (role == 1), [role])
  const isAdmin = useMemo(() => (role == 2), [role])
  const isRider = useMemo(() => (role == 3), [role])
  const isGenericUser = useMemo(() => (role == 4), [role])
 
  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }
  }, [accessToken])
 
  async function register(data) {
    setErrors({})
    setLoading(true)
 
    return axios.post('register', data)
      .then((response) => {
        setAccessToken(response.data.access_token)
        setRole(response.data.role)
        navigate(route('dashboard'))
      })
      .catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }
 
  async function login(data) {
    setErrors({})
    setLoading(true)
 
    return axios.post('login', data)
      .then(response => {
        setAccessToken(response.data.access_token)
        setRole(response.data.role)
        navigate(route('dashboard'))
      })
      .catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }
 
  async function logout(force = false) {
    if (!force) {
      await axios.post('logout')
    }
 
    removeAccessToken()
    removeRole()
    navigate(route('login'))
  }
 
  return { register, login, errors, loading, isLoggedIn, isSuperAdmin, isAdmin, isRider, isGenericUser, logout }
}