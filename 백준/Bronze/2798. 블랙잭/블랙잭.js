const fs = require('fs');
const [input1, input2] = fs.readFileSync(0).toString().trim().split('\n');
const [N, M] = input1.split(' ').map(Number);
const arr = input2.split(' ').map(Number);

const solution = () => {
  let answer;
  let gap = 100000;
  for (let i = 0; i < N-2; i++) {
    for (let j = i+1; j < N-1; j++) {
      for (let k = j+1; k < N; k++) {
        const sum = arr[i] + arr[j] + arr[k]; 
        if (sum <= M && Math.abs(sum - M) < gap) {
          answer = sum;
          gap = Math.abs(sum-M);
        }
      }
    }
  }
  return answer;
}

console.log(solution());