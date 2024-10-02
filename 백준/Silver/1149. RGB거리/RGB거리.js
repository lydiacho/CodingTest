// 1번~N번 집 빨초파로 칠하기
// 인접한 집과 색 달라야하고, 최소 비용으로 칠해야 함
// input : 집 수 n(2~1000), 빨초파로 칠하는 비용
// output : 드는 최소 비용

// dp(x) : 1~x번까지 집 칠하는 최소 비용
// dp(x) = for(i) if (i!==prev) min(x번집 i색으로 칠하는 경우) ,
// x번집 i색으로 칠하기 : dp(x+1,i)+arr[x][i]
// 🧨관건 : 메모이제이션을 2차원배열로 관리하기.

const fs = require("fs");
const [N, ...input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const n = +N;
const arr = input.map((v) => v.split(" ").map(Number));
const MAX = 1000001;
const mem = Array.from({ length: 10001 }, () =>
  Array.from({ length: 4 }, () => -1)
);

const dp = (x, prev) => {
  if (x === n) return (mem[x][prev] = 0);
  if (mem[x][prev] !== -1) return mem[x][prev];

  let temp = MAX;
  for (let i = 0; i < 3; i++) {
    if (i === prev) continue;
    temp = Math.min(temp, dp(x + 1, i) + arr[x][i]); //x번 집에 i색을 칠하는 경우
  }
  mem[x][prev] = temp;
  return mem[x][prev];
};
const solution = () => {
  return dp(0, 3); // N번 집의 인덱스는 N-1
};

console.log(solution());
