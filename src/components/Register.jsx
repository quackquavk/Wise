import React, { useState } from 'react';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { dosignInwithGoogle } from './auth';

function Register({ changeRegisterDivState }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("registering")
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log("register success")
        changeRegisterDivState();
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await dosignInwithGoogle();
      changeRegisterDivState();
    } catch (error) {
      console.error('Register failed', error);
    }
  };

  return (
    <div className=' bg-white flex flex-col shadow-md items-center mt-10 text-need-dark-green p-48 relative'>
      <FontAwesomeIcon
        onClick={changeRegisterDivState}
        className='absolute sm:top-10 sm:right-10 right-44 top-20 text-xl hover:cursor-pointer'
        icon={faXmark}
      />
      <h1 className='font-bold text-lg'>Register</h1>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input
          className='mt-10 border-b-2 p-2 pl-4 border-need-dark-green text-need-dark-green placeholder:text-need-dark-green'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
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
          className='mt-10 p-6 bg-need-dark-green text-need-light-green'
          type='submit'
        >
          Register
        </Button>
      </form>
      <Button
        onClick={handleSignInWithGoogle}
        className=' bg-need-light-green text-need-dark-green mt-10 w-full p-6'
      >
        Log in with Google
      </Button>
    </div>
  );
}

export default Register;
