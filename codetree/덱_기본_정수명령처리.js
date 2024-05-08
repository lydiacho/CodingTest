const MAX = 10000;

class Dequeue {
  constructor() {
    this.dq = new Array(MAX).fill(0);
    this.head = 0;
    this.tail = 0;
  }
  pushFront(v) {
    if (this.full()) throw new Error("Full!");
    this.head = (this.head - 1 + MAX) % MAX;
    this.dq[this.head] = v;
  }
  pushBack(v) {
    if (this.full()) throw new Error("Full!");
    this.dq[this.tail] = v;
    this.tail = (this.tail + 1) % MAX;
  }
  popFront() {
    if (this.empty()) throw new Error("Empty!");
    const value = this.dq[this.head];
    this.head = (this.head + 1) % MAX;
    return value;
  }
  popBack() {
    if (this.empty()) throw new Error("Empty!");
    this.tail = (this.tail - 1 + MAX) % MAX;
    return this.dq[this.tail];
  }
  size() {
    return (this.tail - this.head + MAX) % MAX;
  }
  empty() {
    return this.head === this.tail;
  }
  full() {
    return (this.tail + 1) % MAX === this.head;
  }
  front() {
    if (this.empty()) throw new Error("Empty!");
    return this.dq[this.head];
  }
  back() {
    if (this.empty()) throw new Error("Empty!");
    return this.dq[(this.tail-1 + MAX) % MAX];
  }
}

const fs = require('fs');
const [_, ...arr] = fs.readFileSync(0).toString().trim().split("\n");

const dq = new Dequeue();
arr.forEach(v=>{
  v = v.split(' ')
  switch(v[0]) {
    case 'push_front' : 
      dq.pushFront(v[1]);
      break;
    case 'push_back' :
      dq.pushBack(v[1]);
      break;
    case 'pop_front' :
      console.log(dq.popFront());
      break;
    case 'pop_back' :
      console.log(dq.popBack());
      break;
    case 'size' :
      console.log(dq.size());
      break;
    case 'empty' :
      console.log(dq.empty()?1:0);
      break;
    case 'front' :
      console.log(dq.front());
      break;
    case 'back' :
      console.log(dq.back());
  }
})