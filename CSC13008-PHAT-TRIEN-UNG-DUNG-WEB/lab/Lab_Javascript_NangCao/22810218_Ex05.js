var Ex05_SlowStudentController = require('./Ex05-SlowStudentController');
var students = require('./22810218_Ex01').students;

var studentsClone = JSON.parse(JSON.stringify(students));

(async () => {
    await Ex05_SlowStudentController.generate(studentsClone);
    Ex05_SlowStudentController.average(studentsClone);
    Ex05_SlowStudentController.normalize(studentsClone);
    
    studentsClone.forEach(student => {
        let scores = student.subjects.map(s => s.score).join(', ');
        console.log(`${student.id} - ${student.name}: Điểm TB = ${student.average}`);
        console.log(`  Điểm các môn: [${scores}]`);
    });
})();

// vietcq@LEGION-7:~/hcmus/ptudw-week$ node Lab_Javascript_NangCao/22810218_Ex05.js 
// [
//   {
//     id: 'S001',
//     name: 'Nguyen Van A',
//     subjects: [
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object]
//     ]
//   },
//   {
//     id: 'S002',
//     name: 'Tran Thi B',
//     subjects: [
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object]
//     ]
//   },
//   {
//     id: 'S003',
//     name: 'Le Van C',
//     subjects: [
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object]
//     ]
//   },
//   {
//     id: 'S004',
//     name: 'Pham Thi D',
//     subjects: [
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object]
//     ]
//   }
// ]
// [
//   {
//     "id": "S001",
//     "name": "Nguyen Van A",
//     "subjects": [
//       {
//         "name": "Toan",
//         "score": 0
//       },
//       {
//         "name": "Ly",
//         "score": 0
//       },
//       {
//         "name": "Hoa",
//         "score": 0
//       },
//       {
//         "name": "Dia",
//         "score": 0
//       },
//       {
//         "name": "Sinh",
//         "score": 0
//       },
//       {
//         "name": "Van",
//         "score": 0
//       },
//       {
//         "name": "Anh",
//         "score": 0
//       },
//       {
//         "name": "Su",
//         "score": 0
//       },
//       {
//         "name": "Tin",
//         "score": 0
//       },
//       {
//         "name": "GDCD",
//         "score": 0
//       }
//     ]
//   },
//   {
//     "id": "S002",
//     "name": "Tran Thi B",
//     "subjects": [
//       {
//         "name": "Toan",
//         "score": 0
//       },
//       {
//         "name": "Ly",
//         "score": 0
//       },
//       {
//         "name": "Hoa",
//         "score": 0
//       },
//       {
//         "name": "Dia",
//         "score": 0
//       },
//       {
//         "name": "Sinh",
//         "score": 0
//       },
//       {
//         "name": "Van",
//         "score": 0
//       },
//       {
//         "name": "Anh",
//         "score": 0
//       },
//       {
//         "name": "Su",
//         "score": 0
//       },
//       {
//         "name": "Tin",
//         "score": 0
//       },
//       {
//         "name": "GDCD",
//         "score": 0
//       }
//     ]
//   },
//   {
//     "id": "S003",
//     "name": "Le Van C",
//     "subjects": [
//       {
//         "name": "Toan",
//         "score": 0
//       },
//       {
//         "name": "Ly",
//         "score": 0
//       },
//       {
//         "name": "Hoa",
//         "score": 0
//       },
//       {
//         "name": "Dia",
//         "score": 0
//       },
//       {
//         "name": "Sinh",
//         "score": 0
//       },
//       {
//         "name": "Van",
//         "score": 0
//       },
//       {
//         "name": "Anh",
//         "score": 0
//       },
//       {
//         "name": "Su",
//         "score": 0
//       },
//       {
//         "name": "Tin",
//         "score": 0
//       },
//       {
//         "name": "GDCD",
//         "score": 0
//       }
//     ]
//   },
//   {
//     "id": "S004",
//     "name": "Pham Thi D",
//     "subjects": [
//       {
//         "name": "Toan",
//         "score": 0
//       },
//       {
//         "name": "Ly",
//         "score": 0
//       },
//       {
//         "name": "Hoa",
//         "score": 0
//       },
//       {
//         "name": "Dia",
//         "score": 0
//       },
//       {
//         "name": "Sinh",
//         "score": 0
//       },
//       {
//         "name": "Van",
//         "score": 0
//       },
//       {
//         "name": "Anh",
//         "score": 0
//       },
//       {
//         "name": "Su",
//         "score": 0
//       },
//       {
//         "name": "Tin",
//         "score": 0
//       },
//       {
//         "name": "GDCD",
//         "score": 0
//       }
//     ]
//   }
// ]
// S001 - Nguyen Van A: Điểm TB = 6.32
//   Điểm các môn: [0.81, 6.21, 6.24, 9.73, 8.83, 9.95, 1.11, 6.58, 9.21, 4.48]
// S002 - Tran Thi B: Điểm TB = 5.15
//   Điểm các môn: [5.82, 7.57, 9.25, 5.6, 4.06, 3.79, 4.79, 0.06, 2.2, 8.33]
// S003 - Le Van C: Điểm TB = 5.03
//   Điểm các môn: [6.89, 9.53, 8.91, 3.99, 6.17, 3.24, 6.55, 0.24, 2.18, 2.57]
// S004 - Pham Thi D: Điểm TB = 5.68
//   Điểm các môn: [5.43, 6.87, 6.03, 9.47, 5.57, 4.23, 1.27, 6.3, 2.32, 9.32]