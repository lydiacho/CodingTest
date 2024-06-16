# DP

## 코드트리

## 프로그래머스

### N으로 표현(Lv.3)

```js
// 최솟값은 8까지만 가능 -> N이 1번~8번 쓰이는 경우만 고려
// dp[i] : N을 i번 사용한 경우
// 케이스 : N을 i번 붙여쓰기, 덧셈, 뺄셈, 곱셈, 나눗셈(버림)
// i번 반복하는 문제를, j번 문제와 i-j번 문제의 합으로 쪼개서 풀 수 있음

function solution(N, number) {
  const dp = Array.from({ length: 9 }, () => new Set());
  for (let i = 1; i < 9; i++) {
    dp[i].add(+String(N).repeat(i));
    for (let j = 1; j < i; j++) {
      dp[j].forEach((v) => {
        dp[i - j].forEach((w) => {
          dp[i].add(v + w);
          dp[i].add(v - w);
          dp[i].add(v * w);
          if (w !== 0) dp[i].add(Math.floor(v / w));
        });
      });
    }
    if (dp[i].has(number)) return i;
  }
  return -1;
}
```

### 정수 삼각형(Lv.3)

```js
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
```

### 등굣길(Lv.3)

```js
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
```
