// 베스트 장르 순 -> 장르 내 베스트 노래 -> 동점 노래 중 번호 낮은 순 
// { 장르: [[번호, 횟수],... ]}
const calculateSum = (arr) => {
    return arr.reduce((acc,curr)=>acc+=curr[1],0)
}
function solution(genres, plays) {
    const obj = genres.reduce((acc,curr,idx)=>{
       if (acc[curr]) {
           acc[curr].push([idx,plays[idx]])
       } else {
           acc[curr] = [[idx, plays[idx]]]
       }
        return acc
    },{})
    return Object.values(obj).sort((a,b)=>calculateSum(b) -calculateSum(a)).map(v=>v.sort((a,b)=>b[1] - a[1]).map(v=>v[0]).slice(0,2)).reduce((acc,curr)=>acc.concat(curr),[])
}