/*
- n : 전체 학생 수 
- lost : 도난당한 학생 번호 배열 
- reserve : 여벌 체육복 가져온 학생 번호 배열 
- 반환값 : 체육수업을 들을 수 있는 학생의 최댓값
*/
/* 고민 로직 
- n+1 크기의 배열 
- 학생 번호에 해당하는 인덱스에 보유한 체육복 수 넣기 
- lost : 0, reserve : 2 나머지 : 1 
*/
function solution(n, lost, reserve) {
  var answer = 0;

  const arr = new Array(n + 1).fill(1);
  arr[0] = 0;
  lost.forEach((v) => {
    arr[v] -= 1;
  });
  reserve.forEach((v) => {
    arr[v] += 1;
  });

  arr.forEach((el, idx) => {
    // 0을 만났을 때 앞에 2면
    if (idx !== 0 && el === 0) {
      if (idx !== 1 && arr[idx - 1] === 2) {
        arr[idx - 1]--;
        arr[idx]++;
      } else if (idx !== arr.length - 1 && arr[idx + 1] === 2) {
        arr[idx + 1]--;
        arr[idx]++;
      }
    }
  });

  answer = arr.filter((v) => v !== 0).length;

  return answer;
}

console.log(solution(5, [2, 4], [3]));
