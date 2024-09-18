// 아홉 난쟁이 중 일곱 난쟁이의 키 합이 100인 조합 찾기
// input : 아홉줄에 걸쳐 난쟁이 키
// output : 일곱 난쟁이 키 오름차순으로 출력하기

const fs = require("fs");
const arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v)
  .sort((a, b) => a - b);

const solution = (arr) => {
  const goal = arr.reduce((acc, curr) => acc + curr, 0) - 100;
  let answer;
  for (let i = arr.length - 1; i > 0; i--) {
    if (arr[i] >= goal) continue;
    // arr[0] ~ arr[i-1] 중 goal - arr[i] 값이 있는지?
    for (let j = 0; j < i; j++) {
      if (arr[j] == goal - arr[i]) {
        answer = [
          ...arr.slice(0, j),
          ...arr.slice(j + 1, i),
          ...arr.slice(i + 1),
        ];
        return answer;
      }
    }
  }
};

solution(arr).forEach((v) => {
  console.log(v);
});
