// - 일직선으로 놓인 N개의 집에 공유기 C개 설치. 가장 인접한 공유기 사이 거리가 최대가 되도록.
// - 정해진 좌표 중 C개의 점을 선택했을 때, 최소 거리가 최대가 되어야함
// - 가장 인접 거리가 mid일 때, 최소는 가장 작은 집 간격, 최대는 집간거리 총합
// - 가장 인접 거리가 mid일 때, 설치 가능한 공유기 수 구해서 → 개수 ≥ C

const fs = require("fs");
const [input, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [집수, 공유기수] = input.split(" ").map(Number);
const 집좌표 = rest.map(Number);
const 집간거리 = [];

const calCount = (mid) => {
  let count = 1; // 첫 공유기 먼저 설치하고
  let dist = 0;
  집간거리.map((v) => {
    dist += v;
    if (dist < mid) return;
    count++;
    dist = 0;
  });
  return count;
};

const solution = () => {
  // 집 간 거리 배열 만들기
  집좌표.sort((a, b) => a - b);
  for (let i = 1; i < 집수; i++) {
    집간거리.push(집좌표[i] - 집좌표[i - 1]);
  }
  let l = Math.min(...집간거리);
  let r = 집간거리.reduce((acc, curr) => acc + curr, 0);
  let ans;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const res = calCount(mid);
    if (res >= 공유기수) {
      // 답이 될 수 있지만, 가장 인접 거리를 더 최대화
      ans = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return ans;
};

console.log(solution());
