# 1. UC Hệ Thống

## 1.1. Tạo Hồ Sơ Sơ Bộ

**Tên Use Case**  Tạo Hồ Sơ Sơ Bộ

**Mô tả**  UC này cho phép Nhân viên tạo hồ sơ sơ bộ trong hệ thống với các thông tin ban đầu.

**Actor**  Nhân Viên

**Tiền Điều Kiện**  Nhân viên đã đăng nhập hệ thống

**Hậu Điều Kiện**  Hồ sơ sơ bộ được tạo, trạng thái "Đã Tạo"
Hệ thống tạo mã duy nhất cho hồ sơ

**Luồng Chính**
1.	Nhân viên truy cập menu "Quản lý Hồ sơ"
2.	Hệ thống nhạp và hiển thị trang "Quản lý Hồ sơ"
3.	Nhân viên chọn "Tạo hồ sơ mới".
4.	Hệ thống hiển thị form tạo hồ sơ sơ bộ.
5.	Nhân viên nhập thông tin vào các trường.
6.	Nhân viên chọn "Tạo".
7.	Hệ thống xác thực dữ liệu.
8.	Hệ thống tạo mã hồ sơ, lưu với trạng thái "Đã Tạo".
9.	Hệ thống gửi thông báo cho Người đề xuất.
10.	Hệ thống hiển thị chi tiết hồ sơ đã tạo.

**Luồng Phụ**
A7: Nếu thiếu trường bắt buộc:
1.	Hệ thống highlight trường thiếu màu đỏ
2.	Hệ thống hiển thị: "Vui lòng điền đầy đủ thông tin bắt buộc" 
3.	Quay lại bước 5

---

## 1.2. Xác Nhận Phê Duyệt và Triển Khai

**Tên Use Case**  Xác Nhận Phê Duyệt và Triển Khai

**Mô tả**  UC cho phép Nhân viên xác nhận hồ sơ đã được phê duyệt, gửi thông báo chính thức và hướng dẫn người dùng triển khai đề tài.

**Actor**  Nhân Viên

**Tiền Điều Kiện**  Nhân viên đã đăng nhập hệ thống
Trạng thái hồ sơ: "Đã phê duyệt"

**Hậu Điều Kiện**  Trạng thái hồ sơ: "Đang thực hiện"
Người dùng  nhận được thông báo và hướng dẫn triển khai

**Luồng Chính**
1.	Nhân viên nhận thông báo có hồ sơ được phê duyệt.
2.	Nhân viên truy cập vào danh sách Hồ sơ đã phê duyệt.
3.	Hệ thống nạp và hiển thị danh sách Hồ sơ đã phê duyệt.
4.	Nhân viên chọn hồ sơ.
5.	Hệ thống nạp và hiển thị thông tin chi tiết cuả hồ sơ.
6.	Nhân viên chọn Xác nhận triển khai.
7.	Hệ thống hiển thị form Xác nhận triển khai.
8.	Nhân viên điền đầy đủ thông tin triển khai.
9.	Nhân viên chọn Hoàn tất.
10.	Hệ thống hiển thị dialog xác nhận cuối: "Xác nhận chuyển trạng thái đề tài sang 'Đang thực hiện'?" [Hủy] [Xác nhận]
11.	Nhân viên chọn Xác nhận.
12.	Hệ thống thực hiện cập nhật trạng thái hồ sơ sang "Đang thực hiện", Ghi nhận thông tin triển khai, Gửi email thông báo đến Người đề xuất, và các thành viên.
13.	Hệ thống tạo lịch nhắc nhở đánh giá định kỳ, báo cáo tiến độ, deadline.
14.	Hệ thống Hiển thị “Đã xác nhận triển khai thành công!"

**Luồng Phụ**
A9: Nếu thông tin triển khai không hợp lệ thì:
1.	Hệ thống highlight trường không hợp lệ.
2.	Hệ thống giữ lại các thông tin đã nhập
3.	Quay lại bước 7
A10: Nếu Nhân viên chọn hủy thì:
1.	Hệ thống giữ lại các thông tin đã nhập 
2.	Quay lại bước 7.

---

## 1.3. Tải Lên Tài Liệu Hồ Sơ

**Tên Use Case**  Tải Lên Tài Liệu Hồ Sơ

**Mô tả**  UC cho phép Người dùng tải lên các tài liệu bắt buộc để hoàn thiện hồ sơ.

**Actor**  Chủ nhiệm đề tài

**Tiền Điều Kiện**  Chủ nhiệm đề tài đã đăng nhập
Hồ sơ sơ bộ đã được tạo.
Trạng thái hồ sơ: “Đã Tạo”

**Hậu Điều Kiện**  Đã tải lên Đủ 5 tài liệu bắt buộc, sẵn sàng kiểm tra
Trạng thái hồ sơ: “Chờ kiểm tra”

**Luồng Chính**
1.	Chủ nhiệm đề tài truy cập "Hồ sơ của tôi".
2.	Hệ thống nạp và hiển thị danh sách hồ sơ trạng thái "Đã Tạo".
3.	Chủ nhiệm chọn hồ sơ cần hoàn thiện.
4.	Hệ thống hiển thị form hoàn thiện với 5 danh mục tài liệu bắt buộc..
5.	Chủ nhiệm tải lên từng tài liệu theo danh mục.
6.	Hệ thống xác thực file (định dạng, kích thước, virus).
7.	Hệ thống hiển thị progress bar và kết quả upload
8.	Chủ nhiệm đề tài nhập danh sách thành viên tham gia.
9.	Chủ nhiệm đề tài chọn "Gửi".
10.	Hệ thống kiểm tra đầy đủ 5 tài liệu bắt buộc.
11.	Hệ thống chuyển trạng thái sang "Chờ kiểm tra".
12.	Hệ thống gửi thông báo cho Nhân viên

**Luồng Phụ**
A6: Nếu File không hợp lệ:
1.	Hệ thống hiển thị lỗi cụ thể.
2.	Hệ thống xóa file không hợp lệ.
3.	Quay lại bước 5.
A10: Nếu thiếu tài liệu bắt buộc
1.	Hệ thống hiển thị:  "Vui lòng tải đủ tài liệu bắt buộc" .
2.	Hệ thống highlight danh mục còn thiếu.
3.	Quay lại bước 5

---

## 1.4. Kiểm tra hồ sơ đề tài

**Tên Use Case**  Kiểm tra hồ sơ đề tài

**Mô tả**  UC cho phép Nhân viên kiểm tra tính đầy đủ, hợp lệ của hồ sơ  theo checklist và đưa ra quyết định xác nhận hoặc yêu cầu bổ sung.

**Actor**  Nhân viên

**Tiền Điều Kiện**  Nhân viên đã đăng nhập
Trạng thái hồ sơ: “Chờ Kiểm Tra”

**Hậu Điều Kiện**  Thành công: Trạng thái hồ sơ "Đã hoàn thiện", sẵn sàng xét duyệt
Không thành công: Trạng thái hồ sơ  "Cần bổ sung"

**Luồng Chính**
1.	Nhân viên truy cập vào danh sách các hồ sơ chờ kiểm tra.
2.	Hệ thống nạp và hiển thị danh sách các hồ sơ chờ kiểm tra.
3.	Nhân viên chọn một hồ sơ để kiểm tra.
4.	Hệ thống nạp và hiển thị thông tin chi tiết hồ sơ.
5.	Nhân viên chọn tài liệu cần xem.
6.	Hệ thống hiện thị nội dung của tài liệu.
7.	Nhân viên tick chọn để xác nhận từng tài liệu hợp lệ.
8.	Nhân viên chọn Xác nhận hồ sơ hợp lệ.
9.	Hệ thống hiển thị dialog "Xác nhận hồ sơ này hợp lệ?" [Hủy] [Xác nhận]
10.	Nhân viên chọn Xác nhận.
11.	Hệ thống cập nhật trạng thái hồ sơ thành Đã hoàn thiện.
12.	Hệ thống gởi thông báo tới chủ nhiệm đề tài.

**Luồng Phụ**
A8a: Nếu Tick chọn chưa đầy đủ thì:
1.	Hệ thống hiện thị chưa kiểm tra toàn bộ hồ sơ.
2.	Quay lại bước 7.
A8b: Nếu cần chỉnh sửa hoặc bổ sung hồ sơ thì:
1.	Nhân viên chọn Yêu cầu bổ sung.
2.	Nhân viên nhập thông tin yêu cầu bổ sung vào text box.
3.	Nhân viên chọn gửi yêu cầu.
4.	Hệ thống xác nhận text box phải có nội dung.
5.	Hệ thống hiển thị: "Đã gửi yêu cầu bổ sung".
6.	Hệ thống cập nhật trạng thái hồ sơ thành Cần bổ sung.
7.	Thực hiện bước 12.
A9: Nếu chọn hủy thì:
8.	Hệ thống giữ lại các thông tin tick chọn
9.	Quay lại bước 7.

---

## 1.5. Gửi Xét Duyệt

**Tên Use Case**  Gửi và Theo Dõi Xét Duyệt

**Mô tả**  UC cho phép Nhân viên gửi hồ sơ đến Hội đồng khoa học để xét duyệt, theo dõi tiến trình và nhận kết quả phản hồi.

**Actor**  Nhân viên

**Tiền Điều Kiện**  Nhân viên đã đăng nhập
Trạng thái hồ sơ: “Đã hoàn thiện”

**Hậu Điều Kiện**  Nhận được kết quả xét duyệt từ Hội đồng

**Luồng Chính**
1.	Nhân viên truy cập "Hồ sơ đã hoàn thiện"
2.	Hệ thống nạp và hiển thị danh sách hồ sơ đã hoàn thiện.
3.	Nhân viên chọn hồ sơ cần gửi.
4.	Hệ thống nạp và hiển thị chi tiết hồ sơ.
5.	Nhân viên chọn "Gửi xét duyệt".
6.	Hệ thống nạp và hiển thị danh sách Hội đồng khoa học.
7.	Nhân viên chọn thành viên Hội đồng.
8.	Nhân viên chọn "Gửi"
9.	Hệ thống chuyển trạng thái sang "Chờ xét duyệt".
10.	Hệ thống gửi thông báo đến các thành viên Hội đồng.

**Luồng Phụ**

---

## 1.6. Xét Duyệt Đề Tài

**Tên Use Case**  Xét Duyệt Đề Tài

**Mô tả**  UC cho phép các thành viên Hội đồng khoa học xem, đánh giá và bỏ phiếu cho hồ sơ đề tài.

**Actor**  Thành viên Hội đồng khoa học

**Tiền Điều Kiện**  Thành viên Hội đồng đã đăng nhập
Trạng thái hồ sơ: “Chờ xét duyệt”

**Hậu Điều Kiện**  Hồ sơ đã được hội đồng đánh giá

**Luồng Chính**
1.	Thành viên Hội đồng truy cập "Hồ sơ cần xét duyệt".
2.	Hệ thống nạp và hiển thị danh sách hồ sơ chờ xét duyệt
3.	Thành viên chọn hồ sơ.
4.	Hệ thống nạp và hiển thị thông tin đầy đủ hồ sơ.
5.	Thành viên hội đồng chọn xem từng tài liệu.
6.	Hệ thống nạp và hiển thị nội dung tài liệu.
7.	Thành viên chọn quyết định: [Phê duyệt] / [Yêu cầu chỉnh sửa].
8.	Hệ thống lưu trạng thái đánh giá của thành viên hội đồng.
9.	Hệ thống kiểm tra tất cả thành viên hội đồng đã xét duyệt đủ hay chưa.
10.	Nếu tất cả thành viên hội đồng đã xét duyệt và không có yêu cầu chình sửa, thì chuyển trạng thái "Đã phê duyệt".
11.	Hệ thống gửi thông báo cho Nhân viên.

**Luồng Phụ**
A7: Nếu chọn "Yêu cầu chỉnh sửa" thì:
1.	Hệ thống hiển thị textarea "Chi tiết yêu cầu chỉnh sửa".
2.	Thành viên hội đồng nhập nội dung yêu cầu chỉnh sửa chi tiết.
3.	Hệ thống lưu thông tin yêu cầu chỉnh sửa.
A10: Nếu tất cả thành viên hội đồng đã xét duyệt và có bất kỳ yêu cầu chỉnh sửa thì:
1.	Hệ thống chuyển trạng thái "Chờ chỉnh sửa". 
2.	Hệ thống gởi thông báo danh sách yêu cầu chỉnh sửa đến chủ nhiệm đề tài.

---

## 1.7. Thông báo yêu cầu chỉnh sửa

**Tên Use Case**  Thông báo yêu cầu chỉnh sửa

**Mô tả**  UC cho phép Nhân viên thông báo yêu cầu chỉnh sửa từ Hội đồng cho Người dùng.

**Actor**  Nhân viên

**Tiền Điều Kiện**  Hội đồng đã yêu cầu chỉnh sửa
Trạng thái hồ sơ: "Chờ chỉnh sửa"

**Hậu Điều Kiện**  Đã gửi thông báo yêu cầu chỉnh sửa đến chủ nhiệm đề tài.

**Luồng Chính**
1.	Nhân viên truy cập "Hồ sơ cần chỉnh sửa".
2.	Hệ thống nạp và hiển thị danh sách hồ sơ trạng thái "Chờ chỉnh sửa".
3.	Nhân viên chọn hồ sơ.
4.	Hệ thống nạp và hiển thị trang thông tin hồ sơ cần chỉnh sửa.
5.	Nhân viên nhập tổng hợp yêu cầu chỉnh sửa.
6.	Nhân viên chọn "Gửi".
7.	Hệ thống lưu thông tin.
8.	Hệ thống chuyển trạng thái sang "Đang chỉnh sửa"
9.	Hệ thống gửi thông báo cho Chủ nhiệm đề tài.

**Luồng Phụ**

---

## 1.8. Cập nhật hồ sơ đã chỉnh sửa

**Tên Use Case**  Thông báo yêu cầu chỉnh sửa

**Mô tả**  UC cho phép chủ nhiệm đề tài cập nhật hồ sơ đã chỉnh sửa lên hệ thống.

**Actor**  Chủ nhiệm đề tài

**Tiền Điều Kiện**  Trạng thái hồ sơ: " Đang chỉnh sửa "

**Hậu Điều Kiện**  Trạng thái hồ sơ: " Chờ xét duyệt lại"

**Luồng Chính**
1.	Chủ nhiệm đề tài truy cập "Hồ sơ của tôi".
2.	Hệ thống nạp và hiển thị hồ sơ trạng thái "Đang chỉnh sửa"
3.	Chủ nhiệm đề tài chọn hồ sơ.
4.	Hệ thống nạp và hiển thị thông tin cần chỉnh sửa.
5.	Chủ nhiệm đề tài tải lên tài liệu đã chỉnh sửa.
6.	Hệ thống xác thực file.
7.	Chủ nhiệm chọn "Gửi lại".
8.	Hệ thống lưu thông tin.
9.	Hệ thống chuyển trạng thái sang "Chờ xét duyệt lại".
10.	Hệ thống gửi thông báo cho Nhân viên.

**Luồng Phụ**

---

## 1.9. Thông báo lịch báo cáo tiến độ

**Tên Use Case**  Thông báo lịch báo cáo tiến độ

**Mô tả**  UC cho phép Nhân viên thông báo lịc báo cáo tiến độ cho chủ nhiệm đề tài.

**Actor**  Nhân viên

**Tiền Điều Kiện**  Nhân viên đã đăng nhập
Đề tài đã được phê duyệt

**Hậu Điều Kiện**  Lịch báo cáo được gửi cho chủ nhiệm đề tài

**Luồng Chính**
1.	Hệ thống tự động quét danh sách đề tài "Đang thực hiện".
2.	Hệ thống lọc đề tài có mốc báo cáo trong vòng 7 ngày tới.
3.	Nếu có mốc báo cáo, Hệ thống gửi thông báo nhắc nhở đến Chủ nhiệm đề tài.
4.	Hệ thống ghi nhận đã gửi thông báo với timestamp

**Luồng Phụ**
A2. Nếu không có đề tài nào cần báo cáo thì bỏ qua bước 3, 4.

---

## 1.10. Tải dữ liệu định kỳ trên hệ thống

**Tên Use Case**  
Tải dữ liệu định kỳ trên hệ thống

**Mô tả**  UC cho phép người dùng tải báo cáo định kỳ lên hệ thống.

**Actor**  Chủ nhiệm đề tài

**Tiền Điều Kiện**  Chủ nhiệm đề tài đã đăng nhập

**Hậu Điều Kiện**  Đã tải lên Đủ hồ sơ tiến độ báo cáo lên hệ thống
Trạng thái hồ sơ: “Chờ kiểm tra”

**Luồng Chính**
13.	Hệ thống nạp và hiển thị danh sách các hồ sơ cần nộp.
14.	Chủ nhiệm chọn tải hồ sơ theo từng mục yêu cầu lên hệ thống.
15.	Chủ nhiệm đề tài chọn gửi.
16.	Hệ thống xác thực các trường thông tin bắt buộc, danh sách file tải lên.
17.	Hệ thống chuyển trạng thái hồ sơ thành “Chờ kiểm tra”, hệ thống lưu hồ sơ đã gửi. 
18.	Hệ thống gửi thông báo cho nhân viên.

**Luồng Phụ**
A2: Nếu định dạng, kích thước, quét virus không hợp lệ thì thông báo lỗi và yêu cầu thực hiện tải lại file
A4: Nếu chưa đủ các tài liệu bắt buộc. Hệ thống báo các trường hợp thiếu và yêu cầu bổ sung thêm

---

## 1.11. Kiểm tra hồ sơ tiến độ

**Tên Use Case**  Kiểm tra hồ sơ tiến độ

**Mô tả**  UC cho phép Nhân viên kiểm tra tính đầy đủ, hợp lệ của hồ sơ  theo checklist và đưa ra quyết định xác nhận hoặc yêu cầu bổ sung.

**Actor**  Nhân viên

**Tiền Điều Kiện**  Nhân viên đã đăng nhập
Trạng thái hồ sơ: “Chờ Kiểm Tra”

**Hậu Điều Kiện**  Thành công: Trạng thái hồ sơ "Đã hoàn thiện", sẵn sàng xét duyệt
Không thành công: Trạng thái hồ sơ  "Cần bổ sung"

**Luồng Chính**
1.	Nhân viên truy cập vào danh sách các hồ sơ chờ kiểm tra.
2.	Hệ thống nạp và hiển thị danh sách các hồ sơ chờ kiểm tra.
3.	Nhân viên chọn một hồ sơ để kiểm tra.
4.	Hệ thống nạp và hiển thị thông tin chi tiết hồ sơ.
5.	Nhân viên chọn tài liệu cần xem.
6.	Hệ thống hiện thị nội dung của tài liệu.
7.	Nhân viên tick chọn để xác nhận từng tài liệu hợp lệ.
8.	Nhân viên chọn Xác nhận hồ sơ hợp lệ.
9.	Hệ thống hiển thị dialog "Xác nhận hồ sơ này hợp lệ?" [Hủy] [Xác nhận]
10.	Nhân viên chọn Xác nhận.
11.	Hệ thống cập nhật trạng thái hồ sơ thành Đã hoàn thiện.
12.	Nhân viên đánh dấu tiến độ
13.	Nhân viên gửi thông báo cho người dùng qua hệ thống

**Luồng Phụ**
A8a: Nếu Tick chọn chưa đầy đủ thì:
3.	Hệ thống hiện thị chưa kiểm tra toàn bộ hồ sơ.
4.	Quay lại bước 7.
A8b: Nếu cần chỉnh sửa hoặc bổ sung hồ sơ thì:
10.	Nhân viên chọn Yêu cầu bổ sung.
11.	Nhân viên nhập thông tin yêu cầu bổ sung vào text box.
12.	Nhân viên chọn gửi yêu cầu.
13.	Hệ thống xác nhận text box phải có nội dung.
14.	Hệ thống hiển thị: "Đã gửi yêu cầu bổ sung".
15.	Hệ thống cập nhật trạng thái hồ sơ thành Cần bổ sung.
16.	Thực hiện bước 12.
A9: Nếu chọn hủy thì:
17.	Hệ thống giữ lại các thông tin tick chọn
18.	Quay lại bước 7.

---

## 1.12. Cập nhật tiến độ định kỳ

**Tên Use Case**  
Cập nhật tiến độ định kỳ

**Mô tả**  UC cho phép Nhân viên đánh dấu giai đoạn tiến độ đã được nộp và gửi thông báo xác nhận cho chủ nhiệm đề tài.

**Actor**  Nhân viên

**Tiền Điều Kiện**  Nhân viên đã đăng nhập
Trạng thái hồ sơ: “Đã hoàn thiện”

**Hậu Điều Kiện**  Thành công: Thông báo gửi đến người dùng
Không thành công: Thông báo chưa tới được người dùng

**Luồng Chính**
1.	Nhân viên truy cập "Hồ sơ tiến độ đã kiểm tra"
2.	Hệ thống nạp và hiển thị danh sách theo kỳ báo cáo.
3.	Nhân viên chọn đề tài.
4.	Hệ thống hiển thị chi tiết tiến độ đã nộp.
5.	Nhân viên xác nhận "Đánh dấu đã hoàn thành kỳ X"
6.	Hệ thống cập nhật tiến trình đề tài.
7.	Hệ thống gửi thông báo xác nhận cho Chủ nhiệm đề tài.

**Luồng Phụ**

---

## 1.13. Gửi tổng hợp tiến độ các đề tài

**Tên Use Case**  Gửi tổng hợp tiến độ các đề tài

**Mô tả**  UC cho phép Nhân viên tổng hợp tiến độ các đề tài và gửi báo cáo tới hội đồng

**Actor**  Nhân viên

**Tiền Điều Kiện**  Nhân viên đã đăng nhập
Các hồ sơ hiện có trên hệ thống

**Hậu Điều Kiện**  Thành công: Tiến Độ tổng hợp định kỳ của các đề tài được gửi tới hội đồng
Không thành công: Tiến độ tổng hợp mỗi kỳ chưa được gửi tới hội đồng

**Luồng Chính**
1.	Nhân viên chọn danh sách đề tài hồ sơ cần tổng hợp tiến độ.
2.	Hệ thống nạp và hiển thị danh sách đề tài.
3.	Nhân viên tích chọn tất cả các đề tài cần tổng hợp tiến độ
4.	Nhân viên chọn tạo bảng tổng hợp.
5.	Hệ thống lưu thông tin.
6.	Nhân viên chọn gửi báo cáo
7.	Hệ thống gửi và thông báo đến hội đồng

**Luồng Phụ**
A4. Nếu tất cả đề tài chưa được chọn. Hệ thống báo lỗi. 
A6. Nếu nhân viên chưa tạo bảng báo cáo tổng hợp. Hệ thống báo lỗi

---

## 1.14. Nhắc nộp hồ sơ nghiệm thu

**Tên UC**  Nhắc nộp hồ sơ nghiệm thu

**Actor**  Nhân viên

**Tiền điều kiện**  Đã đăng nhập vào hệ thống

**Hậu điều kiện**  Thông báo nhắc nhở nộp hồ sơ đã được gởi đến chủ nhiệm đề tài

**Luồng chính**
1. Hệ thống nạp và hiển thị danh sách đề tài tới hạn nộp hồ sơ nghiệm thu
2. Nhân viên chọn đề tài cần báo cáo
3. Hệ thống nạp dữ liệu của đề tài
4. Hệ thống hiển thị thông tin đề tài
5. Nhân viên chọn gửi thông báo đến chủ nhiệm đề tài
6. Hệ thống gửi thông báo

**Luồng Phụ**
A1. Nếu không có đề tài nào tới hạn, hệ thống hiển thị thông báo “Không có đề tài nào đến hạn nộp trong vòng 10 ngày”

---

## 1.15. Tải lên hồ sơ nghiệm thu

**Tên UC**  Tải lên hồ sơ nghiệm thu

**Actor**  Chủ nhiệm đề tài

**Tiền điều kiện**  Đã đăng nhập vào hệ thống
Đề tài tới hạn cần cập nhật hồ sơ nghiệm thu

**Hậu điều kiện**  Hồ sơ nghiệm thu đã được upload lên hệ thống thành công

**Luồng chính**
1. Hệ thống nạp và hiển thị danh sách các đề tài cần nghiệm thu
2. Chủ nhiệm chọn đề tài cần nghiệm thu
3. Hệ thống nạp và hiển thị thông tin đề tài và thông tin các danh mục hồ sơ kèm trạng thái
4. Chủ nhiệm đề tài chọn danh mục hồ sơ nghiệm thu 
5. Chủ nhiệm đề tài tải lên từng hồ sơ
6. Chủ nhiệm bấm chọn gởi
7. Hệ thống lưu thông tin và gửi thông báo cho nhân viên

**Luồng Phụ**
A5. Nếu hồ sơ sai định dạng, vượt kích thước cho phép thì hệ thống thông báo lỗi
A7. Nếu chưa tải lên đủ toàn bộ hồ sơ theo danh mục thì hệ thống báo lỗi 

---

## 1.16. Lập danh sách đề tài cần nghiệm thu

**Tên UC**  Lập danh sách đề tài cần nghiệm thu

**Actor**  Nhân viên

**Tiền điều kiện**  Đã đăng nhập vào hệ thống
Các hồ sơ nghiệm thu đã được tải lên đầy đủ trên hệ thống.

**Hậu điều kiện**  Các hồ sơ nghiệm thu được nhập liệu đầy đủ thông tin trên hệ thống

**Luồng chính**
1.	Nhân viên chọn danh sách đề tài sẵn sàng chờ đánh giá nghiệm thu
2.	Hệ thống nạp và hiển thị danh sách đề tài sẵn sàng đánh giá nghiệm thu
3.	Nhân viên tick chọn đề tài cần lập danh sách chờ đánh giá nghiệm thu
4.	Nhân viên chọn lập danh sách
5.	Hệ thống tạo danh sách đề tài và chuyển trạng thái của các đề tài sang chờ đánh giá nghiệm thu
6.	Nhân viên chọn lưu danh sách
7.	Hệ thống lưu danh sách
8.	Nhân viên chọn gởi
9.	Hệ thống gởi danh sách nghiệm thu và thông báo cho hội đồng nghiệm thu

**Luồng Phụ**
A2. Nếu danh sách rỗng thì hệ thống hiển thị thông tin danh sách rỗng và bỏ qua các bước từ 3 đến 9
A6. Nếu danh sách chưa được lập thì hệ thống báo lỗi chưa có đề tài nào được chọn

---

## 1.17. Đánh giá nghiệm thu

**Tên UC**  Đánh giá nghiệm thu

**Actor**  Hội đồng nghiệm thu

**Tiền điều kiện**  Đã đăng nhập vào hệ thống
Đề tài nghiệm thu đã được kiểm tra đầy đủ và sẵn sàng chờ đánh giá

**Hậu điều kiện**  Đề tài đã được đánh giá cho điểm bởi thành viên hội đồng nghiệm thu

**Luồng chính**
1.	Hội đồng nghiệm thu chọn danh sách đề tài cần đánh giá nghiệm thu
2.	Hệ thống nạp và hiển thị danh sách đề tài cần đánh giá nghiệm thu
3.	Thành viên Hội đồng chọn đề tài cần đánh giá
4.	Hệ thống nạp dữ liệu của đề tài (bao gồm các hồ sơ đính kèm cần thiết)
5.	Hội đồng chọn xem tài liệu
6.	Hệ thống nạp và hiển thị thông tin tài liệu
7.	Hội đồng lập phiếu đánh giá gồm điểm (bắt buộc)
8.	Hội đồng chọn hoàn tất
9.	Hệ thống tính toán xếp hạng và lưu trữ thông tin
10.	Hệ thống gởi thông báo cho nhân viên

**Luồng Phụ**
A7. Nếu chưa tạo phiếu đánh giá, hoặc phiếu đánh giá thiếu thông tin thì hệ thống hiện cảnh báo và yêu cầu hoàn thiện đủ.

---

## 1.18. Lưu trữ biên bản, bảng điểm và kết quả

**Tên UC**  Lưu trữ biên bản, bảng điểm và kết quả

**Actor**  Nhân viên

**Tiền điều kiện**  Đã đăng nhập vào hệ thống
Hội đồng nghiệm thu đã đánh giá kết đề tài và có kết quả xếp hạng

**Hậu điều kiện**  Nhân viên lưu trữ thành công kết quả đề tài và hoàn tất công việc

**Luồng chính**
1.	Nhân viên chọn danh sách đề tài đã được đánh giá nghiệm thu.
2.	Hệ thống nạp và hiển thị danh sách đề tài.
3.	Nhân viên chọn đề tài cần lưu trữ.
4.	Hệ thống nạp và hiển thị thông tin kết quả đề tài.
5.	Nhân viên chọn xác nhận.
6.	Hệ thống lưu trữ thông tin .

**Luồng Phụ**
A4. Nếu kết quả đề tài chưa đạt, thì nhân viên gởi thông báo yêu cầu chủ nhiệm đề tài bổ sung/làm rõ thông tin

---

## 1.19. Kiểm tra hồ sơ nghiệm thu

**Tên Use Case**  Kiểm tra hồ sơ nghiệm thu

**Mô tả**  UC cho phép Nhân viên kiểm tra tính đầy đủ, hợp lệ của hồ sơ  theo checklist và đưa ra quyết định xác nhận hoặc yêu cầu bổ sung.

**Actor**  Nhân viên

**Tiền Điều Kiện**  Đã đăng nhập vào hệ thống
Hồ sơ đã được nhập liệu trên hệ thống

**Hậu Điều Kiện**  Thành công: Trạng thái hồ sơ "Đã hoàn thiện", sẵn sàng đánh giá
Không thành công: Trạng thái hồ sơ  "Cần bổ sung"

**Luồng Chính**
1.	Nhân viên truy cập vào danh sách các hồ sơ chờ kiểm tra.
2.	Hệ thống nạp và hiển thị danh sách các hồ sơ chờ kiểm tra.
3.	Nhân viên chọn một hồ sơ để kiểm tra.
4.	Hệ thống nạp và hiển thị thông tin chi tiết hồ sơ.
5.	Nhân viên chọn tài liệu cần xem.
6.	Hệ thống hiện thị nội dung của tài liệu.
7.	Nhân viên tick chọn để xác nhận từng tài liệu hợp lệ.
8.	Nhân viên chọn Xác nhận hồ sơ hợp lệ.
9.	Hệ thống hiển thị dialog "Xác nhận hồ sơ này hợp lệ?" [Hủy] [Xác nhận]
10.	Nhân viên chọn Xác nhận.
11.	Hệ thống cập nhật trạng thái hồ sơ thành Đã hoàn thiện.
12.	Hệ thống gởi thông báo tới hội đồng nghiệm thu.

**Luồng Phụ**
A8a: Nếu Tick chọn chưa đầy đủ thì:
1.	Hệ thống hiện thị chưa kiểm tra toàn bộ hồ sơ.
2.	Quay lại bước 7.
A8b: Nếu cần chỉnh sửa hoặc bổ sung hồ sơ thì:
1.	Nhân viên chọn Yêu cầu bổ sung.
2.	Nhân viên nhập thông tin yêu cầu bổ sung vào text box.
3.	Nhân viên chọn gửi yêu cầu.
4.	Hệ thống xác nhận text box phải có nội dung.
5.	Hệ thống hiển thị: "Đã gửi yêu cầu bổ sung".
6.	Hệ thống cập nhật trạng thái hồ sơ thành Cần bổ sung.
7.	Thực hiện bước 12.
A9: Nếu chọn hủy thì:
8.	Hệ thống giữ lại các thông tin tick chọn
9.	Quay lại bước 7.

---

## 1.20. Xác nhận hoàn tất đề tài

**Tên UC**  Xác nhận hoàn tất đề tài

**Actor**  Nhân viên

**Tiền điều kiện**  Nhân viên đã đăng nhập
Hồ sơ đã được xếp loại trên hệ thống

**Hậu điều kiện**  Kết quả xếp loại đề tài được thống báo tới chủ nhiệm đề tài

**Luồng chính**
1. Hệ thống nạp và hiển thị danh sách đề tài đã được xếp loại kết quả
2. Nhân viên chọn đề tài có kết quả là Đạt
3. Hệ thống nạp và hiển thị đề tài
4. Nhân viên chuyển trạng thái đề tài sang hoàn tất
5. Nhân viên chọn gửi thông báo kết quả cho chủ nhiệm đề tài
6. Hệ thống gởi thông báo và lưu hồ sơ

**Luồng Phụ**
