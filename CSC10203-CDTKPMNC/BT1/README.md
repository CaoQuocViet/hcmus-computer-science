# BT1

## Yêu cầu
Ngữ cảnh : Xét 2 chương trình sau

Xuất thông báo 'Xin chào tất cả mọi người'

Nhập vào Họ tên và xuất lời chào 'Xin chào Họ tên nhập'

Yêu cầu :
Lập trình web 2 chương trình trên với 2 môi trường lập trình
a) Node Js
b) Python

Lưu ý : Không cài đặt thêm bất kỳ môi trường khác

Yêu cầu về bài nộp:
Tạo thư mục với tên Ma_so_SV_BT1
chứa 4 thư mục con tương ứng 4 chương trình
Nén thư mục và nộp bài ( chỉ nộp 1 tập tin nén duy nhất )
Hạn chót nộp bài : thứ tư 31/12/2025

## Chạy (WSL) - tự định nghĩa các port tránh xung đột lẫn nhau và tránh xung đột với các microservice service đang chạy trên máy
```
wsl node nodejs_hello/server.js     # localhost:3334
wsl node nodejs_input/server.js     # localhost:4444
wsl python3 python_hello/server.py  # localhost:5555
wsl python3 python_input/server.py  # localhost:6060

```
