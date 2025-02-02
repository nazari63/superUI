import styled from 'styled-components';
import LOGO_IMG from '../../../../assets/img/logo.svg';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import ChainIcon from '../utility/ChainIcon';
import { useState } from 'react';

interface Props extends SimpleComponent {}

const DashboardSidebarWrapper = styled.div`
  .item-sidebar:hover {
    background-color: var(--color-brand-700);
    color: var(--color-white);
    transition: all 0.3s;
  }
`;

function DashboardSidebar(props: Props) {
  const [active1, setActive1] = useState('eth');
  const [active2, setActive2] = useState('eth');
  const l2ChainList = ['base', 'eth', 'local', 'mode', 'op', 'zora'];
  const l1ChainList = ['eth'];
  return (
    <DashboardSidebarWrapper className="h-full w-[16rem] flex-none bg-gray-50 border-1 border-gray-200 flex flex-col rounded-xl relative p-5">
      <div className="mb-8">
        <img src={LOGO_IMG} alt="logo" className="h-8" />
      </div>
      <Link to="/">
        <div className="text-brand-700 cursor-pointer flex items-center gap-2 hover:text-brand-100 hovering">
          <Icon icon="grommet-icons:form-previous-link" className="text-2xl" />
          <p className="text-sm font-semibold">All project</p>
        </div>
      </Link>

      {/* user */}
      <div className="my-3">
        <div className="flex items-center gap-2 bg-white border-1 border-gray-200 rounded-xl p-4 shadow">
          <Icon
            icon="carbon:user-avatar-filled"
            className="text-4xl text-blue-500"
          />
          <div>
            <p className="text-sm font-semibold text-black">User</p>
            <p className="text-sm font-semibold text-gray-600">NerdLab</p>
          </div>
        </div>
      </div>

      {/* layer 2 */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-gray-500">Layer 2</p>
        <div className="flex flex-col gap-2">
          {l2ChainList.map((item) => (
            <div
              key={item}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 cursor-pointer item-sidebar
                ${active1 === item ? 'bg-brand-700 text-white' : 'bg-white text-gray-700'}`}
            >
              <ChainIcon chain={item as any} />
              <p className="text-base font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* layer 2 */}
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-sm font-semibold text-gray-500">Layer 1</p>
        <div className="flex flex-col gap-2">
          {l1ChainList.map((item) => (
            <div
              key={item}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 cursor-pointer item-sidebar
                ${active2 === item ? 'bg-brand-700 text-white' : 'bg-white text-gray-700'}`}
            >
              <ChainIcon chain={item as any} />
              <p className="text-base font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardSidebarWrapper>
  );
}

export default DashboardSidebar;
