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
export const SelectContext = createContext(null);
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
  const [selectedInProgress, setSelectedInProgess] = useState('All region');
  const [selectedIdea, setSelectedIdea] = useState('Most popular first');
  const [selectedLaunched, setSelectedLaunched] = useState('All region');
  const [activeTab, setActiveTab] = useState('Ideas');
  const [seemoreforIdeas, setSeeMoreForIdeas] = useState(5);
  const [gettingData, setGettingData] = useState(false);
  const handleIdeasSelect = (value) => {
    setSelectedIdea(value);
  };
  const increaseMore = () => {
    setSeeMoreForIdeas(seemoreforIdeas + 5);
  };
  const decreaseMore = () => {
    setSeeMoreForIdeas(5);
  };
  const handleInProgressSelect = (value) => {
    setSelectedInProgess(value);
  };
  const handleLaunchedSelect = (value) => {
    setSelectedLaunched(value);
  };

  const fetchdata = async () => {
    const response = await fetch(url);
    const result = await response.json();
    return result.slice(0, seemoreforIdeas).map((item) => {
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
    setGettingData(true);
    fetchdata().then((elements) => {
      setdata(elements);
      setGettingData(false);
    });
  }, [seemoreforIdeas]);
  useEffect(() => {
    if (loginDiv) {
      scrollLogin.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loginDiv]);

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
    gettingData,
    data,
    votedown,
    voteup,
    DivpopUp,
    changeLoginDivState,
    updateData,
    increaseMore,
    decreaseMore,
    seemoreforIdeas,
  };
  const SelectValue = {
    activeTab,
    selectedInProgress,
    selectedIdea,
    selectedLaunched,
    handleIdeasSelect,
    handleInProgressSelect,
    handleLaunchedSelect,
  };
  const LaunchValue = { launchdata };

  const tabdata = [
    {
      label: 'InProgress',
      value: 'InProgress',
      desc: (
        <IdeaContext.Provider value={IdeaValue}>
          <InProgess />
        </IdeaContext.Provider>
      ),
    },
    {
      label: 'Ideas',
      value: 'Ideas',
      desc: (
        <IdeaContext.Provider value={IdeaValue}>
          <SelectContext.Provider value={SelectValue}>
            <Idea />
          </SelectContext.Provider>
        </IdeaContext.Provider>
      ),
    },
    {
      label: 'Launched',
      value: 'Launched',
      desc: (
        <IdeaContext.Provider value={IdeaValue}>
          <Launched />
        </IdeaContext.Provider>
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
            <SelectContext.Provider value={SelectValue}>
              <Selectcompo />
            </SelectContext.Provider>
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
