import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { LogContext } from '@/App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { doSignOut } from './auth';
import { useAuth } from './authContext';
function NavBar() {
  const { currentUser, userLoggedIn } = useAuth();
  const { changeLoginDivState, changeRegisterDivState, changeOptionDivState } =
    useContext(LogContext);
  return (
    <div className='lg:w-4/5  w-full  py-5  lg:pl-5 pr-0 pl-0 sm:max-lg:left-0 sm:max-lg:pl-10 flex items-center sm:absolute  top-20 relative lg:left-auto sm:top-5 z-15 overflow-hidden'>
      <h1 className='mr-10 text-3xl text-need-light-green font-bold italic'>
        Wise
      </h1>
      <FontAwesomeIcon
        onClick={() => {
          changeOptionDivState(true);
        }}
        className=' absolute hover:cursor-pointer right-10 text-need-light-green lg:invisible overflow-hidden'
        icon={faBars}
      />
      <div className='flex w-full items-center justify-between lg:visible invisible'>
        <div className='flex '>
          <Button className='bg-need-light-green text-need-dark-green hover:brightness-125'>
            Personal
          </Button>
          <Button className='bg-need-dark-green text-need-light-green shadow-none'>
            Business
          </Button>
        </div>
        <div className='flex'>
          {/* <Button className='bg-need-dark-green'>Features</Button>
          <Button>Pricing</Button>
          <Button>Help</Button>
          <Button>Log in</Button>
          <Button>Register</Button> */}
          <NavigationMenu className=' flex '>
            <NavigationMenuList>
              <NavigationMenuItem className=' bg-need-dark-green text-need-light-green hover:bg-need-dark-green '>
                <NavigationMenuTrigger className='bg-need-dark-green hover:bg-need-dark-green '>
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent className>
                  <NavigationMenuLink className=' '>
                    <div className='h-[350px]'>
                      <div className='h-60 mt-4 text-lg font-medium w-72 '>
                        <a
                          className='flex w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                          href='/'
                        >
                          <h1>Multi currency account</h1>

                          <p>
                            Explore the account use by 16 million people to
                            live,work,travel and transfer money worldWdie
                          </p>
                        </a>
                      </div>
                      <div className=' flex justify-center flex-col pb-16 pl-5'>
                        <a href=''>
                          <h1 className='mb-10'>Money trasfer</h1>
                        </a>
                        <a href=''>
                          <h1>Large amount transfer</h1>
                        </a>
                      </div>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button className=' bg-need-dark-green text-need-light-green shadow-none hover:brightness-125'>
                  Pricing
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button className=' bg-need-dark-green text-need-light-green shadow-none hover:brightness-125'>
                  Help
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                {!userLoggedIn && (
                  <Button
                    onClick={() => {
                      changeLoginDivState(true);
                    }}
                    className='bg-need-dark-green text-need-light-green shadow-none hover:brightness-125 '
                  >
                    Log In
                  </Button>
                )}
                {userLoggedIn && (
                  <h1 className='text-need-light-green font-bold mr-5'>
                    {currentUser.displayName}
                  </h1>
                )}
              </NavigationMenuItem>
              <NavigationMenuItem>
                {!userLoggedIn && (
                  <Button
                    onClick={changeRegisterDivState}
                    className='text-need-dark-green bg-need-light-green hover:brightness-125'
                  >
                    Register
                  </Button>
                )}
                {userLoggedIn && currentUser && (
                  <Button
                    onClick={doSignOut}
                    className='text-need-dark-green bg-need-light-green hover:brightness-125'
                  >
                    SignOut
                  </Button>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
