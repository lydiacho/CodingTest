const fs = require("fs");
const input = +fs.readFileSync(0).toString().trim();

const solution = (n) => {
  for (let m = 0; m < n; m++) {
    // 생성자 M 찾기
    let sum = (temp = m);
    while (temp > 0) {
      sum += temp % 10;
      temp = Math.floor(temp / 10);
    }
    if (sum === n) return m;
  }
  return 0;
};

console.log(solution(input));