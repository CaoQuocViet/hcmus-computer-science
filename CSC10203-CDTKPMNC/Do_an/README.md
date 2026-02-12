# Đồ án: Quản lý khách sạn 2

## Ngữ cảnh
Khách sạn X có 3 khu vực A, B, C. Mỗi khu vực có nhiều tầng (trung bình là 4). Số phòng là chuỗi kết hợp Tên khu vực, Số thứ tự tầng, Số thứ tự phòng. Khách sạn có 3 loại phòng, mỗi loại sẽ có đơn giá, tiện nghi và số khách tối đa riêng. X quản lý việc cho thuê/trả phòng với Phiếu thuê phòng (BM1).

## BM1 - Phiếu thuê phòng
- Số phòng: .......
- Ngày nhận phòng: ..... Ngày trả phòng: .....
- Danh sách khách hàng:
  - Họ tên | CMND
  - ....
- **Ghi chú**: Tiền thuê hiện nay chỉ tính theo số ngày thuê (không xét giờ)

## Yêu cầu của ứng dụng

### Bộ phận Tiếp tân
- Nhân viên thuộc bộ phận này chỉ được phân công phụ trách 1 khu vực
- Quản lý các phiếu thuê phòng
- Tra cứu phiếu thuê phòng theo các tiêu chí: Ngày, Loại phòng, Họ tên khách hàng

### Bộ phận Quản lý
- Nhân viên thuộc bộ phận này có thể được phân công quản lý nhiều khu vực
- Tra cứu phiếu thuê phòng theo các tiêu chí: Ngày, Loại phòng, Họ tên khách hàng
- Lập báo cáo thống kê doanh thu (BM2, BM3)

### Ban Giám đốc
- Thay đổi đơn giá thuê
- Tra cứu phiếu thuê phòng theo các tiêu chí: Ngày, Loại phòng, Họ tên khách hàng
- Lập báo cáo thống kê doanh thu (BM2, BM3)

### Khách hàng
- Tra cứu phòng

## BM2 - Thống kê thu tháng
| Tháng: ....... | Tổng thu: ....... |
|----------------|-------------------|
| Loại phòng    | Thu    | Tỷ lệ    |
| .......       | ...... | ......   |

## BM3 - Thống kê thu năm
| Năm: ....... | Tổng thu: ....... |
|--------------|-------------------|
| Tháng | Thu    | Tỷ lệ    |
| 1     | ...... | ......   |
| ...   | ...... | ......   |
