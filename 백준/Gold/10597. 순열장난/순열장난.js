// - 1~N까지의 수 & 공백으로 구분된 순열 → 공백이 지워진 상태에서 순열 복구하기
// - 1~N까지 채워나가야 하는데, 앞에서부터 숫자를 한개씩 자르고, 만약 불가능한 경우가 되면 백트래킹
// - 순열의 개수는 1~50개이므로, N의 범위는 1~50.
// - 가능한 숫자 범위 : 한자리수 1~9, 두자리 수 중 10~50
const fs = require('fs');
let input = fs.readFileSync(0).toString().trim();

const solution = () => {
  const BT = (idx, arr) => {
    // 종료조건
    if (idx === input.length) {
      // 만족조건 : 1~N까지의 수로만 이루어져있어야 함 
      if (arr.some(v => v > arr.length)) return;
      console.log(arr.join(' '));
      process.exit(0);
    }
    // 불가능한 경우 : str[idx]가 0일 때 
    if (+input[idx] === 0) {
      return;
    }

    // 두개 자를 경우 10~50
    if (idx < input.length - 1 && +input[idx] < 5 || (+input[idx] === 5 && +input[idx + 1] === 0)) {
      const temp = +input[idx] * 10 + +input[idx + 1];
      if (!new Set(arr).has(temp)) { // 🧨 중복 요소 안됨 
        BT(idx + 2, [...arr, temp]);
      }
    }
    // 하나만 자를 경우 1~9 🧨 중복 요소 안됨 
    if (!new Set(arr).has(+input[idx])) {
      BT(idx + 1, [...arr, +input[idx]]);
    }
  }
  
  BT(0, []); 

}
solution();