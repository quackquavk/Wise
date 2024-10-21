import React, { useState } from 'react';
import { Button } from './ui/button';
import { Toggle } from './ui/toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as HeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as HeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function LaunchedContent() {
  const [togglestateup, settogglestateup] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleToggle = (e) => {
    e.stopPropagation();
    setLoading(true);
    setTimeout(() => {
      settogglestateup(!togglestateup);
      setLoading(false);
    }, 2000);
  };
  return (
    <Dialog className=''>
      <div className='py-5 mr-10 px-5 group hover:bg-need-light-green transition-colors duration-700 ease-in-out hover:cursor-pointer w-[22 rem] min-h-80  rounded-[2.3rem] bg-white flex flex-col justify-between'>
        <DialogTrigger>
          <section className='flex flex-col items-start'>
            <Button className='relative  w-20 h-8 px-1 py-1 text-xs bg-border-color text-black shadow-none border font-medium border-black transition-colors duration-700 ease-in-out group-hover:bg-need-light-green'>
              Region
            </Button>
            <p className='mt-4 w-full text-left font-normal'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
              quibusdam delectus ratione sapiente veritatis alias minima
              suscipit, recusandae dolorum dolores ipsam velit maxime deserunt
              nam corrupti aliquam rem vel autem.
            </p>
          </section>

          <section className='flex mt-10 justify-between items-center'>
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
        </DialogTrigger>
      </div>

      <DialogContent className=' p-0 m-0'>
        <div className='bg-need-dark-green mb-0 pt-28 rounded-tr-[2.5rem] rounded-tl-[2.5rem] pb-10 px-5'>
          <h1 className='text-white mb-0'>Wise Account</h1>
          <p className='text-xl mt-5 text-need-light-green font-bold'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
            officiis est sint numquam, illum, quaerat aperiam dolores, in nobis
            laboriosam nemo. Fuga similique totam ullam consequatur maiores
            mollitia amet esse!
          </p>
        </div>
        <div className='bg-white p-5 rounded-br-[2.5rem] rounded-bl-[2.5rem]'>
          <Button variant='ghost'>About</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LaunchedContent;
