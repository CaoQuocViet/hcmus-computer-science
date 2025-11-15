function average(arr) {
    if (arr.length === 0) return 0;

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    function printArray(a) {
        for (let i = 0; i < a.length; i++) {
            console.log(a[i]);
        }
    }

    console.log("The average of");
    printArray(arr);
    console.log("is:", sum / arr.length);

    return sum / arr.length;
}

average([0]);
average([1, 2, 3]);
average([1, 2, 3, 4]);
average([1, 4, 4, 4, 1]);
average([-12, -13, 512, 1337]);

// The average of
// 0
// is: 0
// The average of
// 1
// 2
// 3
// is: 2
// The average of
// 1
// 2
// 3
// 4
// is: 2.5
// The average of
// 1
// 4
// 4
// 4
// 1
// is: 2.8
// The average of
// -12
// -13
// 512
// 1337
// is: 456