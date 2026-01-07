const express = require('express');
const app = express();

// Middleware để parse form data
app.use(express.urlencoded({ extended: true }));

// Năm sinh của người lập trình
const PROGRAMMER_BIRTH_YEAR = 2002;

// Tính tuổi từ ngày sinh
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// Xác định danh xưng dựa vào giới tính và tuổi
function getHonorific(gender, userAge) {
    const programmerAge = new Date().getFullYear() - PROGRAMMER_BIRTH_YEAR;
    const ageDiff = userAge - programmerAge;

    if (ageDiff > 10) {
        return gender === 'male' ? 'Chú' : 'Cô';
    } else if (ageDiff > 2) {
        return gender === 'male' ? 'Anh' : 'Chị';
    } else if (ageDiff >= -2) {
        return 'Bạn';
    } else if (ageDiff >= -10) {
        return 'Em';
    } else {
        return 'Con';
    }
}

// Trang chủ - hiển thị form
// Sử dụng template string để viết HTML, gửi trực tiếp từ server
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>BT2 - Loi chao</title>
            <style>
                body { font-family: Arial; max-width: 400px; margin: 40px auto; padding: 20px; }
                label { display: block; margin-top: 15px; }
                input, select { width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box; }
                button { margin-top: 20px; padding: 10px 20px; }
            </style>
        </head>
        <body>
            <h1>Nhap thong tin</h1>
            <form method="POST" action="/greet">
                <label>Ho ten:</label>
                <input type="text" name="name" required>
                <label>Gioi tinh:</label>
                <select name="gender" required>
                    <option value="">-- Chon --</option>
                    <option value="male">Nam</option>
                    <option value="female">Nu</option>
                  </select>
                <label>Ngay sinh:</label>
                <input type="date" name="birthdate" required>
                <button type="submit">Gui</button>
            </form>
        </body>
        </html>
    `);
});

// Xử lý form và hiển thị lời chào
app.post('/greet', (req, res) => {
    const { name, gender, birthdate } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !gender || !birthdate) {
        return res.send('<h1>Loi: Vui long nhap day du thong tin!</h1><a href="/">Quay lai</a>');
    }

    const age = calculateAge(birthdate);

    // Kiểm tra ngày sinh hợp lệ
    if (age < 0) {
        return res.send('<h1>Loi: Ngay sinh khong the o tuong lai!</h1><a href="/">Quay lai</a>');
    }
    if (age > 150) {
        return res.send('<h1>Loi: Tuoi khong hop le!</h1><a href="/">Quay lai</a>');
    }

    const honorific = getHonorific(gender, age);

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Loi chao</title>
            <style>
            body { font-family: Arial; max-width: 400px; margin: 40px auto; padding: 20px; text-align: center; }
            </style>
        </head>
        <body>
            <h1>Xin chao ${name} ${honorific} co ${age} tuoi</h1>
            <p><a href="/">Quay lai</a></p>
        </body>
        </html>
    `);
});

// Khởi động server
const PORT = 3456;
app.listen(PORT, () => {
    console.log(`Server dang chay tai http://localhost:${PORT}`);
});
