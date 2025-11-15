function getLargestNumber(a, b, c) {
    return a >= b ? (a >= c ? a : c) : (b >= c ? b : c);
}

console.log(getLargestNumber(2, 3, 4));
console.log(getLargestNumber(4, 3, 2));
console.log(getLargestNumber(2, 4, 3));
console.log(getLargestNumber(3, 2, 4));
console.log(getLargestNumber(17, 1, 8));
console.log(getLargestNumber(5, 5, 9));
console.log(getLargestNumber(1, 22, 3));
console.log(getLargestNumber(88, 87, 86));
console.log(getLargestNumber(6, 6, 6));

// 4
// 4
// 4
// 4
// 17
// 9
// 22
// 88
// 6