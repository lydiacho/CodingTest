// N각형의 면적 구하기
// output : 소수점 아래 둘째자리에서 반올림, 첫째자리까지 출력
// 오목 / 볼록한 도형 두가지 종류 있음.
// 면적 구하는 공식 : 1/2*|x1y2+x2y3+...+xny1 - x2y1-x3y2-...-x1yn|
// 🧨소수점 자리 설정 : 숫자.toFixed(자릿수)

const fs = require("fs");
const [N, ...input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const n = +N;
const pos = input.map((v) => v.split(" ").map(Number));
const solution = () => {
  let sum = 0;
  const arr = [...pos, pos[0]];
  for (let i = 0; i < n; i++) {
    sum += arr[i][0] * arr[i + 1][1];
    sum -= arr[i + 1][0] * arr[i][1];
  }
  sum = Math.abs(sum) / 2;
  return (Math.round(sum * 10) / 10).toFixed(1);
};

console.log(solution());
