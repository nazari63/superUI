import styled from 'styled-components';
import Carousel from '../utility/Carousel';
import ChainBall from './ChainBall';
import LOGO_IMG from '../../../../assets/img/logo.svg';
import { Icon } from '@iconify/react';

interface Props extends SimpleComponent {
  children: React.ReactNode;
}

const MainLayoutWrapper = styled.div``;

function MainLayout(props: Props) {
  return (
    <MainLayoutWrapper className="w-full h-full grid grid-cols-2">
      <div className="bg-white w-full h-full relative z-100 p-10 flex flex-col justify-center">
        <div className="bg-white absolute left-6 top-6">
          <img src={LOGO_IMG} alt="logo" className="h-8" />
        </div>
        <div className="">{props.children}</div>
        <p className="bg-white absolute bottom-6 left-6 text-gray-600 text-sm">
          © Nerd3Lab 2025
        </p>
        <p className="flex items-center bg-white absolute bottom-6 right-6 text-gray-600 text-sm">
          <Icon icon="akar-icons:email" className="text-brand-500 text-lg mr-2" />
          help@untitledui.com
        </p>
      </div>
      <div className="w-full flex flex-col justify-end relative items-center">
        <ChainBall />
        <div className="w-full px-4 mb-36">
          <Carousel
            auto={true}
            items={[
              <div className="text-5xl text-black font-semibold text-center">
                Built on Ethereum,{' '}
                <span className="text-brand-500">built on the Superchain.</span>
              </div>,
              <div className="text-5xl text-black font-semibold text-center">
                NERD BUILD
                <span className="text-brand-500"> WEB3</span>
              </div>,
              <div className="text-5xl text-black font-semibold text-center">
                Quickly fire up a personal{' '}
                <span className="text-brand-500">Superchain blockchain</span>
              </div>,
            ]}
          />
        </div>
      </div>
    </MainLayoutWrapper>
  );
}

export default MainLayout;
