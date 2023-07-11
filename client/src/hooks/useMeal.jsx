import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'
 
export function useMeal(id = null) {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const navigate = useNavigate()
 
  useEffect(() => {
    if (id !== null) {
      const controller = new AbortController()
      getMeal(id, { signal: controller.signal })
      return () => controller.abort()
    }
  }, [id])
 
  async function createMeal(meal) {
    setLoading(true)
    setErrors({})
 
    return axios.post('super-admin/meals', meal)
      .then(() => navigate(route('meals.index')))
      .catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }
 
  async function getMeal(id, { signal } = {}) {
    setLoading(true)
 
    return axios.get(`super-admin/meals/${id}`, { signal })
      .then(response => setData(response.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }
 
  async function updateMeal(meal) {
    setLoading(true)
    setErrors({})
 
    return axios.put(`super-admin/meals/${meal.id}`, meal)
      .then(() => navigate(route('meals.index')))
      .catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }
 
  async function destroyMeal(meal) {
    return axios.delete(`super-admin/meals/${meal.id}`)
  }
 
  return {
    meal: { data, setData, errors, loading },
    createMeal,
    updateMeal,
    destroyMeal,
  }
}