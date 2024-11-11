// 0 <= K <= N
// 1~1000
const fs = require("fs");
const [N, K] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split(" ")
  .map(Number);
// nCk = n! / (n-k)!k!
const mem = Array.from({ length: N + 1 }, () =>
  Array.from({ length: K + 1 }, () => 0)
);
const MOD = 10007;

const solution = () => {
  const bino = (n, k) => {
    if (mem[n][k] !== 0) return mem[n][k];
    if (k === 0 || n === k) {
      mem[n][k] = 1;
    } else {
      mem[n][k] = (bino(n - 1, k) % MOD) + ((bino(n - 1, k - 1) % MOD) % MOD);
    }
    return mem[n][k] % MOD;
  };

  return bino(N, K);
};

console.log(solution());
