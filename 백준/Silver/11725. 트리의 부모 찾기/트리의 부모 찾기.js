// 루트 없는 트리, 트리의 루트를 1이라고 할 때, 각 노드의 부모 구하기
// input : 노드의 개수 n, 트리상에서 연결된 두 정점 n-1개
// output : 2번 노드부터 각 노드의 부모 노드 번호

// sol : 양방향 그래프의 인접 리스트 만들고, 1부터 순휘하면서 parents 배열 채우기

const fs = require("fs");
const [n, ...arr] = fs.readFileSync(0).toString().trim().split("\n");
const nodes = arr.map((v) => v.split(" ").map(Number));
const adj = Array.from({ length: +n + 1 }, () => []);
const parents = Array.from({ length: +n + 1 }, () => -1);
parents[1] = 0; // 루트노드

const makeTree = (i) => {
  adj[i].map((v) => {
    if (parents[v] !== -1) return; // 이미 부모가 앞에서 정해진 노드
    parents[v] = i;
    makeTree(v);
  });
};
const solution = () => {
  nodes.map(([v, w]) => {
    adj[v].push(w);
    adj[w].push(v);
  });
  makeTree(1);
  const answer = parents.slice(2);
  answer.map((v) => {
    console.log(v);
  });
};

solution();
