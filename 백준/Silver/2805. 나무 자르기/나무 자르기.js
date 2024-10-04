const fs = require("fs");
const [input1, input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [_, m] = input1.split(" ").map((v) => +v);
const trees = input2.split(" ").map((v) => +v);

const calSum = (x) => {
  let sum = 0;
  trees.map((v) => {
    if (v <= x) return;
    sum += v - x;
  });
  return sum;
};
const solution = () => {
  const MAX = Math.max(...trees);

  // 🧨 범위 주의 : 절단기 범위가 명시되어있지 않으므로 0일때도 고려해야 함
  let l = 0;
  let r = MAX - 1;

  let ans = -1;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const res = calSum(mid);
    if (res === m) {
      ans = mid;
      break;
    } else if (res > m) {
      // 🧨 관건 : m이상을 얻어도 되므로, 이 경우에도 답 후보로 고려해야 함
      // res = m 경우가 없을 때, 이 경우의 최댓값이 답임.
      ans = mid;
      // 절단기 높이를 높여야 함
      l = mid + 1;
    } else {
      // 절단기 높이를 낮춰야 함
      r = mid - 1;
    }
  }

  return ans;
};

console.log(solution());
