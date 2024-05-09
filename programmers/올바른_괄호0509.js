// 스택으로 구현 
function solution(s){
  const st = [];
  for (let i=0; i<s.length; i++) {
      switch(s[i]) {
          case '(': 
              st.push(s[i]);
              break;
          case ')':
              if (st.length===0) return false;
              st.pop();
      }
  }
  return (st.length===0) ? true : false;
}