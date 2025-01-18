import { ResponseData } from "../../types";
import { CountStreakDays } from "./CountStreakDays";
import { extractTimestamps } from "./ExtractTimeStamps";


// // Example usage (fill in your data here)
// let data: ResponseData = {
//   submissions_dump: [
//     {
//       id: 1511115964,
//       question_id: 2792,
//       lang: 'python3',
//       lang_name: 'Python3',
//       time: '7 hours, 19 minutes',
//       timestamp: 1737087994,
//       status: 10,
//       status_display: 'Accepted',
//       runtime: '45 ms',
//       url: '/submissions/detail/1511115964/',
//       is_pending: 'Not Pending',
//       title: 'Neighboring Bitwise XOR',
//       memory: '22.5 MB',
//       code: 'class Solution:\n' +
//         '    def doesValidArrayExist(self, derived: List[int]) -> bool:\n' +
//         '        f = 0\n' +
//         '        l = 0\n' +
//         '        for n in derived:\n' +
//         '            if n:\n' +
//         '                l = ~l\n' +
//         '        \n' +
//         '        return f == l',
//       compare_result: '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
//       title_slug: 'neighboring-bitwise-xor',
//       has_notes: false,
//       flag_type: 1
//     },
//     {
//       id: 1510024589,
//       question_id: 2533,
//       lang: 'python3',
//       lang_name: 'Python3',
//       time: '1 day, 7 hours',
//       timestamp: 1736999929,
//       status: 10,
//       status_display: 'Accepted',
//       runtime: '7 ms',
//       url: '/submissions/detail/1510024589/',
//       is_pending: 'Not Pending',
//       title: 'Bitwise XOR of All Pairings',
//       memory: '36.5 MB',
//       code: 'class Solution:\n' +
//         '    def xorAllNums(self, nums1: List[int], nums2: List[int]) -> int:\n' +
//         '        xor1, xor2 =0, 0\n' +
//         '        l1, l2 = len(nums1), len(nums2)\n' +
//         '\n' +
//         '        if l1 %2:\n' +
//         '            for num in nums2:\n' +
//         '                xor2 ^= num\n' +
//         '        \n' +
//         '        if l2 % 2:\n' +
//         '            for num in nums1:\n' +
//         '                xor1 ^= num\n' +
//         '        \n' +
//         '        return xor1 ^ xor2',
//       compare_result: '111111111111111111111111111111111111111111',
//       title_slug: 'bitwise-xor-of-all-pairings',
//       has_notes: false,
//       flag_type: 1
//     },
//     {
//       id: 1510008970,
//       question_id: 2533,
//       lang: 'python3',
//       lang_name: 'Python3',
//       time: '1 day, 8 hours',
//       timestamp: 1736998622,
//       status: 12,
//       status_display: 'Memory Limit Exceeded',
//       runtime: 'N/A',
//       url: '/submissions/detail/1510008970/',
//       is_pending: 'Not Pending',
//       title: 'Bitwise XOR of All Pairings',
//       memory: 'N/A',
//       code: 'class Solution:\n' +
//         '    def xorAllNums(self, nums1: List[int], nums2: List[int]) -> int:\n' +
//         '        allxors = []\n' +
//         '        for i in nums1:\n' +
//         '            for j in nums2:\n' +
//         '                allxors.append(i ^ j)\n' +
//         '        \n' +
//         '        ans = allxors[0]\n' +
//         '        for i in range(1,len(allxors)):\n' +
//         '            ans  ^= allxors[i]\n' +
//         '        \n' +
//         '        return ans\n' +
//         '            ',
//       compare_result: '111111111111111111111111111000000000000000',
//       title_slug: 'bitwise-xor-of-all-pairings',
//       has_notes: false,
//       flag_type: 1
//     },
//     {
//       id: 1509024031,
//       question_id: 2509,
//       lang: 'python3',
//       lang_name: 'Python3',
//       time: '2 days, 6 hours',
//       timestamp: 1736916877,
//       status: 10,
//       status_display: 'Accepted',
//       runtime: '0 ms',
//       url: '/submissions/detail/1509024031/',
//       is_pending: 'Not Pending',
//       title: 'Minimize XOR',
//       memory: '18 MB',
//       code: 'class Solution:\n' +
//         '    def minimizeXor(self, num1: int, num2: int) -> int:\n' +
//         "        a, b = bin(num1).count('1'), bin(num2).count('1')\n" +
//         '        res = num1\n' +
//         '        for i in range(32):\n' +
//         '            if a > b and (1 << i) & num1 > 0:\n' +
//         '                res ^= 1 << i\n' +
//         '                a -= 1\n' +
//         '            if a < b and (1 << i) & num1 == 0:\n' +
//         '                res ^= 1 << i\n' +
//         '                a += 1\n' +
//         '        return res\n' +
//         '\n',
//       compare_result: '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
//       title_slug: 'minimize-xor',
//       has_notes: false,
//       flag_type: 1
//     },
//     {
//       id: 1507918124,
//       question_id: 2766,
//       lang: 'python3',
//       lang_name: 'Python3',
//       time: '3 days, 7 hours',
//       timestamp: 1736827643,
//       status: 10,
//       status_display: 'Accepted',
//       runtime: '42 ms',
//       url: '/submissions/detail/1507918124/',
//       is_pending: 'Not Pending',
//       title: 'Find the Prefix Common Array of Two Arrays',
//       memory: '18 MB',
//       code: 'class Solution:\n' +
//         '    def findThePrefixCommonArray(self, A: List[int], B: List[int]) -> List[int]:\n' +
//         '        c =[]\n' +
//         '        l = len(A)\n' +
//         '        for i in range(l):\n' +
//         '            a = set(A[:i+1])\n' +
//         '            b = set(B[:i+1])\n' +
//         '            cnt = len(a.intersection(b))\n' +
//         '            c.append(cnt)\n' +
//         '        return c\n' +
//         '        ',
//       compare_result: '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
//       title_slug: 'find-the-prefix-common-array-of-two-arrays',
//       has_notes: false,
//       flag_type: 1
//     }
//   ],
//   has_next: true,
//   last_key: '%7B%22pk%22%3A%20%7B%22N%22%3A%20%221507918124%22%7D%2C%20%22dt%22%3A%20%7B%22S%22%3A%20%222025-01-14T04%3A07%3A23.848242%2B0000%22%7D%2C%20%22sid%22%3A%20%7B%22N%22%3A%20%224594942%22%7D%7D'
// }




export function calculateLeetcodeStreak(data: ResponseData) :number{
  
  const timestamps : number[] = extractTimestamps(data);
  const streakDays : number = CountStreakDays(timestamps);
  return streakDays
}
