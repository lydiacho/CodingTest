const solution = (s) => {
  let length = 0;
  for (v of s) {
    (v==='(') ? length++ : length--;
    if(length<0) return false;
  }
  return !length;
}