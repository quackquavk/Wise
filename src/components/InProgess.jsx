import React, { useState } from 'react';
import LaunchedContent from './LaunchedContent';

function InProgess() {
  const [inprogessContent, setinprogessContent] = useState(false);
  const ToggleLaunchDiv = () => {
    setinprogessContent(!inprogessContent);
  };
  return (
    <>
      {!inprogessContent && (
        <section
          className='w-full sm:h-32 h-24 flex mb-10 hover:cursor-pointer'
          onClick={ToggleLaunchDiv}
        >
          <div className='w-20 flex justify-center items-center bg-need-dark-green rounded-tl-3xl rounded-bl-3xl'>
            {/* <FontAwesomeIcon
          className='text-need-light-green text-3xl font-extrathin'
          icon={faPlus}
        /> */}
            <h1 className='text-need-light-green font-extralight text-4xl sm:text-5xl'>
              +
            </h1>
          </div>
          <div className='bg-border-color w-full flex justify-start p-5 items-center rounded-tr-3xl rounded-br-3xl hover:bg-need-light-green transition-colors duration-700 ease-in-out'>
            <h1 className='text-xl font-bold text-need-dark-green'>
              Wise Account
            </h1>
          </div>
        </section>
      )}
      {inprogessContent && (
        <section
          className={`w-full mb-10 transition-all duration-700 ease-in-out ${
            inprogessContent ? 'h-auto' : 'h-0 overflow-hidden'
          }`}
        >
          <div
            className='w-full bg-need-dark-green flex items-center  rounded-tr-3xl rounded-tl-3xl p-10 h-24 hover:cursor-pointer'
            onClick={ToggleLaunchDiv}
          >
            <h1 className='text-need-light-green text-5xl font-extralight'>
              -
            </h1>
            <h1 className='text-need-light-green text-xl ml-5 font-bold'>
              Wise Account
            </h1>
          </div>
          <div
            className={`rounded-br-3xl transition-all duration-700 ease-in-out rounded-bl-3xl pl-10 py-14 bg-border-color w-full  grid grid-cols-1 gap-y-4 xl:grid-cols-4 lg:gap-y-6 lg:gap-x-2 sm:grid-cols-2${
              inprogessContent ? 'h-auto' : 'h-0 overflow-hidden'
            }`}
          >
            <div className='w-full col-span-2  '>
              <h1 className='font-medium text-xl'>Now</h1>
              <div className='grid grid-cols-2'></div>
            </div>
            <div className='w-full  border-l border-black px-5'>
              <h1 className='font-medium text-xl'>Next</h1>
            </div>
            <div className='w-full'>
              <h1 className='font-medium text-xl border-l border-black px-5'>
                Next
              </h1>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default InProgess;
