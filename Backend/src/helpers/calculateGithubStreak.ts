import { ContributionDay, UserData } from "../types";

export const calculateCurrentStreak = (data: UserData): { streak: number; contributedToday: boolean } => {
    // Extract all contribution days
    const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
    const contributionDays: ContributionDay[] = weeks.flatMap(week => week.contributionDays);

    // Sort by date in descending order (latest to oldest)
    contributionDays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    let contributedToday = false;

    for (const day of contributionDays) {
        if (day.date === today) {
            contributedToday = day.contributionCount > 0; 
            // If today's contribution is not made, we skip it for streak calculation
            if (day.contributionCount === 0) {
                continue;
            }
        }

        // Count the streak for previous days
        if (day.contributionCount > 0) {
            currentStreak++;
        } else {
            break; 
        }
    }

    return { streak: currentStreak, contributedToday };
};