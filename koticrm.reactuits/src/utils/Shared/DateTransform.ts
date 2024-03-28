function getTimezoneOffset(timezone: string): number {
    // Parse the timezone string to extract hours and minutes offset
    const [fullMatch, sign, hoursStr, minutesStr] = (timezone.match(/([-+]?)(\d+):?(\d+)?/) ?? []);
    const hours = parseInt(hoursStr, 10) * (sign === '-' ? -1 : 1);
    const minutes = parseInt(minutesStr || '0', 10);
    return hours * 60 + minutes; // Convert hours to minutes and add minutes
}

export function formatDate(date: Date, format: string = 'DD/MM/YYYY', timezone?: string): string {
    if (!date) return '';

    const timeZoneOffset = timezone ? getTimezoneOffset(timezone) : 0;
    const localDate = new Date(date);

    // Adjust the date by adding or subtracting the timezone offset
    localDate.setHours(localDate.getHours() + Math.floor(timeZoneOffset / 60));
    localDate.setMinutes(localDate.getMinutes() + timeZoneOffset % 60);

    // Check if adjusted time exceeds 24 hours and update date accordingly
    if (localDate.getHours() >= 24) {
        localDate.setDate(localDate.getDate() + 1);
        localDate.setHours(localDate.getHours() % 24);
    } else if (localDate.getHours() < 0) {
        localDate.setDate(localDate.getDate() - 1);
        localDate.setHours(24 + (localDate.getHours() % 24));
    }

    // Replace placeholders with actual date values
    const year = localDate.getFullYear().toString();
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
    const day = localDate.getDate().toString().padStart(2, '0');

    let formattedString = format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);

    // If format includes time placeholders, replace them with actual time values
    if (format.includes('HH') || format.includes('mm')) {
        const hour = localDate.getHours().toString().padStart(2, '0');
        const minute = localDate.getMinutes().toString().padStart(2, '0');
        formattedString = formattedString.replace('HH', hour).replace('mm', minute);
    }

    return formattedString.trim();
}