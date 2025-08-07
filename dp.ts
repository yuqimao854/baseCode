// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
// 示例 1：

// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
// 示例 2：

// 输入：nums = [0,1,0,3,2,3]
// 输出：4
// 示例 3：

// 输入：nums = [7,7,7,7,7,7,7]
// 输出：1

// 动态规划的解决思路，借助一个 dp 数组去记录抵达各个数字时的递增序列长度，每个「数字 A」 的最长递增序列是它前面比该数字小的 「数字B」 的递增序列长度+1。

function lengthOfLIS(nums: number[]): number {
  if (nums.length === 0) return 0;
  let dp = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
  }
  return Math.max(...dp);
}

// 给定一个未排序的整数数组 nums ， 返回最长递增子序列的个数 。

// 注意 这个数列必须是 严格 递增的。

// 示例 1:

// 输入: [1,3,5,4,7]
// 输出: 2
// 解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。
// 示例 2:

// 输入: [2,2,2,2,2]
// 输出: 5
// 解释: 最长递增子序列的长度是1，并且存在5个子序列的长度为1，因此输出5。

function findNumberOfLIS(nums: number[]): number {
  if (nums.length === 0) return 0;
  let dp = new Array(nums.length).fill(1);
  let count = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          count[i] = count[j];
        } else if (dp[i] === dp[j] + 1) {
          count[i] += count[j];
        }
      }
    }
  }

  const maxLength = Math.max(...dp);
  let result = 0;

  for (let i = 0; i < dp.length; i++) {
    if (dp[i] === maxLength) {
      result += count[i];
    }
  }

  return result;
}

// 给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。

// 连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。

// 示例 1：

// 输入：nums = [1,3,5,4,7]
// 输出：3
// 解释：最长连续递增序列是 [1,3,5], 长度为3。
// 尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。
// 示例 2：

// 输入：nums = [2,2,2,2,2]
// 输出：1
// 解释：最长连续递增序列是 [2], 长度为1。

function findLengthOfLCIS(nums: number[]): number {
  const dp = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1;
    }
  }
  return Math.max(...dp);
}

// 给你一个字符串 s ，字符串的「能量」定义为：只包含一种字符的最长非空子字符串的长度。

// 请你返回字符串 s 的 能量。
// 示例 1：

// 输入：s = "leetcode"
// 输出：2
// 解释：子字符串 "ee" 长度为 2 ，只包含字符 'e' 。
// 示例 2：

// 输入：s = "abbcccddddeeeeedcba"
// 输出：5
// 解释：子字符串 "eeeee" 长度为 5 ，只包含字符 'e'

function maxPower(s: string): number {
  const dp = new Array(s.length).fill(1);
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      dp[i] = dp[i - 1] + 1;
    }
  }
  return Math.max(...dp);
}

// 给定一个二进制数组 nums ， 计算其中最大连续 1 的个数。

// 示例 1：

// 输入：nums = [1,1,0,1,1,1]
// 输出：3
// 解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.
// 示例 2:

// 输入：nums = [1,0,1,1,0,1]
// 输出：2

function findMaxConsecutiveOnes(nums: number[]): number {
  const dp = nums.slice();

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] && nums[i] === 1) {
      dp[i] = dp[i - 1] + 1;
    }
  }
  return Math.max(...dp);
}

// 1004. 最大连续1的个数 III
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给定一个二进制数组 nums 和一个整数 k，假设最多可以翻转 k 个 0 ，则返回执行操作后 数组中连续 1 的最大个数 。

// 示例 1：

// 输入：nums = [1,1,1,0,0,0,1,1,1,1,0], K = 2
// 输出：6
// 解释：[1,1,1,0,0,1,1,1,1,1,1]
// 粗体数字从 0 翻转到 1，最长的子数组长度为 6。
// 示例 2：

// 输入：nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
// 输出：10
// 解释：[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
// 粗体数字从 0 翻转到 1，最长的子数组长度为 10。

// 提示：

// 1 <= nums.length <= 105
// nums[i] 不是 0 就是 1
// 0 <= k <= nums.length

function longestOnes(nums: number[], k: number): number {
  let left = 0; // 窗口左边界
  let right = 0; // 窗口右边界
  let zeros = 0; // 窗口内0的个数
  let maxLength = 0; // 最大窗口长度

  while (right < nums.length) {
    // 扩大右边界
    if (nums[right] === 0) {
      zeros++;
    }

    // 如果0的个数超过k，缩小左边界
    while (zeros > k) {
      if (nums[left] === 0) {
        zeros--;
      }
      left++;
    }
    maxLength = Math.max(maxLength, right - left + 1);

    right++;
  }

  return maxLength;
}

// 相关标签
// premium lock icon
// 相关企业
// 给你一个字符串 s 和一个整数 k 。你可以选择字符串中的任一字符，并将其更改为任何其他大写英文字符。该操作最多可执行 k 次。

// 在执行上述操作后，返回 包含相同字母的最长子字符串的长度。

// 示例 1：

// 输入：s = "ABAB", k = 2
// 输出：4
// 解释：用两个'A'替换为两个'B',反之亦然。
// 示例 2：

// 输入：s = "AABABBA", k = 1
// 输出：4
// 解释：
// 将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
// 子串 "BBBB" 有最长重复字母, 答案为 4。
// 可能存在其他的方法来得到同样的结果。

function characterReplacement(s: string, k: number): number {
  let left = 0; // 窗口左边界
  let right = 0; // 窗口右边界
  const map = new Map();
  let maxCount = 0;
  let maxLength = 0;
  while (right < s.length) {
    // 扩大右边界
    const char = s[right];
    map.set(char, (map.get(char) || 0) + 1);
    // 更新最大出现次数
    maxCount = Math.max(maxCount, map.get(char)!);

    // 检查窗口是否有效
    // 窗口长度 - 最多字符的个数 = 需要替换的字符个数
    if (right - left + 1 - maxCount > k) {
      // 窗口无效，缩小左边界
      const leftChar = s[left];
      map.set(leftChar, map.get(leftChar)! - 1);

      left++;
    }

    // 更新最大长度
    maxLength = Math.max(maxLength, right - left + 1);

    right++;
  }
  console.log(map);
  return maxLength;
}

// 给定两个字符串 s 和 t ，编写一个函数来判断它们是不是一组变位词（字母异位词）。

// 注意：若 s 和 t 中每个字符出现的次数都相同且字符顺序不完全相同，则称 s 和 t 互为变位词（字母异位词）。

// 示例 1：

// 输入：s = "anagram", t = "nagaram"
// 输出：true
// 示例 2：

// 输入：s = "rat", t = "car"
// 输出：false
// 示例 3：

// 输入：s = "a", t = "a"
// 输出：false
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }
  const map1 = new Map();
  const map2 = new Map();
  let flag = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== t[i]) {
      flag = true;
    }
    map1.set(s[i], (map1.get(s[i]) || 0) + 1);
    map2.set(t[i], (map2.get(t[i]) || 0) + 1);
  }

  map1.forEach((value, key) => {
    if (map2.get(key) !== value) {
      flag = false;
    }
  });

  return flag;
}

function missingNumber(nums: number[]): number {
  const set = new Set(nums);

  for (let i = 0; i <= nums.length; i++) {
    if (!set.has(i)) {
      return i;
    }
  }
  return 0;
}

// 给你一个整数数组 nums 和一个整数 k ，请你返回子数组内所有元素的乘积严格小于 k 的连续子数组的数目。

// 示例 1：

// 输入：nums = [10,5,2,6], k = 100
// 输出：8
// 解释：8 个乘积小于 100 的子数组分别为：[10]、[5]、[2]、[6]、[10,5]、[5,2]、[2,6]、[5,2,6]。
// 需要注意的是 [10,5,2] 并不是乘积小于 100 的子数组。
// 示例 2：

// 输入：nums = [1,2,3], k = 0
// 输出：0

function numSubarrayProductLessThanK(nums: number[], k: number): number {
  if (k <= 1) return 0;
  let left = 0;
  let right = 0;
  let product = 1;
  let count = 0;
  while (right < nums.length) {
    product *= nums[right];
    while (product >= k) {
      product = product / nums[left];
      left++;
    }
    count += right - left + 1;
    right++;
  }
  return count;
}

// 给定一个非负整数 x ，计算并返回 x 的平方根，即实现 int sqrt(int x) 函数。

// 正数的平方根有两个，只输出其中的正数平方根。

// 如果平方根不是整数，输出只保留整数的部分，小数部分将被舍去。

// 示例 1：

// 输入: x = 4
// 输出: 2
// 示例 2：

// 输入: x = 8
// 输出: 2
// 解释: 8 的平方根是 2.82842...，由于小数部分将被舍去，所以返回 2

function mySqrt(x: number): number {
  for (let i = 0; i < x; i++) {
    if (i * i === x) {
      return x;
    }
    if (i * i < x && (i + 1) * (i + i) > x) {
      return i;
    }
  }

  return 1;
}

// 给定两个单词 word1 和 word2 ，返回使得 word1 和  word2 相同所需的最小步数。

// 每步 可以删除任意一个字符串中的一个字符。

// 示例 1：

// 输入: word1 = "sea", word2 = "eat"
// 输出: 2
// 解释: 第一步将 "sea" 变为 "ea" ，第二步将 "eat "变为 "ea"
// 示例  2:

// 输入：word1 = "leetcode", word2 = "etco"
// 输出：4

// 提示：

// 1 <= word1.length, word2.length <= 500
// word1 和 word2 只包含小写英文字母

function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return m + n - 2 * dp[m][n];
}

// 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。

// 你可以对一个单词进行如下三种操作：

// 插入一个字符
// 删除一个字符
// 替换一个字符

// 示例 1：

// 输入：word1 = "horse", word2 = "ros"
// 输出：3
// 解释：
// horse -> rorse (将 'h' 替换为 'r')
// rorse -> rose (删除 'r')
// rose -> ros (删除 'e')
// 示例 2：

// 输入：word1 = "intention", word2 = "execution"
// 输出：5
// 解释：
// intention -> inention (删除 't')
// inention -> enention (将 'i' 替换为 'e')
// enention -> exention (将 'n' 替换为 'x')
// exention -> exection (将 'n' 替换为 'c')
// exection -> execution (插入 'u')

function minDistance1(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const dp = new Array(m + 1).fill(0).map((item) => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i; // 初始化第一列
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j; // 初始化第一行
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // 删除 word1[i-1]
          dp[i][j - 1] + 1, // 插入 word2[j-1]
          dp[i - 1][j - 1] + 1 // 替换 word1[i-1] 为 word2[j-1]
        );
      }
    }
  }

  return dp[m][n];
}

// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

// 示例 1：

// 输入：nums = [3,2,1,5,6,4], k = 2
// 输出：5
// 示例 2：

// 输入：nums = [3,2,3,1,2,4,5,5,6], k = 4
// 输出：4
// const quickSelect = (nums:number,left,right,k) =>{
//       if(left===right){
//         return nums[left]
//       }
//       const pivotIndex = partition(nums, left, right);

//       if(pivotIndex===k){
//         return nums[k]
//       }
//       if(pivotIndex>k){
//         return quickSelect(nums,left,pivotIndex-1,k)
//       }
//       return quickSelect(nums,pivotIndex+1,right,k)
// }
// function findKthLargest(nums: number[], k: number): number {
//     const n = nums.length

//     //第N-k+1小 转换成
//     return quickSelect(nums,0,n-1,n-k)
// };

// 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

// 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。

// 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。

// 示例 1：

// 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// 输出：[1,2,2,3,5,6]
// 解释：需要合并 [1,2,3] 和 [2,5,6] 。
// 合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
// 示例 2：

// 输入：nums1 = [1], m = 1, nums2 = [], n = 0
// 输出：[1]
// 解释：需要合并 [1] 和 [] 。
// 合并结果是 [1] 。
// 示例 3：

// 输入：nums1 = [0], m = 0, nums2 = [1], n = 1
// 输出：[1]
// 解释：需要合并的数组是 [] 和 [1] 。
// 合并结果是 [1] 。
// 注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。

/**
 Do not return anything, modify nums1 in-place instead.
 */
//  [1,2,3,0,0,0],
//  [2,5,6]
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }

    k--;
  }
}

// 977. 有序数组的平方
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

// 示例 1：

// 输入：nums = [-4,-1,0,3,10]
// 输出：[0,1,9,16,100]
// 解释：平方后，数组变为 [16,1,0,9,100]
// 排序后，数组变为 [0,1,9,16,100]
// 示例 2：

// 输入：nums = [-7,-3,2,3,11]
// 输出：[4,9,9,49,121]

function sortedSquares(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n);
  let left = 0;
  let right = n - 1;
  let index = n - 1; // 从结果数组末尾开始填充
  while (right >= left) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];

    if (rightSquare > leftSquare) {
      result[index] = rightSquare;
      right--;
    } else {
      result[index] = leftSquare;
      left++;
    }
    index--;
  }
  return result;
}

// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。

// 示例 1：

// 输入：s = "()"

// 输出：true

// 示例 2：

// 输入：s = "()[]{}"

// 输出：true

// 示例 3：

// 输入：s = "(]"

// 输出：false

// 示例 4：

// 输入：s = "([])"

// 输出：true

// 示例 5：

// 输入：s = "([)]"

// 输出：false

function isValid(s: string): boolean {
  const stack: string[] = [];
  const charMapping = {
    ')': '(',
    ']': '[',
    '}': '{',
  };
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (['(', '{', '['].includes(char)) {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (top !== charMapping[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

// 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
// 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

// 示例 1：

// 输入：text1 = "abcde", text2 = "ace"
// 输出：3
// 解释：最长公共子序列是 "ace" ，它的长度为 3 。
// 示例 2：

// 输入：text1 = "abc", text2 = "abc"
// 输出：3
// 解释：最长公共子序列是 "abc" ，它的长度为 3 。
// 示例 3：

// 输入：text1 = "abc", text2 = "def"
// 输出：0
// 解释：两个字符串没有公共子序列，返回 0 。

function longestCommonSubsequence(text1: string, text2: string): number {
  let m = text1.length;
  let n = text2.length;
  const dp = new Array(m + 1).fill(0).map((item) => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// 给你一个大小为 m x n 的整数矩阵 mat 和一个整数 target 。

// 从矩阵的 每一行 中选择一个整数，你的目标是 最小化 所有选中元素之 和 与目标值 target 的 绝对差 。

// 返回 最小的绝对差 。

// a 和 b 两数字的 绝对差 是 a - b 的绝对值。

// 输入：mat = [[1,2,3],[4,5,6],[7,8,9]], target = 13
// 输出：0
// 解释：一种可能的最优选择方案是：
// - 第一行选出 1
// - 第二行选出 5
// - 第三行选出 7
// 所选元素的和是 13 ，等于目标值，所以绝对差是 0 。

function minimizeTheDifference(mat: number[][], target: number): number {
  const m = mat.length;
  const n = mat[0].length;
  let maxSum = 1000;
  let dp = new Array(m).fill(0).map((item) => new Array(maxSum).fill(Infinity));

  for (let j = 0; j < n; j++) {
    const sum = mat[0][j];
    dp[0][sum] = Math.abs(target - sum);
  }

  //   mat[0] = [1, 2, 3], target = 13

  // dp[0][1] = |1 - 13| = 12  // 选择1，差值为12
  // dp[0][2] = |2 - 13| = 11  // 选择2，差值为11
  // dp[0][3] = |3 - 13| = 10  // 选择3，差值为10

  // dp[i][sum] = min(dp[i-1][prevSum] + |sum - target|)
  for (let i = 1; i < m; i++) {
    for (let preSum = 0; preSum < maxSum; preSum++) {
      if (dp[i - 1][preSum] === Infinity) continue;
      for (let j = 0; j < n; j++) {
        const newSum = preSum + mat[i][j];
        dp[i][newSum] = Math.min(dp[i][newSum], dp[i - 1][preSum]);
      }
    }
  }
  let result = Infinity;
  for (let sum = 0; sum < maxSum; sum++) {
    if (dp[m - 1][sum] !== Infinity) {
      result = Math.min(result, Math.abs(sum - target));
    }
  }

  return result;
}

// 给你一个 m x n 的整数矩阵 points （下标从 0 开始）。一开始你的得分为 0 ，你想最大化从矩阵中得到的分数。

// 你的得分方式为：每一行 中选取一个格子，选中坐标为 (r, c) 的格子会给你的总得分 增加 points[r][c] 。

// 然而，相邻行之间被选中的格子如果隔得太远，你会失去一些得分。对于相邻行 r 和 r + 1 （其中 0 <= r < m - 1），选中坐标为 (r, c1) 和 (r + 1, c2) 的格子，你的总得分 减少 abs(c1 - c2) 。

// 请你返回你能得到的 最大 得分。

// abs(x) 定义为：

// 如果 x >= 0 ，那么值为 x 。
// 如果 x < 0 ，那么值为 -x 。

// 输入：points = [[1,2,3]
//                [1,5,1],
//                [3,1,1]]
// 输出：9
// 解释：
// 蓝色格子是最优方案选中的格子，坐标分别为 (0, 2)，(1, 1) 和 (2, 0) 。
// 你的总得分增加 3 + 5 + 3 = 11 。
// 但是你的总得分需要扣除 abs(2 - 1) + abs(1 - 0) = 2 。
// 你的最终得分为 11 - 2 = 9 。

function maxPoints(points: number[][]): number {
  const m = points.length;
  const n = points[0].length;

  let dp = new Array(m).fill(0).map((item) => new Array(n).fill(0));
  for (let j = 0; j < n; j++) {
    dp[0][j] = points[0][j];
  }

  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        dp[i][j] = Math.max(
          dp[i][j],
          points[i][j] + dp[i - 1][k] - Math.abs(k - j)
        );
      }
    }
  }

  return Math.max(...dp[m - 1]);
}
