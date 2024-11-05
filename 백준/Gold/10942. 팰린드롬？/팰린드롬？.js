const fs = require("fs");
const [input1, input2, input3, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const N = +input1;
const nums = input2.split(" ").map(Number);
const M = +input3;
const problems = rest.map((v) => v.split(" ").map(Number));

const solution = () => {
  const dp = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => 0)
  );

  // 채울 수 있는 것부터 채우기
  // 차이가 구간 크기가 0, 1일 때
  for (let i = 0; i < N - 1; i++) {
    dp[i][i] = 1;
    if (nums[i] === nums[i + 1]) {
      dp[i][i + 1] = 1;
    }
  }
  dp[N - 1][N - 1] = 1;

  // 구간 크기 2부터 N-1 까지 확장하기
  for (let diff = 2; diff <= N - 1; diff++) {
    for (let start = 0; start + diff < N; start++) {
      if (
        nums[start] === nums[start + diff] &&
        dp[start + 1][start + diff - 1] === 1
      ) {
        dp[start][start + diff] = 1;
      }
    }
  }

  const answer = [];
  problems.forEach(([S, E]) => {
    answer.push(dp[S - 1][E - 1]);
  });

  return answer.join("\n");
};

console.log(solution());
