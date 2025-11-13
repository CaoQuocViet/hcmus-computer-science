# Hệ thống Quản lý Đề tài Nghiên cứu Khoa học

> **UI Mock cho môn Phân tích Thiết kế Hệ thống Thông tin - HCMUS**

## Demo

**Live Preview:** https://caoquocviet.github.io/phan-tich-thiet-ke-he-thong-thong-tin-hcmus/

## Mô tả

Mock UI cho hệ thống quản lý đề tài nghiên cứu khoa học, bao gồm 4 actor chính:

- **Chủ nhiệm đề tài** - Quản lý hồ sơ và báo cáo tiến độ
- **Nhân viên** - Xử lý hồ sơ và theo dõi nghiệm thu  
- **Hội đồng khoa học** - Xét duyệt và đánh giá đề tài
- **Hội đồng nghiệm thu** - Nghiệm thu và chấm điểm

## Chạy local

```bash
# Clone repo
git clone https://github.com/CaoQuocViet/phan-tich-thiet-ke-he-thong-thong-tin-hcmus.git

# Mở thư mục docs
cd phan-tich-thiet-ke-he-thong-thong-tin-hcmus/docs

# Chạy server HTTP đơn giản
python -m http.server 8000

# Truy cập: http://localhost:8000
```

## Cấu trúc

```
docs/
├── index.html              # Trang chủ - chọn role
├── pages/
│   ├── chunhiem-dashboard.html    # Dashboard chủ nhiệm
│   ├── nhanvien-dashboard.html    # Dashboard nhân viên  
│   ├── hoidong-dashboard.html     # Dashboard hội đồng KH
│   └── nghiemthu-dashboard.html   # Dashboard nghiệm thu
├── js/                     # JavaScript logic + mock data
├── css/                    # Styles
└── components/             # Common components
```

## Tính năng

### Chủ nhiệm đề tài
- Tạo và quản lý hồ sơ đề tài
- Báo cáo tiến độ định kỳ
- Nộp hồ sơ nghiệm thu

### Nhân viên  
- Kiểm tra và xử lý hồ sơ
- Quản lý lịch báo cáo tiến độ
- Xác nhận hoàn tất đề tài

### Hội đồng khoa học
- Xét duyệt đề tài
- Đánh giá tiến độ
- Quản lý thành viên hội đồng

### Hội đồng nghiệm thu
- Nghiệm thu đề tài
- Chấm điểm và đánh giá
- Lập biên bản kết quả

## Mục đích

- **Thiết kế UI/UX** cho hệ thống quản lý đề tài
- **Demo workflow** các use case chính  
- **Mock data** để test giao diện
- **Không có backend** - chỉ frontend static

## Công nghệ

- **HTML5/CSS3** - Giao diện
- **Vanilla JavaScript** - Logic và mock data  
- **FontAwesome** - Icons
- **Responsive Design** - Tương thích mobile

---

**Lưu ý:** Đây chỉ là UI mock phục vụ thiết kế, không phải ứng dụng hoàn chỉnh.
