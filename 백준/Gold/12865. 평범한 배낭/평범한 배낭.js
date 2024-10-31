// 각 물건을 넣을지 말지에 대해 경우를 나눌 수 있음
const fs = require("fs");
const [input1, ...input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [N, K] = input1.split(" ").map(Number);
const WV = input2.map((v) => v.split(" ").map(Number));

const solution = () => {
  const dp = Array.from({ length: N }, () =>
    Array.from({ length: K + 1 }, () => 0)
  );
  // dp[i][K] = Math.max(dp[i-1][K-w]+v, dp[i-1][K])
  const [W, V] = WV[0];

  for (let i = W; i <= K; i++) {
    if (i < W) dp[0][i] = 0;
    else dp[0][i] = V;
  }
  for (let i = 1; i < N; i++) {
    const [W, V] = WV[i];
    for (let j = 1; j <= K; j++) {
      if (j < W) {
        dp[i][j] = dp[i - 1][j];
        continue;
      }
      dp[i][j] = Math.max(dp[i - 1][j - W] + V, dp[i - 1][j]);
    }
  }
  return dp[N - 1][K];
};

console.log(solution());
