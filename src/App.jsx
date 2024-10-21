import { createContext, useEffect, useState, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Box from './components/Box';
import SideBox from './components/SideBox';
// import { Button } from './components/ui/button';
import LogIn from './components/LogIn';
import Register from './components/Register';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Option from './components/Option';
import Launched from './components/Launched';
import Idea from './components/Idea';
import InProgess from './components/InProgess';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import Selectcompo from './components/Selectcompo';
export const LogContext = createContext(null);
export const IdeaContext = createContext(null);
export const LaunchedContext = createContext(null);
function App() {
  const [data, setdata] = useState([]);
  const [loginDiv, setloginDiv] = useState(false);
  const [registerDiv, setregisterDiv] = useState(false);
  const [selectedItem, setselectedItem] = useState(null);
  const [scrollPosition, setscrollPosition] = useState(0);
  const [optionStatus, setOptionStatus] = useState(false);
  const [idea, setIdea] = useState(true);
  const [launched, setLaunched] = useState(false);
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const scrollLogin = useRef(null);
  const popup = useRef(null);
  const launchdata = useState('');

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
  const changeOptionDivState = (state) => {
    setOptionStatus(state);
  };
  const updateData = (id, title, body, vote = 0) => {
    setdata((prevData) => [
      ...prevData,
      { id: id, title: title, body: body, vote: vote },
    ]);
  };
  const LogValues = {
    changeLoginDivState,
    changeRegisterDivState,
    changeOptionDivState,
  };
  const IdeaValue = {
    data,
    votedown,
    voteup,
    DivpopUp,
    changeLoginDivState,
    updateData,
  };
  const LaunchValue = { launchdata };
  const [activeTab, setActiveTab] = useState('Ideas');
  const tabdata = [
    {
      label: 'InProgress',
      value: 'Inprogress',
      desc: <InProgess />,
    },
    {
      label: 'Ideas',
      value: 'Ideas',
      desc: (
        <IdeaContext.Provider value={IdeaValue}>
          <Idea />
        </IdeaContext.Provider>
      ),
    },
    {
      label: 'Launched',
      value: 'Launched',
      desc: (
        <LaunchedContext.Provider value={LaunchValue}>
          <Launched />
        </LaunchedContext.Provider>
      ),
    },
  ];

  return (
    <section className='relative'>
      {optionStatus && (
        <LogContext.Provider value={LogValues}>
          <Option />
        </LogContext.Provider>
      )}
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
      <div className=' mt-5 flex lg:flex-row lg:justify-center lg:items-start lg:pl-52 lg:pr-36 px-2 flex-col items-center'>
        <Tabs className='w-full mt-5' value={activeTab}>
          <div className='w-full flex justify-between lg:flex-row flex-col items-center'>
            <TabsHeader
              className='rounded-none border-b border-blue-gray-50 bg-transparent  p-0 h-16 '
              indicatorProps={{
                className:
                  'bg-transparent border-b-2 border-black shadow-none rounded-none',
              }}
            >
              {tabdata.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={` text-base hover:cursor-pointer  px-5 ml-2 ${
                    activeTab === value ? 'font-bold text-need-dark-green' : ''
                  }`}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <Selectcompo activeTab={activeTab} />
          </div>
          <TabsBody className='mt-20 w-full'>
            {tabdata.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </section>
  );
}

export default App;
