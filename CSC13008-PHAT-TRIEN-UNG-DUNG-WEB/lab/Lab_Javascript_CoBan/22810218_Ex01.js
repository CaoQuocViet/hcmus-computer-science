var age = 10                            // Number
var name = "Jane"                       // String
var full_name = {first: "Jane", last: "Doe"} // Object
var truth = false                       // Boolean
var sheets = ["HTML", "CSS", "JS"]      // Array
var a ; typeof(a)                           // Undefined
var a = null;                           // Null

if((age >= 14) && (age <= 19)) {
    status = "Eligible";
} else {
    status = "Not Eligible";
}

switch (new Date().getDay()) {
    case 6:
        text = "Saturday";
        break;
    case 0:
        text = "Sunday";
        break;
    dèault:
        text = "Whatever";
}

var sum = 0;
var a = [1, 2, 3, 4, 5];
for (var i = 0; i < a.length; i++) {
    sum += a[i];
}
console.log("Sum: " + sum);

var i = 1;
while (i < 100) {
    i *= 2;
    console.log(i + " ");
}

var i = 1;
do {
    i *=2;
    console.log(i + " ");
} while (i < 100);

function addNumbers(num1, num2) {
    return num1 + num2;
}
x = addNumbers(5, 10);
console.log(x);

var student = {
    first_name: "John",
    last_name: "Doe",
    age: 20,
    height: 180,
    full_name: function() {
        return this.first_name + " " + this.last_name;
    }
};
student.age = 21;
student[age] += 1;
student[age]++;
name = student.full_name();
console.log(student.full_name());

var points = [40, 100, 1, 5, 25, 10, 60, 90, 15];
points.sort(function(a, b){return a-b}); // Sort points in ascending order
console.log(points);

// Sum: 15
// 2 
// 4
// 8
// 16
// 32
// 64
// 128
// 2
// 4
// 8
// 16
// 32
// 64
// 128
// 15
// John Doe
// [
//    1,  5, 10,  15, 25,
//   40, 60, 90, 100
// ]