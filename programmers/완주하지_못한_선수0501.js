// 한명을 제외하고 모두 완주
// participant(참여자), completion(완주자)
// 동명이인 있을 수 있음
function solution(participant, completion) {
  participant.sort();
  completion.sort();
  return participant.find(
    (v, i) => i === participant.length - 1 || v !== completion[i]
  );
}
