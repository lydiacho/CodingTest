// - 세변의 길이 보고 직각삼각형인지 판단하기
// - output : 직각삼각형이면 right, 아니면 wrong
// sol : 티셔츠는 각 사이즈별로 개수 / T 의 올림. 펜은 N / P의 내림만큼 묶음, 나머지는 개별 주문

const fs = require("fs");
const [input1, input2, input3] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const 참가자수 = +input1;
const sizes = input2.split(" ").map(Number);
const [티셔츠묶음단위, 펜묶음단위] = input3.split(" ").map(Number);

const solution = () => {
  let ans = "";
  ans +=
    sizes.reduce((acc, curr) => acc + Math.ceil(curr / 티셔츠묶음단위), 0) +
    "\n";

  ans += Math.floor(참가자수 / 펜묶음단위) + " " + (참가자수 % 펜묶음단위);
  return ans;
};

console.log(solution());
