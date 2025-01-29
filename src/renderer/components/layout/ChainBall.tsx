import styled from 'styled-components';
import cryptoIMG from '../../../../assets/img/cryptogroup.png';
import cryptoIMGSVG from '../../../../assets/img/cryptogroup.svg';


interface Props extends SimpleComponent {}

const ChainBallWrapper = styled.div``;

function ChainBall(props: Props) {
  return (
    <ChainBallWrapper className="w-[110%] absolute top-0 -translate-y-10 animate-move">
      <img
        src={cryptoIMGSVG}
        alt="Crypto Group"
        className="w-full object-contain"
      />
    </ChainBallWrapper>
  );
}

export default ChainBall;
