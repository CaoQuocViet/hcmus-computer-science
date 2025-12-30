from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs

# Tạo một máy chủ HTTP đơn giản, định nghĩa header và thiết kế directly về home page
# Nhận dữ liệu từ biểu mẫu và phản hồi lại
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(b'<form method="POST"><input name="name" placeholder="Ho ten" required><button>Gui</button></form>')

    def do_POST(self):
        length = int(self.headers['Content-Length'])
        data = parse_qs(self.rfile.read(length).decode())
        name = data.get('name', [''])[0]
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(f'<h1>Xin chào {name}</h1><a href="/">Quay lại</a>'.encode())

HTTPServer(('', 6060), Handler).serve_forever()
