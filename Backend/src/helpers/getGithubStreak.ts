import { UserData } from "../types";
import { calculateCurrentStreak } from "./calculateGithubStreak";

type streakType = {
  streak: number; 
  contributedToday: boolean;
}
export const getGithubStreak = async (username: string, token: string): Promise<streakType> => {
  const query = ` query { user(login: "${username}") { contributionsCollection { contributionCalendar { weeks { contributionDays { date contributionCount } } } } } } `;

  try {
    console.log("Sending request to GitHub API...");
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API request failed:", errorText);
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: UserData = await response.json();
    console.log("Received data:", data);

    const streak = calculateCurrentStreak(data);
    console.log("Calculated streak:", streak);

    return streak;
  } catch (error) {
    console.error("Error fetching GitHub streak:", error);
    throw error;
  }
};
