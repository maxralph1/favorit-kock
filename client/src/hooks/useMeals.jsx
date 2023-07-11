import { useState, useEffect } from 'react'
 
export function useMeals() {
  const [meals, setMeals] = useState([])
 
  useEffect(() => {
    const controller = new AbortController()
    getMeals({ signal: controller.signal })
    return () => { controller.abort() }
  }, [])
 
  async function getMeals({ signal } = {}) {
    return axios.get('meals', { signal })
      .then(response => setMeals(response.data.data))
      .catch(() => {})
  }
 
  return { meals, getMeals }
}