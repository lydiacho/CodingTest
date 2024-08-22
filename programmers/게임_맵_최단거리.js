// queue class를 만들지 않는게 더 빨랐음

function solution(maps) {
  return BFS(maps);
}

function BFS(maps) {
  const N = maps.length;
  const M = maps[0].length;
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const q = [];

  // 시작지점 방문 표시
  q.push([0, 0, 1]);
  maps[0][0] = 0;

  while (q.length > 0) {
    const [x, y, sum] = q.shift();

    if (x === N - 1 && y === M - 1) {
      return sum;
    }

    dirs.forEach((dir) => {
      if (
        x + dir[0] >= 0 &&
        x + dir[0] < N &&
        y + dir[1] >= 0 &&
        y + dir[1] < M &&
        maps[x + dir[0]][y + dir[1]] !== 0
      ) {
        q.push([x + dir[0], y + dir[1], sum + 1]);
        maps[x + dir[0]][y + dir[1]] = 0;
      }
    });
  }

  return -1;
}
