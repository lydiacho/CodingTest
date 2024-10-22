const fs = require('fs');
const nums = fs.readFileSync(0).toString().trim().split('\n').map(Number);
const solution = () => {
  let max = 0;
  let maxIdx;
  for (let i = 0; i < 9; i++) {
    if (max < nums[i]) {
      max = nums[i];
      maxIdx = i+1;
    }
  }
  return [max, maxIdx].join('\n');
}
console.log(solution());