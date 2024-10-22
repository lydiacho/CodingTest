const fs = require('fs');
const [i1, i2] = fs.readFileSync(0).toString().trim().split('\n');
const N = +i1;
const nums = i2.split(' ').map(Number);

const solution = () => {
  return `${Math.min(...nums)} ${Math.max(...nums)}`;
}
console.log(solution());