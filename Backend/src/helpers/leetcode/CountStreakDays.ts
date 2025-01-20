
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

const convertTimestampsToDates = (timestamps: number[]): string[] => {
    const datesSet = new Set(timestamps.map(timestamp => {
      const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
      return date.toISOString().split('T')[0]; // Get only the date part
    }));
    return Array.from(datesSet);
  };
  
  function CountStreak(dates: string[], checkToday: boolean): { hasToday: boolean, streakCount: number, isStreakBroken: boolean } {
    let hasToday = false;
    let streak = 0;
    let isStreakBroken = false;
  
    const today = new Date().toISOString().split('T')[0];
  
    if (checkToday) {
      hasToday = dates.includes(today);
    }
  
    dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
    for (let i = 1; i < dates.length; i++) {
      const currentDate = new Date(dates[i]);
      const previousDate = new Date(dates[i - 1]);
  
      const diffInTime = previousDate.getTime() - currentDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);
  
      if (diffInDays !== 1) {
        isStreakBroken = true;
        break;
      }
      streak++;
    }
  
    return {
      hasToday,
      streakCount: streak + 1, // Add 1 for the first date in the streak
      isStreakBroken
    };
  }
  
  // Function to handle multiple timestamp arrays dynamically
  export function checkStreakAcrossMultipleArrays(timestampsArrays: number[][]): { hasToday: boolean, totalStreakCount: number, isStreakBroken: boolean } {
    let totalStreakCount = 0;
    let isStreakBroken = false;
    let hasToday = false;
  
    // Check the first array for 'hasToday' and streak continuity
    const firstArrayDates = convertTimestampsToDates(timestampsArrays[0]);
    const result1 = CountStreak(firstArrayDates, true);
    hasToday = result1.hasToday;
    totalStreakCount = result1.streakCount;
  
    if (result1.isStreakBroken) {
      console.log(`Streak broken in the first array. Total streak count: ${totalStreakCount}`);
      return { hasToday, totalStreakCount, isStreakBroken: true };
    }
  
    // Now check the remaining arrays if the streak is not broken
    for (let i = 1; i < timestampsArrays.length; i++) {
      if (isStreakBroken) break;
  
      const currentArrayDates = convertTimestampsToDates(timestampsArrays[i]);
      const result = CountStreak(currentArrayDates, false); // Don't check for 'hasToday' in subsequent arrays
  
      if (result.isStreakBroken) {
        console.log(`Streak broken in array ${i + 1}. Total streak count: ${totalStreakCount}`);
        isStreakBroken = true;
      } else {
        totalStreakCount += result.streakCount; // Add the entire streak count of the current array
      }
    }
  
    return { hasToday, totalStreakCount, isStreakBroken };
  }
  