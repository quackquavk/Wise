import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LaunchedContent from './LaunchedContent';
import { IdeaContext } from '@/App';

function Launched() {
  // const { launchdata } = useContext(LaunchedContent);
  const [launchedContent, setLaunchedContent] = useState(true);
  const ToggleLaunchDiv = () => {
    setLaunchedContent(!launchedContent);
  };
  const { data, voteup, votedown } = useContext(IdeaContext);
  return (
    <>
      {!launchedContent && (
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
          <div className='bg-need-dark-green/10 w-full flex justify-start p-5 items-center rounded-tr-3xl rounded-br-3xl hover:bg-need-light-green transition-colors duration-700 ease-in-out'>
            <h1 className='text-xl font-bold text-need-dark-green'>
              Wise Account
            </h1>
          </div>
        </section>
      )}
      {launchedContent && (
        <section
          className={`w-full mb-10 transition-all duration-700 ease-in-out '
`}
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
            className={`rounded-br-3xl transition-all duration-700 ease-in-out rounded-bl-3xl pl-10 py-14 bg-need-dark-green/10 w-full  grid grid-cols-1 gap-y-4 xl:grid-cols-3 lg:gap-y-6 lg:gap-x-2 sm:grid-cols-2${
              launchedContent ? 'h-auto' : 'h-0'
            }`}
          >
            {data.map((item) => (
              <LaunchedContent
                key={item.id}
                item={item}
                voteup={voteup}
                votedown={votedown}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Launched;
