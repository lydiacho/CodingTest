const fs = require('fs');
let N = +fs.readFileSync(0).toString().trim();

const solution = () => {
  const BT = (idx, str) => {
    // 나쁜 수열인지 체크
    for (let i = 1; i <= idx / 2; i++) {
      if (str.slice(idx - i, idx) === str.slice(idx - i * 2, idx - i)) return;
    }    

    // 종료 조건 
    if (idx === N) {
      console.log(str);
      process.exit(0);
    }
    
    BT(idx + 1, str + '1');
    BT(idx + 1, str + '2');
    BT(idx + 1, str + '3');
  }

  BT(0, '');

}
solution();