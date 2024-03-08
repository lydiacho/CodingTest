const solution = (clothes) => {
  const obj = clothes.reduce((acc,curr)=>{
    acc[curr[1]] = (acc[curr[1]]|0)+1
    return acc;
  }, {})
  return Object.values(obj).reduce((acc,curr)=>acc*(curr+1),1)-1;
}