import React from 'react';
import moment from 'moment';

interface Props {
  format: string;
}

const StaticTimeComponent: React.FC<Props> = ({ format }) => {
  const currentTime = moment().format(format);

  return <div>{currentTime}</div>;
};

export default StaticTimeComponent;
