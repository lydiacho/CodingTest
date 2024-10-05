// JS) 문자->아스키코드 : str.charCodeAt(i)
// 아스키->문자 : String.fromCharCode(val)
const fs = require("fs");
const [N, ...rest] = fs.readFileSync(0).toString().trim().split("\n");
const nodes = rest.map((v) => v.split(" "));
const parent = new Array(26).fill(-1); // A~Z -> 0~25
const children = Array.from({ length: 26 }, () => [-1, -1]);

const preorder = (node) => {
  // V - L - R
  let result = "";
  result += String.fromCharCode(node + "A".charCodeAt());
  const [left, right] = children[node];
  if (left !== -1) result += preorder(left);
  if (right !== -1) result += preorder(right);
  return result;
};

const midorder = (node) => {
  // L - V - R
  const [left, right] = children[node];
  let result = "";

  if (left !== -1) result += midorder(left);
  result += String.fromCharCode(node + "A".charCodeAt());
  if (right !== -1) result += midorder(right);
  return result;
};

const postorder = (node) => {
  // L - R - V
  let result = "";
  const [left, right] = children[node];
  if (left !== -1) result += postorder(left);
  if (right !== -1) result += postorder(right);
  result += String.fromCharCode(node + "A".charCodeAt());
  return result;
};

const solution = () => {
  // 트리 만들기
  nodes.map((val) => {
    const [v, l, r] = val.map((char) => char.charCodeAt() - "A".charCodeAt());
    if (l >= 0) {
      parent[l] = v;
      children[v][0] = l;
    }
    if (r >= 0) {
      parent[r] = v;
      children[v][1] = r;
    }
  });

  // 순회하기
  console.log(preorder(0));
  console.log(midorder(0));
  console.log(postorder(0));
};
solution();
