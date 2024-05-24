// 바위들 중 n개를 제거한 후, 각 바위 사위의 거리 중 최솟값 -> 이들 중 최댓값
// distance : 도착점까지의 거리 (1~1,000,000,000)
// rocks : 각 바위 사이의 거리 (길이 1~50,000)
// n : 제거할 바위 개수
// sol : 어떻게 해야 '가장 큰 최솟값' 경우를 만들까? => 최솟값이 가능한 범위의 UpperBound 찾기
// 1~1,000,000,000 중 최솟값 후보를 이분탐색. => 그 중 UpperBound 구하기
function solution(distance, rocks, n) {
  // 이분탐색의 기본은 정렬!
  rocks.sort((a, b) => a - b);
  rocks = [...rocks, distance];
  let left = 0;
  let right = distance;
  let max = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2); // 최소거리 후보
    let point = 0;
    let remove = 0;
    // mid가 최솟값이기 위해 없애야 하는 바위들 없애보기
    rocks.forEach((v, i) => {
      if (v - point < mid) {
        remove++;
      } else {
        point = v;
      }
    });

    if (remove <= n) {
      // 최솟값 후보가 더 커야할 때
      left = mid + 1;
      // 덜 제거했을 경우, 최솟값에 영향 안주는 아무 돌이나 더 제거하면 되기 때문에 가능
      max = Math.max(mid, max);
    } else {
      // 최솟값 후보가 더 작아야할 때
      right = mid - 1;
    }
  }

  return max;
}
