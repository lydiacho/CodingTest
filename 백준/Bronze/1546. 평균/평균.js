const fs = require('fs');
let [input1, input2] = fs.readFileSync(0).toString().trim().split('\n');
const N = +input1;
const arr = input2.split(' ').map(Number);


const solution = () => {
  const max = Math.max(...arr);
  return arr.map(v => v / max * 100).reduce((acc, curr) => acc + curr, 0) / N;
}
console.log(solution());