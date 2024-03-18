 import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone'; // Import moment-timezone for timezone handling

interface Props {
  date: Date;
  format?: string;
  timezone?: string;
}

const DateTransformComponent: React.FC<Props> = ({ date, format = 'DD/MM/YYYY HH:mm', timezone }) => {
  const [transformedDate, setTransformedDate] = useState<string>('');

  useEffect(() => {
    const formattedDate = DateTransformFunction(date, format, timezone); // Pass timezone to formatting function
    setTransformedDate(formattedDate);
  }, [date, format, timezone]);

  return <div>{transformedDate}</div>;
};

// Global function for date transformation
function DateTransformFunction(date: Date, format: string = 'YYYY-MM-DD HH:mm:ss', timezone?: string): string {
  if (!date) return '';

  if (!timezone) {
    // Default timezone if none provided
    timezone = 'Asia/Kolkata';
    localStorage.setItem('timeZone', timezone);
  }

  const convertedDate = moment.utc(date).tz(timezone);
  const formattedDate = convertedDate.format(format);
  return formattedDate;
}

export default DateTransformComponent;
