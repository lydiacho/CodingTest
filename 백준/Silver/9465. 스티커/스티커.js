// 스티커 2xN
// 뗀 스티커의 왼쪽, 오른쪽, 위, 아래에 있는 스티커는 사용할 수 없게 됨
// 스티커 점수의 합이 최대가 되게 떼기
// -> 점수의 합이 최대가 되면서 서로 변을 공유 하지 않는 스티커 집합

// input : 테케 수 t, 칼럼 수 n, 스티커 점수
// output : 가능한 점수 최댓값

// 6칸(2x3) 안에서 만들어질 수 있는 경우의 수 :
// (0,0)+(1,1)+(0,2)
// (1,0)+(0,1)+(1,2)
// (0,0)+(1,2)
// (1,0)+(0,2)
// 맨 왼쪽 여섯칸부터 시작해서 더해가기

const fs = require("fs");
const [T, ...rest] = fs.readFileSync(0).toString().trim().split("\n");

let t = +T;
while (t--) {
  const n = +rest.splice(0, 1)[0];
  const arr = rest.splice(0, 2).map((v) => v.split(" ").map((w) => +w));

  const solution = () => {
    // c열까지의 합을 기록할 배열 만들기
    const record = Array.from({ length: 2 }, () =>
      Array.from({ length: n }, () => -1)
    );

    // 2열까지는 고정적인 값 기록
    [record[0][0], record[1][0]] = [arr[0][0], arr[1][0]];
    [record[0][1], record[1][1]] = [
      record[1][0] + arr[0][1],
      record[0][0] + arr[1][1],
    ];

    // 일반화
    // record[0][c] = Math.max(record[0][c-2], record[1][c-1]) + arr[0][c];
    // record[1][c] = Math.max(record[1][c-2], record[0][c-1]) + arr[1][c];

    for (let c = 2; c < n; c++) {
      record[0][c] = Math.max(record[1][c - 2], record[1][c - 1]) + arr[0][c];
      record[1][c] = Math.max(record[0][c - 2], record[0][c - 1]) + arr[1][c];
    }

    return Math.max(record[0][n - 1], record[1][n - 1]);
  };

  console.log(solution());
}