// 모든 집은 인접한 집과 다른 색이어야 하고, 1번과 N번 집은 서로 다른 색이어야 함
const fs = require("fs");
const [input1, ...input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const N = +input1;
const costs = input2.map((v) => v.split(" ").map(Number));
const [R, G, B] = [0, 1, 2];

const solution = () => {
  const dp = Array.from({ length: N + 1 }, () =>
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 1000001))
  );
  dp[1][R][R] = costs[0][R];
  dp[1][G][G] = costs[0][G];
  dp[1][B][B] = costs[0][B];
  for (let i = 2; i <= N; i++) {
    for (let j = 0; j < 3; j++) {
      dp[i][R][j] =
        Math.min(dp[i - 1][G][j], dp[i - 1][B][j]) + costs[i - 1][R];
      dp[i][G][j] =
        Math.min(dp[i - 1][R][j], dp[i - 1][B][j]) + costs[i - 1][G];
      dp[i][B][j] =
        Math.min(dp[i - 1][R][j], dp[i - 1][G][j]) + costs[i - 1][B];
    }
  }
  return Math.min(
    dp[N][R][G],
    dp[N][R][B],
    dp[N][G][R],
    dp[N][G][B],
    dp[N][B][R],
    dp[N][B][G]
  );
};

console.log(solution());
