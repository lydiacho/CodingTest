// 한 번호가 다른 번호의 접두어인 경우
// 그런 경우 있으면 flase, 없으면 true 반환
function solution(phone_book) {
  phone_book.sort();
  return !phone_book.some(
    (v, i) => phone_book[i + 1] && v === phone_book[i + 1].slice(0, v.length)
  );
}
