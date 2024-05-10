// 연속되는 숫자 하나만 남기고 제거, but 순서 유지하기 
function solution (arr) {
  return arr.filter((v,i)=>v!==arr[i+1]);
}