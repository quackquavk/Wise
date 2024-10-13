import { createContext, useEffect, useState, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Box from './components/Box';
import SideBox from './components/SideBox';
import { Button } from './components/ui/button';
import LogIn from './components/LogIn';
import Register from './components/Register';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
export const LogContext = createContext(null);
function App() {
  const [data, setdata] = useState([]);
  const [loginDiv, setloginDiv] = useState(false);
  const [registerDiv, setregisterDiv] = useState(false);
  const [selectedItem, setselectedItem] = useState(null);
  const [scrollPosition, setscrollPosition] = useState(0);
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const scrollLogin = useRef(null);
  const popup = useRef(null);

  const fetchdata = async () => {
    const response = await fetch(url);
    const result = await response.json();
    return result.slice(0, 4).map((item) => {
      const itemvoteid = localStorage.getItem(`${item.id}_vote`);
      if (!itemvoteid) {
        item.vote = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        return item;
      } else {
        item.vote = parseInt(itemvoteid);
        return item;
      }
    });
  };
  useEffect(() => {
    data.forEach((item) => {
      localStorage.setItem(`${item.id}_vote`, item.vote.toString());
    });
  });
  useEffect(() => {
    fetchdata().then((elements) => {
      setdata(elements);
    });
  }, []);
  useEffect(() => {
    if (loginDiv) {
      scrollLogin.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loginDiv]);
  useEffect(() => {
    if (selectedItem) {
      popup.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [selectedItem]);
  const voteup = (id) => {
    const newArray = data.map((item) => {
      console.log(item);
      if (item.id == id) {
        return { ...item, vote: item.vote + 1 };
      } else {
        return item;
      }
    });
    console.log(newArray);
    setdata(newArray);
  };
  const votedown = (id) => {
    const newArray = data.map((item) => {
      console.log(item);
      if (item.id == id) {
        // localStorage.setItem(item.id, (item.vote - 1).toString());
        return { ...item, vote: item.vote - 1 };
      } else {
        return item;
      }
    });
    // console.log(newArray);

    setdata(newArray);
  };

  const DivpopUp = (id) => {
    const item = data.find((item) => item.id == id);
    setscrollPosition(window.scrollY);
    setselectedItem(item);
  };
  const changeLoginDivState = (state) => {
    setloginDiv(state);
  };
  const changeRegisterDivState = () => {
    setregisterDiv(!registerDiv);
  };
  const LogValues = {
    changeLoginDivState,
    changeRegisterDivState,
  };

  return (
    <section className='relative'>
      {loginDiv && (
        <div
          ref={scrollLogin}
          className='flex justify-center items-center w-full h-[100vh] z-30'
        >
          <LogIn ref={scrollLogin} changeLoginDivState={changeLoginDivState} />
        </div>
      )}
      {registerDiv && (
        <div className='flex justify-center items-center w-full h-[100vh] z-30'>
          <Register changeRegisterDivState={changeRegisterDivState} />
        </div>
      )}
      <LogContext.Provider value={LogValues}>
        {!(loginDiv || registerDiv) && <Hero></Hero>}
      </LogContext.Provider>
      <div className='mt-20'></div>
      {selectedItem && (
        <div
          ref={popup}
          className='absolute flex justify-center items-center  w-full h-[100vh] backdrop-blur-lg bg-black bg-opacity-50 z-30'
        >
          <section className='lg:w-1/3 relative  '>
            <FontAwesomeIcon
              onClick={() => {
                window.scrollTo(0, scrollPosition);
                setselectedItem(null);
              }}
              className='absolute top-10 right-5 text-2xl hover:cursor-pointer bg-need-background-green px-5 py-4 rounded-full text-need-light-green'
              icon={faXmark}
            />
            <div className='bg-need-dark-green h-60 flex justify-around items-center text-need-light-green rounded-tr-3xl rounded-tl-3xl p-2 px-10'>
              <h1 className='mb-5 font-bold text-xl '>{selectedItem.title}</h1>
              <section className='flex mt-28'>
                <h1 className='font-bold flex '>
                  {' '}
                  <span className='mr-3 font-medium'> Votes: </span>{' '}
                  {selectedItem.vote}
                </h1>
              </section>
            </div>
            <div className=' rounded-br-3xl rounded-bl-3xl bg-white'>
              <section className='p-5 pl-10'>
                <h1>About</h1>
              </section>
              <div className='p-10'>{selectedItem.body}</div>
            </div>
          </section>
        </div>
      )}
      <div className=' mt-5 flex lg:flex-row lg:justify-center lg:items-start lg:pl-52 lg:pr-36  flex-col items-center'>
        <section className='w-2/3'>
          {data.map((item) => {
            return (
              <Box
                key={item.id}
                item={item}
                voteup={voteup}
                votedown={votedown}
                DivpopUp={DivpopUp}
                changeLoginDivState={changeLoginDivState}
              />
            );
          })}
        </section>
        <div className=' md:max-lg:pb-4 bg-need-dark-green w-[400px] px-5 ml-10  py-5 rounded-[45px] h-[26rem]'>
          <SideBox changeLoginDivState={changeLoginDivState} />
        </div>
      </div>
    </section>
  );
}

export default App;
