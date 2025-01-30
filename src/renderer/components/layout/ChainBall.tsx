import styled from 'styled-components';
import cryptoIMG from '../../../../assets/img/cryptogroup.png';
import cryptoIMGSVG from '../../../../assets/img/cryptogroup.svg';

interface Props extends SimpleComponent {}

const ChainBallWrapper = styled.div``;

function ChainBall(props: Props) {
  return (
    <div className='w-full overflow-hidden absolute top-0 left-0'>
      <ChainBallWrapper className="w-[110%] animate-move -translate-y-10 -translate-x-10">
        <img
          src={cryptoIMGSVG}
          alt="Crypto Group"
          className="w-full object-contain"
        />
      </ChainBallWrapper>
    </div>
  );
}

export default ChainBall;
