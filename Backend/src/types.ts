export interface ContributionDay {
    date: string;
    contributionCount: number;
  }
  
  interface ContributionWeek {
    contributionDays: ContributionDay[];
  }
  
  interface ContributionsCollection {
    weeks: ContributionWeek[];
  }
  
export  interface UserData {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: ContributionsCollection;
        };
      };
    };
  }

