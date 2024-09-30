// 불 : 매 초마다 동서남북으로 한 칸씩 번짐, 벽에는 불이 붙지 않음
// 상근 : 매 초마다 동서남북으로 한 칸씩 이동 가능
// 상근 : 벽, 불이난 곳, "불이 번질 곳"에 이동 불가능, 불이 번짐과 동시에 다른 칸으로 이동 가능
// 최대한 빨리 빌딩 탈출하기
// input : 테케 수(1~100), 빌딩 지도의 너비w높이h, hxw의 지도grid
// output : 가장 빨리 탈출하는 초 수 or IMPOSSIBLE

// 매 초마다 불의 위치를 나타내는 fire grid 관리
// 현재 위치에서 동서남북 위치 중, 1) 벽이 아니고 2) 불난 곳 아니고 3) 방문한 곳 아니고 4) 불난 곳의 동서남북도 아닌 곳 -> 큐에 push
// 만약 현재 위치가 1) 건물의 모서리이고 2) 빈공간'.'이면 -> 탈출
// 관건 : 불 번지는 것을 어떻게 관리할 것이냐.

class Queue {
  constructor() {
    this.queue;
    this.head;
    this.tail;
  }
  init() {
    this.queue = Array.from({ length: 1000000 }, () => []);
    this.head = 0;
    this.tail = 0;
  }

  push(v) {
    this.queue[this.tail] = v;
    this.tail++;
  }

  pop() {
    const front = this.queue[this.head];
    this.head++;
    return front;
  }

  size() {
    return this.tail - this.head;
  }
}

const fs = require("fs");
const [T, ...rest] = fs.readFileSync(0).toString().trim().split("\n");
let t = +T;

// 메모리 초과 방지
const q = new Queue();
const fireQ = new Queue();

while (t--) {
  q.init();
  fireQ.init();

  const [w, h] = rest
    .splice(0, 1)[0]
    .split(" ")
    .map((v) => +v);
  const grid = rest.splice(0, h).map((v) => v.split(""));

  const solution = () => {
    const visited = Array.from({ length: h }, () =>
      Array.from({ length: w }, () => false)
    );

    // 불 배열 초기화, 첫 위치 push
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (grid[i][j] === "*") {
          fireQ.push([i, j]);
        } else if (grid[i][j] === "@") {
          q.push([i, j]);
          visited[i][j] = true;
        }
      }
    }

    // bfs
    let count = 0;
    const dir = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    while (q.size() > 0) {
      // 불 번짐 => 새로 번진 애들만
      const fireSize = fireQ.size();
      for (let i = 0; i < fireSize; i++) {
        const [x, y] = fireQ.pop(); // 여기 수정
        dir.forEach(([dx, dy]) => {
          if (
            x + dx < 0 ||
            x + dx >= h ||
            y + dy < 0 ||
            y + dy >= w ||
            grid[x + dx][y + dy] === "#" ||
            grid[x + dx][y + dy] === "*"
          )
            return;
          grid[x + dx][y + dy] = "*";
          fireQ.push([x + dx, y + dy]);
        });
      }

      let size = q.size();
      for (let i = 0; i < size; i++) {
        const [nowx, nowy] = q.pop();
        // 종료 조건
        if (nowx === 0 || nowx === h - 1 || nowy === 0 || nowy === w - 1)
          return count + 1;

        dir.forEach(([dx, dy]) => {
          const x = nowx + dx;
          const y = nowy + dy;
          if (x < 0 || x >= h || y < 0 || y >= w) return;
          if (!visited[x][y] && grid[x][y] !== "*" && grid[x][y] !== "#") {
            q.push([x, y]);
            visited[x][y] = true;
          }
        });
      }
      count++;
    }
    return "IMPOSSIBLE";
  };

  console.log(solution());
}
