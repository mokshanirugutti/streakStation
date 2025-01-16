import { UserData } from "../../../Backend/src/types";
// import { calculateCurrentStreak } from "./calculateleetcodeStreak";



export const getLeetCodeStreak = async () => {
    const CSRF_TOKEN = '';
    const LEETCODE_SESSION='';


  try {
    console.log("Sending request to leetcode API...");
    const response = await fetch("https://leetcode.com/api/submissions/?offset=0&limit=50", {
      method: "POST",
      headers: {
        cookie: `csrftoken=${CSRF_TOKEN} LEETCODE_SESSION=${LEETCODE_SESSION}`,
      },
      
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("leetcode API request failed:", errorText);
      throw new Error(`leetcode API error: ${response.status}`);
    }

    const data: UserData = await response.json();
    console.log("Received data:", data);

    // const streak = calculateCurrentStreak(data);
    // console.log("Calculated streak:", streak);

    // return streak;
  } catch (error) {
    console.error("Error fetching leetcode streak:", error);
    throw error;
  }
};
