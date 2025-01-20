import { getLeetCodeStreakProps } from "../../types";
import { checkStreakAcrossMultipleArrays } from "./CountStreakDays"; // Import streak calculation function
import { extractTimestamps } from "./ExtractTimeStamps";

export const getLeetCodeStreak = async ({
  CSRF_TOKEN,
  AUTH_TOKEN,
}: getLeetCodeStreakProps): Promise<{ streak: number; contributedToday: boolean }> => {
  try {
    console.log("Fetching LeetCode submissions...");

    // Function to fetch submissions in batches
    const fetchSubmissions = async (offset = 0): Promise<any> => {
      const response = await fetch(
        `https://leetcode.com/api/submissions/?offset=${offset}`,
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

    let hasToday = false;
    let totalStreakCount = 0;
    let isStreakBroken = false;
    let offset = 0;

    // Continue fetching and calculating streak while streak is not broken
    while (!isStreakBroken) {
      const data = await fetchSubmissions(offset);
      console.log("Data received for offset", offset);

      // Extract timestamps from the fetched data (implement this logic as you see fit)
      const timestamps: number[] = extractTimestamps(data); 
      console.log("Extracted timestamps:", timestamps);

      // Use checkStreakAcrossMultipleArrays to calculate the streak
      const result = checkStreakAcrossMultipleArrays([timestamps]);

      // Update overall streak status
      hasToday = hasToday || result.hasToday;
      totalStreakCount += result.totalStreakCount; // Add streak count from the current batch
      isStreakBroken = result.isStreakBroken;

      console.log("Current streak result:", result);

      // If streak is broken, exit the loop
      if (isStreakBroken) {
        break;
      }

      // Move to the next batch
      offset += 20; // Update offset for the next API call
    }

    return { streak: totalStreakCount, contributedToday: hasToday };
  } catch (error) {
    console.error("Error calculating LeetCode streak:", error);
    throw error;
  }
};
