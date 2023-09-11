// 문제 요약 : 완주하지 못한 한명의 이름 반환 (주의, 동명이인 있을 수 있음)
/* 고민 로직 : 
- 주의 : set 자료구조 쓰려고 했으나, 동명이인 이슈로 사용 불가. array 써야함 
- completion을 순회하면서 
  - participant에서 삭제 : participant.splice(participant.indexOf("value"),1) 
*/

// 효율성 떄문에 실패 -> completion을 다 순회하면 안됨 -> participant 순회하면서 없으면 바로 종료?
// function solution(participant, completion) {
//   completion.forEach((v) => {
//     participant.splice(participant.indexOf(v), 1);
//   });
//   return participant[0];
// }

// 효율성 해결책 : 정렬 후 같은 index의 이름이 달라지는 순간 return
function solution(participant, completion) {
  participant.sort();
  completion.sort();

  for (let i = 0; i < participant.length; i++) {
    if (participant[i] === completion[i]) continue;
    return participant[i];
  }

  return;
}
