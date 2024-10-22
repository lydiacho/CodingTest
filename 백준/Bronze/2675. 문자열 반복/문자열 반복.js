const fs = require('fs');
const [_, ...rest] = fs.readFileSync(0).toString().trim().split('\n');

const solution = () => {
  const answer = rest.map(v => {
    const [count, str] = v.split(' ');
    let ans = '';
    for (let i = 0; i < str.length; i++) {
      for (let j = 0; j < count; j++) {
        ans += str[i];
      }
    }
    return ans;
  });
  return answer.join('\n');
}
console.log(solution());