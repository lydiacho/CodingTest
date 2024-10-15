// 두 용액을 혼합한 용액의 특성값 : 각 용액의 특성값의 합
// 혼합해서 특성값이 0에 가장 가까운 용액 만들기
// input : 용액의 특성값이 정렬되어 제공 (특성값 절대값 <= 10억)
// output : 혼합 시 가장 0에 가깝게 만드는 두 용액의 특성값 오름차순 출력

const fs = require("fs");
const [input1, input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const n = +input1;
const arr = input2.split(" ").map(Number);

const solution = () => {
  let l = 0;
  let r = n - 1;
  let res = 2000000001;
  let ans = [];
  while (l < r) {
    const sum = arr[l] + arr[r];
    if (Math.abs(sum) < res) {
      res = Math.abs(sum);
      ans = [arr[l], arr[r]];
    }
    if (sum === 0) {
      return [arr[l], arr[r]].join(" ");
    }
    if (sum > 0) r--;
    if (sum < 0) l++;
  }
  return ans.join(" ");
};

console.log(solution());
