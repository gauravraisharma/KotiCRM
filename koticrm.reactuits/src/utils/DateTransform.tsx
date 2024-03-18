// import React from 'react';
// import { useEffect, useState } from 'react';
// import { DateTime } from 'luxon'; // Luxon library for working with dates and times

// interface Props {
//   date: Date;
//   format?: string;
//   timezone?: string; // New prop for timezone
// }

// const DateTransformComponent: React.FC<Props> = ({ date, format = 'DD/MM/YYYY HH:mm', timezone }) => {
//   const [transformedDate, setTransformedDate] = useState<string>('');

//   useEffect(() => {
//     const formattedDate = DateTransformFunction(date, format, timezone); // Pass timezone to formatting function
//     setTransformedDate(formattedDate);
//   }, [date, format, timezone]);

//   return <div>{transformedDate}</div>;
// };

// function DateTransformFunction(date: Date, format: string = 'DD/MM/YYYY HH:mm', timezone?: string): string {
//   let formattedDate;
//   if (timezone) {
//     formattedDate = DateTime.fromJSDate(date).setZone(timezone).toFormat(format); // Adjust timezone
//   } else {
//     formattedDate = DateTime.fromJSDate(date).toFormat(format);
//   }
//   return formattedDate;
// }




// export default DateTransformComponent;


import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';


interface Props {
  date: Date;
  format?: string;
  timezone?: string; // New prop for timezone
}

const DateTransformComponent: React.FC<Props> = ({ date, format = 'DD/MM/YYYY HH:mm', timezone }) => {
  const [transformedDate, setTransformedDate] = useState<string>('');

  useEffect(() => {
    const formattedDate = DateTransformFunction(date, format, timezone); // Pass timezone to formatting function
    setTransformedDate(formattedDate);
  }, [date, format, timezone]);

  return <div>{transformedDate}</div>;
};

function DateTransformFunction(date: Date, format: string = 'DD/MM/YYYY HH:mm', timezone?: string): string {
  if (!date) return '';
  
  if (!timezone) {
    timezone = 'Asia/Kolkata'; // Default timezone
    localStorage.setItem('timezone', timezone);
  }

  const convertedDate = moment.utc(date).tz(timezone);

  const formattedDate = convertedDate.format(format);
  return formattedDate;
}

export default DateTransformComponent;
