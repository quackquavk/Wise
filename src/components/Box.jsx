import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { faHeart as HeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as HeartSolid,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { Toggle } from '@/components/ui/toggle';
import { Button } from './ui/button';
import { useAuth } from './authContext';
function Box({ changeLoginDivState, DivpopUp, item, voteup, votedown }) {
  const { userLoggedIn } = useAuth();
  const { id, title, body, vote } = item;
  const [datastateup, setdatastateup] = useState();
  const [datastatedown, setdatastatedown] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    if (userLoggedIn) {
      setdatastateup(
        localStorage.getItem(`${id}_datastateup`)
          ? localStorage.getItem(`${id}_datastateup`)
          : 'off'
      );
      setdatastatedown(
        localStorage.getItem(`${id}_datastatedown`)
          ? localStorage.getItem(`${id}_datastatedown`)
          : 'off'
      );
    } else {
      setdatastateup('off');
      setdatastatedown('off');
    }
  }, [userLoggedIn]);

  useEffect(() => {
    if (userLoggedIn) {
      localStorage.setItem(`${id}_datastateup`, datastateup);
    }
  }, [datastateup, userLoggedIn, id]);
  useEffect(() => {
    if (userLoggedIn) {
      localStorage.setItem(`${id}_datastatedown`, datastatedown);
    }
  }, [datastatedown, userLoggedIn, id]);
  // useEffect(() => {
  //   if (userLoggedIn) {
  //     if (localStorage.getItem(`${id}_datastateup`) == null) {
  //       localStorage.setItem(`${id}_datastatedowm`, 'off');
  //     }
  //     localStorage.setItem(`${id}_datastatedown`, datastatedown);
  //   }
  // }, [datastatedown, userLoggedIn, id]);

  const handleToggleUp = (e) => {
    e.stopPropagation();
    if (userLoggedIn) {
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
    } else {
      changeLoginDivState(true);
    }
  };
  const handleToggledown = () => {
    if (userLoggedIn) {
      // if (localStorage.getItem(`${id}_datastateup`) == null) {
      //   setdatastateup('on');
      // }
      if (datastatedown == 'off') {
        setdatastatedown('on');
        if (datastateup == 'on') {
          setdatastateup('off');
        }
        votedown(id);
      } else {
        setdatastatedown('off');
        voteup(id);
      }
    } else {
      changeLoginDivState(true);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div
          key={id}
          className='flex rounded-3xl bg-need-dark-green/10 hover:bg-need-light-green transition-colors duration-700 ease-in-out hover:cursor-pointer mb-10 text-wrap'
        >
          <section className='rounded-tl-3xl rounded-bl-3xl w-36 flex justify-center p-2  bg-need-dark-green '>
            <div
              className={`h-8  ml-2 ${loading ? 'mt-9' : 'mt-10'}`}
              onClick={handleToggleUp}
            >
              {/* <Toggle
            data-state={datastateup}
            className='flex items-center justify-center mt-8 hover:cursor-pointer text-need-light-green text-lg rounded-2xl'
            onPressedChange={handleToggleUp}
          >
            <FontAwesomeIcon className='text-center ' icon={faAngleUp} />
          </Toggle> */}
              {loading ? (
                <Spinner
                  classname={'fill-need-light-green text-need-dark-green'}
                />
              ) : (
                <FontAwesomeIcon
                  icon={datastateup == 'on' ? HeartSolid : HeartRegular}
                  className={`text-xl ${
                    datastateup == 'on'
                      ? 'text-need-light-green'
                      : 'text-need-light-green'
                  }`}
                />
              )}

              {/* <Toggle
            data-state={datastatedown}
            className='flex items-center justify-center mt-2 hover:cursor-pointer text-need-light-green text-lg rounded-2xl'
            onPressedChange={handleToggledown}
          >
            <FontAwesomeIcon className='text-center ' icon={faAngleDown} />
          </Toggle> */}
            </div>
            <h1 className='mt-10 mr-2 ml-4  text-xs sm:text-base text-white font-medium '>
              {vote}
            </h1>
          </section>
          <section
            // onClick={() => {
            //   DivpopUp(id);
            // }}
            className='p-5 pb-10 flex flex-col items-start'
          >
            <h1 className='font-bold text-xs sm:text-lg mt-5 text-start  overflow-hidden '>
              {title}
            </h1>
            <p className=' sm:text-base text-xs mt-5 overflow-auto text-wrap text-start break-words'>
              {body}
            </p>
          </section>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className='bg-need-dark-green h-60 flex justify-around items-center text-need-light-green rounded-tr-3xl rounded-tl-3xl p-2 px-10'>
          <h1 className='mb-5 font-bold text-xl '>{title}</h1>
          <section className='flex mt-28'>
            <div
              className={`h-8  mr-2 hover:cursor-pointer`}
              onClick={handleToggleUp}
            >
              {loading ? (
                <Spinner
                  classname={'fill-need-light-green text-need-dark-green'}
                />
              ) : (
                <FontAwesomeIcon
                  icon={datastateup == 'on' ? HeartSolid : HeartRegular}
                  className={`text-xl ${
                    datastateup == 'on'
                      ? 'text-need-light-green'
                      : 'text-need-light-green'
                  }`}
                />
              )}
            </div>
            <h1 className='font-bold flex '> {vote}</h1>
          </section>
        </div>
        <div className=' rounded-br-3xl rounded-bl-3xl bg-white'>
          <section className='p-5 pl-5'>
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
                <div className=''>{body}</div>
              </TabsContent>
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
          </section>
        </div>
        <div />
      </DialogContent>
    </Dialog>
  );
}

export default Box;
