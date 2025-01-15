import { ContributionDay, UserData } from "../types";

export  const calculateCurrentStreak = (data: UserData): number => {
    // Extract all contribution days
    const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
    const contributionDays: ContributionDay[] = weeks.flatMap(week => week.contributionDays);
  
    // Sort by date in descending order (latest to oldest)
    contributionDays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
    // Calculate the current streak
    let currentStreak = 0;
  
    for (const day of contributionDays) {
      if (day.contributionCount > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
  
    return currentStreak;
  };

  
  