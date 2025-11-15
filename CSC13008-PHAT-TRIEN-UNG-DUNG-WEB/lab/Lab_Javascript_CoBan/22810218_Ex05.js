// var student = {
//     first_name:,
//     last_name:,
//     age:,
//     height:,
//     full_name: function() {
//         return this.first_name + " " + this.last_name;
//     }
// };

var students = [
    {first_name: "John", last_name: "Doe", age: 11, height: 180},
    {first_name: "Jane", last_name: "Smith", age: 22, height: 165},
    {first_name: "Emily", last_name: "Johnson", age: 19, height: 170},
    {first_name: "Michael", last_name: "Brown", age: 21, height: 175},
    {first_name: "Sarah", last_name: "Davis", age: 23, height: 160},
    {first_name: "David", last_name: "Wilson", age: 20, height: 180},
    {first_name: "Laura", last_name: "Garcia", age: 12, height: 165},
    {first_name: "Daniel", last_name: "Martinez", age: 13, height: 170},
    {first_name: "Sophia", last_name: "Anderson", age: 15, height: 175},
    {first_name: "James", last_name: "Taylor", age: 17, height: 160},
    {first_name: "Olivia", last_name: "Thomas", age: 16, height: 180},
    {first_name: "Benjamin", last_name: "Hernandez", age: 18, height: 165},
    {first_name: "Isabella", last_name: "Moore", age: 24, height: 170},
    {first_name: "Lucas", last_name: "Martin", age: 12, height: 175},
    {first_name: "Mia", last_name: "Jackson", age: 16, height: 160}
];

function sortstudentsByAge(students) {
    return students.sort((a, b) => a.age - b.age);
}

function printstudents(students) {
    for (let i = 0; i < students.length; i++) {
        console.log(
            `Name: ${students[i].first_name} ${students[i].last_name}, Age: ${students[i].age}, Height: ${students[i].height}`
        );
    }
}

var sortedstudents = sortstudentsByAge(students);
printstudents(sortedstudents);


// Name: John Doe, Age: 11, Height: 180
// Name: Laura Garcia, Age: 12, Height: 165
// Name: Lucas Martin, Age: 12, Height: 175
// Name: Daniel Martinez, Age: 13, Height: 170
// Name: Sophia Anderson, Age: 15, Height: 175
// Name: Olivia Thomas, Age: 16, Height: 180
// Name: Mia Jackson, Age: 16, Height: 160
// Name: James Taylor, Age: 17, Height: 160
// Name: Benjamin Hernandez, Age: 18, Height: 165
// Name: Emily Johnson, Age: 19, Height: 170
// Name: David Wilson, Age: 20, Height: 180
// Name: Michael Brown, Age: 21, Height: 175
// Name: Jane Smith, Age: 22, Height: 165
// Name: Sarah Davis, Age: 23, Height: 160
// Name: Isabella Moore, Age: 24, Height: 170