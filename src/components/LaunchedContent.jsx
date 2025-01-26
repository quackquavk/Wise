import React, { useContext, useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as HeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as HeartSolid,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './authContext';
import { IdeaContext } from '@/App';
import Spinner from './Spinner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function LaunchedContent({ item, voteup, votedown }) {
  const { changeLoginDivState } = useContext(IdeaContext);
  const { id, title, body, vote } = item;
  const { userLoggedIn } = useAuth();
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

    } else {
      setLoading(true);
      setTimeout(() => {
        setdatastateup('on');
        setLoading(false);

        voteup(id);
      }, 1500);

    }
  };
  return (
    <Dialog className=''>
      <DialogTrigger>
        <div
          key={id}
          className=' relative py-5 mr-10 px-5 group hover:bg-need-light-green transition-colors duration-700 ease-in-out hover:cursor-pointer w-[22 rem] min-h-80  rounded-[2.3rem] bg-white flex flex-col justify-between'
        >
          <section className='flex flex-col items-start overflow-y-auto max-h-56'>
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
            <TabsContent value='About'>{body}.</TabsContent>
            <TabsContent value='Comments'>
              {!userLoggedIn ? (
                <div className='flex bg-need-dark-green/10 rounded-2xl p-5'>
                  <FontAwesomeIcon
                    className='text-5xl'
                    icon={faCircleExclamation}
                  />
                  <div className='flex ml-5 flex-col items-start'>
                    <h1 className='font-normal'>
                      You need to log in to leave a comment{' '}
                    </h1>
                    <DialogClose>
                      <Button
                        onClick={() => {
                          setTimeout(() => {
                            changeLoginDivState(true);
                          }, 500);
                        }}
                        className='w-16 px-0 border-b border-b-black rounded-none pb-0 bg-inherit shadow-none text-need-dark-green hover:bg-inherit'
                      >
                        Log in
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              ) : (
                <div>
                  <h1>You can comment </h1>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LaunchedContent;
