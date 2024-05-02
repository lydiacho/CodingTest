// 매일 다른 조합으로 옷 입어야 함
// 종류별로 0~1가지만 착용 가능 
// 최소 한개 이상 입음 
// 서로 다른 옷의 조합 수 return 
// 각 종류별로 선택할 수 잇는 가지수는 length+1 (안골랐을 때 포함)
// 각 종류 가지수를 곱하고 -1 (모두 안골랐을 때. 즉 0개 입었을 때 경우 제외)
function solution(clothes) {
  const arr = {};
  clothes.sort((a,b)=>a[1]-b[1]);
  clothes.forEach((v,i)=>{
      if (Object.keys(arr).includes(v[1])) {
          arr[v[1]]++;
          return;
      }
      arr[v[1]] = 1;
  });
  return Object.values(arr).reduce((acc,curr)=>acc*(curr+1), 1)-1;
}