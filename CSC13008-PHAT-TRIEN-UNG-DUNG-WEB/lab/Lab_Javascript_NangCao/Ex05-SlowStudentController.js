var slowRandom = require('./Ex04-SlowRandom');

var Ex05_SlowStudentController = {};

Ex05_SlowStudentController.generate = async (students) => {
    for (let student of students) {
        for (let subject of student.subjects) {
            subject.score = await slowRandom.randomPromise(0, 10);
        }
    }
}

Ex05_SlowStudentController.average = (students) => {
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

Ex05_SlowStudentController.normalize = (students) => {
    for (let student of students) {
        for (let subject of student.subjects) {
            subject.score = parseFloat(subject.score.toFixed(2));
        }   
        if (student.average) {
            student.average = parseFloat(student.average.toFixed(2));
        }
    }
}

module.exports = Ex05_SlowStudentController;