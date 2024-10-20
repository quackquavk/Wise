import React, { useState } from 'react';
import { Button } from './ui/button';
import { Toggle } from './ui/toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as HeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as HeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner';

function LaunchedContent() {
  const [togglestateup, settogglestateup] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleToggle = () => {
    setLoading(true);
    setTimeout(() => {
      settogglestateup(!togglestateup);
      setLoading(false);
    }, 2000);
  };
  return (
    <div className='py-5 mr-10 px-5 group hover:bg-need-light-green transition-colors duration-700 ease-in-out hover:cursor-pointer w-[22 rem] min-h-80  rounded-[2.3rem] bg-white flex flex-col justify-between'>
      <section>
        <Button className='w-20 h-8 px-1 py-1 text-xs bg-border-color text-black shadow-none border font-medium border-black transition-colors duration-700 ease-in-out group-hover:bg-need-light-green'>
          Region
        </Button>
        <p className='mt-4 font-normal'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
          quibusdam delectus ratione sapiente veritatis alias minima suscipit,
          recusandae dolorum dolores ipsam velit maxime deserunt nam corrupti
          aliquam rem vel autem.
        </p>
      </section>
      <section className='flex justify-between items-center'>
        <h1 className='text-sm'>Launched on Date</h1>
        <div onClick={handleToggle}>
          {loading ? (
            <Spinner />
          ) : (
            <FontAwesomeIcon
              icon={togglestateup ? HeartSolid : HeartRegular}
              className={`text-xl ${
                togglestateup ? 'text-need-dark-green' : 'text-black'
              }`}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default LaunchedContent;
