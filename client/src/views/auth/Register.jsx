import { useState } from 'react'
import IconSpinner from '@/components/IconSpinner'
import ValidationError from '@/components/ValidationError'
import { useAuth } from '@/hooks/useAuth'


function Register() {
    const { register, errors, loading } = useAuth()
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    await register({ username, name, email, password, password_confirmation: passwordConfirmation })
 
    setPassword('')
    setPasswordConfirmation('')
  }
 
  return (
    <form onSubmit={ handleSubmit } noValidate>
      <div className="">
 
        <h1 className="">Register</h1>
 
        <div className="">
          <label htmlFor="username" className="">Userame</label>
          <input
            id="username"
            name="username"
            type="text"
            value={ username }
            onChange={ event => setUsername(event.target.value) }
            className=""
            autoComplete="username" 
            disabled={ loading }
          />
          <ValidationError errors={ errors } field="username" />
        </div>
 
        <div className="">
          <label htmlFor="name" className="">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={ name }
            onChange={ event => setName(event.target.value) }
            className=""
            autoComplete="name" 
            disabled={ loading }
          />
          <ValidationError errors={ errors } field="name" />
        </div>
 
        <div className="">
          <label htmlFor="email" className="">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={ email }
            onChange={ event => setEmail(event.target.value) }
            className=""
            autoComplete="email" 
            disabled={ loading }
          />
          <ValidationError errors={ errors } field="email" />
        </div>
 
        <div className="">
          <label htmlFor="password" className="">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={ password }
            onChange={ event => setPassword(event.target.value) }
            className=""
            autoComplete="new-password" 
            disabled={ loading }
          />
          <ValidationError errors={ errors } field="password" />
        </div>
 
        <div className="">
          <label htmlFor="password_confirmation" className="">Confirm Password</label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={ passwordConfirmation }
            onChange={ event => setPasswordConfirmation(event.target.value) }
            className=""
            autoComplete="new-password" 
            disabled={ loading }
          />
        </div>
 
        <div className=""></div>
 
        <div className="">
          <button type="submit" className="" disabled={ loading }>
            { loading && <IconSpinner /> }
            Register
          </button>
        </div>
      </div>
    </form>
  )
}


export default Register