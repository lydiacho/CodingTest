// - DFS 탐색결과와 BFS 탐색 결과 출력하기
// - 방문 가능한 정점이 여러개일 땐 번호 작은 것부터 방문
// - input : 정점N개, 간선M개, 탐색시작번호 V, 간선 정보(양방향)

const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [n, m, v] = input1.split(" ").map(Number);
const edges = rest.map((v) => v.split(" ").map(Number));

const adj = Array.from({ length: n + 1 }, () => []);
const visited = Array.from({ length: n + 1 }, () => false);
const dfsArr = [];
const bfsArr = [];

const bfs = (i) => {
  const q = [];
  let head = 0;
  q.push(i);
  visited[i] = true;
  bfsArr.push(i);

  while (head < q.length) {
    const curr = q[head];
    head++;

    adj[curr].map((v) => {
      if (visited[v]) return;
      q.push(v);
      visited[v] = true;
      bfsArr.push(v);
    });
  }
};
const dfs = (i) => {
  visited[i] = true;
  dfsArr.push(i);

  adj[i].map((v) => {
    if (visited[v]) return;
    dfs(v);
  });
};
const solution = () => {
  // 인접리스트 업데이트 & 오름차순 정렬
  edges.map(([u, v]) => {
    adj[u].push(v);
    adj[v].push(u);
  });
  adj.map((v) => {
    v.sort((a, b) => a - b);
  });

  dfs(v);
  visited.fill(false);
  bfs(v);

  return [dfsArr.join(" "), bfsArr.join(" ")].join("\n");
};

console.log(solution());
