const fs = require('fs');
const [A, B]= fs.readFileSync(0).toString().trim().split(' ').map(Number);

const solution = () => {
  const answer = [A + B, A - B, A * B, Math.floor(A / B), A % B];
  return answer.join('\n');
}
console.log(solution());