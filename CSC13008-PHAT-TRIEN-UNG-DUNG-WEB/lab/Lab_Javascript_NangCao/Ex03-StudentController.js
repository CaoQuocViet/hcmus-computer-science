var random = require('./Ex02-Random');

var Ex03_StudentController = {};

Ex03_StudentController.generate = (students) => {
    for (let student of students) {
        for (let subject of student.subjects) {
            subject.score = random.random(0, 10);
        }
    }
}

Ex03_StudentController.average = (students) => {
    for (let student of students) {
        let total = 0;
        let count = 0;
        for (let subject of student.subjects) {
            total += subject.score;
            count++;
        }
        student.average = total / count;
    }
}

Ex03_StudentController.normalize = (students) => {
    for (let student of students) {
        for (let subject of student.subjects) {
            subject.score = parseFloat(subject.score.toFixed(2));
        }   
        if (student.average) {
            student.average = parseFloat(student.average.toFixed(2));
        }
    }
}

module.exports = Ex03_StudentController;
