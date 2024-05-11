// // 나머지 배열에서 나보다 작은 값이 있으면, 걔와의 index 차이 
// 정확성은 다 맞았지만, 효율성은 모두 틀린 코드 
const notSolution = (prices) => prices.map((v,i) => {
    const temp = prices.slice(i+1).findIndex((val)=>{
        return val < v
    });
    return temp === -1 ? prices.length-1-i : temp+1;
});
// 효율성까지 모두 맞은 코드 
const solution = (prices) => {
  const answer = new Array(prices.length);
  for (let i=0; i<prices.length; i++) {
      let count = 0;
      for (let j=i+1; j<prices.length; j++) {
          count++;
          if (prices[j] < prices[i]) break;
      }
      answer[i] = count;
  }
  return answer;
}