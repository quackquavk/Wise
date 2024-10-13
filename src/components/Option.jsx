import React, { useState, useContext } from 'react';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { LogContext } from '@/App';

function Option() {
  const [featuresStatus, setfeaturesStatus] = useState(false);
  const { changeLoginDivState, changeRegisterDivState, changeOptionDivState } =
    useContext(LogContext);
  return (
    <div className='absolute px-10 flex flex-col  h-[100vh] items-start w-full bg-white z-20'>
      <div className='flex'>
        <h1 className='pt-6 text-black absolute top-0 left-10 text-3xl italic font-bold '>
          Wise
        </h1>
        <FontAwesomeIcon
          className='absolute text-xl right-10 top-8 hover:cursor-pointer'
          icon={faXmark}
          onClick={() => {
            changeOptionDivState(false);
          }}
        />
      </div>
      <article className='mt-36 mb-20 flex flex-col items-start'>
        <section>
          <Button className='mb-5 bg-need-light-green text-need-background-green'>
            Personal
          </Button>{' '}
          <Button className='mb-5 text-need-dark-green bg-white shadow-none'>
            Business
          </Button>
        </section>
        <Button
          className='bg-white text-need-dark-green font-medium shadow-none mb-5'
          onClick={() => {
            setfeaturesStatus(!featuresStatus);
          }}
        >
          Features
        </Button>
        {featuresStatus && (
          <div className='flex flex-col items-start'>
            <Button className='bg-white text-need-dark-green shadow-none mb-5'>
              Multi-currency account
            </Button>
            <Button className='bg-white text-need-dark-green shadow-none mb-5'>
              Money Transfers
            </Button>
            <Button className='bg-white text-need-dark-green shadow-none mb-5'>
              Large amount transfers
            </Button>
          </div>
        )}
        <Button className='bg-white text-need-dark-green shadow-none mb-5'>
          Pricing
        </Button>
        <Button className='bg-white text-need-dark-green shadow-none mb-5'>
          Help
        </Button>
      </article>
      <Button
        onClick={() => {
          changeOptionDivState(false);
          changeLoginDivState(true);
        }}
        className=' mb-5 w-full bg-white shadow-none text-need-dark-green border-2 border-need-dark-green p-3 h-12'
      >
        Log In
      </Button>

      <Button
        onClick={() => {
          changeOptionDivState(false);
          changeRegisterDivState(true);
        }}
        className='w-full bg-need-light-green shadow-none text-need-dark-green  p-3 h-12'
      >
        Register
      </Button>
    </div>
  );
}

export default Option;
