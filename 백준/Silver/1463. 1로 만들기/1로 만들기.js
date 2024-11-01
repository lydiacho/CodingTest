const fs = require("fs");
const N = +fs.readFileSync(0).toString().trim();

const solution = () => {
  const mem = Array.from({ length: N + 1 }, () => -1); // i수를 1까지 만드는데에 필요한 최소 연산 횟수
  mem[1] = 0;
  for (let i = 1; i <= N; i++) {
    let min = mem[i - 1];
    if (i % 2 === 0) {
      min = Math.min(min, mem[i / 2]);
    }
    if (i % 3 === 0) {
      min = Math.min(min, mem[i / 3]);
    }
    mem[i] = min + 1;
  }
  return mem[N];
};

console.log(solution());
