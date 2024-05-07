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

const fs = require('fs');
const [n, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const st = new Stack();
arr.forEach((v)=>{
  switch(v.split(' ')[0]) {
      case 'push':
          st.push(v.split(' ')[1]);
          break;
      case 'pop':
          console.log(st.pop());
          break;
      case 'size':
          console.log(st.size());
          break;
      case 'empty':
          console.log(st.empty()?1:0);
          break;
      case 'top':
          console.log(st.top());
  }
})