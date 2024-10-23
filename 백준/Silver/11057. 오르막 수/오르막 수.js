const fs = require('fs');
let N = +fs.readFileSync(0).toString().trim();
const MOD = 10007;

const solution = () => {
  const arr = Array.from({ length: 10 }, () => 1); 
  while (N>0) {
    for (let i = 8; i >= 0; i--) {
      arr[i] = (arr[i + 1] % MOD + arr[i] % MOD) % MOD;
    }
    N--;
  }
  return arr[0];
}
console.log(solution());