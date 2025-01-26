import React, { useState } from 'react';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './authContext';
import { dosignInwithGoogle } from './auth';

const LogIn = React.forwardRef(({ changeLoginDivState }, ref) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!email.includes('@')) {
      setError('Invalid email format');
      return;
    }

    try {
      console.log("logging in with:", { email, password });
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        console.log("login success");
        login(data.token); // Store the token in context and localStorage
        changeLoginDivState(false);
      } else {
        setError(data.error || 'Login failed');
        console.error('Login failed:', {
          status: response.status,
          statusText: response.statusText,
          error: data
        });
      }
    } catch (error) {
      setError('Network error occurred');
      console.error('Login request failed:', {
        message: error.message,
        error
      });
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await dosignInwithGoogle();
      changeLoginDivState(false);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div
      ref={ref}
      className=' bg-white flex flex-col shadow-md items-center text-need-dark-green p-48 relative'
    >
      <FontAwesomeIcon
        onClick={() => {
          changeLoginDivState(false);
        }}
        className='absolute  sm:top-15 sm:right-10 top-20 right-44 text-xl hover:cursor-pointer'
        icon={faXmark}
      />
      <h1 className='font-bold text-lg'>Log In</h1>
      {error && (
        <div className="text-red-500 mt-2 text-sm">
          {error}
        </div>
      )}
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input
          className='mt-10 border-b-2 p-2 pl-4 border-need-dark-green text-need-dark-green placeholder:text-need-dark-green'
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className='mt-10 border-need-dark-green border-b-2 p-2 pl-4 placeholder:text-need-dark-green'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          className='mt-10 p-6 bg-need-dark-green text-white'
          type='submit'
        >
          Log In
        </Button>
      </form>

    </div>
  );
});

export default LogIn;
