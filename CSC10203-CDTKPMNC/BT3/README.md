# BT3 - Tra cứu Nhân viên

## Yêu cầu
- Lập trình chức năng tra cứu nhân viên theo một trong các tiêu chí sau: Họ tên, Tuổi, Đơn vị
- Môi trường lập trình: Node.js + Express với dữ liệu JSON đính kèm
- Ghi chú: Giao diện tiện dụng nhất

## Cấu trúc dự án (Mô hình 3 lớp)

```
BT3/
├── server.js              # Entry point - Điều phối các lớp
├── layers/
│   ├── data.js           # Lớp Data - Truy cập dữ liệu JSON
│   ├── business.js       # Lớp Business - Logic nghiệp vụ
│   └── presentation.js   # Lớp Presentation - Tạo HTML
├── Du_lieu_Media/
│   ├── Du_lieu/
│   │   ├── Nhan_vien/    # JSON nhân viên
│   │   └── HTML/         # Template HTML
│   └── Media/            # Ảnh nhân viên
└── package.json
```

## Cách chạy

```bash
npm install
node server.js
```

Truy cập: http://localhost:3579

## Tính năng
- Tra cứu theo **Họ tên**: Tìm nhân viên có tên chứa từ khóa
- Tra cứu theo **Tuổi**: Tìm nhân viên có đúng tuổi nhập vào
- Tra cứu theo **Đơn vị**: Tìm theo tên đơn vị hoặc chi nhánh

## Môi trường
- Node.js
- Express
- WSL

**Github: https://github.com/CaoQuocViet/hcmus-computer-science/tree/main/CSC10203-CDTKPMNC/BT3**