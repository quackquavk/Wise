import React, { useContext } from 'react';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { LogContext } from '../App';
import { useAuth } from './authContext';

function Option() {
  const { changeOptionDivState, changeLoginDivState } = useContext(LogContext);
  const { userLoggedIn, user } = useAuth();

  return (
    <div className='absolute w-full h-[100vh] bg-black/50 z-20'>
      <div className='absolute right-0 h-[100vh] bg-white w-96'>
        <FontAwesomeIcon
          onClick={() => {
            changeOptionDivState(false);
          }}
          className='absolute right-10 top-10 text-xl hover:cursor-pointer'
          icon={faXmark}
        />
        <div className='flex flex-col items-center mt-20'>
          {userLoggedIn && user ? (
            <>
              <h1 className='font-bold text-lg'>{user.username}</h1>
              <Button className='mt-10 bg-need-dark-green text-need-light-green w-4/5'>
                + New
              </Button>
            </>
          ) : (
            <>
              <h1 className='font-bold text-lg'>Menu</h1>
              <Button
                onClick={() => {
                  changeLoginDivState(true);
                  changeOptionDivState(false);
                }}
                className='mt-10 bg-need-dark-green text-need-light-green w-4/5'
              >
                Log In
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Option;
