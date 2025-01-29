import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Icon } from '@iconify/react';

interface Props extends SimpleComponent {
  items: React.ReactNode[];
}

function Carousel(props: Props) {
  const [index, setIndex] = useState(0);
  const length = props.items.length;

  const slideAnimation = useSpring({
    transform: `translateX(-${index * 100}%)`,
    config: { tension: 220, friction: 30 },
  });

  const prevSlide = () => {
    setIndex(index === 0 ? length - 1 : index - 1);
  };

  const nextSlide = () => {
    setIndex(index === length - 1 ? 0 : index + 1);
  };
  return (
    <div className="flex flex-col relative">
      <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-xl">
        <div className="flex w-full">
          <animated.div style={slideAnimation} className="flex w-full">
            {props.items.map((item, i) => (
              <div key={i} className="w-full flex-shrink-0">
                {item}
              </div>
            ))}
          </animated.div>
        </div>

        {/* Dots Indicator */}
      </div>
      <div className="flex gap-2 w-full justify-center items-center mt-16">
        <button onClick={prevSlide} className="text-black mr-8 cursor-pointer">
          <Icon icon="akar-icons:chevron-left" width="16" height="16" />
        </button>
        {props.items.map((_, i) => (
          <div
            key={i}
            className={`w-3 cursor-pointer h-3 rounded-full ${i === index ? 'bg-gray-600' : 'bg-gray-300'}`}
            onClick={() => setIndex(i)}
          />
        ))}

        <button onClick={nextSlide} className="text-black ml-8 cursor-pointer">
          <Icon icon="akar-icons:chevron-right" width="16" height="16" />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
