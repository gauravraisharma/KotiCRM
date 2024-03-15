// import React from 'react';
// import { useEffect, useState } from 'react';
// import { DateTime } from 'luxon'; // Luxon library for working with dates and times

// interface Props {
//   date: Date;
//   format?: string;
// }

// const DateTransformComponent: React.FC<Props> = ({ date, format = 'DD/MM/YYYY HH:mm' }) => {
//   const [transformedDate, setTransformedDate] = useState<string>('');

//   useEffect(() => {
//     const formattedDate = DateTransformFunction(date, format);
//     setTransformedDate(formattedDate);
//   }, [date, format]);

//   return <div>{transformedDate}</div>;
// };

// function DateTransformFunction(date: Date, format: string = 'DD/MM/YYYY HH:mm'): string {
//   const formattedDate = DateTime.fromJSDate(date).toFormat(format);
//   return formattedDate;
// }

// export default DateTransformComponent;
