import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../components/utility/Pagination';
import { useState } from 'react';

interface Props extends SimpleComponent {}

const DashboardAccountRouteWrapper = styled.div``;

function DashboardAccountRoute(props: Props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  return (
    <DashboardAccountRouteWrapper>
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
