// N마리 중 N/2마리 가져가기
// 가질 수 있는 종류 개수의 최댓값
// 해결책 : 폰켓몬의 종류가 N/2이상이면, N/2가 답이고, 미만이면 종류 수가 답
function solution(nums) {
  const set = new Set(nums);
  return set.size >= nums.length / 2 ? nums.length / 2 : set.size;
}
