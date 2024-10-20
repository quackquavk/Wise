import React, { useContext } from 'react';
import SideBox from './SideBox';
import Box from './Box';
import { IdeaContext } from '@/App';
function Idea() {
  const { data, votedown, voteup, DivpopUp, changeLoginDivState, updateData } =
    useContext(IdeaContext);
  return (
    <div className='flex flex-col  items-center md:items-start md:flex-row'>
      <section className='w-2/3'>
        {data.map((item) => (
          <Box
            key={item.id}
            item={item}
            voteup={voteup}
            votedown={votedown}
            DivpopUp={DivpopUp}
            changeLoginDivState={changeLoginDivState}
          />
        ))}
      </section>
      <div className='bg-need-dark-green w-80  px-5 md:ml-10 lg:pb-5 py-5 rounded-[45px] lg:h-[30rem] md:max-lg:pb-4 mt-0'>
        <SideBox
          updateData={updateData}
          changeLoginDivState={changeLoginDivState}
        />
      </div>
    </div>
  );
}

export default Idea;
