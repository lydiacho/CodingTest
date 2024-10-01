// 건물 전체 층 수 : F, 회사는 G층, 현재 S층
// 한번에 이동 가능한 선택지 : +U층, -D층
// S층에서 G층으로 가려면 최소 몇번 이동해야 하는지? -> BFS
// input : F S G U D
// output : 최소 이동 수 or "use the stairs"

const fs = require("fs");
const [f, s, g, u, d] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const solution = () => {
  // 큐, 방문배열 생성
  const q = [];
  const visited = new Array(f + 1).fill(false);

  let count = 0;
  const dir = [u, -d];

  // 시작 노드 추가
  q.push(s);
  visited[s] = true;

  while (q.length > 0) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const pos = q.shift();

      // 종료조건
      if (pos === g) {
        return count;
      }

      dir.forEach((v) => {
        if (pos + v < 1 || pos + v > f) return;
        if (!visited[pos + v]) {
          q.push(pos + v);
          visited[pos + v] = true;
        }
      });
    }
    count++;
  }
  return "use the stairs";
};

console.log(solution());