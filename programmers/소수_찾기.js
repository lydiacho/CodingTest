// 소수 판별 함수 
function isPrime(number) {
  if (number <= 1) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
}

function solution(numbers) {
  const 숫자_배열 = numbers.split("").map(v=>Number(v));
  let 소수_개수 = 0;
  const 숫자_개수 = numbers.length;
  const 방문_체크 = new Array(숫자_개수).fill(false);
  const 검사중인_숫자 = new Array(숫자_개수).fill(0);
  const 완성된_숫자 = new Set();
  

  function DFS(검사중인_자리, 검사숫자_길이) {
    if (검사중인_자리 === 검사숫자_길이) {
      const 완성_숫자 = +(검사중인_숫자.slice(0, 검사숫자_길이).join(""));
      if (완성_숫자 !== 0 && !완성된_숫자.has(완성_숫자) && isPrime(완성_숫자)) {
        완성된_숫자.add(완성_숫자);
        소수_개수++;
      }
    } else {
      for (let i = 0; i < 숫자_개수; i++) {
        if (!방문_체크[i]) {
          방문_체크[i] = true;
          검사중인_숫자[검사중인_자리] = 숫자_배열[i];
          DFS(검사중인_자리 + 1, 검사숫자_길이);
          방문_체크[i] = false;
        }
      }
    }

  }

  for (let i = 1; i <= 숫자_개수; i++) {
    DFS(0, i);
  }

  return 소수_개수;

}

console.log(solution("011")) //2