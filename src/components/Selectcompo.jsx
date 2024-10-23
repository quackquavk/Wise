import React, { useContext, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectContext } from '@/App';
function Selectcompo() {
  const {
    activeTab,
    selectedInProgress,
    selectedIdea,
    selectedLaunched,
    handleIdeasSelect,
    handleInProgressSelect,
    handleLaunchedSelect,
  } = useContext(SelectContext);
  return (
    <>
      {activeTab === 'Ideas' && (
        <Select value={selectedIdea} onValueChange={handleIdeasSelect}>
          <SelectTrigger className='sm:w-96 w-64 px-3 ml-14 mt-5 lg:mt-0 py-6 font-bold'>
            <SelectValue placeholder='Most popular first' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='Most popular first'>
                Most popular first
              </SelectItem>
              <SelectItem value='Most recent first'>
                Most recent first
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      {activeTab === 'InProgress' && (
        <Select
          value={selectedInProgress}
          onValueChange={handleInProgressSelect}
          className=''
        >
          <SelectTrigger className='w-96 px-3 ml-14 mt-5 lg:mt-0 py-6 font-bold'>
            <SelectValue placeholder='All region' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='All region'>All region</SelectItem>
              <SelectItem value='Europe'>Europe</SelectItem>
              <SelectItem value='Asia'>Asia</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      {activeTab === 'Launched' && (
        <Select
          value={selectedLaunched}
          onValueChange={handleLaunchedSelect}
          className=''
        >
          <SelectTrigger className='w-96 px-3 ml-14 mt-5 lg:mt-0 py-6 font-bold'>
            <SelectValue placeholder='All region' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='All region'>All region</SelectItem>
              <SelectItem value='Europe'>Europe</SelectItem>
              <SelectItem value='Asia'>Asia</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </>
  );
}

export default Selectcompo;
