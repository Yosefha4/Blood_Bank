import React, { useRef, useEffect } from 'react';
import { useTrail, animated } from '@react-spring/web';

function Animation() {
  const dotCount = 1000;
  const trail = useTrail(dotCount, {
    from: { opacity: 0, transform: 'translate(0px, 0px)' },
    to: { opacity: 1, transform: 'translate(0px, 0px)' },
    config: { mass: 1, tension: 200, friction: 100 },
  });

  const dotRefs = useRef([]);

  useEffect(() => {
    const updateDotPositions = () => {
      dotRefs.current.forEach((dotRef) => {
        dotRef.style.top = `${Math.random() * 100}%`;
        dotRef.style.left = `${Math.random() * 100}%`;
      });
    };

    const interval = setInterval(updateDotPositions, 200); // Adjust the interval duration (in milliseconds) for slower movement

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed' }}>
      {trail.map((props, index) => (
        <animated.div
          key={index}
          ref={(ref) => (dotRefs.current[index] = ref)}
          style={{
            ...props,
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'white',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

export default Animation;
