// - 정육면체로 이루어진 건물에서, 인접한 칸으로만 이동 가능(6향), 금은 못지나감. 한칸 이동하는 데에 1분. 건물 탈출하는 데 최소 몇 분?
// - input : 층수L, 행수R, 열수C, (금# 빈칸. 시작지점S. 탈출구E)
// ⇒ 3차원 BFS, 목표지점까지 깊이 구하기!
// - 미로 순회하면서 visited 배열 초기화하고, 시작/끝지점 기록해야 함

const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const dir = [
  [0, 0, 1],
  [0, 0, -1],
  [0, 1, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
];

const bfs = () => {
  let [L, R, C] = input.splice(0, 1)[0].split(" ").map(Number);
  let 시작지점, 끝지점;
  const visited = Array.from({ length: L }, () => []);
  let 층 = 0;
  while (층 < L) {
    const 한층 = input.splice(0, R).map((v) => v.split(""));
    visited[층] = 한층.map((w, 행idx) =>
      w.map((v, 열idx) => {
        if (v === "#") return true;
        if (v === "S") 시작지점 = [층, 행idx, 열idx];
        if (v === "E") 끝지점 = [층, 행idx, 열idx];
        return false;
      })
    );
    층++;
    input.splice(0, 1);
  }

  // 방문 배열 생성 완료. Bfs 시작

  const q = [];
  let head = 0;

  q.push(시작지점);
  const [시작층, 시작행, 시작열] = 시작지점;
  visited[시작층][시작행][시작열] = true;

  let count = 0;
  while (q.length > head) {
    let size = q.length - head;
    for (let i = 0; i < size; i++) {
      const [층, 행, 열] = q[head];
      head++;

      if (층 === 끝지점[0] && 행 === 끝지점[1] && 열 === 끝지점[2]) {
        return `Escaped in ${count} minute(s).`;
      }

      dir.map(([dx, dy, dz]) => {
        const [새층, 새행, 새열] = [층 + dz, 행 + dx, 열 + dy];
        if (
          새층 < 0 ||
          새층 >= L ||
          새행 < 0 ||
          새행 >= R ||
          새열 < 0 ||
          새열 >= C
        )
          return;
        if (visited[새층][새행][새열]) return;
        q.push([새층, 새행, 새열]);
        visited[새층][새행][새열] = true;
      });
    }
    count++;
  }
  return "Trapped!";
};

const solution = () => {
  const answer = [];
  while (input[0] !== "0 0 0") {
    answer.push(bfs());
  }
  return answer.join("\n");
};
console.log(solution());
