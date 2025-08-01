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
