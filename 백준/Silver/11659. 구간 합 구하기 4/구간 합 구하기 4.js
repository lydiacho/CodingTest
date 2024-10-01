// 수 N개 중 i번째부터 j번째까지 합 구하기
// input : 수의 개수 n, 구해야하는 합 개수 m , n개의 수 .... (수 <=1000), 구간 i와 j
// output : m개의 줄에 i~j구간합
// N개의 수들에 대한 구간합배열 만들고 -> 구간 배열을 순회하면서 적절한 구간합 반환하기
// 🧨주의 : Index 0부터인지 1부터인지 확인하기

const fs = require("fs");
const [input1, input2, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [n, m] = input1.split(" ").map((v) => +v);
const nums = input2.split(" ").map((v) => +v);
const ranges = rest.map((v) => v.split(" ").map((w) => +w));

const solution = (nums, ranges) => {
  // 구간합배열 만들기
  const pSum = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    pSum[i + 1] = pSum[i] + nums[i];
  }

  ranges.map(([i, j]) => {
    console.log(pSum[j] - pSum[i - 1]);
  });
};

solution(nums, ranges);
