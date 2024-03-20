function solution(sizes) {
  const [min,max] = sizes.reduce(([a,b],curr)=>[Math.max(a, Math.min(...curr)),Math.max(b, Math.max(...curr))],[0,0]);
  return min * max;
}