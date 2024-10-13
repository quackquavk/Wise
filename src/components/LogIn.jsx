import React, { useState } from 'react';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './authContext';
import { dosignInwithEmailandPw } from './auth';
import { dosignInwithGoogle } from './auth';
const LogIn = React.forwardRef(({ changeLoginDivState }, ref) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userLoggedIn } = useAuth();
  const handleSubmit = async () => {
    await dosignInwithEmailandPw(email, password);
    changeLoginDivState(false);
  };
  const handleSignInWithGoogle = async () => {
    await dosignInwithGoogle();
    changeLoginDivState(false);
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
        className='absolute top-10 sm:right-10 right-20 text-xl hover:cursor-pointer'
        icon={faXmark}
      />
      <h1 className='font-bold text-lg'>Log In</h1>
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
          className='mt-10 p-6 bg-need-dark-green text-need-light-green'
          type='submit'
        >
          Log In
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
});

export default LogIn;
