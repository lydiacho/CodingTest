const fs = require("fs");
const n = +fs.readFileSync(0).toString().trim();

const solution = () => {
  const arr = Array.from({ length: n + 1 }, () => 0);
  arr[1] = 1;
  arr[2] = 2;
  for (let i = 3; i <= n; i++) {
    arr[i] += (arr[i - 1] % 15746) + (arr[i - 2] % 15746); // 1이올때 + 0이 올때
  }

  return arr[n] % 15746;
};

console.log(solution());
