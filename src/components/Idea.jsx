import React, { useContext } from 'react';
import SideBox from './SideBox';
import Box from './Box';
import { Button } from './ui/button';
import { IdeaContext, SelectContext } from '@/App';
function Idea() {
  const {
    data,
    votedown,
    voteup,
    DivpopUp,
    changeLoginDivState,
    updateData,
    increaseMore,
    decreaseMore,
    seemoreforIdeas,
    gettingData,
  } = useContext(IdeaContext);
  const { selectedIdea } = useContext(SelectContext);
  return (
    <div className='flex flex-col  items-center md:items-start md:flex-row'>
      {selectedIdea === 'Most popular first' ? (
        <section className='w-2/3 mb-10 ' key={data.id}>
          {data
            .sort((a, b) => b.vote - a.vote)
            .map((item) => (
              <Box
                key={item.id}
                item={item}
                voteup={voteup}
                votedown={votedown}
                DivpopUp={DivpopUp}
                changeLoginDivState={changeLoginDivState}
              />
            ))}
          <Button
            className=' hover:bg-need-light-green hover:border-none bg-white text-need-dark-green border p-2 sm:h-12 sm:w-40 sm:p-4 rounded-[2rem] text-xs sm:text-base border-need-dark-green shadow-none'
            onClick={increaseMore}
          >
            {gettingData ? 'Loading...' : 'See more ideas'}
          </Button>
          {seemoreforIdeas > 6 && !gettingData && (
            <>
              <Button
                onClick={decreaseMore}
                className='sm:ml-5 ml-2 hover:bg-need-light-green hover:border-none bg-white text-need-dark-green border p-2 sm:h-12 sm:w-40 sm:p-4 rounded-[2rem] text-xs sm:text-base border-need-dark-green shadow-none'
              >
                See less
              </Button>
            </>
          )}
        </section>
      ) : (
        <section className='w-2/3' key={data.id}>
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
      )}
      <div className='bg-need-dark-green w-80  px-5 md:ml-10 lg:pb-5 py-5 rounded-[45px] lg:h-[25rem] md:max-lg:pb-4 mt-0'>
        <SideBox
          updateData={updateData}
          changeLoginDivState={changeLoginDivState}
        />
      </div>
    </div>
  );
}

export default Idea;
