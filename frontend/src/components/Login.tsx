import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Shop from '../Pages/Shop';

import axios from 'axios';
const Login = () => {

  const [currentState, setCurrentState] = useState("Login")
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    try {
      const endpoint = currentState === 'Login' ? 'http://localhost:3000/users/login' : 'http://localhost:3000/users/register';
      const payload = currentState === 'Login' ? { email, password } : { fullname: name, email, password };
  
      const response = await axios.post(endpoint, payload, { withCredentials: true });
        
       if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
        if (response.data.message) {
          setSuccess(response.data.message);
          // Redirect using React Router (e.g., useNavigate)
          if (currentState === 'Login') navigate('/shop');
      }
      else {
        // Clear form after registration
        setName('');
        setEmail('');
        setPassword('');
        setCurrentState('Login');
      }
    
    } catch (err) {
      console.log("Full error object:", err); // Log the entire error
  if (err.response) {
    // Backend responded with an error (4xx/5xx)
    setError(err.response.data.error || "Server error");
  } else if (err.request) {
    // Request made, but no response (network issue)
    setError("Network error - check your connection");
  } else {
    // Other errors (e.g., Axios config issues)
    setError("Request setup failed");
  }
    }
  };
  
  return (
    <div>
      <form className='flex flex-col items-center w-[90%] max-w-md mx-auto mt-14 gap-4 text-gray-700' onSubmit={handleSubmit}>
        <div className='inline-flex'>
        <p className='text-[1.8rem] font-semibold'>{currentState}</p>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
    {
    currentState !== 'Login' && (
      <input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Full Name' className='w-full bg-[#FFFFF0] px-3 py-3 border border-gray-300 rounded-md' required/>
    )}
        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email' className='w-full bg-[#FFFFF0] px-3 py-3 border border-gray-300 rounded-md' required />
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='password' className='w-full bg-[#FFFFF0] px-3 py-3 border border-gray-300 rounded-md' required />

        <div className='flex justify-between w-full tex-xs -mt-2'>
          <p className='cursor-pointer hover:underline text-xl'>Forgot Password?</p>
          {
            currentState === 'Login' ? (
              <p className='cursor-pointer text-blue-600 text-xl hover:underline' onClick={()=> setCurrentState('Sign Up')}>Create Account</p>

            ) : (
                <p className='cursor-pointer text-blue-600 text-xl hover:underline' onClick={()=> setCurrentState('Login')}>Login Here</p>
            )
          }
        </div>
        <button type="submit" className='bg-black text-white font-light py-4 px-20 mt-4 rounded-md hover:bg-purple-500 transition'>{currentState === 'Login' ? 'Sign In' : 'Sign Up' }</button>
        </form>
        </div>
  
  )
}

export default Login