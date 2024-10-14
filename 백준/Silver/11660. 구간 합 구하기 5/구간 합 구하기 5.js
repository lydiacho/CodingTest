// NxN 표에서 (x1,y1)~(x2,y2)까지 구간합 구하기
// 🧨M(연산횟수)가 엄청 크기 때문에 매번 합을 새로이 구하면 안된다. => 구간합 표를 만들어놓기

const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [n, m] = input1.split(" ").map(Number);
const table = rest.splice(0, n).map((v) => v.split(" ").map(Number));
const operations = rest.map((v) => v.split(" ").map(Number));

const solution = () => {
  const answer = [];
  const sumTable = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => 0)
  ); //🧨 N+1, N+1로 만들면 모서리 계산하기 편하다!

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      sumTable[i][j] =
        sumTable[i][j - 1] +
        sumTable[i - 1][j] -
        sumTable[i - 1][j - 1] +
        table[i - 1][j - 1];
    }
  }

  // M회 연산하기
  operations.map(([x1, y1, x2, y2]) => {
    answer.push(
      sumTable[x2][y2] -
        sumTable[x1 - 1][y2] -
        sumTable[x2][y1 - 1] +
        sumTable[x1 - 1][y1 - 1]
    );
  });

  return answer.join("\n");
};

console.log(solution());
