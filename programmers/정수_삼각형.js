// dp[i][j]의 DP table
// dp[i][0] = dp[i-1][0] + a[i][0]
// dp[i][i] = dp[i-1][i-1] + a[i][i]
// 그 외 dp[i][j] = max(dp[i-1][j-1], dp[i-1][j]) + a[i][j]

function solution(triangle) {
  const N = triangle.length;

  for (let i = 1; i < N; i++) {
    triangle[i][0] += triangle[i - 1][0];
    triangle[i][i] += triangle[i - 1][i - 1];

    for (let j = 1; j < i; j++) {
      triangle[i][j] += Math.max(triangle[i - 1][j - 1], triangle[i - 1][j]);
    }
  }
  return Math.max(...triangle[N - 1]);
}
