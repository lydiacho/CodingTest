const fs = require("fs");
const N = +fs
  .readFileSync(0)
  .toString()
  .trim();

let answer = 0;
const queens = [];

const check = (x, y) => {
  for (let i = 0; i < queens.length; i++) {
    const [queenx, queeny] = queens[i];
    if (queenx === x || queeny === y) return false;
    if (Math.abs(queenx - x) === Math.abs(queeny - y)) return false;
  }
  return true;
}
const dfs = (row) => {
  if (row === N) {
    answer++;
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!check(row, i)) continue;
    queens.push([row, i]); // 넣
    dfs(row + 1);
    queens.pop(); // 뺌 (백트래킹)
  }
}


const solution = () => { 
  dfs(0);
  return answer;
};

console.log(solution());