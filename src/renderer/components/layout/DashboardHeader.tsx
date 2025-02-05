import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ChainIcon from '../utility/ChainIcon';
import SerchBox from '../utility/SearchBox';

interface Props extends SimpleComponent {}

const DashboardHeaderWrapper = styled.div``;

const HeaderMenuList = [
  {
    title: 'Dashboard',
    icon: 'mdi:file-graph',
    link: '/dashboard/main',
  },
  {
    title: 'Accounts',
    icon: 'flowbite:wallet-solid',
    link: '/dashboard/account',
  },
  {
    title: 'Transactions',
    icon: 'icon-park-solid:transaction',
    link: '/dashboard/transactions',
  },
  {
    title: 'Contracts',
    icon: 'ri:contract-fill',
    link: '/dashboard',
  },
  {
    title: 'Events',
    icon: 'mdi:event-auto',
    link: '/dashboard',
  },
  {
    title: 'Logs',
    icon: 'carbon:cloud-logging',
    link: '/dashboard',
  },
  {
    title: 'Settings',
    icon: 'lets-icons:setting-fill',
    link: '/dashboard',
  },
];

function DashboardHeader(props: Props) {
  const [select, setSelectMenu] = useState('Dashboard');
  const [search, setSearch] = useState('');
  const location = useLocation();

  console.log(location.pathname);

  return (
    <DashboardHeaderWrapper className="w-full bg-white py-5 px-6 border-b-1 border-gray-200">
      <div className="flex flex-wrap w-ful gap-12">
        <div>
          <p className="text-gray-600 mb-1 text-sm">Current Block</p>
          <b className="text-black">123456</b>
        </div>

        <div>
          <p className="text-gray-600 mb-1 text-sm">Hardfork</p>
          <div className="flex items-center gap-2">
            <ChainIcon chain={'base'} />
            <b className="text-black">123456</b>
          </div>
        </div>

        <div>
          <p className="text-gray-600 mb-1 text-sm">Network</p>
          <b className="text-black">123456</b>
        </div>

        <div>
          <p className="text-gray-600 mb-1 text-sm">RPC Server</p>
          <b className="text-black">Http://127.0.0.1:33333</b>
        </div>
        <div className="ml-auto">
          <SerchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex w-full mt-4 justify-start">
        {HeaderMenuList.map((menu) => (
          <Link to={menu.link} key={`link-menu-head-${menu.title}`}>
            <div
              key={menu.title}
              className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded transition-all ${select !== menu.title ? 'text-gray-700 bg-white' : 'text-brand-500 bg-brand-25'}`}
              onClick={() => setSelectMenu(menu.title)}
            >
              <Icon icon={menu.icon} />
              <p className="text-base font-semibold">{menu.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </DashboardHeaderWrapper>
  );
}

export default DashboardHeader;
