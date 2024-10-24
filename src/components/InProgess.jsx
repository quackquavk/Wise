import React, { useState, useContext } from 'react';
import LaunchedContent from './LaunchedContent';
import InProgressContent from './InProgeressContent';
import { IdeaContext } from '@/App';
function InProgess() {
  const [inprogessContent, setinprogessContent] = useState(true);
  const ToggleLaunchDiv = () => {
    setinprogessContent(!inprogessContent);
  };
  const { data, voteup, votedown } = useContext(IdeaContext);
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
            className={`rounded-br-3xl transition-all duration-700 ease-in-out rounded-bl-3xl pl-3 py-14 bg-need-dark-green/10 w-full  grid grid-cols-1 gap-y-4 xl:grid-cols-4 lg:gap-y-6 lg:gap-x-2 sm:grid-cols-2${
              inprogessContent ? 'h-auto' : 'h-0 overflow-hidden'
            }`}
          >
            <div className='w-full col-span-2 flex flex-col items-center  '>
              <h1 className='pl-6 font-medium text-xl text-start w-full mb-10'>
                Now
              </h1>
              <div className='grid grid-cols-2 gap-y-10 gap-x-5'>
                {data.map((item) => (
                  <InProgressContent
                    key={item.id}
                    item={item}
                    voteup={voteup}
                    votedown={votedown}
                  />
                ))}{' '}
              </div>

              <div className='grid grid-cols-2'></div>
            </div>
            <div className='w-full  border-l border-border-color flex flex-col items-center'>
              <h1 className='pl-6 font-medium text-xl w-full text-start'>
                Next
              </h1>
              <div className='grid grid-cols-1 gap-y-10 '></div>
            </div>
            <div className=' w-full flex flex-col items-center'>
              <h1 className='pl-6 font-medium text-xl border-l border-border-color px-5 w-full text-start h-full'>
                Later
              </h1>
              <div className='grid grid-cols-1 gap-y-10'></div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default InProgess;
