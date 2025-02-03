import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../components/utility/Pagination';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import ChainIcon from '../components/utility/ChainIcon';

interface Props extends SimpleComponent {}

const DashboardAccountRouteWrapper = styled.div``;

function DashboardAccountRoute(props: Props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  return (
    <DashboardAccountRouteWrapper className='p-4'>
      <div className="shadow-sm bg-white p-5 rounded-2xl border-1 border-gray-200">
        <div className="flex justify-between text-gray-700 text-base">
          <p>MNEMONIC</p>
          <p>HD PATH</p>
        </div>
        <div className="flex justify-between text-gray-600 text-sm">
          <p>
            sustain culture alert awake relax attitude acid local farm butter
            coffee glad
          </p>
          <p>m44'60'0'0account_index</p>
        </div>
      </div>

      {/* table */}
      <div className='w-full text-sm'>
        <table className='w-full mt-4'>
          <thead>
            <tr className='border-b-1 border-gray-200'>
              <th className='text-left py-3'>Address</th>
              <th className='text-left py-3'>Balance</th>
              <th className='text-left py-3'>TX COUNT</th>
              <th className='text-left py-3'>INDEX</th>
              <th className='text-left py-3'></th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b-1 border-gray-200'>
              <td className='text-left py-3 flex items-center gap-2'>
                <ChainIcon chain={'account'}/>
                <span>0x82ff872a6676fE3941ef2F46fC37d7cebe386ecc</span>
                <Icon icon='ph:copy-duotone' className='cursor-pointer text-gray-400 text-2xl' />
              </td>
              <td className='text-left py-3'>0.000000000000000000</td>
              <td className='text-left py-3'>0</td>
              <td className='text-left py-3'>0</td>
              <td className='text-left py-3'>
                <div className='flex items-center'>
                  <Icon icon='material-symbols:key' className='cursor-pointer text-brand-300 text-2xl' />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={10}
        currentPage={page}
        onPageChange={(page) => {
          setPage(page);
        }}
      />
    </DashboardAccountRouteWrapper>
  );
}

export default DashboardAccountRoute;
