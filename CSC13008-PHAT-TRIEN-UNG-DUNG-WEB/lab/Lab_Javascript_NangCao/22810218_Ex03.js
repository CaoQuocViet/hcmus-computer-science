var Ex03_StudentController = require('./Ex03-StudentController');
var students = require('./22810218_Ex01').students;

var studentsClone = JSON.parse(JSON.stringify(students));

Ex03_StudentController.generate(studentsClone);
Ex03_StudentController.average(studentsClone);
Ex03_StudentController.normalize(studentsClone);

function displayResults(students) {
    console.log("\n=== KẾT QUẢ ===");
    students.forEach(student => {
        let scores = student.subjects.map(s => s.score).join(', ');
        console.log(`${student.id} - ${student.name}: Điểm TB = ${student.average}`);
        console.log(`  Điểm các môn: [${scores}]`);
    });
}

displayResults(studentsClone);
    