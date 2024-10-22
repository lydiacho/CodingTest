const fs = require('fs');
const [S, i] = fs.readFileSync(0).toString().trim().split('\n');

const solution = () => {
  return S[+i-1];
}
console.log(solution());