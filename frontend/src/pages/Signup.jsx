import React, { useState } from 'react'
import { signup } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signup({ name, email, password })
      setMessage('Account created! You can login now.')
      setName(''); setEmail(''); setPassword('')
      setTimeout(() => navigate('/login'), 1000)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow w-80'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Sign Up</h2>
        {message && <p className='text-sm mb-2'>{message}</p>}
        <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)} className='w-full mb-2 border px-2 py-1 rounded' />
        <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} className='w-full mb-2 border px-2 py-1 rounded' />
        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className='w-full mb-3 border px-2 py-1 rounded' />
        <button className='w-full bg-green-500 text-white py-1 rounded'>Sign Up</button>
        <p className='text-center text-sm mt-3'>
          Already have an account? <a href='/login' className='text-blue-600'>Login</a>
        </p>
      </form>
    </div>
  )
}
