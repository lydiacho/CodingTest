// 장르별로 최다재생 곡 두개 고르기 
// 장르, 노래는 재생 수 내림차순, 고유번호 오름차순 

function solution(genres, plays) {
  // 1. 장르별 분류를 위해 아래와 같은 객체를 만든다.
  // { classic : [[0,500], [2,150], [3,800]], pop : [...] }
  const obj = genres.reduce((acc,curr,i)=>{
      if (!acc[curr]) acc[curr] = [];
      acc[curr].push([i,plays[i]]);
      return acc;
  },{})
  // 2. 객체를 순회하며 각 value배열을 정렬한다. 
  // 정렬 기준 : 재생 수 내림차순, 재생 수 동일할 경우 고유번호 오름차순 
  for (let keys in obj) {
      obj[keys].sort((a,b)=>(b[1]===a[1]) ? a[0]-b[0] : b[1]-a[1]);
  }
  // 3. 객체 values들을 추출해 배열 생성 후, 장르별 총 재생 수에 따라 내림차순 정렬 
  const arr = Object.values(obj).sort((a,b)=>{
      return b.reduce((acc,curr)=>acc+curr[1],0) - a.reduce((acc,curr)=>acc+curr[1],0);
  });
  // 4. 장르별로 두 곡만 추출 후, 반환해야 하는 정답의 형태로 변환 
  return arr.reduce((acc,curr)=>[...acc, ...curr.map(v=>v[0]).splice(0,2)],[]);
}