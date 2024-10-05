import React, { useState, useEffect } from 'react';
import logo from '/images/logo.png'


function RotatingLogo() {

    const [rotation, setRotation] = useState(0);
    const [shadowColor, setShadowColor] = useState('#3c366b');
    const [isHovered, setIsHovered] = useState(false);
  
    useEffect(() => {
      let interval;
  
      if (!isHovered) {
        interval = setInterval(() => {
          setRotation(rotation => rotation - 1);
          const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
          setShadowColor(randomColor);
        }, 10);
      }
  
      return () => clearInterval(interval); 
    }, [isHovered]);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    
  return (
    <div className='w-36 rounded-3xl mx-auto inline-block mt-16 lg:w-48' 
    style={{ transform: `rotateY(${rotation}deg)`, boxShadow: `1px 1px 25px 10px ${shadowColor}`,
    transition: 'box-shadow 0.2s ease-in-out' }}
    onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img className='' src={logo} alt="Logo" />
    </div>
  )
}

export default RotatingLogo