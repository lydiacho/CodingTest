const MAX = 5000;
class Queue {
    constructor() {
        this.q = Array(MAX).fill(0);
        this.head =0;
        this.tail =0;
    }
    empty() {
        return this.head === this.tail;
    }
    full() {
        return (this.tail+1) % MAX === this.head;
    }
    push(v) {
        if (this.full()) throw new Error("Full!");
        this.tail = (this.tail+1) % MAX;
        this.q[this.tail] = v;
    }
    pop() {
        if (this.empty()) throw new Error("Empty!");
        this.head = (this.head+1) % MAX;
        return this.q[this.head];
    }
    front() {
        if (this.empty()) throw new Error("Empty!");
        return this.q[(this.head+1) % MAX];
    }
}

let answer = '';
const fs = require('fs');
const [n, k] = fs.readFileSync(0).toString().trim().split(" ").map(v=>+v);
const queue = new Queue();

for (i=1; i<=n; i++) {
    queue.push(i);
}

while(!queue.empty()) {
    let count = k-1;
    while(count--) {
        const temp = queue.pop();
        queue.push(temp);
    }
    answer += `${queue.pop()} `;
}

console.log(answer);