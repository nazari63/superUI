import styled from 'styled-components';
import ChainIcon from '../utility/ChainIcon';
import { StatusBadge } from '../utility/StatusBadge';
import { Icon } from '@iconify/react';

interface Props extends SimpleComponent {}

const ProjectitemWrapper = styled.div`
  transition: all 0.3s;
  &:hover {
    transform: translateX(10px);
    opacity: 0.8;
  }
`;

function Projectitem(props: Props) {
  const l2ChainList = ['eth', 'local', 'mode', 'op', 'zora'];
  const l1ChainList = ['eth'];
  return (
    <ProjectitemWrapper
      className="w-full cursor-pointer rounded-xl flex flex-col
    gap-2 border-1 border-gray-200 p-4"
    >
      <div className="flex items-start justify-between gap-4">
        <ChainIcon chain="local" size="lg" />
        <div className="flex-1">
          <h3 className="text-gray-900 font-semibold text-lg">Project Name</h3>
          <p className="text-red-700 font-semibold text-sm">
            Project Description
          </p>
        </div>
        <div className="flex items-center">
          <StatusBadge status={'active'} />
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex">
            {l2ChainList.map((chain, i) => (
              <div
                style={{
                  transform: `translateX(${i * -5}px)`,
                }}
              >
                <ChainIcon key={chain} chain={chain as any} size="md" />
              </div>
            ))}
          </div>
          <Icon
            style={{ transform: `translateX(${l2ChainList.length * -5}px)` }}
            icon="ic:baseline-plus"
            className="text-gray-600 text-md"
          />
          <div
            className="flex"
            style={{ transform: `translateX(${l2ChainList.length * -5}px)` }}
          >
            {l1ChainList.map((chain) => (
              <ChainIcon key={chain} chain={chain as any} size="md" />
            ))}
          </div>
        </div>
        <p className="text-gray-600 text-sm">Last use: 22/01/2025</p>
      </div>
    </ProjectitemWrapper>
  );
}

export default Projectitem;
