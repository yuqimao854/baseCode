// 假设你正在爬楼梯。需要 n 阶才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。
// 问：有多少种不同的方法可以爬到楼顶？

// 示例：
// 输入：n = 3
// 输出：3
// 解释：有三种方法可以爬到楼顶
// 1. 1 阶 + 1 阶 + 1 阶
// 2. 1 阶 + 2 阶
// 3. 2 阶 + 1 阶
const climbStairs = (n) => {
  if (n <= 2) {
    return n;
  }

  let dp = new Array(n + 1);
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

// 测试
console.log(climbStairs(3)); // 3
console.log(climbStairs(4)); // 5
console.log(climbStairs(5)); // 8
