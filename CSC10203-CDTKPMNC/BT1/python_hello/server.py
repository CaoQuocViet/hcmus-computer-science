from http.server import HTTPServer, BaseHTTPRequestHandler

# Tạo một máy chủ HTTP đơn giản
# Tự định nghĩa header và nội dung phản hồi
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write('<h1>Xin chào tất cả mọi người</h1>'.encode())

HTTPServer(('', 5555), Handler).serve_forever()
