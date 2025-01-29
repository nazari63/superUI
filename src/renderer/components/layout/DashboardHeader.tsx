import styled from 'styled-components';

interface Props extends SimpleComponent {}

const DashboardHeaderWrapper = styled.div``;

function DashboardHeader(props: Props) {
  return (
    <DashboardHeaderWrapper className='w-full bg-red-200'>
      <div className="p-2">x</div>
      <div className="p-2">x</div>
      <div className="p-2">x</div>
    </DashboardHeaderWrapper>
  );
}

export default DashboardHeader;
