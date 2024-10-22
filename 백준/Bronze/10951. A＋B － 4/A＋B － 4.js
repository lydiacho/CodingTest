const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n').map(v=>v.split(' ').map(Number));

const solution = () => {
  const answer = input.map(v => {
    return v.reduce((acc, curr) => acc + curr, 0);
  })
  
  return answer.join('\n');
}
console.log(solution());