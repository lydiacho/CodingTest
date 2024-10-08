const fs = require("fs");
const [n, k] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const deletePrime = (v, pos) => {
  let count = 0;
  const arr = Array.from({ length: v + 1 }, (_, i) => (i <= 1 ? false : true));
  for (let i = 2; i <= v; i++) {
    if (!arr[i]) continue;
    for (let j = i; j <= v; j += i) {
      if (!arr[j]) continue;
      count++;
      if (pos === count) return j;
      arr[j] = false;
    }
  }
};

const solution = () => {
  return deletePrime(n, k);
};

console.log(solution());
