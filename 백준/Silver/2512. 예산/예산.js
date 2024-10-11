// - 정해진 국가 예산 총액 이하에서 가능한 **최대의 예산** 배정하기
// - 모든 요청이 배정될 수 없는 경우 **상한액(정수)**을 정해서 이 이상 요청한 지방에는 상한액을 배정, 그 이하의 지방에는 요청한대로 배정
// - 모든 요청이 배정될 수 있는 경우는 요청대로 배정
// - input : 지방 N개, 각 지방에서 요청한 예산, 총 예산 M
// - output : 배정된 예산 중 최댓값

// 만약 모든 지방 예산의 합이 총예산 이하라면 문제 X
// 상한값을 이분탐색하면서, 총합 < M이면 답변 후보로 두고 계속 진행 (1~100,000)

const fs = require("fs");
const [input1, input2, input3] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const n = +input1;
const requests = input2.split(" ").map(Number);
const m = +input3;

const calSum = (highV) => {
  // 상한액 이하면 그대로, 상한액 초과면 상한액 더하기
  let sum = 0;
  requests.map((v) => {
    if (v <= highV) sum += v;
    else sum += highV;
  });
  return sum;
};
const solution = () => {
  const sum = requests.reduce((acc, curr) => acc + curr, 0);
  if (sum <= m) return Math.max(...requests);

  let l = 1;
  let r = 100000;
  let res;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const sum = calSum(mid);
    if (sum === m) {
      res = mid;
      break;
    }
    if (sum < m) {
      res = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  // 상한액을 계산 했다는 것은, 상한액이 최대 지방 예산이라는 뜻
  return res;
};

console.log(solution());
