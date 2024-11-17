const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const N = +input1;
const amount = rest.map(Number);

const solution = () => {
  // 앞에서부터 안마실때 / 첫번째연속으로 마실때 / 두번째연속으로 마실때 경우를 나눠서 계산해보기
  const dp = Array.from({ length: N }, () =>
    Array.from({ length: 3 }, () => 0)
  );

  if (N === 1) return amount[0];
  if (N === 2) return amount[0] + amount[1];

  dp[0][1] = amount[0];
  dp[1][0] = dp[0][1];
  dp[1][1] = dp[0][0] + amount[1];
  dp[1][2] = dp[0][1] + amount[1];

  for (let i = 2; i < N; i++) {
    if (amount[i] === 0) {
      dp[i][0] = dp[i][1] = dp[i][2] = Math.max(...dp[i - 1]);
      continue;
    }
    dp[i][0] = Math.max(...dp[i - 1]);
    dp[i][1] = dp[i - 1][0] + amount[i];
    dp[i][2] = dp[i - 1][1] + amount[i];
  }

  return Math.max(...dp[N - 1]);
};

console.log(solution());
