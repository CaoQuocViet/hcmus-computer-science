const http = require('http');

// Tạo một máy chủ HTTP đơn giản
// Tự định nghĩa header và nội dung phản hồi
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end('<h1>Xin chào tất cả mọi người</h1>');
}).listen(3334, () => console.log('http://localhost:3334'));
