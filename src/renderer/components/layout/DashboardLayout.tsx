import styled from 'styled-components';
import Carousel from '../utility/Carousel';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

interface Props extends SimpleComponent {
  children: React.ReactNode;
}

const DashboardLayoutWrapper = styled.div``;

function DashboardLayout(props: Props) {
  return (
    <DashboardLayoutWrapper className="w-full h-full max-w-full flex flex-wrap p-2 bg-white">
      <DashboardSidebar />
      <div className="grow">
        <DashboardHeader />
        <div className='p-4 h-full bg-white'>{props.children}</div>
      </div>
    </DashboardLayoutWrapper>
  );
}

export default DashboardLayout;
