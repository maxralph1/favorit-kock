import { useState, useEffect } from 'react'
 
export function useCategories() {
  const [categories, setCategories] = useState([])
 
  useEffect(() => {
    const controller = new AbortController()
    getCategories({ signal: controller.signal })
    return () => { controller.abort() }
  }, [])
 
  async function getCategories({ signal } = {}) {
    return axios.get('super-admin/categories', { signal })
      .then(response => setCategories(response.data.data))
      .catch(() => {})
  }
 
  return { categories, getCategories }
}