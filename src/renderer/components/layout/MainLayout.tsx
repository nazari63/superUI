import styled from 'styled-components';
import Carousel from '../utility/Carousel';
import ChainBall from './ChainBall';

interface Props extends SimpleComponent {
  children: React.ReactNode;
}

const MainLayoutWrapper = styled.div``;

function MainLayout(props: Props) {
  return (
    <MainLayoutWrapper className="w-full h-full grid grid-cols-2">
      <div className="bg-white w-full h-full relative z-100">
        {props.children}
      </div>
      <div className="w-full flex flex-col justify-end relative items-center">
        <ChainBall />
        <div className="w-full px-4 mb-36">
          <Carousel
            items={[
              <div className="text-5xl text-black font-semibold text-center">
                Built on Ethereum,{' '}
                <span className="text-red-500">built on the Superchain.</span>
              </div>,
              <div className="text-5xl text-black font-semibold text-center">
                NERD BUILD
                <span className="text-red-500"> WEB3</span>
              </div>,
              <div className="text-5xl text-black font-semibold text-center">
              Quickly fire up a personal{' '}
              <span className="text-red-500">Superchain blockchain</span>
            </div>,
            ]}
          />
        </div>
      </div>
    </MainLayoutWrapper>
  );
}

export default MainLayout;
