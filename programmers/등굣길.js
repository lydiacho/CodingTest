// 가면안되는 좌표는 -1 처리 해놓기
// dp[i][j] = dp[i-1][j] + dp[i][j-1];
// dp[i][0] = dp[i-1][0]
// dp[0][j] = dp[0][j-1]
// 만약 dp[i][j]가 -1이면 pass
// 만약 구하려는 dp[i-1][j] 혹은 dp[i][j-1]이 -1이면 -> 0으로 처리

function solution(m, n, puddles) {
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => 0)
  );
  puddles.forEach(([j, i]) => {
    dp[i - 1][j - 1] = -1;
  });
  dp[0][0] = 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (dp[i][j] === -1) continue;
      dp[i][j] =
        (dp[i][j] +
          (i > 0 && dp[i - 1][j] !== -1 ? dp[i - 1][j] : 0) +
          (j > 0 && dp[i][j - 1] !== -1 ? dp[i][j - 1] : 0)) %
        1000000007;
    }
  }
  return dp[n - 1][m - 1] % 1000000007;
}
