const fs = require('fs');
const [input1, input2] = fs.readFileSync(0).toString().trim().split('\n');
const nums = input2.split('').map(Number);
const solution = () => {
  return nums.reduce((acc,curr)=>acc+curr,0);
}
console.log(solution());