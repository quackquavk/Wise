import React from 'react';
import NavBar from './NavBar';

function Hero() {
  return (
    <div className='bg-need-dark-green h-[100vh] w-full flex pl-10 sm:items-center  justify-center sm:max-lg:pl-10 lg:pl-52 lg:pr-36 sm:flex-row flex-col'>
      <NavBar></NavBar>
      <div className=' mt-20 '>
        <h1 className='text-need-light-green lg:text-8xl text-4xl font-black'>
          Mission <br /> RoadMap
        </h1>
        <p className='text-white mr-5 mt-10 mb-10'>
          Welcome to the Mission Roadmap - a map of how we plan to achieve the
          mission of building money without borders: moving it instantly,
          transparently, conveniently, and - eventually - for free.
        </p>
        <a href='/' className='flex text-need-light-green'>
          <h1 className=' underline underline-offset-1 hover:brightness-200'>
            About the Roadmap
          </h1>
          <span>&nbsp;{`>`}</span>
        </a>
      </div>
      <img
        className='mt-20 lg:w-[430px] w-60 '
        src='https://wise.com/web-art/assets/illustrations/map-large@1x.webp'
        alt=''
      />
    </div>
  );
}

export default Hero;
