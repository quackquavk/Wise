import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { Toggle } from '@/components/ui/toggle';
import { useAuth } from './authContext';
function Box({ changeLoginDivState, DivpopUp, item, voteup, votedown }) {
  const { userLoggedIn } = useAuth();
  const { id, title, body, vote } = item;
  const [datastateup, setdatastateup] = useState();
  const [datastatedown, setdatastatedown] = useState();
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
    console.log(datastateup);
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

  const handleToggleUp = () => {
    if (userLoggedIn) {
      // if (localStorage.getItem(`${id}_datastateup`) == null) {
      //   setdatastateup('on');
      // }
      if (datastateup == 'off') {
        setdatastateup('on');
        if (datastatedown == 'on') {
          setdatastatedown('off');
        }
        voteup(id);
        console.log('up');
      } else {
        setdatastateup('off');
        votedown(id);
        console.log('down');
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
        console.log('down');
      } else {
        setdatastatedown('off');
        voteup(id);
        console.log('up');
      }
    } else {
      changeLoginDivState(true);
    }
  };
  return (
    <div
      key={id}
      className='flex rounded-3xl bg-need-bg-box hover:bg-need-light-green transition-colors duration-700 ease-in-out hover:cursor-pointer mb-10'
    >
      <section className='rounded-tl-3xl rounded-bl-3xl w-36 flex justify-center p-2  bg-need-dark-green '>
        <div>
          <Toggle
            data-state={datastateup}
            className='flex items-center justify-center mt-8 hover:cursor-pointer text-need-light-green text-lg rounded-2xl'
            onPressedChange={handleToggleUp}
          >
            <FontAwesomeIcon className='text-center ' icon={faAngleUp} />
          </Toggle>
          <Toggle
            data-state={datastatedown}
            className='flex items-center justify-center mt-2 hover:cursor-pointer text-need-light-green text-lg rounded-2xl'
            onPressedChange={handleToggledown}
          >
            <FontAwesomeIcon className='text-center ' icon={faAngleDown} />
          </Toggle>
        </div>
        <h1 className='mt-10 mr-2 ml-4 text-sm text-white font-medium '>
          {vote}
        </h1>
      </section>
      <section
        onClick={() => {
          DivpopUp(id);
        }}
        className='p-5 pb-10 '
      >
        <h1 className='font-bold mt-5 '>{title}</h1>
        <p className='mt-5'>{body}</p>
      </section>
    </div>
  );
}

export default Box;
