// 인접한 두 칸 색상 교환 후, 같은 색상 연속되는 부분이 가장 길어지도록
// input : N (3 ≤ N ≤ 50), NxN 보드에 채워진 색상 (C, P, Z, Y)
// output : 최대 연속 색상 길이

// 50x50일 때 모든 인접한 경우의 수를 따진다면? 49*49가지
// 각 케이스에 대해 : 각 열을 돌면서 연속되는 개수 세기.

const fs = require("fs");
const [num, ...arr] = fs.readFileSync(0).toString().trim().split("\n");
const n = +num;
const grid = arr.map((v) => v.split(""));

const findLongest = (temp, result) => {
  let count = 0;
  for (let i = 0; i < n; i++) {
    count = 1;
    let start = temp[i][0];
    for (let j = 1; j < n; j++) {
      if (start === temp[i][j]) count++;
      else {
        result = Math.max(result, count);
        start = temp[i][j];
        count = 1;
      }
    }
    result = Math.max(result, count);
  }
  for (let j = 0; j < n; j++) {
    count = 1;
    let start = temp[0][j];
    for (let i = 1; i < n; i++) {
      if (start === temp[i][j]) count++;
      else {
        result = Math.max(result, count);
        start = temp[i][j];
        count = 1;
      }
    }
    result = Math.max(result, count);
  }

  return result;
};

const solution = (n, grid) => {
  let answer = 0;
  let tempGrid;
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      if (x !== n - 1 && grid[x][y] !== grid[x + 1][y]) {
        tempGrid = grid.map((v) => [...v]);
        [tempGrid[x][y], tempGrid[x + 1][y]] = [
          tempGrid[x + 1][y],
          tempGrid[x][y],
        ];
        answer = findLongest(tempGrid, answer);
      }
      if (y !== n - 1 && grid[x][y] !== grid[x][y + 1]) {
        tempGrid = grid.map((v) => [...v]);
        [tempGrid[x][y], tempGrid[x][y + 1]] = [
          tempGrid[x][y + 1],
          tempGrid[x][y],
        ];
        answer = findLongest(tempGrid, answer);
      }
    }
  }

  return answer;
};

console.log(solution(n, grid));