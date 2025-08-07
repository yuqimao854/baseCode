// 珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。

// 珂珂可以决定她吃香蕉的速度 k （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。

// 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

// 返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。

// 示例 1：

// 输入：piles = [3,6,7,11], h = 8
// 输出：4
// 示例 2：

// 输入：piles = [30,11,23,4,20], h = 5
// 输出：30
// 示例 3：

// 输入：piles = [30,11,23,4,20], h = 6
// 输出：23

function minEatingSpeed(piles: number[], h: number): number {
  let left = 0;
  let right = Math.max(...piles);

  const canEatAll = (piles: number[], h, k) => {
    let timer = 0;
    for (const pile of piles) {
      timer += Math.ceil(pile / k);
    }
    return timer <= h;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canEatAll(piles, h, mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

// 给你一个 下标从 0 开始 的整数数组 candies 。数组中的每个元素表示大小为 candies[i] 的一堆糖果。你可以将每堆糖果分成任意数量的 子堆 ，但 无法 再将两堆合并到一起。

// 另给你一个整数 k 。你需要将这些糖果分配给 k 个小孩，使每个小孩分到 相同 数量的糖果。每个小孩可以拿走 至多一堆 糖果，有些糖果可能会不被分配。

// 返回每个小孩可以拿走的 最大糖果数目 。

// 示例 1：

// 输入：candies = [5,8,6], k = 3
// 输出：5
// 解释：可以将 candies[1] 分成大小分别为 5 和 3 的两堆，然后把 candies[2] 分成大小分别为 5 和 1 的两堆。现在就有五堆大小分别为 5、5、3、5 和 1 的糖果。可以把 3 堆大小为 5 的糖果分给 3 个小孩。可以证明无法让每个小孩得到超过 5 颗糖果。
// 示例 2：

// 输入：candies = [2,5], k = 11
// 输出：0
// 解释：总共有 11 个小孩，但只有 7 颗糖果，但如果要分配糖果的话，必须保证每个小孩至少能得到 1 颗糖果。因此，最后每个小孩都没有得到糖果，答案是 0 。

function maximumCandies(candies: number[], k: number): number {
  let left = 0;
  let right = Math.max(...candies);
  const canGiveCandies = (candies: number[], target: number, k: number) => {
    let totalPiles = 0;
    for (const element of candies) {
      totalPiles += Math.floor(element / target);
    }

    return k <= totalPiles;
  };

  while (left < right) {
    const mid = Math.ceil((left + right) / 2);
    if (canGiveCandies(candies, mid, k)) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return left;
}

// 给你一个整数数组 nums ，其中 nums[i] 表示第 i 个袋子里球的数目。同时给你一个整数 maxOperations 。

// 你可以进行如下操作至多 maxOperations 次：

// 选择任意一个袋子，并将袋子里的球分到 2 个新的袋子中，每个袋子里都有 正整数 个球。
// 比方说，一个袋子里有 5 个球，你可以把它们分到两个新袋子里，分别有 1 个和 4 个球，或者分别有 2 个和 3 个球。
// 你的开销是单个袋子里球数目的 最大值 ，你想要 最小化 开销。
// 请你返回进行上述操作后的最小开销。

// 示例 1：

// 输入：nums = [9], maxOperations = 2
// 输出：3
// 解释：
// - 将装有 9 个球的袋子分成装有 6 个和 3 个球的袋子。[9] -> [6,3] 。
// - 将装有 6 个球的袋子分成装有 3 个和 3 个球的袋子。[6,3] -> [3,3,3] 。
// 装有最多球的袋子里装有 3 个球，所以开销为 3 并返回 3 。
// 示例 2：

// 输入：nums = [2,4,8,2], maxOperations = 4
// 输出：2
// 解释：
// - 将装有 8 个球的袋子分成装有 4 个和 4 个球的袋子。[2,4,8,2] -> [2,4,4,4,2] 。
// - 将装有 4 个球的袋子分成装有 2 个和 2 个球的袋子。[2,4,4,4,2] -> [2,2,2,4,4,2] 。
// - 将装有 4 个球的袋子分成装有 2 个和 2 个球的袋子。[2,2,2,4,4,2] -> [2,2,2,2,2,4,2] 。
// - 将装有 4 个球的袋子分成装有 2 个和 2 个球的袋子。[2,2,2,2,2,4,2] -> [2,2,2,2,2,2,2,2] 。
// 装有最多球的袋子里装有 2 个球，所以开销为 2 并返回 2 。
// 示例 3：

// 输入：nums = [7,17], maxOperations = 2
// 输出：7
function minimumSize(nums: number[], maxOperations: number): number {
  let left = 0;
  let right = Math.max(...nums);

  const canGive = (nums: number[], maxOperations: number, target: number) => {
    let operationsNeeded = 0;
    for (const element of nums) {
      if (element > target) {
        // 计算需要多少次操作才能让这个袋子不超过目标值
        operationsNeeded += Math.ceil(element / target) - 1;
      }
    }

    return operationsNeeded <= maxOperations;
  };
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canGive(nums, maxOperations, mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// 给你一个整数 n ，表示有 n 间零售商店。总共有 m 种产品，每种产品的数目用一个下标从 0 开始的整数数组 quantities 表示，其中 quantities[i] 表示第 i 种商品的数目。

// 你需要将 所有商品 分配到零售商店，并遵守这些规则：

// 一间商店 至多 只能有 一种商品 ，但一间商店拥有的商品数目可以为 任意 件。
// 分配后，每间商店都会被分配一定数目的商品（可能为 0 件）。用 x 表示所有商店中分配商品数目的最大值，你希望 x 越小越好。也就是说，你想 最小化 分配给任意商店商品数目的 最大值 。
// 请你返回最小的可能的 x 。

// 示例 1：

// 输入：n = 6, quantities = [11,6]
// 输出：3
// 解释： 一种最优方案为：
// - 11 件种类为 0 的商品被分配到前 4 间商店，分配数目分别为：2，3，3，3 。
// - 6 件种类为 1 的商品被分配到另外 2 间商店，分配数目分别为：3，3 。
// 分配给所有商店的最大商品数目为 max(2, 3, 3, 3, 3, 3) = 3 。
// 示例 2：

// 输入：n = 7, quantities = [15,10,10]
// 输出：5
// 解释：一种最优方案为：
// - 15 件种类为 0 的商品被分配到前 3 间商店，分配数目为：5，5，5 。
// - 10 件种类为 1 的商品被分配到接下来 2 间商店，数目为：5，5 。
// - 10 件种类为 2 的商品被分配到最后 2 间商店，数目为：5，5 。
// 分配给所有商店的最大商品数目为 max(5, 5, 5, 5, 5, 5, 5) = 5 。
// 示例 3：

// 输入：n = 1, quantities = [100000]
// 输出：100000
// 解释：唯一一种最优方案为：
// - 所有 100000 件商品 0 都分配到唯一的商店中。
// 分配给所有商店的最大商品数目为 max(100000) = 100000 。

function minimizedMaximum(n: number, quantities: number[]): number {
  let left = 1;
  let right = Math.max(...quantities);
  const canGive = (quantities: number[], n: number, target: number) => {
    let allShops = 0;
    for (const element of quantities) {
      allShops += Math.ceil(element / target);
    }
    return allShops <= n;
  };
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canGive(quantities, n, mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// 传送带上的第 i 个包裹的重量为 weights[i]。每一天，我们都会按给出重量（weights）的顺序往传送带上装载包裹。我们装载的重量不会超过船的最大运载重量。

// 返回能在 days 天内将传送带上的所有包裹送达的船的最低运载能力。

// 示例 1：
// 输入：weights = [1,2,3,4,5,6,7,8,9,10], days = 5
// 输出：15
// 解释：
// 船舶最低载重 15 就能够在 5 天内送达所有包裹，如下所示：
// 第 1 天：1, 2, 3, 4, 5
// 第 2 天：6, 7
// 第 3 天：8
// 第 4 天：9
// 第 5 天：10

// 请注意，货物必须按照给定的顺序装运，因此使用载重能力为 14 的船舶并将包装分成 (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) 是不允许的。
// 示例 2：

// 输入：weights = [3,2,2,4,1,4], days = 3
// 输出：6
// 解释：
// 船舶最低载重 6 就能够在 3 天内送达所有包裹，如下所示：
// 第 1 天：3, 2
// 第 2 天：2, 4
// 第 3 天：1, 4
// 示例 3：

// 输入：weights = [1,2,3,1,1], days = 4
// 输出：3
// 解释：
// 第 1 天：1
// 第 2 天：2
// 第 3 天：3
// 第 4 天：1, 1

function shipWithinDays(weights: number[], days: number): number {
  let left = Math.max(...weights);
  let right = weights.reduce((pre, cur) => pre + cur, 0);

  const canShip = (weights: number[], days: number, target: number) => {
    let daysNeed = 1;
    let currentWeight = 0;
    for (const element of weights) {
      if (element > target) {
        return false;
      }
      if (element + currentWeight > target) {
        currentWeight = element;
        daysNeed++;
      } else {
        currentWeight += element;
      }
    }
    return daysNeed <= days;
  };
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canShip(weights, days, mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// 给定一个非负整数数组 nums 和一个整数 k ，你需要将这个数组分成 k 个非空的连续子数组，使得这 k 个子数组各自和的最大值 最小。

// 返回分割后最小的和的最大值。

// 子数组 是数组中连续的部份。

// 示例 1：

// 输入：nums = [7,2,5,10,8], k = 2
// 输出：18
// 解释：
// 一共有四种方法将 nums 分割为 2 个子数组。
// 其中最好的方式是将其分为 [7,2,5] 和 [10,8] 。
// 因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。
// 示例 2：

// 输入：nums = [1,2,3,4,5], k = 2
// 输出：9
// 示例 3：

// 输入：nums = [1,4,4], k = 3
// 输出：4

function splitArray(nums: number[], k: number): number {
  let left = Math.max(...nums);
  let right = nums.reduce((pre, cur) => pre + cur, 0);
  const canSplit = (target: number) => {
    let currentSum = 0;
    let subArrays = 0;
    for (const element of nums) {
      if (element > target) {
        return false;
      }
      if (currentSum + element > target) {
        currentSum = element;
        subArrays++;
      } else {
        currentSum += element;
      }
    }
    subArrays++;
    return subArrays <= k;
  };
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canSplit(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// 给你一个整数数组 cookies ，其中 cookies[i] 表示在第 i 个零食包中的饼干数量。另给你一个整数 k 表示等待分发零食包的孩子数量，所有 零食包都需要分发。在同一个零食包中的所有饼干都必须分发给同一个孩子，不能分开。

// 分发的 不公平程度 定义为单个孩子在分发过程中能够获得饼干的最大总数。

// 返回所有分发的最小不公平程度。

// 示例 1：

// 输入：cookies = [8,15,10,20,8], k = 2
// 输出：31
// 解释：一种最优方案是 [8,15,8] 和 [10,20] 。
// - 第 1 个孩子分到 [8,15,8] ，总计 8 + 15 + 8 = 31 块饼干。
// - 第 2 个孩子分到 [10,20] ，总计 10 + 20 = 30 块饼干。
// 分发的不公平程度为 max(31,30) = 31 。
// 可以证明不存在不公平程度小于 31 的分发方案。
// 示例 2：

// 输入：cookies = [6,1,3,2,2,4,1,2], k = 3
// 输出：7
// 解释：一种最优方案是 [6,1]、[3,2,2] 和 [4,1,2] 。
// - 第 1 个孩子分到 [6,1] ，总计 6 + 1 = 7 块饼干。
// - 第 2 个孩子分到 [3,2,2] ，总计 3 + 2 + 2 = 7 块饼干。
// - 第 3 个孩子分到 [4,1,2] ，总计 4 + 1 + 2 = 7 块饼干。
// 分发的不公平程度为 max(7,7,7) = 7 。
// 可以证明不存在不公平程度小于 7 的分发方案

function distributeCookies(cookies: number[], k: number): number {
  let left = Math.max(...cookies);
  let right = cookies.reduce((pre, cur) => pre + cur, 0);
  const canDistribute = (cookies: number[], k: number, target: number) => {
    const children = new Array(k).fill(0);

    const backtrack = (index: number) => {
      if (index === cookies.length) {
        return true;
      }

      for (let i = 0; i < k; i++) {
        if (children[i] + cookies[index] <= target) {
          children[i] += cookies[index];

          if (backtrack(index + 1)) {
            return true;
          }

          children[i] -= cookies[index];
        }
      }

      return false;
    };

    return backtrack(0);
  };
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canDistribute(cookies, k, mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// 给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。

// 示例 1：

// 输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4
// 输出： True
// 说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。
// 示例 2:

// 输入: nums = [1,2,3,4], k = 3
// 输出: false

function canPartitionKSubsets(nums: number[], k: number): boolean {
  const totalSum = nums.reduce((pre, cur) => pre + cur, 0);
  const target = totalSum / k;
  if (totalSum % k !== 0) {
    return false;
  }
  nums.sort((a, b) => b - a);
  const subsets = new Array(k).fill(0);
  const backtrack = (index: number) => {
    if (index === nums.length) {
      return true;
    }
    for (let i = 0; i < k; i++) {
      if (subsets[i] + nums[index] <= target) {
        subsets[i] += nums[index];
        if (backtrack(index + 1)) {
          return true;
        }
        subsets[i] -= nums[index];
        if (subsets[i] === 0) {
          break;
        }
      }
    }

    return false;
  };
  return backtrack(0);
}

// 给你一个下标从 0 开始且长度为 n 的整数数组 nums 。分割 数组 nums 的方案数定义为符合以下两个条件的 pivot 数目：

// 1 <= pivot < n
// nums[0] + nums[1] + ... + nums[pivot - 1] == nums[pivot] + nums[pivot + 1] + ... + nums[n - 1]
// 同时给你一个整数 k 。你可以将 nums 中 一个 元素变为 k 或 不改变 数组。

// 请你返回在 至多 改变一个元素的前提下，最多 有多少种方法 分割 nums 使得上述两个条件都满足。

// 示例 1：

// 输入：nums = [2,-1,2], k = 3
// 输出：1
// 解释：一个最优的方案是将 nums[0] 改为 k 。数组变为 [3,-1,2] 。
// 有一种方法分割数组：
// - pivot = 2 ，我们有分割 [3,-1 | 2]：3 + -1 == 2 。
// 示例 2：

// 输入：nums = [0,0,0], k = 1
// 输出：2
// 解释：一个最优的方案是不改动数组。
// 有两种方法分割数组：
// - pivot = 1 ，我们有分割 [0 | 0,0]：0 == 0 + 0 。
// - pivot = 2 ，我们有分割 [0,0 | 0]: 0 + 0 == 0 。
// 示例 3：

// 输入：nums = [22,4,-25,-20,-15,15,-16,7,19,-10,0,-13,-14], k = -33
// 输出：4
// 解释：一个最优的方案是将 nums[2] 改为 k 。数组变为 [22,4,-33,-20,-15,15,-16,7,19,-10,0,-13,-14] 。
// 有四种方法分割数组。
function waysToPartition(nums: number[], k: number): number {
  //TODO
}

// 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

// 示例 1：

// 输入：nums = [1,5,11,5]
// 输出：true
// 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
// 示例 2：

// 输入：nums = [1,2,3,5]
// 输出：false
// 解释：数组不能分割成两个元素和相等的子集。

function canPartition(nums: number[]): boolean {
  if (nums.length <= 1) {
    return false;
  }
  const sum = nums.reduce((pre, cur) => pre + cur, 0);
  const target = sum / 2;
  if (sum % 2 !== 0) {
    return false;
  }

  const memo = new Map<string, boolean>();
  const backtrack = (index: number, currentSum: number) => {
    const key = `${index},${currentSum}`;
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    if (index === nums.length) {
      const result = currentSum === target;
      memo.set(key, result);
      return result;
    }
    if (currentSum === target) {
      memo.set(key, true);
      return true;
    }

    if (currentSum + nums[index] <= target) {
      if (backtrack(index + 1, currentSum + nums[index])) {
        memo.set(key, true);
        return true;
      }
    }
    if (backtrack(index + 1, currentSum)) {
      memo.set(key, true);
      return true;
    }
    memo.set(key, false);
    return false;
  };

  return backtrack(0, 0);
}

const createCounter = () => {
  let count = 0;
  return function () {
    return count++;
  };
};
