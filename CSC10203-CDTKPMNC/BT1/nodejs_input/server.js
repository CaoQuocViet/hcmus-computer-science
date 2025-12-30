const http = require('http');

// Tạo một máy chủ HTTP đơn giản, định nghĩa header và thiết kế directly
// Nhận dữ liệu từ biểu mẫu và phản hồi lại
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const name = new URLSearchParams(body).get('name');
            res.end(`<h1>Xin chào ${name}</h1><a href="/">Quay lại</a>`);
        });
    } else {
        res.end(`<form method="POST">
            <input name="name" placeholder="Họ tên" required>
            <button>Gửi</button>
        </form>`);
    }
}).listen(4444, () => console.log('http://localhost:4444'));
