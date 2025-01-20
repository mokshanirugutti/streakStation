import { ResponseData } from "../../types";
import { checkStreakAcrossMultipleArrays } from "./CountStreakDays";
import { extractTimestamps } from "./ExtractTimeStamps"; // Assuming this function extracts timestamps

export function calculateLeetcodeStreak(data: ResponseData): number {
  const timestamps: number[] = extractTimestamps(data); // Extract timestamps from the response data
  console.log('Extracted timestamps: ', timestamps);

  // Calculate the streak using checkStreakAcrossMultipleArrays
  const result = checkStreakAcrossMultipleArrays([timestamps]);

  // Return the total streak count
  return result.totalStreakCount;
}
