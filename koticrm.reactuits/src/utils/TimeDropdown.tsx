import React, { useState } from 'react';
import StaticTimeComponent from './StaticTime';
import { GoStopwatch } from "react-icons/go";



const WatchIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="watch-icon" style={{ position: 'relative', display: 'inline-block' }}>
      <GoStopwatch style={{ color: 'grey', fontSize: '20px', marginTop: '7px' }} onClick={toggleDropdown} />
      {isOpen && (
        <div style={{ position: 'absolute', top: '120%', left: '10', zIndex: '999' }}>
          <StaticTimeComponent format="DD/MM/YYYY HH:mm" />
          {/* <DateTransformComponent date={currentDate} format="DD/MM/YYYY HH:mm" timezone={selectedTimezone} /> */}

        </div>
      )}
    </div>
  );
};

export default WatchIcon;
