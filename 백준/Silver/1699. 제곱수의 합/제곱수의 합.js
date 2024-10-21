const fs = require("fs");
const N = +fs
  .readFileSync(0)
  .toString()
  .trim();

const solution = () => { 
  const arr = [];
  for (let i = 1; i <= Math.floor(Math.sqrt(N)); i++) { 
    arr.push(i * i);
  }

  const mem = Array.from({ length: N + 1 }, () => 0);
  arr.map(v => {
    mem[v] = 1; 
  })

  for (let i = 1; i <= N; i++) {
    if (mem[i] !== 0) continue;
    let temp = 100000; 

    arr.map(v => {
      if (v > i) return;
      temp = Math.min(temp, mem[v] + mem[i - v]);
    });

    mem[i] = temp;

  }
  return mem[N];
};

console.log(solution());
