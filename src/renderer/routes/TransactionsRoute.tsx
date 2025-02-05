import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TransactionCard } from '../components/project/TransactionCard';
import SearchBox from '../components/utility/SearchBox';

interface Props extends SimpleComponent {}

const TransactionsRouteWrapper = styled.div``;

function DashboardTransactionsRoute(props: Props) {
  const navigate = useNavigate();
  return (
    <TransactionsRouteWrapper>
      <div className="mb-5 flex justify-between items-center">
        <div className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white shadow-sm my-3">
          <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-red-100 rounded-l-lg">
            VALUE TRANSFER
          </button>
          <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:outline-none border-l border-gray-300">
            Contract Call
          </button>
          <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-r-lg border-l border-gray-300">
            Lorem
          </button>
        </div>
        <div>
          <SearchBox onChange={() => {}} value="" />
        </div>
      </div>
      <div className="space-y-6">
        <TransactionCard
          tx="0xf07947fc8346f297cde01e75ce241c090cc7beeee285b2df13fce213f4c416e5"
          fromAddress="0x×5591B981a1133b044B36d82502e838f597b0af6D"
          toAddress="Faucet"
          gasUsed="21055"
          status="transfer"
          value="70000000000000"
        />
      </div>
    </TransactionsRouteWrapper>
  );
}

export default DashboardTransactionsRoute;
