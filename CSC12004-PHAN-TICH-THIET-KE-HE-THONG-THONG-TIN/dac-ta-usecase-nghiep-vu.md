# 2. ĐẶC TẢ USECASE NGHIỆP VỤ

## 2.1. Đăng Ký Thực Hiện Đề Tài

**Tên Use Case:** Đăng Ký Thực Hiện Đề Tài

**Mô Tả:** UC bắt đầu khi có đề xuất đề tài từ người dùng (giảng viên/sinh viên). UC mô tả quy trình hoàn chỉnh từ tiếp nhận đề xuất đến khi đề tài được phê duyệt và chuyển sang trạng thái triển khai.

**Dòng Cơ Bản:**
1. Nhân viên tiếp nhận đề xuất từ người dùng (giảng viên hoặc sinh viên) thông qua trao đổi trực tiếp hoặc email.
2. Nhân viên tạo hồ sơ sơ bộ trên hệ thống: nhập tên đề tài, người đề xuất, lĩnh vực, thời gian dự kiến.
3. Thực hiện UC Hoàn thiện hồ sơ đề tài.
4. Thực hiện UC Xét duyệt hồ sơ đề tài.
5. Nếu đề tài được phê duyệt, nhân viên xác nhận trạng thái đề tài sang “Đang thực hiện”.
6. Nhân viên gửi thông báo cho người dùng.
7. Nhân viên hướng dẫn người dùng cách quản lý tiến độ và tài liệu trong quá trình triển khai.

**Dòng Thay Thế:**
- A4: Nếu đề tài không được phê duyệt thì:
  - • bỏ qua bước 5, 6, 7
  - • Use case kết thúc

---

## 2.2. Hoàn Thiện Hồ Sơ Đề Tài

**Tên Use Case:** Hoàn Thiện Hồ Sơ Đề Tài

**Mô Tả:** UC bắt đầu sau khi đã tạo hồ sơ sơ bộ trên hệ thống. UC mô tả quy trình hướng dẫn người dùng chuẩn bị, tải lên và kiểm tra tính hợp lệ của hồ sơ đề tài.

**Dòng Cơ Bản:**
1. Nhân viên hướng dẫn người dùng hoàn thiện bộ hồ sơ đề tài bao gồm: đề cương, mục tiêu, thuyết minh, kế hoạch triển khai, danh sách thành viên.
2. Nhân viên hỗ trợ người dùng tải lên đầy đủ các tài liệu vào hệ thống.
3. Nhân viên kiểm tra tính đầy đủ và hợp lệ của hồ sơ

**Dòng Thay Thế:**
- A3: Nếu hồ sơ không đầy đủ hoặc không hợp lệ thì  
  1. Nhân viên thông báo thông tin không hợp lệ cho người dùng  
  2. Quay lại bước 1.

---

## 2.3. Xét Duyệt Hồ Sơ Đề Tài

**Tên Use Case:** Xét Duyệt Hồ Sơ Đề Tài

**Mô Tả:** UC bắt đầu sau khi hồ sơ đã được hoàn thiện và xác nhận hợp lệ UC mô tả quy trình gửi hồ sơ đến Hội đồng khoa học, theo dõi và nhận kết quả xét duyệt

**Dòng Cơ Bản:**
1. Nhân viên gửi hồ sơ sang bộ phận Hội đồng khoa học để xét duyệt.
2. Hội đồng khoa học xét duyệt hồ sơ đề tài.
3. Nhân viên nhận phản hồi và kết quả phê duyệt từ Hội đồng khoa học.

**Dòng Thay Thế:**
- A3: Nếu Hội đồng yêu cầu chỉnh sửa hoặc bổ sung thì:  
  1. Thực hiện UC Cập nhật hồ sơ  
  2. Nhân viên gửi hồ sơ sang bộ phận Hội đồng khoa học để xét duyệt vòng cuối.  
  3. Hội đồng khoa học xét duyệt hồ sơ đề tài vòng cuối.  
  4. Nhân viên nhận phản hồi và kết quả xét duyệt vòng cuối.

---

## 2.4. Cập Nhật Hồ Sơ

**Tên Use Case:** Đăng Ký Thực Hiện Đề Tài

**Mô Tả:** UC bắt đầu khi Hội đồng khoa học yêu cầu chỉnh sửa hoặc bổ sung. UC mô tả quy trình thông báo, hướng dẫn người dùng chỉnh sửa và cập nhật hồ sơ lên hệ thống.

**Dòng Cơ Bản:**
1. Nhân viên liên hệ lại với người đề xuất để thông báo yêu cầu chỉnh sửa.
2. Nhân viên hướng dẫn người dùng thực hiện chỉnh sửa chi tiết.
3. Nhân viên tiếp nhận hồ sơ đã chỉnh sửa.
4. Nhân viên cập nhật lại hồ sơ lên hệ thống.

**Dòng Thay Thế:**

---

## 2.5. Quản lý tiến độ thực hiện đề tài

**Tên Use Case:** Quản lý tiến độ thực hiện đề tài

**Mô Tả:**
- UC bắt đầu khi đề tài đã được phê duyệt và chuyển sang trạng thái “Đang thực hiện”.
- UC mô tả quá trình theo dõi và nhắc nhở thực hiện báo cáo tiến độ theo các mốc thời gian đã đăng ký.

**Dòng Cơ Bản:**
1) Nhân viên thông báo với chủ nhiệm đề tài các mốc thời gian báo cáo tiến độ theo kế hoạch đã đăng ký.  
2) Nhân viên theo dõi các mốc thời gian báo cáo.  
3) Nếu đến mốc báo cáo, Thực hiện UC báo cáo một kỳ.

**Dòng Thay Thế:**
- A2:  
  - Nếu hết các mốc báo cáo thì bỏ qua bước 3.  
  - Nếu chưa đến mốc báo cáo thì quay lại bước 2.

---

## 2.6. Báo cáo một kỳ

**Tên Use Case:** Báo cáo một kỳ

**Mô Tả:**
- UC bắt đầu khi đến mốc thời gian báo cáo tiến độ.
- UC mô tả quá trình thực hiện báo cáo tiến độ cho một kỳ.

**Dòng Cơ Bản:**
1) Nhân viên nhắc nhở và hướng dẫn chủ nhiệm đề tài chuẩn bị nội dung báo cáo tiến độ, bao gồm: các công việc đã hoàn thành, kết quả đạt được, khó khăn phát sinh và kế hoạch tiếp theo.  
2) Nhân viên sẽ hỗ trợ người dùng tải tài liệu lên đúng danh mục trên hệ thống.  
3) Nhân viên nhập các trường thông tin mô tả tiến độ để lưu trữ chính thức.  
4) Nhân viên kiểm tra tính đầy đủ và định dạng của báo cáo.  
5) Nếu báo cáo đầy đủ và đúng định dạng thì, Nhân viên đánh dấu giai đoạn tiến độ đã được nộp.  
6) Nhân viên gửi thông báo xác nhận cho người dùng.  
7) Nhân viên tổng hợp tiến độ từ các đề tài.  
8) Nhân viên báo cáo cho quản lý hoặc hội đồng theo dõi.

**Dòng Thay Thế:**
- A4: Nếu không đầy đủ hoặc sai định dạng thì:  
  1) Nhân viên phản hồi lại người dùng để chỉnh sửa.  
  2) Quay lại bước 2.

---

## 2.7. Đánh giá, nghiệm thu và lưu trữ đề tài

**Tên Use Case:** Đánh giá, nghiệm thu và lưu trữ đề tài

**Mô Tả:**
- UC bắt đầu khi đề tài bước vào giai đoạn hoàn tất.
- UC mô tả quá trình đánh giá, nghiệm thu và lưu trữ kết quả đề tài.

**Dòng Cơ Bản:**
1) Nhân viên nhắc nộp hồ sơ nghiệm thu, bao gồm báo cáo tổng kết, sản phẩm nghiên cứu và các tài liệu minh chứng liên quan.  
2) Nhân viên nhập thông tin đề tài vào danh sách chờ đánh giá trên hệ thống.  
3) Thực hiện UC Trình hồ sơ cho Hội đồng đánh giá.  
4) Thành viên hội đồng đánh giá đề tài.  
5) Thực hiện UC Tổng hợp kết quả.  
6) Nhân viên lưu trữ toàn bộ biên bản, bảng điểm và kết quả vào hồ sơ đề tài điện tử.  
7) Nhân viên kiểm tra kết quả đánh giá từ hệ thống  
8) Nếu kết quả đạt, Nhân viên chuyển trạng thái của đề tài sang “Hoàn tất”  
9) Nhân viên đưa hồ sơ vào thư viện lưu trữ để tra cứu sau này.

**Dòng Thay Thế:**
- A3: Nếu có thành viên trong hội đồng gặp khó khăn khi truy cập hoặc thiếu tài liệu thì:  
  1. Nhân viên hỗ trợ trực tiếp để đảm bảo thông tin đầy đủ và thuận tiện cho việc chấm điểm.  
- A7: Nếu kết quả không đạt thì:  
  1. Nhân viên hướng dẫn người dùng thực hiện chỉnh sửa theo góp ý và chuẩn bị tái đánh giá.  
  2. Quay lại bước 3.

---

## 2.8. Trình hồ sơ cho Hội đồng Nghiệm Thu

**Tên Use Case:** Trình hồ sơ cho Hội đồng Nghiệm Thu

**Mô Tả:**
- UC bắt đầu khi hồ sơ nghiệm thu đã được kiểm tra hợp lệ.
- UC mô tả quá trình kiểm tra và chuyển hồ sơ đến hội đồng nghiệm thu.

**Dòng Cơ Bản:**
1) Nhân viên tiếp nhận hồ sơ nghiệm thu từ chủ nhiệm đề tài.  
2) Nhân viên kiểm tra tính hợp lệ của hồ sơ nghiệm thu.  
3) Nếu hồ sơ hợp lệ, Nhân viên chuyển hồ sơ đến hội đồng nghiệm thu theo phân công.  
4) Nhân viên gửi thông báo đến từng thành viên hội đồng, hướng dẫn cách truy cập hồ sơ đề tài trên hệ thống và thời hạn đánh giá.

**Dòng Thay Thế:**
- A2: Nếu hồ sơ không hợp lệ thì:  
  1. Nhân viên liên hệ chủ nhiệm đề tài để nhắc chỉnh sửa hồ sơ nghiệm thu.  
  2. Quay lại bước 1.  
- A4: Nếu có thành viên trong hội đồng gặp khó khăn khi truy cập hoặc thiếu tài liệu thì:  
  1. Nhân viên trực tiếp hỗ trợ để thành viên hội đồng truy cập đầy đủ thông tin và tài liệu.

---

## 2.9. Tổng hợp kết quả

**Tên Use Case:** Tổng hợp kết quả

**Mô Tả:**
- UC bắt đầu sau khi các thành viên hội đồng hoàn tất đánh giá.
- UC mô tả quá trình thu thập, tổng hợp và lưu trữ kết quả đánh giá.

**Dòng Cơ Bản:**
1) Nhân viên thu thập các phiếu nhận xét từ các thành viên hội đồng.  
2) Nhân viên tổng hợp kết quả đánh giá.  
3) Nhân viên nhập điểm và xếp loại đề tài trên hệ thống.  
4) Nhân viên thông báo kết quả cho chủ nhiệm đề tài.

**Dòng Thay Thế:**
