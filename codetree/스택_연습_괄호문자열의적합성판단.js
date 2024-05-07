const fs = require('fs');
const input = fs.readFileSync("/dev/stdin").toString();

class Stack {
  constructor() {
      this.stack = [];
  }
  empty() {
      return this.stack.length === 0;
  }
  size() {
      return this.stack.length;
  }
  push(value) {
      this.stack.push(value);
  }
  pop() {
      if (this.empty()) return;
      return this.stack.pop();
  }
  top() {
      if (this.empty()) return;
      return this.stack[this.stack.length-1];
  }
}

const st = new Stack();
let i = 0;
while(i < input.length) {
    if(input[i]==='(') {
        st.push(input[i]);
    }
    else {
        if (st.empty()) {
            console.log('No'); 
            return;
        }
        else st.pop();
    }
    i++;
}
console.log(st.empty()?'Yes':'No');