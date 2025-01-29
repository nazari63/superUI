import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props extends SimpleComponent {}

const ProjectRouteWrapper = styled.div``;

function ProjectRoute(props: Props) {
  const navigate = useNavigate();
  return (
    <ProjectRouteWrapper>
      <div className="text-5xl text-sky-500">
        <Link to="/dashboard/account">Go to Dashboard</Link>
      </div>
    </ProjectRouteWrapper>
  );
}

export default ProjectRoute;
