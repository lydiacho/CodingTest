const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");
let [N, M] = input.shift().toString().split(" ").map(Number);

function getParent(parent, x) {
  if (parent[x] === x) return x;
  return (parent[x] = getParent(parent, parent[x]));
}
function unionParent(parent, a, b) {
  a = getParent(parent, a);
  b = getParent(parent, b);
  if (a < b) parent[b] = a;
  else parent[a] = b;
}
function findParent(parent, a, b) {
  a = getParent(parent, a);
  b = getParent(parent, b);
  if (a === b) return 1;
  return 0;
}

function solution(N, M) {
  let parent = [];
  for (let i = 0; i < N; i++) {
    parent[i] = i;
  }

  for (let i = 0; i < M; i++) {
    let [a, b] = input[i]
      .toString()
      .split(" ")
      .map((el) => parseInt(el, 10));
    if (findParent(parent, a, b)) {
      return i + 1;
    }
    unionParent(parent, a, b);
  }
  return 0;
}

console.log(solution(N, M));
