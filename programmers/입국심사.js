// 비어있는 심사대 or 더 빨리 끝날 예정인 심사대 모두 갈 수 있음
// 이분탐색을 통해 가능한 구간 중 최솟값 찾기
// LowerBound
function solution(n, times) {
  let low = 1;
  let high = 1000000000 * n;
  let min = 1000000000 * n + 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    const temp = times.reduce((acc, curr) => acc + Math.floor(mid / curr), 0);
    if (temp < n) {
      low = mid + 1;
    } else {
      high = mid - 1;
      min = Math.min(min, mid);
    }
  }
  return min;
}
