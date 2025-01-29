import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props extends SimpleComponent {}

const DashboardAccountRouteWrapper = styled.div``;

function DashboardAccountRoute(props: Props) {
  const navigate = useNavigate();
  return (
    <DashboardAccountRouteWrapper>
      <div className="text-5xl text-sky-500">
        <Link to="/">Go home</Link>
        <p className='text-right'>x</p>
      </div>
    </DashboardAccountRouteWrapper>
  );
}

export default DashboardAccountRoute;
