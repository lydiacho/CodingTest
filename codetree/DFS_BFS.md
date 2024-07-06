# DFS

### 그래프 탐색

- 그래프 : 정점과 간선으로 이루어진 자료구조
- 인접 행렬, 인접 리스트로 구현할 수 있음

- 인접 행렬 : 두 정점 i, j가 연결관계에 있다면 graph[i][j]를 1로, 아니면 0으로 정의

  - 양방향 그래프라면 인접 행렬은 대각선 기준 대칭, 단방향이면 X
  - 정점의 수를 V, 간선의 수를 E라 했을 때 인접 행렬의 공간복잡도는 O(V^2)

- 인접 리스트 : V개의 동적 배열 관리. i번째 정점에 해당하는 동적 배열 graph[i]에 정점 i에 연결된 모든 정점 번호가 들어감

  - V개의 동적 배열을 관리하는 리스트 1개, 각 간선별로 정점이 2개씩 각각 추가되므로 O(V+E)

- DFS = 깊이 우선 탐색 : 특정 정점에서 시작하여 갈 수 있는 곳까지 따라 들어갔다가 더이상 갈 곳이 없으면 빠져나오는 방식
  (갈 수 있는 정점이 여러개일 때, 번호가 작은 정점부터 방문)

- 그래프 탐색 알고리즘의 2가지 대원칙

  - 시작점으로부터 연결된 모든 정점을 전부 방문해야 함
  - 이미 방문한 정점은 다시 방문하지 않음

- DFS 로직 (인접행렬ver)

  - **⚠️DFS는 재귀함수로 작성함!**
  - DFS함수의 인자 : 현재 위치 (vertex)
  - 현재 위치를 기준으로, 모든 정점을 순회하며 "연결된 정점"을 탐색함
  - 연결된 정점을 찾으면, 해당 정점을 방문한 적이 있는지 확인.
    - 정점 개수 크기의 visited 배열로 관리 (다음 DFS 호출하기 전에 visited true 처리)

  ```js
  function dfs(vertex) {
    for (let currV = 1; currV <= VERTICES_NUM; currV++) {
      if (graph[vertex][currV] === 1 && !visited(currV)) {
        console.log(currV);
        visited[currV] = true;
        dfs(currV);
      }
    }
  }
  ```

- DFS 로직 (인접리스트ver)

  - **⚠️DFS는 재귀함수로 작성함!**
  - graph라는 1차원 배열 : graph[i]는 i번째 정점에 연결돼있는 정점 목록
  - graph[현재위치] 원소 순회 : 연결된 정점이 graph[현재위치] 안에 리스트 형태로 들어가있음
  - graph[현재위치][i]가 visited인지 확인

  ```js
  const VERTICES_NUM = 7;
  const EDGES_NUM = 6;

  const graph = new Array(VERTICES_NUM + 1).fill(null).map(() => []);
  const visited = new Arra(VERCIES_NUM + 1).fill(false);

  function DFS(vertex) {
    for (let i = 0; i < graph(vertex).length; i++) {
      const currV = graph[vertex][i];
      if (!visited[currV]) {
        console.log(currV);
        visited[currV] = true;
        DFS(currV);
      }
    }
  }

  for (let i = 1; i <= VERTICES_NUM; i++) {
    graph[i] = [];
  }
  const startPoints = [1, 1, 1, 2, 4, 6];
  const endPoints = [2, 3, 4, 5, 6, 7];

  for (let i = 0; i < EDGES_NUM; i++) {
    const start = startPoints[i];
    const end = endPoints[i];

    graph[start].push(end);
    graph[end].push(start);
  }

  const rootVertex = 1;
  console.log(rootVertex);
  visited[rootVertex] = true;
  DFS(rootVertex);
  ```

#### 기본문제 - 그래프 탐식

```js
const fs = require("fs");
const [input, ...temp] = fs.readFileSync(0).toString().trim().split("\n");
const [n, m] = input.split(" ").map((v) => +v);

const graph = new Array(n + 1).fill(null).map(() => []);
const visited = new Array(n + 1).fill(false);
const arr = temp.map((v) => v.split(" ").map((w) => +w));

function DFS(vertex) {
  // 현재위치와 연결된 정점을 순회
  for (let i = 0; i < graph[vertex].length; i++) {
    const currV = graph[vertex][i];
    if (!visited[currV]) {
      visited[currV] = true;
      DFS(currV);
    }
  }
}

for (let i = 1; i <= n; i++) {
  graph[i] = [];
}

for (let i = 0; i < m; i++) {
  const [start, end] = arr[i];

  graph[start].push(end);
  graph[end].push(start);
}

visited[1] = true;
DFS(1);
visited[1] = false;
console.log(visited.filter((v) => v).length);
```

### 두 방향 탈출 가능 여부 판별하기

- 2차원 격자에서 특정 지점부터 갈 수 있는 모든 지점을 방문하는 DFS
- 단, 좌측 상단에서 시작하고 아래, 오른쪽으로만 이동 가능, 뱀(장애물)위치로 이동 불가능
- 두 방향 중 아래쪽을 우선적으로 탐색한다고 가정하기

- 2차원 격자 문제에서는 그래프를 표현하기 위해 인접 행렬/인접 리스트를 만들 필요 없음
- 현재위치를 표시하기 위해 하나의 vertex 값이 아닌, 좌표 (x,y)의 두가지 값이 필요함
- visited 배열도 2차원이어야 함

- DFS 함수에서 현재 위치로부터

  - 갈 수 있는 곳을 모두 탐색 후 (dx, dy 테크닉 활용하기)
  - 갈 수 있는 곳이 있다면, 방문 체크 후
  - 재귀함수로 다시 호출

- dx, dy 테크닉이란?

  - 특정 방향으로 이동 가능한 경우 사용
  - 각 방향에 맞는 x좌표의 차를 dx에 y좌표의 차를 dy
  - ex) 아래, 오른쪽으로만 이동 가능 : dx=[1,0], dy=[0,1]

- (x,y)가 범위 내인지 체크하는 함수

```js
function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < m;
}
```

- (x,y)가 갈 수 있는 곳인지 체크하는 함수

```js
function canGo(x, y) {
  if (!inRange(x, y)) return false;
  // 방문해봤던 곳이거나, 못가는 길일 때
  if (visited[x][y] == 1 || grid[x][y] == 0) return false;
  return true;
}
```

```js
// 5x5 그리드 방문하면서 방문 순서 입력하는 예제

const grid = [
    ~
];
const answer = Array.from(Array(5), ()=>Array(5).fill(0));
const visited = Array.from(Array(5), ()=>Array(5).fill(0));
let order = 1;

// function inRange
// function canGo

function DFS(x,y) {
    const dx = [1,0];
    const dy = [0,1];

    for (let i = 0; i < 2; i++) {
        const newX = x + dx[i];
        const newY = y + dy[i];
        if (canGo(newX, newY)) {
            answer[newX][newY] = order++;
            visited[newX][newY] = 1;
            DFS(newX, newY);
        }
    }
}

answer[0][0] = order++;
visited[0][0] = 1;
DFS(0,0);
```

- visited 처리 재귀함수 진입 시에 해도 되지만, BFS에서는 무조건 재귀 함수 호출 직전에 해야 하므로, 해당 패턴으로 DFS BFS 통일하는게 편함

#### 기본문제 - 그리드 상에서의 DFS 탐색

```js
const fs = require("fs");
const [input, ...temp] = fs.readFileSync(0).toString().trim().split("\n");
const [n, m] = input.split(" ").map((v) => +v);

const grid = temp.map((v) => v.split(" ").map((w) => +w));

const visited = Array.from(Array(n), () => Array(m).fill(0));

function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < m;
}

function canGo(x, y) {
  if (!inRange(x, y)) return false;
  // 방문해봤던 곳이거나, 못가는 길일 때
  if (visited[x][y] == 1 || grid[x][y] == 0) return false;
  return true;
}

function DFS(x, y) {
  const dx = [1, 0];
  const dy = [0, 1];

  for (let i = 0; i < 2; i++) {
    const newX = x + dx[i];
    const newY = y + dy[i];
    if (canGo(newX, newY)) {
      visited[newX][newY] = 1;
      DFS(newX, newY);
    }
  }
}

visited[0][0] = 1;
DFS(0, 0);
console.log(visited[n - 1][m - 1] === 1 ? 1 : 0);
```

### 연습문제 - 마을 구분하기

```js
const fs = require("fs");
const [m, ...temp] = fs.readFileSync(0).toString().trim().split("\n");
const n = +m;

const grid = temp.map((v) => v.split(" ").map((w) => +w));

const visited = Array.from(Array(n), () => Array(n).fill(0));

let count = 0;
const answer = [];

function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < n;
}

function canGo(x, y) {
  if (!inRange(x, y)) return false;
  if (visited[x][y] === 1 || grid[x][y] === 0) return false;
  return true;
}

function DFS(x, y) {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  for (let i = 0; i < 4; i++) {
    const newX = x + dx[i];
    const newY = y + dy[i];
    if (canGo(newX, newY)) {
      visited[newX][newY] = 1;
      count++;
      DFS(newX, newY);
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (canGo(i, j)) {
      visited[i][j] = 1;
      count = 1;
      DFS(i, j);
      answer.push(count);
    }
  }
}

answer.sort((a, b) => a - b);
console.log(answer.length);
answer.forEach((v) => console.log(v));
```

### 테스트 - 뿌요뿌요

```js
const fs = require("fs");
const [m, ...input] = fs.readFileSync(0).toString().trim().split("\n");
const n = +m;
const grid = input.map((el) => el.split(" ").map((v) => +v));
const visited = Array.from({ length: n }, () => Array(n).fill(false));

let max = 0,
  count = 0,
  size = 0;

function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < n;
}

function canGo(x, y, color) {
  if (!inRange(x, y)) return false;
  if (visited[x][y] || grid[x][y] !== color) return false;
  return true;
}

function dfs(x, y) {
  const dx = [0, 1, 0, -1],
    dy = [1, 0, -1, 0];

  for (let dir = 0; dir < dx.length; dir++) {
    const newX = x + dx[dir],
      newY = y + dy[dir];

    if (canGo(newX, newY, grid[x][y])) {
      visited[newX][newY] = true;
      size++;
      dfs(newX, newY);
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visited[i][j] && grid[i][j]) {
      // 새로운 블럭 카운트 시작
      visited[i][j] = true;
      size = 1;
      dfs(i, j);

      if (size >= 4) {
        count++;
      }
      max = Math.max(max, size);
    }
  }
}

console.log(count, max);
```

---

# BFS

- BFS

  - 너비 우선 탐색
  - 시작점을 기준으로 가장 가까운 곳부터 순서대로 탐색을 진행하는 방식

- 인접행렬을 이용한 구현

  - graph라는 2차원 배열 만들기
  - 두 정점 연결 여부에 따라 1혹은 0

- **BFS는 꼭 재귀함수 없이 큐 자료구조를 이용해야 함**

```js
class Queue {
  constructor() {
    // 빈 큐 하나를 생성합니다.
    this.q = [];
    this.head = -1; // head는 큐의 가장 첫 원소의 위치 바로 앞을 가리킵니다.
    this.tail = -1; // tail은 큐의 가장 마지막 원소의 위치를 가리킵니다.
  }

  push(item) {
    // 큐의 맨 뒤에 데이터를 추가합니다.
    this.q.push(item);
    this.tail++;
  }

  empty() {
    // 큐가 비어있으면 true를 반환합니다.
    return this.head === this.tail;
  }

  size() {
    // 큐에 들어있는 데이터 수를 반환합니다.
    return this.tail - this.head;
  }

  pop() {
    // 큐의 맨 앞에 있는 데이터를 반환하고 제거합니다.
    if (this.empty()) {
      throw new Error("Queue is empty");
    }
    return this.q[++this.head];
  }

  front() {
    // 큐의 맨 앞에 있는 데이터를 제거하지 않고 반환합니다.
    if (this.empty()) {
      throw new Error("Queue is empty");
    }
    return this.q[this.head + 1];
  }
}
```

- DFS : 새로 방문하게 되는 위치가 생기면 해당 위치를 DFS함수의 인자로 넘기며 재귀함수를 호출해 탐색을 재개
- BFS : queue를 이용해 지금까지 방문한 노드들을 관리

  - 새로 방문하게 되는 노드를 queue에 계속 넣어줌
  - queue가 empty 상태가 되기 전까지 queue에서 가장 앞에 있는 원소를 pop
  - pop한 원소(currV)를 현재 원소의 위치로 설정
  - 현재 위치를 기준으로 연결된 정점(nextV)을 탐색하기 위해서는 1번부터 정점의 개수인 VERTICES_NUM까지 포문
  - graph[currV][nextV] 값이 1이면서 nextV 정점에 방문했던 적이 없는 지를 확인

  ```js
  function BFS() {
      white(!q.empty()) {
          let currV = q.pop();

          for (let nexV = 1; nextV <= VERTICES_NUM; nextV++) {
              if (graph[currV][nextV]===1 && !visited(nextV)) {
                  console.log(nextV);
                  visited[nextV] = true;
                  q.push(nextV);
              }
          }
      }
  }
  ```

  > 쉽게 말하면, 현재 방문 노드를 pop해서 가져오고, 모든 노드를 순회하면서 현재 노드와 연결되고 + 아직 방문하지 않은 노드를 찾아서 거기로 이동

- 그래프 탐색 알고리즘의 2가지 대원칙
  1. 시작점으로부터 연결된 모든 정점을 전부 방문해야 함
  2. 이미 방문한 정점은 다시 방문하지 않는다

## BFS 탐색

### 네 방향 탈출 가능 여부 판별하기

```js
const fs = require("fs");
const [temp, ...input] = fs.readFileSync(0).toString().trim().split("\n");
const [n, m] = temp.split(" ").map((v) => +v);
const grid = input.map((el) => el.split(" ").map((v) => +v));
const visited = Array.from(Array(n), () => Array(m).fill(false));

class Queue {
  constructor() {
    this.q = [];
    this.head = -1;
    this.tail = -1;
  }

  push(item) {
    this.q.push(item);
    this.tail++;
  }

  empty() {
    return this.head === this.tail;
  }

  size() {
    return this.tail - this.head;
  }

  pop() {
    if (this.empty()) {
      throw new Error("Queue is empty");
    }
    return this.q[++this.head];
  }

  front() {
    if (this.empty()) {
      throw new Error("Queue is empty");
    }
    return this.q[this.head + 1];
  }
}

function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < m;
}

function canGo(x, y) {
  return inRange(x, y) && grid[x][y] && !visited[x][y];
}

function bfs() {
  while (q.size() > 0) {
    const [x, y] = q.pop();

    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    for (let i = 0; i < 4; i++) {
      const newX = x + dx[i];
      const newY = y + dy[i];

      if (canGo(newX, newY)) {
        q.push([newX, newY]);
        visited[newX][newY] = true;
      }
    }
  }
}

const q = new Queue();
q.push([0, 0]);
visited[0][0] = true;

bfs();

console.log(visited[n - 1][m - 1] ? 1 : 0);
```

### 연습문제 - 갈 수 있는 곳들

```js
const fs = require("fs");
const [temp, ...input] = fs.readFileSync(0).toString().trim().split("\n");

const [n, k] = temp.split(" ").map((v) => +v);
const grid = input.slice(0, n).map((el) => el.split(" ").map((v) => +v));
const visited = Array.from(Array(n), () => Array(n).fill(false));

class Queue {
  constructor() {
    this.q = [];
    this.head = -1;
    this.tail = -1;
  }

  push(item) {
    this.q.push(item);
    this.tail++;
  }

  empty() {
    return this.head === this.tail;
  }

  size() {
    return this.tail - this.head;
  }

  pop() {
    if (this.empty()) {
      throw new Error("Queue is empty");
    }
    return this.q[++this.head];
  }

  front() {
    if (this.empty()) {
      throw new Error("Queue is empty");
    }
    return this.q[this.head + 1];
  }
}

function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < n;
}

function canGo(x, y) {
  return inRange(x, y) && !grid[x][y] && !visited[x][y];
}

function bfs() {
  while (q.size() > 0) {
    const [x, y] = q.pop();

    const dx = [1, -1, 0, 0],
      dy = [0, 0, 1, -1];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (canGo(nx, ny)) {
        q.push([nx, ny]);
        visited[nx][ny] = true;
      }
    }
  }
}

const q = new Queue();

input.slice(n).forEach((el) => {
  const [x, y] = el.split(" ").map((v) => +v);
  q.push([x - 1, y - 1]);
  visited[x - 1][y - 1] = true;
});

bfs();

let ans = 0;
for (let i = 0; i < n; i++)
  for (let j = 0; j < n; j++) if (visited[i][j]) ans++;

console.log(ans);
```

### 테스트 - 우리는 하나

## 가중치가 동일한 그래프에서의 BFS

### 최소 경로로 탈출하기

```js
const fs = require("fs");
const [temp, ...input] = fs.readFileSync(0).toString().trim().split("\n");
const [n, m] = temp.split(" ").map((v) => +v);
const grid = input.map((el) => el.split(" ").map((v) => +v));

class Queue {
  constructor() {
    this.q = [];
    this.head = -1;
    this.tail = -1;
  }

  push(item) {
    this.q.push(item);
    this.tail++;
  }

  empty() {
    return this.head === this.tail;
  }

  size() {
    return this.tail - this.head;
  }

  pop() {
    if (this.empty()) {
      throw new Error("Queue is empty");
    }
    return this.q[++this.head];
  }

  front() {
    if (this.empty()) {
      throw new Error("Queue is empty");
    }
    return this.q[this.head + 1];
  }
}

function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < m;
}

function canGo(x, y) {
  return inRange(x, y) && grid[x][y] && !visited[x][y];
}

function push(newX, newY, newStep) {
  q.push([newX, newY]);
  visited[newX][newY] = true;
  step[newX][newY] = newStep;
}

function findMin() {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  while (!q.empty()) {
    const [x, y] = q.pop();

    for (let i = 0; i < dx.length; i++) {
      const newX = x + dx[i],
        newY = y + dy[i];

      if (canGo(newX, newY)) {
        push(newX, newY, step[x][y] + 1);
      }
    }
  }

  if (visited[n - 1][m - 1]) {
    ans = step[n - 1][m - 1];
  }
}

const q = new Queue();
const visited = Array.from(Array(n), () => Array(m).fill(false));
const step = Array.from(Array(n), () => Array(m).fill(0));

let ans = Number.MAX_SAFE_INTEGER;

push(0, 0, 0);
findMin();
console.log(ans === Number.MAX_SAFE_INTEGER ? -1 : ans);
```

### 연습문제 - 나이트

```js
const fs = require("fs");
const [m, input] = fs.readFileSync(0).toString().trim().split("\n");
const n = +m;
const [r1, c1, r2, c2] = input.split(" ").map((v) => +v - 1);

class Queue {
  constructor() {
    this.q = [];
    this.head = -1;
    this.tail = -1;
  }

  push(item) {
    this.q.push(item);
    this.tail++;
  }

  empty() {
    return this.head === this.tail;
  }

  size() {
    return this.tail - this.head;
  }

  pop() {
    if (this.empty()) {
      throw new Error("Queue is empty");
    }
    return this.q[++this.head];
  }

  front() {
    if (this.empty()) {
      throw new Error("Queue is empty");
    }
    return this.q[this.head + 1];
  }
}

function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < n;
}

function canGo(x, y) {
  return inRange(x, y) && !visited[x][y];
}

function push(nx, ny, newStep) {
  q.push([nx, ny]);
  visited[nx][ny] = true;
  step[nx][ny] = newStep;
}

function findMin() {
  while (!q.empty()) {
    const [x, y] = q.pop();

    const dx = [-2, -2, -1, -1, 1, 1, 2, 2];
    const dy = [-1, 1, -2, 2, -2, 2, -1, 1];

    for (let i = 0; i < dx.length; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (canGo(nx, ny)) {
        push(nx, ny, step[x][y] + 1);
      }
    }
  }

  if (visited[r2][c2]) {
    ans = step[r2][c2];
  }
}

const q = new Queue();
const visited = Array.from(Array(n), () => Array(n).fill(false));
const step = Array.from(Array(n), () => Array(n).fill(0));

let ans = Number.MAX_SAFE_INTEGER;

push(r1, c1, 0);
findMin();
console.log(ans === Number.MAX_SAFE_INTEGER ? -1 : ans);
```

### 테스트 - 상한 귤
