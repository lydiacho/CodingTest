// 분해합
// 자연수 M의 분해합 N = M + (M의 각자리 수의 합)
// N의 생성자 : M
// Input : N (1 ≤ N ≤ 1,000,000)
// output : N의 가장 작은 생성자 M (생성자 없는 경우 0)
// 백만 가지의 N의 M을 구해볼 수 없으니

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
