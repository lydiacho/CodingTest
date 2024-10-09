// RxC칸 보드가 있음. 각 칸엔 알파벳 하나. 1행 1열에 말 놓여있음
// 말 이동 가능 : 상화좌우 1칸씩
// 이동할 칸의 알파벳은 지나온 칸들의 알파벳과 겹치면 안됨
// 말은 최대 몇 칸을 지날 수 있을까?
// sol : 2차원 dfs를 진행하면서, 다른 알파벳 찾아 이동. 인접한 모든 칸이 겹치는 알파벳이면 종료

const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [R, C] = input1.split(" ").map(Number);
const grid = rest.map((v) => v.split(""));

const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => false)
);
const alphabet = Array.from({ length: 26 }, () => false); // 사용한 알파벳 표시

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
let answer;

const dfs = (x, y, i) => {
  answer = i;
  dir.map(([dx, dy]) => {
    const newx = x + dx;
    const newy = y + dy;
    if (newx < 0 || newx >= R || newy < 0 || newy >= C) return;
    const charIndex = grid[newx][newy].charCodeAt() - "A".charCodeAt();
    if (!visited[newx][newy] && !alphabet[charIndex]) {
      visited[newx][newy] = true;
      alphabet[charIndex] = true;
      answer = Math.max(answer, dfs(newx, newy, i + 1));
      visited[newx][newy] = false;
      alphabet[charIndex] = false;
    }
  });
  return answer;
};
const solution = () => {
  visited[0][0] = true;
  alphabet[grid[0][0].charCodeAt() - "A".charCodeAt()] = true;
  return dfs(0, 0, 1);
};

console.log(solution());
