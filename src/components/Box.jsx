import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as HeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as HeartSolid } from '@fortawesome/free-solid-svg-icons';
import { Toggle } from '@/components/ui/toggle';
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
      if (datastateup == 'on') {
        setLoading(true);
        setTimeout(() => {
          setdatastateup('off');
          setLoading(false);
          votedown(id);
        }, 2000);
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
        }, 2000);

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
        <div
          className={` ml-2 ${loading ? 'mt-9' : 'mt-10'}`}
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
            <Spinner classname={'fill-need-light-green text-need-dark-green'} />
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
        onClick={() => {
          DivpopUp(id);
        }}
        className='p-5 pb-10 '
      >
        <h1 className='font-bold text-xs sm:text-lg mt-5 overflow-hidden '>
          {title}
        </h1>
        <p className=' sm:text-base text-xs mt-5'>{body}</p>
      </section>
    </div>
  );
}

export default Box;
