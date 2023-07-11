import axios from 'axios';
import './App.css'
import '@/assets/styles.css'
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { route } from '@/routes';
import Layout from '@/components/Layout';
import AuthLayout from '@/components/AuthLayout';
import NotFound from '@/views/NotFound';
import Unauthorized from '@/views/Unauthorized';
import Register from '@/views/auth/Register';
import Login from '@/views/auth/Login';
import Home from '@/views/Home';
import Dashboard from '@/views/Dashboard';
import PasswordReset from '@/views/auth/PasswordReset';
import CategoriesList from '@/views/categories/CategoriesList'
import CreateCategory from '@/views/categories/CreateCategory'
import EditCategory from '@/views/categories/EditCategory' 
import MealsList from '@/views/meals/MealsList'
import CreateMeal from '@/views/meals/CreateMeal'
import EditMeal from '@/views/meals/EditMeal' 

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = "http://127.0.0.1:8001/api/v1";

function App() {
  const { isAuthenticated, isSuperAdmin, isAdmin, isRider, isGenericUser, logout } = useAuth()

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path={ route('home') } element={<Home />} />
        <Route path={ route('register') } element={<Register />} />
        <Route path={ route('login') } element={<Login />} />
        {/* end public routes */}
      </Route>

      <Route path='/' element={<AuthLayout />}>
        {/* protected routes */}
        {
          isAuthenticated && isSuperAdmin ?
            <>
              <Route path={ route('dashboard') } element={<Dashboard />} />
              <Route path={ route('categories.index') } element={<CategoriesList />} />
              <Route path={ route('categories.create') } element={<CreateCategory />} />
              <Route path={ route('categories.edit') } element={<EditCategory />} />
              <Route path={ route('meals.index') } element={<MealsList />} />
              <Route path={ route('meals.create') } element={<CreateMeal />} />
              <Route path={ route('meals.edit') } element={<EditMeal />} />
            </>
          : isAuthenticated && isAdmin ? 
            <>
              <Route path={ route('dashboard') } element={<Dashboard />} />
            </>
          : isAuthenticated && isRider ? 
            <>
              <Route path={ route('dashboard') } element={<Dashboard />} />
            </>
          : 
            <>
              <Route path={ route('dashboard') } element={<Dashboard />} />
            </>
        }
        {/* end protected routes */}

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App