import styled from 'styled-components';

interface Props extends SimpleComponent {}

const DashboardMainWrapper = styled.div``;

function DashboardMain(props: Props) {
  return (
    <DashboardMainWrapper>
      <div className="">Dashboard main</div>
    </DashboardMainWrapper>
  );
}

export default DashboardMain;
