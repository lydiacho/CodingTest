const fs = require("fs");
const [H, W, N, M] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split(" ")
  .map(Number);
// 행마다 W개씩 H행, 각 참가자는 세로로 N칸, 가로로 M칸이상 비워야 함, 최대 몇명 수용 가능?
const solution = () => {
  // H 이하의 N 배수 개수 * W 이하의 M 배수 개수
  return Math.ceil(H / (N + 1)) * Math.ceil(W / (M + 1));
};

console.log(solution());