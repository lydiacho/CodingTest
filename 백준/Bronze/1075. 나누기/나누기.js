const fs = require("fs");
const [N, F] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const solution = () => {
  // N에서 가장 가까운 F의 배수의 뒷 두자리
  const mod = N % F;
  const two = N % 100;

  let num = mod > two ? two + (F - mod) : two - mod;
  while (num - F >= 0) {
    num -= F;
  }
  return String(num).padStart(2, 0);
};

console.log(solution());
