const compareFn = (a,b) => {
  if (`${a}`.length === `${b}`.length) {  // 둘의 자릿수가 같을 때
    return b-a;
  } 
  return +(`${b}${a}`)-(`${a}${b}`)
}
const solution = (numbers) => {
  numbers.sort(compareFn);
  return numbers[0]===0 ? '0' : numbers.reduce((acc,cur,idx)=>acc+=cur, "");
}