function solution(operations) {
    let answer = [];
   operations.forEach((v) => {
        const [inst, num] = v.split(' ');
       if (inst === 'I')
           answer.push(parseInt(num));
       else if (inst === 'D') {
            if (answer.length===0) return;
            if (num == 1) answer.splice(answer.indexOf(Math.max(...answer)), 1);
            else if (num == -1) answer.splice(answer.indexOf(Math.min(...answer)), 1);
       }
    })
   return answer.length===0 ? [0,0] : [Math.max(...answer), Math.min(...answer)];
}