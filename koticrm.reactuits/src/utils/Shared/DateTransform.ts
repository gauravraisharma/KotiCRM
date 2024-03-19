import moment from 'moment-timezone';

export function DateTransformFunction(date: Date, format: string = 'DD/MM/YYYY HH:mm', timezone?: string): string {
    if (!date) return '';

    if (!timezone) {
        timezone = 'Asia/Kolkata'; 
        localStorage.setItem('timezone', timezone);
    }

    const convertedDate = moment.utc(date).tz(timezone);

    const formattedDate = convertedDate.format(format);
    return formattedDate;
}

// export function getDateTime(date: any) {
//     const formattedDate = new Date(date).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: '2-digit',
//     });
//     return formattedDate;
// }

export function formatDate(date: Date, format: string = 'DD/MM/YYYY', timezone?: string): string {
    if (!date) return '';

    const timeZoneOffset = timezone ? getTimezoneOffset(timezone) : 0; 
    const localDate = new Date(date); 
    
    localDate.setHours(localDate.getHours() + timeZoneOffset); 
    
    // Replace placeholders with actual date values
    const year = localDate.getFullYear().toString();
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
    console.log("Month:",month);
    const day = localDate.getDate().toString().padStart(2, '0');

    let formattedString = format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);

   
        if (format.includes('HH') || format.includes('mm')) {
            const hour = localDate.getHours().toString().padStart(2, '0');
            console.log('hour:',hour)
            const minute = localDate.getMinutes().toString().padStart(2, '0');
            formattedString = formattedString.replace('HH', hour).replace('mm', minute);
       }
   

    return formattedString.trim();
}


// export function formatDate(date: Date, format: string = 'DD/MM/YYYY', timezone?: string): string {
//     if (!date) return '';

//     const timeZoneOffset = timezone ? getTimezoneOffset(timezone) : 0; 
//     const localDate = new Date(date.getDate() + timeZoneOffset);

//     // Replace placeholders with actual date values
//     const year = localDate.getFullYear().toString();
//     const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
//     const day = localDate.getDate().toString().padStart(2, '0');

//     let formattedString = format
//         .replace('YYYY', year)
//         .replace('MM', month)
//         .replace('DD', day);

//     if (format.includes('HH') || format.includes('mm')) {
//         const hour = localDate.getHours().toString().padStart(2, '0');
//         const minute = localDate.getMinutes().toString().padStart(2, '0');
//         formattedString += ` ${hour}:${minute}`;
//     }

//     return formattedString.trim();
// }

function getTimezoneOffset(timezone: string): number {
    const now = new Date();
    const localOffset = now.getTimezoneOffset();
    // Here, we need to convert timezone to a time zone offset in minutes
    // You can use Intl.DateTimeFormat().resolvedOptions().timeZone in modern browsers to get the time zone offset directly
    const targetOffset = -(new Date().toLocaleString('en', { timeZone: timezone as string }));
    return (targetOffset - localOffset) * 60 * 1000;
}