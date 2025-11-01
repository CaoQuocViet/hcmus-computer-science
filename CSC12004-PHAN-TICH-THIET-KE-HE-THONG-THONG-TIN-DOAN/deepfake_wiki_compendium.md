# Deepfake — Tóm tắt nội dung chính (tiếng Việt)
*Phiên bản:* 2025-10-31  
*Nguồn chính:* Wikipedia “Deepfake” và các trang liên quan. Tài liệu này **tóm tắt súc tích** (không hướng dẫn tạo deepfake).

---

## 1) Khái niệm & bức tranh tổng quát
- **Deepfake**: nội dung **giả lập hoặc bị thao túng** (video/ảnh/âm thanh) do ML/AI sinh ra, khiến người xem tưởng là thật.  
- **Động lực kỹ thuật**: thế hệ mô hình **VAE/Autoencoder → GAN → Diffusion (DDPM/LDM)**, cộng thêm **lip-sync** và **voice cloning**.  
- **Tác động xã hội**: hình ảnh nhạy cảm không đồng thuận, lừa đảo/giả mạo giọng nói, thao túng chính trị, làm xói mòn niềm tin (“*liar’s dividend*”).

## 2) Phân loại & kỹ thuật cốt lõi
- **Face swap**: thay khuôn mặt nguồn vào người mục tiêu.  
- **Face reenactment**: lái biểu cảm/động tác của mục tiêu bằng nguồn (ví dụ *Face2Face*).  
- **Lip‑sync / Talking‑head**: đồng bộ khẩu hình theo âm thanh (ví dụ *Wav2Lip*).  
- **Audio deepfake**: TTS/voice conversion để tạo/giả giọng nói.  
- **Các họ mô hình chính**:  
  - **Autoencoder/VAE**: mã hoá‑giải mã, nền tảng cho wave đầu.  
  - **GAN** (ví dụ **StyleGAN**): chi tiết cao, điều khiển thuộc tính tốt.  
  - **Diffusion**/**Latent Diffusion**: chất lượng cao, điều kiện hoá linh hoạt (văn bản/hình/âm thanh).

## 3) Dữ liệu & benchmark
- **FaceForensics++**, **DFDC**, **Celeb‑DF**: bộ chuẩn cho phát hiện deepfake video/ảnh.  
- **Âm thanh**: **ASVspoof**, **ADD**; nói chung dùng cho giả giọng & chống giả giọng.  
- **Tài nguyên liên quan nói‑nhìn**: **VoxCeleb**, **LRS** cho nghiên cứu nói‑hình.

## 4) Phát hiện (forensics) — tín hiệu & mô hình
- **Tín hiệu hình ảnh**: viền ghép/blending, bất nhất ánh sáng/hình học, lỗi kết cấu.  
- **Tín hiệu sinh lý**: **nháy mắt**, **rPPG** (nhịp mạch qua thay đổi màu da) — thường bất thường trong deepfake.  
- **Đồng bộ AV**: lệch nhịp khẩu hình‑âm thanh, bất thường ngữ âm/điều hợp.  
- **Mô hình**: CNN/Transformer 2D; 3D/temporal cho video; **audio‑visual fusion**.  
- **Độ bền**: cần kiểm tra nén/resize, “unseen generators”, và chống đối kháng.  
- **Đánh giá/ops**: AUC/AP/EER; thử nghiệm chéo bộ dữ liệu; **human‑in‑the‑loop** trong sản xuất.

## 5) Gắn nhãn & nguồn gốc nội dung
- **Watermark vô hình**: chỉ báo nguồn, nhưng có thể mong manh.  
- **C2PA (Content Credentials)**: **chứng thực nguồn gốc** (máy ảnh/sửa đổi/phát hành) bằng chữ ký số; không chứng minh “thật/giả”, mà ghi lại **lịch sử** nội dung.  
- Kết hợp **forensics + provenance** để tăng tin cậy.

## 6) Rủi ro & mẫu lạm dụng
- **Nội dung nhạy cảm không đồng thuận**, **lừa đảo/CEO fraud**, **tuyên truyền chính trị**.  
- **Hậu quả thứ cấp**: ai cũng có thể phủ nhận “đoạn clip thật”, làm khó điều tra & phản biện.

## 7) Khung pháp lý (tóm tắt nhanh, không toàn diện)
- **EU AI Act**: yêu cầu **minh bạch**/gắn nhãn nội dung tổng hợp.  
- **Mỹ**: nhiều **luật bang** về deepfake (bầu cử, nội dung khiêu dâm không đồng thuận).  
- **Hàn Quốc**: xử phạt nặng đối với deepfake khiêu dâm.  
- **Trung Quốc**: quy định **Deep Synthesis** yêu cầu gắn nhãn & trách nhiệm nền tảng.  
- Thực thi còn khác nhau theo khu vực; luôn kiểm tra văn bản pháp lý hiện hành.

## 8) Khuyến nghị thực hành (nhà nghiên cứu & nền tảng)
- **Không cung cấp** hướng dẫn tạo deepfake; tập trung vào **an toàn**.  
- Dùng **nhiều tín hiệu** (hình/sinh lý/âm thanh) + **quy trình xem xét thủ công** cho nội dung nhạy cảm.  
- Áp dụng **C2PA**/gắn nhãn; lưu **lịch sử chỉnh sửa**.  
- **Giới hạn lan truyền** (rate‑limit), ưu tiên rà soát nội dung chính trị; kênh báo cáo & gỡ nhanh.  
- **Huấn luyện liên tục** để theo kịp mô hình mới; theo dõi độ bền nén/định dạng.

## 9) Thuật ngữ nhanh
- **Deepfake**: nội dung tổng hợp/thao túng bởi AI.  
- **Face swap / reenactment / lip‑sync**: thay mặt / lái biểu cảm / đồng bộ khẩu hình.  
- **GAN / VAE / Diffusion (LDM)**: các họ mô hình sinh.  
- **rPPG**: *remote photoplethysmography* — suy nhịp tim từ thay đổi màu da.  
- **C2PA**: tiêu chuẩn chứng thực nguồn gốc nội dung.  
- **DFDC / FaceForensics++**: bộ dữ liệu chuẩn phát hiện deepfake.

## 10) Tài liệu tham khảo chính (liên kết)
- Wikipedia: **Deepfake** — https://en.wikipedia.org/wiki/Deepfake  
- Wikipedia: **Digital face replacement** — https://en.wikipedia.org/wiki/Digital_face_replacement  
- Wikipedia: **Audio deepfake** — https://en.wikipedia.org/wiki/Audio_deepfake  
- Wikipedia: **GAN** — https://en.wikipedia.org/wiki/Generative_adversarial_network  
- Wikipedia: **Variational autoencoder (VAE)** — https://en.wikipedia.org/wiki/Variational_autoencoder  
- Karras et al., **StyleGAN** (2018) — https://arxiv.org/abs/1812.04948  
- Ho et al., **DDPM** (2020) — https://arxiv.org/abs/2006.11239  
- Rombach et al., **Latent Diffusion** (2021) — https://arxiv.org/abs/2112.10752  
- Bregler et al., **Video Rewrite** (1997) — https://www2.eecs.berkeley.edu/Research/Projects/CS/vision/human/bregler-sig97.pdf  
- Thies et al., **Face2Face** (2016) — https://niessnerlab.org/papers/2019/8facetoface/thies2018face.pdf  
- Suwajanakorn et al., **Synthesizing Obama** (2017) — https://grail.cs.washington.edu/projects/AudioToObama/siggraph17_obama.pdf  
- Prajwal et al., **Wav2Lip** (2020) — https://arxiv.org/abs/2008.10010  
- Rössler et al., **FaceForensics++** (2019) — https://arxiv.org/abs/1901.08971  
- Dolhansky et al., **DFDC** (2020) — https://arxiv.org/abs/2006.07397  
- **ASVspoof** Challenge — https://www.asvspoof.org/  
- **C2PA** Specifications — https://c2pa.org/specifications/specifications/  
- **EU AI Act** — https://artificialintelligenceact.eu/

> Gợi ý: Khi cần dẫn nguồn pháp lý/tiêu chuẩn, hãy mở liên kết để kiểm tra **bản cập nhật mới nhất**.

---

*Hết.*
