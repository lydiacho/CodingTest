// - 부모자식 1촌, 부모자식 관계 보고 두 사람의 촌수 계산하기
// - input : 사람 수 N, 촌수 계산할 두 사람 번호(1~), 부모자식 관계 M개 (부모,자식)
// - output : 촌수, 친척이 아닐 경우 -1
// ⇒ 부모자식을 양방향 간선으로, 시작정점부터 상대 사람까지의 차수 구하기.

const fs = require("fs");
const [input1, input2, input3, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [n, [man1, man2], m] = [+input1, input2.split(" ").map(Number), +input3];
const relationships = rest.map((v) => v.split(" ").map(Number));
const adj = Array.from({ length: n + 1 }, () => []);
const visited = Array.from({ length: n + 1 }, () => false);

const solution = () => {
  relationships.map(([부모, 자식]) => {
    adj[부모].push(자식);
    adj[자식].push(부모);
  });
  const q = [];
  let head = 0;

  q.push(man1);
  visited[man1] = true;

  let count = 0;

  while (head < q.length) {
    let size = q.length - head; // 🧨
    for (let i = 0; i < size; i++) {
      const curr = q[head];
      head++;

      if (curr === man2) return count;

      adj[curr].map((v) => {
        if (visited[v]) return;
        q.push(v);
        visited[v] = true;
      });
    }
    count++;
  }
  return -1;
};

console.log(solution());
