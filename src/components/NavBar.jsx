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
import { useAuth } from './authContext';

function NavBar() {
  const { userLoggedIn, logout, user, loading } = useAuth();
  const { changeLoginDivState, changeOptionDivState } = useContext(LogContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='lg:w-4/5  w-full  py-5  lg:pl-5 pr-0 pl-0 sm:max-lg:left-0 sm:max-lg:pl-10 flex items-center sm:absolute  top-16 relative lg:left-auto sm:top-5 z-15 overflow-hidden'>
      <h1 className='mr-10 text-3xl text-need-light-green font-bold italic'>
        Wise
      </h1>
      <FontAwesomeIcon
        onClick={() => {
          changeOptionDivState(true);
        }}
        className='absolute hover:cursor-pointer right-10 text-need-light-green lg:invisible overflow-hidden'
        icon={faBars}
      />
      <div className='flex w-full items-center justify-between lg:visible invisible'>
        <div className='flex'>
          <Button className='bg-need-light-green text-need-dark-green hover:brightness-125'>
            Personal
          </Button>
          <Button className='bg-need-dark-green text-need-light-green shadow-none'>
            Business
          </Button>
        </div>
        <div className='flex'>
          <NavigationMenu className='flex'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className='bg-need-dark-green text-need-light-green shadow-none hover:brightness-125 px-4 py-2 rounded-md'>
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className='bg-need-dark-green text-need-light-green shadow-none hover:brightness-125 px-4 py-2 rounded-md'>
                  Help
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                {!userLoggedIn ? (
                  <NavigationMenuLink
                    onClick={() => {
                      changeLoginDivState(true);
                    }}
                    className='bg-need-dark-green text-need-light-green shadow-none hover:brightness-125 px-4 py-2 rounded-md cursor-pointer'
                  >
                    Log In
                  </NavigationMenuLink>
                ) : (
                  <span className='text-need-light-green font-bold mr-5 px-4 py-2'>
                    {loading ? 'Loading...' : user?.username}
                  </span>
                )}
              </NavigationMenuItem>
              <NavigationMenuItem>
                {!userLoggedIn ? (
                  <NavigationMenuLink
                    onClick={() => {
                      changeLoginDivState(true);
                    }}
                    className='text-need-dark-green bg-need-light-green hover:brightness-125 px-4 py-2 rounded-md cursor-pointer'
                  >
                    Register
                  </NavigationMenuLink>
                ) : (
                  <NavigationMenuLink
                    onClick={handleLogout}
                    className='text-need-dark-green bg-need-light-green hover:brightness-125 px-4 py-2 rounded-md cursor-pointer'
                  >
                    SignOut
                  </NavigationMenuLink>
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
