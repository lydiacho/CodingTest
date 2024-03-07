function solution(nums) {
  const N = nums.length;
  const set = new Set(nums);
  return (set.size >= N/2) ? N/2 : set.size;
}
