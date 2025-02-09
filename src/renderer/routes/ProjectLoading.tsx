import styled from 'styled-components';
import LoadingDots from '../components/utility/LoadingDots';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useChainState } from '../states/chain/reducer';
import { ipcRenderer } from 'electron';

interface Props extends SimpleComponent {}

const ProjectLoadingWrapper = styled.div`
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

function ProjectLoading(props: Props) {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<string[]>([]);

  const chainState = useChainState();

  console.log(logs);

  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   navigate(`/dashboard/account/1/${chainState.l1[0]}`);
  //   // }, 5000);

  //   setTimeout(() => {
  //     window.electron.supersim.startSupersim();
  //   }, 1000);

  //   ipcRenderer.on('supersim-log', (_event, message) => {
  //     setLogs((prevLogs) => [...prevLogs, message]);
  //   });

  //   return () => {
  //     ipcRenderer.removeAllListeners('supersim-log');
  //   };
  // }, []);

  return (
    <ProjectLoadingWrapper className="w-full flex flex-col gap-3 items-center justify-center">
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="rounded-full w-30 h-30 relative overflow-hidden">
          <div className="bg-radiant w-full h-full animate-trans"></div>
        </div>
        <div className="flex flex-col items-center mt-4 gap-2">
          <div className="text-3xl font-semibold text-black flex gap-2">
            Just a moment <LoadingDots />
          </div>
          <p className="text-gray-600 text-base">We are building for you </p>
          <span className="text-sm text-brand-500">
            Creating... Opstack chain
          </span>
        </div>
      </div>
    </ProjectLoadingWrapper>
  );
}

export default ProjectLoading;
