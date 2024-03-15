import React, { useState } from 'react';
import StaticTimeComponent from './StaticTime';
import { GoStopwatch } from "react-icons/go";


const WatchIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="watch-icon" onClick={toggleDropdown}>
      <GoStopwatch style={{color:'grey',fontSize:'20px',marginTop:'7px'}} />
      {isOpen && <StaticTimeComponent format="DD/MM/YYYY HH:mm" />}
    </div>
  );
};

export default WatchIcon;
