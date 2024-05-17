// 논문 n편 중 h번 이상 인용된 논문이 h편 이상. h의 최댓값 
// 내림차순 정렬한 배열에서, v - (idx+1) 가 양수에서 0이하가 되는 지점 찾기 
function solution(citations) {
  citations.sort((a,b)=>b-a);
  for (let i = 0; i < citations.length; i++) {
      if (citations[i] < i+1) return i;
  }
  return citations.length;
}