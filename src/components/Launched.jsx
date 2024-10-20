import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import LaunchedContent from './LaunchedContent';

function Launched() {
  // const { launchdata } = useContext(LaunchedContent);
  const [launchedContent, setLaunchedContent] = useState(true);
  const ToggleLaunchDiv = () => {
    setLaunchedContent(!launchedContent);
  };
  useEffect(() => {
    setLaunchedContent(true);
  }, []);
  return (
    <>
      {!launchedContent && (
        <section
          className='w-full h-32 flex mb-10 hover:cursor-pointer'
          onClick={ToggleLaunchDiv}
        >
          <div className='w-20 flex justify-center items-center bg-need-dark-green rounded-tl-3xl rounded-bl-3xl'>
            {/* <FontAwesomeIcon
          className='text-need-light-green text-3xl font-extrathin'
          icon={faPlus}
        /> */}
            <h1 className='text-need-light-green font-extralight text-5xl'>
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
      {launchedContent && (
        <section
          className={`w-full mb-10 transition-all duration-700 ease-in-out ${
            launchedContent ? 'h-auto' : 'h-0 overflow-hidden'
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
            className={`rounded-br-3xl transition-all duration-700 ease-in-out rounded-bl-3xl pl-10 py-14 bg-border-color w-full  grid grid-cols-1 gap-y-4 xl:grid-cols-3 lg:gap-y-6 lg:gap-x-2 sm:grid-cols-2${
              launchedContent ? 'h-auto' : 'h-0 overflow-hidden'
            }`}
          >
            <LaunchedContent />
            <LaunchedContent />
            <LaunchedContent />
            <LaunchedContent />
            <LaunchedContent />
            <LaunchedContent />
            <LaunchedContent />
          </div>
        </section>
      )}
    </>
  );
}

export default Launched;
