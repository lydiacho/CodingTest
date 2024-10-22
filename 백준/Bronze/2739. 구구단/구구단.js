const fs = require('fs');
const N = +fs.readFileSync(0).toString().trim();

const solution = () => {
  let answer = [];
  for (let i = 1; i <= 9; i++) {
    answer.push(`${N} * ${i} = ${N * i}`);
  }
  return answer.join('\n');
}
console.log(solution());