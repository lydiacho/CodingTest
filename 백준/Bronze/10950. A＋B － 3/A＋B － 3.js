const fs = require('fs');
const [T, ...rest]= fs.readFileSync(0).toString().trim().split('\n');

const solution = () => {
  const nums = rest.map(v => v.split(' ').map(Number));
  const answer = nums.map(v => {
    return v.reduce((acc, curr) => acc + curr, 0);
  })
  
  return answer.join('\n');
}
console.log(solution());