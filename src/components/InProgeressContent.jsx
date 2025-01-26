import React, { useContext, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Button } from './ui/button';
import { Toggle } from './ui/toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as HeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as HeartSolid,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
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
import { useAuth } from './authContext';
import { IdeaContext } from '@/App';

function InProgressContent({ item, voteup, votedown }) {
  const { id, title, body, vote } = item;
  const { userLoggedIn } = useAuth();
  const { changeLoginDivState } = useContext(IdeaContext);
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
    <div className='flex flex-col items-start w-full'>
      <Dialog>
        <DialogTrigger asChild>
          <div className='hover:cursor-pointer'>
            <h1 className='font-bold text-need-dark-green'>{title}</h1>
            <p className='text-need-dark-green mt-5'>{body}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-need-dark-green'>
              {title}
            </DialogTitle>
            <DialogDescription className='text-need-dark-green'>
              {body}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className='flex mt-5'>
        <div className='flex items-center'>
          <div
            onClick={() => {
              voteup(id);
            }}
            className='hover:cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-need-dark-green'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4.5 15.75l7.5-7.5 7.5 7.5'
              />
            </svg>
          </div>
          <h1 className='text-need-dark-green font-bold ml-2'>{vote}</h1>
          <div
            onClick={() => {
              votedown(id);
            }}
            className='hover:cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-need-dark-green'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 8.25l-7.5 7.5-7.5-7.5'
              />
            </svg>
          </div>
        </div>
        <div className='flex items-center ml-5'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 text-need-dark-green'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
            />
          </svg>
          <h1 className='text-need-dark-green font-bold ml-2'>0</h1>
        </div>
      </div>
    </div>
  );
}

export default InProgressContent;
