const fs = require("fs");
const N = +fs
  .readFileSync(0)
  .toString()
  .trim();

const MOD = 1000000000;

const solution = () => { 
  // 각 i 숫자의 수
  const mem = Array.from({ length: N + 1 }, () => Array.from({ length: 10 }, () => 0));
  mem[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  for (let i = 2; i <= N; i++) {
    mem[i][0] = mem[i - 1][1];
    mem[i][9] = mem[i - 1][8];
    for (let j = 1; j <= 8; j++) {
      mem[i][j] = (mem[i - 1][j - 1] % MOD + mem[i - 1][j + 1] % MOD) % MOD;
    }
  }
  
  return mem[N].reduce((acc,curr)=>acc+curr,0) % MOD;

};

console.log(solution());