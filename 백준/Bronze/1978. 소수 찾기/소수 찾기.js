const fs = require("fs");
const [_, input] = fs.readFileSync(0).toString().trim().split("\n");
const nums = input.split(" ").map(Number);

const isPrime = (v) => {
  const arr = Array.from({ length: v + 1 }, (_, i) => (i <= 1 ? false : true));
  for (let i = 2; i <= Math.sqrt(v); i++) {
    if (!arr[i]) continue;
    for (let j = i * i; j <= v; j += i) {
      arr[j] = false;
    }
  }
  return arr[v];
};

const solution = () => {
  let answer = 0;
  nums.map((v) => {
    if (isPrime(v)) answer++;
  });
  return answer;
};

console.log(solution());
