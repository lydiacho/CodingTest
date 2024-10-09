// 암호 : 서로다른 L개의 알파벳 소문자, 모음 1개 이상, 자음 2개 이상, 알파벳 오름차순 정렬
// 주어진 알파벳으로 위의 암호 규칙을 지키는 암호 가지 수 구하기
// input : L : 암호 자릿수, C : 후보 문자 수
// output : 가능한 암호 종류를 사전순으로 출력

// sol : 자릿수, 모음 수, 자음 수 카운팅하는 변수 필요.
// 모음은 1개이상, L-2개 이하여야 함
// 자음은 2개이상, L-1개 이하여야 함

const fs = require("fs");
const [input1, input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [L, C] = input1.split(" ").map(Number);
const chars = input2.split(" ");

const vowels = new Set(["a", "e", "i", "o", "u"]);

let numCount = 0;
let vowelsCount = 0;
let consonantsCount = 0;
let answer = [];

const dfs = (i) => {
  // 종료 조건
  if (numCount === L) {
    console.log(answer.join(""));
    return;
  }
  if (i === C) return;

  // 현재 알파벳을 추가한다
  if (vowels.has(chars[i])) {
    if (vowelsCount < L - 2) {
      numCount++;
      answer.push(chars[i]);
      vowelsCount++;
      dfs(i + 1);
      vowelsCount--;
      numCount--;
      answer.pop();
    }
  } else {
    if (consonantsCount < L - 1) {
      numCount++;
      answer.push(chars[i]);
      consonantsCount++;
      dfs(i + 1);
      consonantsCount--;
      numCount--;
      answer.pop();
    }
  }
  // 현재 알파벳을 추가 안한다
  dfs(i + 1);
};

const solution = () => {
  // 일단 input으로 받은 알파벳 사전순으로 정렬
  chars.sort();
  dfs(0);
};

solution();
