const fs = require('fs');
const [n, ...rest] = fs.readFileSync(0).toString().trim().split('\n');

const solution =  () => {
    return rest.map(v=>v.split(',').map(Number).reduce((acc,curr)=>acc+curr,0)).join('\n');
}
console.log(solution());