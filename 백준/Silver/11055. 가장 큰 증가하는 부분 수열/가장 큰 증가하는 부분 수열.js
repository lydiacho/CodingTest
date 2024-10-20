// Math.max( i값보다 작은 인접 요소에 대해 dp(i-s) + i값, 기존의 최대 합) 
const fs = require("fs");
const [input1, input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const N = +input1;
const num = input2.split(' ').map(Number);


const solution = () => {
  const mem = Array.from({ length: N }, () => 0);
  mem[0] = num[0];
  for (let i = 1; i < N; i++) {
    let last = i; // 만약 앞에 더 작은 요소가 없다면, mem[last]가 0이어야 함 
    for (let j = i - 1; j >= 0; j--) {
      if (num[i] > num[j] && mem[last] < mem[j]) {  // 🧨
        last = j;
      }
    }
    mem[i] = mem[last] + num[i];
  }
  return Math.max(...mem);
};

console.log(solution());
