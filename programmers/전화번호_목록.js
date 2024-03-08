const solution = (phone_book) => {
  phone_book.sort();
  return !phone_book.some((check,idx)=> phone_book[idx+1] && phone_book[idx+1].slice(0,check.length)===check)
}