const fs = require('fs');
const [n, ...input] = fs.readFileSync(0).toString().trim().split('\n');

const solution = () => {
  const arr = Array.from(new Set(input));
  arr.sort();
  arr.sort((a, b) => {
    return a.length - b.length;
  });
  return arr.join('\n');
}

console.log(solution());