import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props extends SimpleComponent {
  value: string;
  onChange: (e: any) => any;
  placeholder?: string;
}

const InputWrapper = styled.div``;

function Input(props: Props) {
  const [search, setSearch] = useState('');

  const handleChange = (e: any) => {
    setSearch(e.target.value);
    props.onChange(e);
  };

  useEffect(() => {
    setSearch(props.value);
  }, [props.value]);

  return (
    <InputWrapper className="flex gap-2 items-center border-1 border-gray-300 rounded-xl p-2 cursor-pointer text-gray-500">
      <input
        id="search"
        type="text"
        value={search}
        onChange={handleChange}
        placeholder={props.placeholder || 'input'}
        className="border-0 border-none placeholder-gray-300 outline-0 text-gray-800 cursor-pointer flex-1"
      />
    </InputWrapper>
  );
}

export default Input;
