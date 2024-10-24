import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

function InProgressContent({ item, voteup, votedown }) {
  const { id, title, body, vote } = item;

  const [loading, setLoading] = useState(false);
  const [datastateup, setdatastateup] = useState();

  const handleToggleUp = (e) => {
    e.stopPropagation();
    // if (localStorage.getItem(`${id}_datastateup`) == null) {
    //   setdatastateup('on');
    // }
    if (datastateup == 'on') {
      setLoading(true);
      setTimeout(() => {
        setdatastateup('off');
        setLoading(false);
        votedown(id);
      }, 1500);
      // if (datastatedown == 'on') {
      //   setdatastatedown('off');
      // }

      console.log('up');
    } else {
      setLoading(true);
      setTimeout(() => {
        setdatastateup('on');
        setLoading(false);

        voteup(id);
      }, 1500);

      console.log('down');
    }
  };
  return (
    <Dialog className=''>
      <DialogTrigger>
        <div
          key={id}
          className=' relative py-3  px-3 group hover:bg-need-light-green transition-colors duration-700 ease-in-out hover:cursor-pointer w-64 min-h-56  rounded-3xl bg-white flex flex-col justify-between'
        >
          <section className='flex flex-col items-start overflow-y-clip max-h-36'>
            <Button className='relative  w-20 h-8 px-1 py-1 text-xs bg-need-dark-green/10 text-black shadow-none border font-medium border-black transition-colors duration-700 ease-in-out group-hover:bg-need-light-green'>
              Region
            </Button>
            <p className='mt-4 w-full text-left font-normal sm:text-wrap  '>
              {body}
            </p>
          </section>

          <section className='absolute w-10/12 bottom-5 flex mt-10 justify-between items-center'>
            <h1 className='text-sm'>Launched on Date</h1>
            <div className='flex items-center'>
              <div className='mt-1' onClick={handleToggleUp}>
                {loading ? (
                  <Spinner />
                ) : (
                  <FontAwesomeIcon
                    icon={datastateup == 'on' ? HeartSolid : HeartRegular}
                    className={`text-xl ${
                      datastateup
                        ? 'text-need-dark-green'
                        : 'text-need-dark-green'
                    }`}
                  />
                )}
              </div>
              <h1 className='ml-2'>{vote}</h1>
            </div>
          </section>
        </div>
      </DialogTrigger>

      <DialogContent className=' p-0 m-0'>
        <div className='bg-need-dark-green mb-0 pt-28 rounded-tr-[2.5rem] rounded-tl-[2.5rem] pb-10 px-5'>
          <h1 className='text-white mb-0'>Wise Account</h1>
          <p className='text-xl mt-5 text-need-light-green font-bold'>{body}</p>
          <div className='flex justify-end mt-5 '>
            <div className='mr-5' onClick={handleToggleUp}>
              {loading ? (
                <Spinner
                  classname={'text-need-dark-green fill-need-light-green'}
                />
              ) : (
                <FontAwesomeIcon
                  icon={datastateup ? HeartSolid : HeartRegular}
                  className={`text-xl cursor-pointer ${
                    datastateup
                      ? 'text-need-light-green'
                      : 'text-need-light-green'
                  }`}
                />
              )}
            </div>
            <h1 className='text-need-light-green font-semibold'>{vote}</h1>
          </div>
        </div>
        <div className='bg-white p-5 rounded-br-[2.5rem] rounded-bl-[2.5rem]'>
          <Tabs defaultValue='About' className='w-full'>
            <TabsList className='mb-10 w-full justify-start '>
              <TabsTrigger className='rounded-none' value='About'>
                About
              </TabsTrigger>
              <TabsTrigger className='rounded-none' value='Comments'>
                Comments
              </TabsTrigger>
            </TabsList>
            <TabsContent value='About'>
              Make changes to your account here.
            </TabsContent>
            <TabsContent value='Comments'>
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InProgressContent;
