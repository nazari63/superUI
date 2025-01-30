import styled from 'styled-components';
import BaseIMG from '../../../../assets/img/crypto/base.svg';
import ETHIMG from '../../../../assets/img/crypto/eth.svg';
import LOCALIMG from '../../../../assets/img/crypto/local.svg';
import MODEIMG from '../../../../assets/img/crypto/mode.svg';
import OPIMG from '../../../../assets/img/crypto/op.svg';
import ZoraIMG from '../../../../assets/img/crypto/zora.svg';

const IconsDict = {
  base: BaseIMG,
  eth: ETHIMG,
  local: LOCALIMG,
  mode: MODEIMG,
  op: OPIMG,
  zora: ZoraIMG,
};

export type ChainListIcon = keyof typeof IconsDict;

interface Props extends SimpleComponent {
  chain: ChainListIcon;
  size?: 'md' | 'lg' | 'xl';
}

const ChainIconWrapper = styled.div``;

function ChainIcon(props: Props) {
  const classname = `${props.size === 'md' ? 'w-6 h-6' : props.size === 'lg' ? 'w-10 h-10' : props.size === 'xl' ? 'w-32 h-32' : 'w-8 h-8'}
  rounded-full bg-gray-200 flex items-center justify-center`;
  return (
    <ChainIconWrapper className={classname}>
      <img
        src={IconsDict[props.chain]}
        alt={props.chain}
        className="w-full h-full object-contain"
      />
    </ChainIconWrapper>
  );
}

export default ChainIcon;
