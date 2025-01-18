import { ResponseData } from "../../types";


// EXTRACT TIME STAMPS
export function extractTimestamps(data: ResponseData): number[] {
    // Check if submissions_dump exists and is an array
    if (data.submissions_dump && Array.isArray(data.submissions_dump)) {
        // Map through the submissions_dump to extract timestamps
        return data.submissions_dump.map(submission => submission.timestamp);
    }
    // Return an empty array if submissions_dump is not valid
    return [];
}