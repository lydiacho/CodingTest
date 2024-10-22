const fs = require('fs');
const [A,B] = fs.readFileSync(0).toString().trim().split(' ').map(Number);

const solution = () => {
  if (A > B) return '>';
  if (A < B) return '<';
  if (A === B) return '==';
}
console.log(solution());