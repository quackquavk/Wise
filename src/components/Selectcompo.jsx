import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
function Selectcompo({ activeTab }) {
  return (
    <Select className=''>
      <SelectTrigger className='w-96 px-3 ml-14 mt-5 lg:mt-0 py-6 font-bold'>
        <SelectValue
          placeholder={`${
            activeTab == 'Ideas' ? 'Most popular first' : 'All regions'
          }`}
        />
      </SelectTrigger>
      <SelectContent>
        {!(activeTab == 'Ideas') && (
          <SelectGroup>
            {/* <SelectLabel>Fruits</SelectLabel> */}
            <SelectItem value='All region'>All region</SelectItem>
            <SelectItem value='Europe'>Europe</SelectItem>
            <SelectItem value='Asia'>Asia</SelectItem>
          </SelectGroup>
        )}
        {activeTab == 'Ideas' && (
          <SelectGroup>
            {/* <SelectLabel>Fruits</SelectLabel> */}
            <SelectItem value='Most popular First'>
              Most popular First
            </SelectItem>
            <SelectItem value='Most recent First'>Most recent First</SelectItem>
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}

export default Selectcompo;
