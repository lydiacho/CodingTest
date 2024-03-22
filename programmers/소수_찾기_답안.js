function solution(numbers) {
    let 소수_개수 = 0;
    const 숫자_배열 = numbers.split("");
    const 숫자_개수 = 숫자_배열.length;
    const 각숫자_사용여부 = Array.from({ length: 숫자_개수 }, () => 0);
    let 검사중인_숫자 = Array.from({ length: 숫자_개수 }, () => 0);
    const 완성된_소수_모음 = new Set();

    function isPrime(number) {  // 소수인지 판별하는 함수 
        if (number <= 1) {
            return false;
        }
        for (let i = 2; i <= Math.sqrt(number); i++) {  // 루트(숫자)까지 약수가 있는지 검사 
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }

    function DFS(검사중인_자리, 숫자_길이) {    // 각 자릿수 검사 
        if (검사중인_자리 === 숫자_길이) {  // 원하는 숫자 길이만큼 숫자가 완성되었으면 
            const num = parseInt(검사중인_숫자.slice(0, 숫자_길이).join(""));
            if (num !== 0 && !완성된_소수_모음.has(num) && isPrime(num)) {
                완성된_소수_모음.add(num);
                소수_개수++
            }
        } else {
            for (let i = 0 ; i < 숫자_개수 ; i++) { // 모든 숫자를 순회하면서 
                if (각숫자_사용여부[i] === 0) { // 아직 해당 숫자를 사용하지 않았으면 
                    각숫자_사용여부[i] = 1; // 사용했다는 표시를 하고 
                    검사중인_숫자[검사중인_자리] = 숫자_배열[i] // 해당 숫자를 만들고있는 숫자에 넣어주기 
                    DFS(검사중인_자리 + 1, 숫자_길이);  // 다음자릿수 검사 호출 
                    각숫자_사용여부[i] = 0; // 해당 숫자 사용 완료 표시 
                }
            }
        }
    }

    for (let 숫자_길이 = 1; 숫자_길이 <= 숫자_개수 ; 숫자_길이++) {        
        DFS(0, 숫자_길이);
    }

    return 소수_개수;
}

console.log(solution("011")) //2