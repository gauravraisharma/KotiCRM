export function getDateTime(date: any) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });
    return formattedDate;
}