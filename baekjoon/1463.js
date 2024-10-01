// 정수 N이 3의 배수이면 3으로 나눔 , 2의 배수이면 2로 나눔 , 1을 뺌
// 연산 세개를 활용해서 1 만들기. 연산의 최소 횟수 구하기
// input : 정수 N (1~10^6)
// output : 연산 횟수 최솟값

// N부터 세가지 연산을 모두 계산하기를 반복 -> 단, 메모이제이션을 통해 시간 절약

const fs = require("fs");
const n = fs.readFileSync(0).toString().trim();

const mem = new Array(1000001).fill(-1);

// dp가 하는 일 : n까지 가능한 연산 중 최소 횟수 구하기
const dp = (n) => {
  if (n === 1) return 0;
  if (mem[n] !== -1) return mem[n];

  let res = dp(n - 1);
  if (n % 3 === 0) {
    res = Math.min(res, dp(n / 3));
  }
  if (n % 2 === 0) {
    res = Math.min(res, dp(n / 2));
  }

  return (mem[n] = res + 1);
};

const solution = (n) => {
  return dp(n);
};

console.log(solution(+n));
