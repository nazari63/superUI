import styled from 'styled-components';

interface Props extends SimpleComponent {}

const DashboardSidebarWrapper = styled.div``;

function DashboardSidebar(props: Props) {
  return (
    <DashboardSidebarWrapper className='h-full w-[15rem] flex-none bg-gray-200'>
      <div className="text-red-500">X</div>
    </DashboardSidebarWrapper>
  );
}

export default DashboardSidebar;
