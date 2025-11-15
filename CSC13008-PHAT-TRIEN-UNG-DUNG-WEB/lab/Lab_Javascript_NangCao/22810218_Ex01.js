// Định nghĩa một mảng đối tượng chứa danh sách đối tượng sinh viên, mỗi sinh viên lưu thông tin mã số sinh viên, 
// họ tên và mảng danh sách các đối tượng môn học, trong đó mỗi môn học lưu thông tin tên môn học và điểm số. 
// Mặc định điểm tất cả các môn học là 0 điểm. 

var students = [
    {
        id: "S001",
        name: "Nguyen Van A",
        subjects: [
            {name: "Toan", score: 0},
            {name: "Ly", score: 0},
            {name: "Hoa", score: 0},
            {name: "Dia", score: 0},
            {name: "Sinh", score: 0},
            {name: "Van", score: 0},
            {name: "Anh", score: 0},
            {name: "Su", score: 0},
            {name: "Tin", score: 0},
            {name: "GDCD", score: 0}
        ]
    },
    {
        id: "S002",
        name: "Tran Thi B",
        subjects: [
            {name: "Toan", score: 0},
            {name: "Ly", score: 0},
            {name: "Hoa", score: 0},
            {name: "Dia", score: 0},
            {name: "Sinh", score: 0},
            {name: "Van", score: 0},
            {name: "Anh", score: 0},
            {name: "Su", score: 0},
            {name: "Tin", score: 0},
            {name: "GDCD", score: 0}
        ]
    },
    {
        id: "S003",
        name: "Le Van C",
        subjects: [
            {name: "Toan", score: 0},
            {name: "Ly", score: 0},
            {name: "Hoa", score: 0},
            {name: "Dia", score: 0},
            {name: "Sinh", score: 0},
            {name: "Van", score: 0},
            {name: "Anh", score: 0},
            {name: "Su", score: 0},
            {name: "Tin", score: 0},
            {name: "GDCD", score: 0}
        ]
    },
    {
        id: "S004",
        name: "Pham Thi D",
        subjects: [
            {name: "Toan", score: 0},
            {name: "Ly", score: 0}, 
            {name: "Hoa", score: 0},
            {name: "Dia", score: 0},
            {name: "Sinh", score: 0},
            {name: "Van", score: 0},
            {name: "Anh", score: 0},
            {name: "Su", score: 0},
            {name: "Tin", score: 0},    
            {name: "GDCD", score: 0}
        ]
    }
];

// Sử dụng lệnh console.log và JSON.stringify để xuất thông tin danh 
// sách sinh viên đã định nghĩa ra màn hình.
console.log(students);
console.log(JSON.stringify(students, null, 2));

module.exports = { students };


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