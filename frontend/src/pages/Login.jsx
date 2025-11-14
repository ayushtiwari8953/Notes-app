import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password })
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      onLogin(res.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow w-80'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Login</h2>
        {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
        <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} className='w-full mb-2 border px-2 py-1 rounded' />
        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className='w-full mb-3 border px-2 py-1 rounded' />
        <button className='w-full bg-blue-500 text-white py-1 rounded'>Login</button>
        <p className='text-center text-sm mt-3'>
          Don’t have an account? <a href='/signup' className='text-blue-600'>Sign Up</a>
        </p>
      </form>
    </div>
  )
}
