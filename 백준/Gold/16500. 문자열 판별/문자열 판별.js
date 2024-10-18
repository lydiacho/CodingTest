const fs = require("fs");
const [str, input2, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const mem = Array.from({ length: str.length }, () => 0);
const 단어set = new Set(rest);

const solution = () => {
  for (let i = str.length - 1; i >= 0; i--) {
    // 부분문자열 계산을 재귀 말고 여기서 바로
    for (let j = i + 1; j < str.length; j++) {
      if (mem[j] === 1) {
        if (단어set.has(str.slice(i, j))) {
          mem[i] = 1;
        }
      }
    }
    if (단어set.has(str.slice(i))) {
      mem[i] = 1;
    }
  }

  return mem[0];
};

console.log(solution());