// - 길이가 모두 다른 K개의 랜선으로 같은 길이의 N개의 랜선 만들기
// - N개의 랜선을 만들 수 없는 경우는 없다고 가정.
// - N개보다 많이 만드는 것은 N개를 만드는 것에 포함.
// - 만들 수 있는 최대 랜선 길이 구하기
// ⇒ 길이 다른 K개의 랜선으로 만들 수 있는 mid짜리 랜선 몇개? → 개수 ≥ N

// > 랜선 길이가 mid, 최소는 1, 최대는 가장 "큰" 랜선 길이 (K≤N이지만, 버려지는 랜선이 있을 수 있음)

const fs = require("fs");
const [input, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [기존랜선수, 필요랜선수] = input.split(" ").map(Number);
const 기존랜선길이 = rest.map(Number);

const calCount = (mid) => {
  let count = 0;
  for (let i = 0; i < 기존랜선수; i++) {
    if (기존랜선길이[i] < mid) continue; // 🧨오답 수정하면서 이부분 추가!
    count += Math.floor(기존랜선길이[i] / mid);
  }
  return count;
};

const solution = () => {
  let l = 1;
  let r = Math.max(...기존랜선길이); // 🧨min이 되면 안됨
  let ans;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const res = calCount(mid);
    if (res >= 필요랜선수) {
      ans = mid;
      // 답은 될 수 있지만, 최대 길이를 구하기 위해 최소한으로 줄여봐야 함
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return ans;
};

console.log(solution());
