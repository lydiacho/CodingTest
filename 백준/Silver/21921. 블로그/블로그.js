const fs = require("fs");
const [input1, input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [N, X] = input1.split(" ").map(Number);
const arr = input2.split(" ").map(Number);

// X일동안 가장 많이 방문한 방문자수와 기간 수 구하기

const solution = () => {
  // 구간합 구하기
  const sum = Array.from({ length: N + 1 }, () => 0);
  for (let i = 1; i <= N; i++) {
    sum[i] = arr[i - 1] + sum[i - 1];
  }

  const temp = [];
  for (let i = 0; i + X <= N; i++) {
    temp.push(sum[i + X] - sum[i]);
  }
  const max = Math.max(...temp);
  if (max === 0) return "SAD";
  const count = temp.filter((v) => v === max).length;
  return max + "\n" + count;
};

console.log(solution());
