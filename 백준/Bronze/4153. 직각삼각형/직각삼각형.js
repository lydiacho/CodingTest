// - 세변의 길이 보고 직각삼각형인지 판단하기
// - output : 직각삼각형이면 right, 아니면 wrong

const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");
input.splice(-1, 1);
const arr = input.map((v) => v.split(" ").map(Number));

const solution = () => {
  const answer = arr.map((v) => {
    v.sort((a, b) => a - b);
    if (v[0] * v[0] + v[1] * v[1] === v[2] * v[2]) return "right";
    else return "wrong";
  });

  return answer.join("\n");
};

console.log(solution());
