const fs = require('fs');
const N = +fs.readFileSync(0).toString().trim();

const solution = () => {
  let str = '';
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i+1; j++) {
      str += '*';
    }
    str += '\n';
  }
  return str.trim();
}
console.log(solution());