
export function CountStreakDays(timestamps: number[]) : number {
    const dates = timestamps.map(ts => new Date(ts * 1000)); // Multiply by 1000 to convert seconds to milliseconds
    
    // Extract year, month, and day from each date
    const dateParts = dates.map(date => ({
        year: date.getUTCFullYear(),
        month: date.getUTCMonth(), // Note: Months are 0-indexed (0 = January, 11 = December)
        day: date.getUTCDate()

    }));

    const areConsecutiveDays = (date1: { year: number; month: number; day: number }, date2: { year: number; month: number; day: number }) => {
        const d1 = new Date(date1.year, date1.month, date1.day);
        const d2 = new Date(date2.year, date2.month, date2.day);
    
        // Check if they are the same day
        if (d1.getTime() === d2.getTime()) {
            return true;
        }
    
        // Check if they are consecutive days
        const oneDayInMillis = 24 * 60 * 60 * 1000; // Milliseconds in one day
        return (d2.getTime() - d1.getTime() === oneDayInMillis) || (d1.getTime() - d2.getTime() === oneDayInMillis);
    };
    
    // Check for continuous days
    let continuousCount = 0;
    
    // Sort dateParts by date to ensure they are in order
    dateParts.sort((a, b) => new Date(a.year, a.month, a.day).getTime() - new Date(b.year, b.month, b.day).getTime());
    
    // Iterate through the sorted dates
    for (let i = 0; i < dateParts.length; i++) {
        // If it's the first date or if it's consecutive to the previous date
        if (i === 0 || areConsecutiveDays(dateParts[i - 1], dateParts[i])) {
            continuousCount++;
        } else {
            // Break if a non-consecutive day is found
            break;
        }
    }
    
    console.log("Total count of continuous days:", continuousCount);
    return continuousCount;
    
}

// Function to check if two dates are the same or consecutive
