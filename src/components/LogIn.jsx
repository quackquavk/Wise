import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './authContext';

const LogIn = React.forwardRef(({ changeLoginDivState }, ref) => {
  const { login } = useAuth();
  const [error, setError] = useState('');

  console.log('LogIn component rendered', {
    hasLoginFunction: !!login,
    changeLoginDivState: !!changeLoginDivState,
    currentURL: window.location.href,
    searchParams: window.location.search
  });

  // Handle OAuth callback - only process token if component is mounted
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      (async () => {
        try {
          await login(token);
          changeLoginDivState(false);
        } catch (err) {
          console.error('Login process failed:', err);
          setError('Failed to process login token');
        }
      })();
    }
  }, [login, changeLoginDivState]);

  const handleGoogleLogin = async () => {
    try {
      console.log('Initiating Google login redirect...');
      window.location.href = 'http://localhost:8080/api/auth/google';
    } catch (error) {
      console.error('Failed to initiate Google login:', error);
      setError('Failed to initiate Google login');
    }
  };

  // Add mount/unmount logging
  useEffect(() => {
    console.log('LogIn component mounted');
    return () => console.log('LogIn component unmounting');
  }, []);

  return (
    <div
      ref={ref}
      className='bg-white flex flex-col shadow-md items-center text-need-dark-green p-48 relative'
    >
      <FontAwesomeIcon
        onClick={() => {
          console.log('Close button clicked');
          changeLoginDivState(false);
        }}
        className='absolute sm:top-15 sm:right-10 top-20 right-44 text-xl hover:cursor-pointer'
        icon={faXmark}
      />
      <h1 className='font-bold text-lg'>Log In</h1>
      {error && (
        <div className="text-red-500 mt-2 text-sm">
          {error}
        </div>
      )}
      <Button
        onClick={handleGoogleLogin}
        className='mt-10 p-6 bg-need-dark-green text-white flex items-center gap-2'
        type='button'
      >
        <img 
          src="https://www.google.com/favicon.ico" 
          alt="Google" 
          className="w-4 h-4"
        />
        Continue with Google
      </Button>
    </div>
  );
});

export default LogIn;
