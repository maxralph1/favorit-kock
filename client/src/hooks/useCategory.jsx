import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'
 
export function useCategory(id = null) {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const navigate = useNavigate()
 
  useEffect(() => {
    if (id !== null) {
      const controller = new AbortController()
      getCategory(id, { signal: controller.signal })
      return () => controller.abort()
    }
  }, [id])
 
  async function createCategory(category) {
    setLoading(true)
    setErrors({})
 
    return axios.post('super-admin/categories', category)
      .then(() => navigate(route('categories.index')))
      .catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }
 
  async function getCategory(id, { signal } = {}) {
    setLoading(true)
 
    return axios.get(`super-admin/categories/${id}`, { signal })
      .then(response => setData(response.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }
 
  async function updateCategory(category) {
    setLoading(true)
    setErrors({})
 
    return axios.put(`super-admin/categories/${category.id}`, category)
      .then(() => navigate(route('categories.index')))
      .catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }
 
  async function destroyCategory(category) {
    return axios.delete(`super-admin/categories/${category.id}`)
  }
 
  return {
    category: { data, setData, errors, loading },
    createCategory,
    updateCategory,
    destroyCategory,
  }
}