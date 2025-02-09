import styled from 'styled-components';
import LoadingDots from '../components/utility/LoadingDots';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Props extends SimpleComponent {}

const ProjectCheckingWrapper = styled.div`
  .animate-trans {
    animation: moving 5s infinite;
  }

  @keyframes moving {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(360deg);
    }
    100% {
      transform: translateX(0deg);
    }
  }
`;

function ProjectChecking(props: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [foundry, setFoundry] = useState(false);


  const checkFoundry = async () => {
    setLoading(true);
    const res = await window.electron.foudry.getFoudry();
    setFoundry(res);
    if (res) {
      navigate(`/project`);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkFoundry();
  }, []);
  return (
    <ProjectCheckingWrapper className="w-full flex flex-col gap-3 items-center justify-center">
      {loading && (
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="rounded-full w-30 h-30 relative overflow-hidden">
            <div className="bg-radiant w-full h-full animate-trans"></div>
          </div>
          <div className="flex flex-col items-center mt-4 gap-2">
            <div className="text-3xl font-semibold text-black flex gap-2">
              Just a moment <LoadingDots />
            </div>
            <p className="text-gray-600 text-base">Prerequisites: foundry</p>
            <span className="text-sm text-brand-500">Checking foundry</span>
          </div>
        </div>
      )}
      {!loading && !foundry && (
        <div>
          <div className="text-3xl font-semibold text-black flex gap-2">
            Please install foundry
          </div>
          <div>
            Follow the guide here to install the
            <a
              className='text-brand-500'
              href="https://book.getfoundry.sh/getting-started/installation"
              target="_blank"
              rel="noreferrer"
            >
              {' '}foundry{' '}
            </a>
            toolchain.
          </div>
        </div>
      )}
    </ProjectCheckingWrapper>
  );
}

export default ProjectChecking;
