const fs = require("fs");
const [input1, _, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const N = +input1;
const link = rest.map((v) => v.split(" ").map(Number));

// 1번이포함되어있는 컴포넌트의 크기 구하기

const solution = () => {
  const visited = Array.from({ length: N + 1 }, () => false);
  const adj = Array.from({ length: N + 1 }, () => []);
  link.forEach(([v, w]) => {
    adj[v].push(w);
    adj[w].push(v);
  });

  const dfs = (i) => {
    let count = 1;
    visited[i] = true;

    adj[i].forEach((v) => {
      if (visited[v]) return;
      count += dfs(v);
    });
    return count;
  };

  return dfs(1) - 1;
};

console.log(solution());
