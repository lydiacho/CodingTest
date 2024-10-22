const fs = require('fs');
const input = fs.readFileSync(0).toString().trim();

const solution = () => {
  return input.charCodeAt();
}
console.log(solution());