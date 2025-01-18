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



export interface getLeetCodeStreakProps{
  CSRF_TOKEN: string;
  AUTH_TOKEN: string;
}

interface Submission {
  id: number;
  question_id: number;
  lang: string;
  lang_name: string;
  time: string;
  timestamp: number;
  status: number;
  status_display: string;
  runtime: string;
  url: string;
  is_pending: string;
  title: string;
  memory: string;
  code: string;
  compare_result: string;
  title_slug: string;
  has_notes: boolean;
  flag_type: number;
}

// Define the type for the input data
export interface ResponseData {
  submissions_dump: Submission[];
  has_next: boolean;
  last_key: string;
}