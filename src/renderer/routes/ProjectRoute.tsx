import styled from 'styled-components';

interface Props extends SimpleComponent {}

const ProjectRouteWrapper = styled.div``;

function ProjectRoute(props: Props) {
  return (
    <ProjectRouteWrapper>
      <div className="text-5xl">
        Test XXX ABC 12345
      </div>
    </ProjectRouteWrapper>
  );
}

export default ProjectRoute;
