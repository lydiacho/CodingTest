// 물이 새는 곳들을 길이 L짜리 테이프 몇개로 모두 막을 수 있을지 (좌우 0.5이상 막아야함)
// input : 물이 새는 곳 개수 N, 테이프 길이 L, 물이 새는 곳 좌표들 (N, L, 물이 새는 곳 <=1000 )
// 앞에서부터 그냥 최대한 막아야함 (테이프 개수 카운팅, 테이프 끝난 지점 체크 필요)
// 첫번째 테이프 pos1-0.5 = 0.5부터 붙임 -> 끝지점은 0.5+L. pos2+0.5가 범위 안에 드는지 체크.
// 🧨 pos 값을 별도로 정렬해줘야함. greedy에서는 항상 정렬 주의!

const fs = require("fs");
const [input1, input2] = fs.readFileSync(0).toString().trim().split("\n");
const [n, l] = input1.split(" ").map((v) => +v);
const pos = input2.split(" ").map((v) => +v);

const solution = (l, pos) => {
  let count = 0;
  let taped = 0; // 테이프가 끝난 위치
  // pos 순회하면서 테이프 개수 세기
  pos.sort((a, b) => a - b);
  pos.forEach((v) => {
    // 현재 테이프 범위에 포함되면 pass
    if (v + 0.5 <= taped) return;
    // 테이프 새로 붙이기
    taped = v - 0.5 + l;
    count++;
  });
  return count;
};

console.log(solution(l, pos));
