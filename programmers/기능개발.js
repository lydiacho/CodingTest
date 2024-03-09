const solution = (progresses, speeds) => {
  const days = progresses.map((v,idx)=>Math.ceil((100-v)/speeds[idx]));
  const stack = [];
  let max = 0;
  days.forEach((v)=>{
    if (max >= v) {
      stack[stack.length-1]++;
      return
    }
    stack.push(1); 
    max = v;
  })
  return stack;
}