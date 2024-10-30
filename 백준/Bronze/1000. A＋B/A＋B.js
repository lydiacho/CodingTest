const fs = require('fs');
const [N, M] = fs.readFileSync(0).toString().trim().split(' ').map(Number);

console.log(N+M);