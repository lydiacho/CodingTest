function solution(citations) {
  const n = citations.length;
  citations.sort((a,b)=>a-b);

  const temp = citations.findIndex((v,i)=> v<n-i && citations[i+1]>n-(i+1));
  return citations.find((v,i)=>v===n-i) || (temp===-1) ? Math.min(citations[0],n) : n-1-temp ;
}