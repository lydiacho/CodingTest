// 길이 N짜리 자연수 수열
// 연속된 수의 부분합이 S이상이 되는 것 중, 가장 길이가 짧은 수열 구하기
// output : 최소 길이, 해당하는 답이 없으면 0
// 🧨오답이유 : 연속된 수를 봐야하므로 정렬하면 안됨!
// sol : 투포인터로 누적합 배열에서 범위 줄여나가기
// 🧨 투포인터를 양끝이 아닌, 한쪽 끝에서 같이 시작해서 구간을 늘리고, 줄이자!

const fs = require("fs");
const [input1, input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [n, s] = input1.split(" ").map(Number);
const nums = input2.split(" ").map(Number);

const solution = () => {
  // 구간합 배열 만들기
  const sumArr = Array.from({ length: n + 1 }, () => 0); // 길이 n+1로
  for (let i = 0; i < n; i++) {
    sumArr[i + 1] = sumArr[i] + nums[i];
  }
  // 오름차순 배열(sumArr)에서 가장 가까운 두 요소의 차이를 구했을 때 s이상이어야 함
  if (sumArr[n] < s) return 0; // 불가능한 경우 얼리리턴
  if (nums.some((v) => v >= s)) return 1;
  let l = 0;
  let r = 1;
  let ans = n;

  while (l < r && r <= n) {
    if (sumArr[r] - sumArr[l] === s) {
      ans = Math.min(ans, r - l);
    } else if (sumArr[r] - sumArr[l] > s) {
      l++;
      if (sumArr[r] - sumArr[l] < s) ans = Math.min(ans, r - l + 1);
      else continue;
    }
    r++;
  }
  return ans;
};

console.log(solution());
