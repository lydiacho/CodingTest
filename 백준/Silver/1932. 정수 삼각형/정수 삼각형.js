// 정수 삼각형 꼭대기에서 좌대각선, 우각선으로 내려오며 합이 최대가 되는 경로 구하기
// 삼각형 크기 1~500, 삼각형 이루는 정수 0~9999
// sol : 다익스트라로 풀 수 없을까?

const fs = require("fs");
const [N, ...input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const n = +N;
const triangle = input.map((v) => v.split(" ").map(Number));

const dist = Array.from({ length: n }, (_, i) =>
  Array.from({ length: i + 1 }, () => -1)
);

const solution = () => {
  dist[0][0] = triangle[0][0];
  // 사이드는 계산 고정
  for (let i = 1; i < n; i++) {
    dist[i][0] = dist[i - 1][0] + triangle[i][0];
    dist[i][i] = dist[i - 1][i - 1] + triangle[i][i];
  }
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < i; j++) {
      dist[i][j] =
        triangle[i][j] + Math.max(dist[i - 1][j], dist[i - 1][j - 1]);
    }
  }
  return Math.max(...dist[n - 1]);
};
console.log(solution());
