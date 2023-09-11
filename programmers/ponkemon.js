// 문제 요약 : N마리의 포켓몬 중 N/2마리를 최대한 다양하게 뽑을 때, 포켓몬 종류 수 return
/* 고민 로직 : 
- 각 포켓몬이 몇마리인지 해시로 정리 {포켓몬 번호 : 수} -> 불필요! 
- 전체 종류 수 구하기 : set 자료구조 사용 (중복X) 
- 전체 종류 수 <= N/2 면, 전체 종류 수가 정답 
- 전체 종류 수 > N/2 면, N/2가 답 
*/

function solution(nums) {
  const set = new Set(nums);
  return set.size > nums.length / 2 ? nums.length / 2 : set.size;
}
