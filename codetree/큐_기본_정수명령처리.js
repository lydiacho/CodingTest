const MAX = 10000;

class Queue {
  constructor() {
    this.q = new Array(MAX);
    this.head = 0;
    this.tail = 0;
  }
  empty(){
    return this.head === this.tail;
  }
  full() {
    return (this.tail + 1) % MAX === this.head;
  }
  size() {
    return (this.tail - this.head + MAX) % MAX;
  }
  push(v) {
    if (this.full()) throw new Error("Full!");
    this.tail = (this.tail+1) % MAX;
    this.q[this.tail] = v;
  }
  pop() {
    if (this.empty()) throw new Error("Empty!");
    this.head = (this.head + 1) % MAX;
    return this.q[this.head];
  }
  front() {
    if (this.empty()) throw new Error("Empty!");
    return this.q[(this.head+1)%MAX];
  }
}

const fs = require('fs');
const [_, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const q = new Queue();
arr.forEach((v)=> {
  v = v.split(' ');
  switch(v[0]) {
    case 'push':
      q.push(v[1]);
      break;
    case 'front':
      console.log(q.front());
      break;
    case 'size':
      console.log(q.size());
      break;
    case 'empty':
      console.log(q.empty()?1:0);
      break;
    case 'pop':
      console.log(q.pop());
  }
})