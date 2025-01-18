import { getLeetCodeStreakProps } from "../../types";
import { calculateLeetcodeStreak } from "./calculateLeetcodeStreak";

export const getLeetCodeStreak = async ({
  CSRF_TOKEN,
  AUTH_TOKEN,
}: getLeetCodeStreakProps): Promise<{ streak: number; todaySubmission: boolean }> => {
  try {
    console.log("Fetching LeetCode submissions...");

    // Function to fetch submissions in batches
    const fetchSubmissions = async (): Promise<any> => {
      const response = await fetch(
        `https://leetcode.com/api/submissions/?offset=0&limit=30`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-csrftoken": CSRF_TOKEN,
            cookie: `csrftoken=${CSRF_TOKEN}; LEETCODE_SESSION=${AUTH_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("LeetCode API request failed:", errorText);
        throw new Error(`LeetCode API error: ${response.status}`);
      }

      return response.json();
    };

    // let streak = 0;
    // let todaySubmission = false;
    // const today = new Date().toDateString();
    // const submittedDays: Set<string> = new Set(); // Set to track unique days with submissions
    // let offset = 0;
    // let hasNext = true;

    // Fetch and process submissions in batches
    const data = await fetchSubmissions();
    const streakCount = calculateLeetcodeStreak(data)
    // while (hasNext) {
    //   console.log('DATA .. #####');
    //   console.log(data)
    //   // Safely check for "submissions_dump"
    //   if (!data || !data["submissions_dump"]) {
    //     console.warn("Unexpected API response structure:", data);
    //     break; // Stop fetching if the response structure is invalid
    //   }

    //   const submissions = data["submissions_dump"];
    //   hasNext = data["has_next"]; // Check if there are more submissions to fetch

    //   for (const submission of submissions) {
    //     const submissionDate = new Date(submission.timestamp * 1000).toDateString();

    //     // Check if the submission was made today
    //     if (submissionDate === today) {
    //       todaySubmission = true;
    //     } else if (!submittedDays.has(submissionDate)) {
    //       // If the date is new and breaks the streak, stop counting
    //       if (
    //         streak > 0 &&
    //         Array.from(submittedDays).some((date) => new Date(date) > new Date(submissionDate))
    //       ) {
    //         hasNext = false; // Stop fetching if the streak is broken
    //         break;
    //       }
    //       streak++;
    //       submittedDays.add(submissionDate);
    //     }
    //   }

    //   offset += 40; // Increment offset for the next batch

    //   // Stop fetching if streak is broken
    //   if (!hasNext) break;
    // }

    // console.log("Final streak:", streak);
    // console.log("Today's submission:", todaySubmission);

    // return { streak, todaySubmission, };
    return { streak: streakCount, todaySubmission: false };
  } catch (error) {
    console.error("Error calculating LeetCode streak:", error);
    throw error;
  }
};
