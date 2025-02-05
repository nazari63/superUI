import { useEffect } from 'react';
import styled from 'styled-components';

interface Props extends SimpleComponent {}

function Initialization(props: Props) {
  const getAccounts = async () => {
    const accounts = await window.electron.accounts.getAccounts();
    console.log(accounts);
  };

  useEffect(() => {
    getAccounts();
  }, []);
  return null;
}

export default Initialization;
