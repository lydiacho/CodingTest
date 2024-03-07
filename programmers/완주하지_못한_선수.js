function solution(participant, completion) {
  participant.sort();
  completion.sort();
  for (let i = 0; i < participant.length ; i++) {
    if (participant[i] === completion[i] ) continue;
    return participant[i];
  }
}

// 모범 답안
// var solution = (participant,completion) => { 
//   completion.map(name => completion[name] = (completion[name]|0)+1); 
//   return participant.find((name) => !completion[name]--); 
// }; 