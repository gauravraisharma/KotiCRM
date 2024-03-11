interface TimeDisplayProps {
    createdAt: string;
  }
  
  function getTimeDifference(createdAt: string): string {
    const currentTime = new Date();
    const createdAtTime = new Date(createdAt);
// India is UTC+5:30
    const istOffset = 5.5 * 60 * 60 * 1000; 
    const istTime = new Date(currentTime.getTime() - istOffset);
  
    const timeDifference = istTime.getTime() - createdAtTime.getTime();
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  
    if (minutesDifference <= 1) {
      return 'Now';
    } else if (minutesDifference <= 30) {
      return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
    } else if (minutesDifference <= 60) {
      return '30 minutes ago';
    } else if (hoursDifference <= 1) {
      return '1 hour ago';
    } else if (hoursDifference <= 12) {
      return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
    } else {
      const formattedDate = createdAtTime.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      return `${formattedDate}`;
    }
  }
  
  function TimeDisplay({ createdAt }: TimeDisplayProps) {
    const timeDisplay = getTimeDifference(createdAt);
  
    return <div>{timeDisplay}</div>;
  }
  
  export default TimeDisplay;
  