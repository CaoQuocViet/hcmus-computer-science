# BT2

## Yêu cầu
- Nhập vào Họ tên, Giới tính, Ngày sinh và xuất lời chào có dạng "Xin chào Họ tên Danh xưng có ... tuổi"
- Danh xưng (Con/Anh/Chị/Em/...) phụ thuộc vào giới tính và tuổi so với người lập trình
- Môi trường: NodeJs + Express

## Cách chạy
```bash
npm install
node server.js
```
Truy cập: http://localhost:3456

## Giải thích code

### 1. Express setup
- `express.urlencoded()`: middleware parse dữ liệu form gửi lên từ POST request

### 2. Hàm `calculateAge(birthDate)`
- Tính tuổi từ ngày sinh
- So sánh năm, tháng, ngày để tính chính xác (nếu chưa qua sinh nhật thì trừ 1)

### 3. Hàm `getHonorific(gender, userAge)`
- Tính chênh lệch tuổi giữa user và lập trình viên
- Trả về danh xưng phù hợp:
  - Lớn hơn >10 tuổi: Cô/Chú
  - Lớn hơn 2-10 tuổi: Anh/Chị
  - Chênh lệch ±2 tuổi: Bạn
  - Nhỏ hơn 2-10 tuổi: Em
  - Nhỏ hơn >10 tuổi: Con

### 4. Route
- `GET /`: Hiển thị form nhập thông tin
- `POST /greet`: Xử lý form, kiểm tra lỗi, trả về lời chào

**Github: https://github.com/CaoQuocViet/hcmus-computer-science/tree/main/CSC10203-CDTKPMNC/BT2**