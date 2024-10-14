import React, { useState } from 'react';
import { Button } from './ui/button';

import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { useAuth } from './authContext';

function SideBox({ changeLoginDivState, updateData }) {
  const { userLoggedIn } = useAuth();
  const [input, setInput] = useState('');
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(new Date().getTime().toString(), input, text);
  };
  return (
    <>
      {userLoggedIn && (
        <>
          <img
            src='https://wise.com/web-art/assets/illustrations/light-bulb-medium@1x.webp'
            alt=''
            className='w-24 mb-5'
          />
          <h1 className='text-need-light-green font-bold text-2xl '>
            Share your ideas!
          </h1>
          <p className='text-white mt-5'>
            Have an idea to improve our product? Share it with our product team
          </p>
          <Sheet className=''>
            <SheetTrigger asChild>
              <Button className='bg-need-dark-green  text-need-light-green border-need-light-green border-2 mt-5 mb-1 p-6 text-md hover:brightness-125'>
                Submit an Idea
              </Button>
            </SheetTrigger>

            <SheetContent className=''>
              <SheetHeader className='p-0 flex justify-center  bg-need-dark-green h-1/5  rounded-tl-3xl'>
                <SheetTitle className='text-need-light-green pl-10'>
                  Tell us your idea!
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className='p-5'>
                <form onSubmit={handleSubmit}>
                  <h1>One sentence that summarises your idea</h1>
                  <Input
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                    className='mt-5 border-border-color border-2 '
                  />
                  <h1 className='mt-5'>
                    Why your idea is useful, who should benefit and how it
                    should work?
                  </h1>
                  <textarea
                    name=''
                    id=''
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    className='mt-5 w-full rounded-lg h-[200px] border-2 border-border-color '
                  ></textarea>
                  <h1 className='mt-5'>
                    Once reviewed it will show up in the Ideas tab. If it's an
                    idea we're passionate about we might reach out about it.
                  </h1>
                  <Button
                    type='submit'
                    className=' mt-5 bg-need-light-green text-need-dark-green'
                  >
                    Submit idea
                  </Button>
                  <SheetClose asChild>
                    <Button className='  bg-need-light-green text-need-dark-green'>
                      Close
                    </Button>
                  </SheetClose>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
      {!userLoggedIn && (
        <>
          {' '}
          <img
            src='https://wise.com/web-art/assets/illustrations/light-bulb-medium@1x.webp'
            alt=''
            className='w-24'
          />
          <h1 className='text-need-light-green font-bold text-2xl '>
            Share your ideas!
          </h1>
          <p className='text-white mt-5'>
            Have an idea to improve our product? Share it with our product team.
            <br />
            <br />
            You need to be logged in to submit an idea
          </p>
          <Button
            onClick={() => {
              changeLoginDivState(true);
            }}
            className='bg-need-light-green text-need-dark-green mt-5 mb-1 p-6 text-md  hover:brightness-125'
          >
            Log In
          </Button>
        </>
      )}
    </>
  );
}
export default SideBox;
