function get30FisrtFibonacci() {
    let fibonacci = [0, 1];
    for (let i = 2; i < 30; i++) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
    }
    return fibonacci;
}
console.log(get30FisrtFibonacci());

// [
//       0,      1,      1,      2,      3,
//       5,      8,     13,     21,     34,
//      55,     89,    144,    233,    377,
//     610,    987,   1597,   2584,   4181,
//    6765,  10946,  17711,  28657,  46368,
//   75025, 121393, 196418, 317811, 514229
// ]