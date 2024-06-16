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
