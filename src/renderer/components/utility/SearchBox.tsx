import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props extends SimpleComponent {
  value: string;
  onChange: (e: any) => any;
}

const SerchBoxWrapper = styled.div``;

function SerchBox(props: Props) {
  const [search, setSearch] = useState('');

  const handleChange = (e: any) => {
    setSearch(e.target.value);
    props.onChange(e);
  };

  useEffect(() => {
    setSearch(props.value);
  }, [props.value]);

  return (
    <SerchBoxWrapper className="flex gap-2 items-center border-1 border-gray-300 rounded-xl p-2 cursor-pointer text-gray-500">
      <label className="">
        <Icon icon={'bx:bx-search'} className="text-xl" />
      </label>
      <input
        id="search"
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search"
        className="border-0 border-none placeholder-gray-300 outline-0 text-gray-800 cursor-pointer flex-1"
      />
    </SerchBoxWrapper>
  );
}

export default SerchBox;
