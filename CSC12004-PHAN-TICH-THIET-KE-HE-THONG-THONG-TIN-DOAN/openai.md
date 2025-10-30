# BÁO CÁO CUỐI KỲ
## Chủ đề: EMBEDDING (Machine Learning) & DEEPFAKE (Synthetic Media)
**Tác giả:** Nguyễn Đình Khánh  
**Ngày:** 30/10/2025  
**Môn học:** Machine Learning & AI Systems

---

## Executive Summary
Tài liệu này trình bày chuyên sâu và có hệ thống về hai chủ đề cốt lõi: **Embedding** (biểu diễn véc-tơ) và **Deepfake** (truyền thông tổng hợp do AI). Phần I khởi đầu từ trực quan đến nền tảng toán—thống kê—tối ưu, bao quát các họ thuật toán (SGNS/word2vec, GloVe, matrix factorization, contrastive learning, contextual/sentence embedding, multimodal như CLIP, graph/audio/image embedding), kỹ thuật đo tương tự, trực quan hóa, tìm kiếm lân cận xấp xỉ (ANN) và các thực hành tốt (hubness, anisotropy, chuẩn hóa…). Phần II định nghĩa và phân loại deepfake, mô hình sinh (GAN/VAE/Diffusion, video diffusion), pipeline tạo–phát hiện, bộ dữ liệu và thước đo, chuỗi tin cậy nội dung (C2PA/Content Credentials), cùng bối cảnh pháp lý (EU AI Act yêu cầu gắn nhãn) và quản trị rủi ro.  
Bản báo cáo đi kèm **sơ đồ minh hoạ (Mermaid)**, **công thức**, **bảng**, và **tham chiếu** tới nguồn chính thống (Wikipedia, bài báo học thuật, tiêu chuẩn, tài liệu dự án).

> **Phạm vi**: nội dung cô đọng ở mức ~15–25 trang A4 khi in (tuỳ cỡ chữ/khoảng cách dòng), tập trung vào tính đúng đắn, tường minh và trích dẫn.

---

# PHẦN I — EMBEDDING

## 1. Khái niệm, Trực quan và Bối cảnh
**Embedding** là ánh xạ đối tượng dữ liệu (từ, câu, tài liệu, ảnh, âm thanh, node đồ thị…) sang **véc‑tơ thực** có số chiều cố định, sao cho **cấu trúc ngữ nghĩa/quan hệ** trong miền gốc được **bảo toàn** ở mức phục vụ tác vụ đích (tìm kiếm, phân cụm, xếp hạng, khuyến nghị, RAG/semantic search, phát hiện tương đồng…).  
Trực quan: nếu hai đối tượng “giống nhau về nghĩa”, véc‑tơ của chúng **gần nhau** theo một độ đo (cosine, L2…). Embedding thay thế biểu diễn sparse (one‑hot) bằng biểu diễn dense học từ dữ liệu, khai thác **giả thuyết phân bố** (distributional) và **giả thuyết đa tạp** (manifold).

**Lợi ích chính**: (i) nén thông tin, (ii) học đặc trưng có khả năng tổng quát, (iii) hỗ trợ các phép toán hình học (gần‑xa, nội suy), (iv) hiệu quả tính toán và lưu trữ cho hệ thống tìm kiếm quy mô lớn.

**Ứng dụng tiêu biểu**:  
- NLP: semantic search, RAG, xếp hạng, clustering, entity linking, câu hỏi‑trả lời.  
- CV: image retrieval, deduplication, near‑duplicate detection, sản phẩm tương tự.  
- Audio: speaker verification (x‑vector), keyword spotting.  
- Recommender: metric learning, two‑tower retrieval.  
- Graph: link prediction, node classification.

**Tài liệu khởi đầu**: Wikipedia “Embedding (machine learning)” [link](https://en.wikipedia.org/wiki/Embedding_(machine_learning)).

---

## 2. Nền tảng Toán—Xác suất—Tối ưu
### 2.1. Phân bố đồng xuất hiện & PMI
Cho từ trung tâm \(w\) và từ bối cảnh \(c\), **PMI** (Pointwise Mutual Information):
\[
\mathrm{PMI}(w,c)=\log\frac{p(w,c)}{p(w)p(c)}.
\]
Nhiều mô hình (SGNS/word2vec) có thể xem như **factorization xấp xỉ** của PMI dịch chuyển (shifted PMI).

### 2.2. Hàm mất mát tiêu biểu
- **Skip-gram Negative Sampling (SGNS)** — word2vec:  
  \[
  \mathcal{L}=-\sum_{(w,c)\in D}\left[\log\sigma(\mathbf{u}_w^\top\mathbf{v}_c)
  +\sum_{i=1}^k \log\sigma(-\mathbf{u}_w^\top\mathbf{v}_{n_i})\right],
  \]
  với \(n_i\) là mẫu âm từ phân phối nhiễu.  
- **GloVe** (Global Vectors): tối ưu hoá hàm mất mát bình phương có trọng số trên **log đếm đồng xuất hiện** \(X_{wc}\).  
- **Contrastive / InfoNCE** (biến thể phổ biến trong học tương phản): cho cặp dương \( (x, x^+) \) và tập âm \(\{x^-_j\}\):  
  \[
  \mathcal{L}_{\mathrm{NCE}}=-\log\frac{\exp(\mathrm{sim}(f(x), f(x^+))/\tau)}{\sum_{z\in\{x^+\}\cup\{x^-_j\}}\exp(\mathrm{sim}(f(x),f(z))/\tau)}.
  \]

### 2.3. Chuẩn hoá và đẳng hướng
- **Chuẩn hoá L2**: \(\hat{\mathbf{z}}=\frac{\mathbf{z}}{\|\mathbf{z}\|_2}\) giúp **ổn định** và khiến cosine giống dot‑product.  
- **Anisotropy** (mất đẳng hướng) ở embedding ngôn ngữ ngữ cảnh: véc‑tơ tụ về một vài phương trội; cách khắc phục: **mean-centering**, “all‑but‑the‑top”, **whitening**.

### 2.4. Khoảng cách và số chiều
- **Cosine** phù hợp khi hướng quan trọng hơn độ lớn.  
- **Euclid (L2)**: hữu ích khi mô hình huấn luyện theo dot‑product/L2.  
- **Mahalanobis**: học metric (LMNN/ITML) nhưng tốn tham số khi \(d\) lớn.

---

## 3. Họ Thuật toán Embedding
### 3.1. NLP: từ → câu → tài liệu
- **Word2Vec** (CBOW/Skip‑gram), **GloVe**, **FastText** (subword).  
- **Contextual**: **ELMo**, **BERT**, **RoBERTa** cung cấp vector theo **ngữ cảnh**.  
- **Sentence Embedding**: **Sentence‑BERT (SBERT)** dùng mạng **siamese/twin** và loss tương phản (cosine/triplet) để so sánh câu hiệu quả.  
- **Document Embedding**: doc2vec; hiện nay thường dùng pooling (mean/max) trên token embedding từ LLM.

**Hệ quả thực tiễn**: sentence embedding tốt cần **điều chỉnh nhiệm vụ** (NLI/paraphrase) và **chuẩn hoá** cẩn thận để tránh anisotropy.

### 3.2. Thị giác & Đa phương thức
- **CNN/ViT**: lấy embedding từ global pooling hoặc [CLS] (ViT).  
- **CLIP**: học **không gian chung** ảnh–văn bản bằng **loss tương phản**; hỗ trợ **zero‑shot** phân loại và tìm kiếm cross‑modal.

### 3.3. Đồ thị (Graph)
- **DeepWalk/Node2Vec**: đi bộ ngẫu nhiên tạo “câu trên đồ thị” và tối ưu mục tiêu như SGNS.  
- **GraphSAGE/GAT**: học biểu diễn bằng lan truyền thông điệp.

### 3.4. Âm thanh & Giọng nói
- **x‑vector / speaker embedding**: dùng trong xác thực người nói (ASV), phát hiện **audio deepfake**.

---

## 4. Trực quan hoá & Đánh giá nội/ngoại sinh
### 4.1. Giảm chiều để trực quan
- **PCA/SVD**: tuyến tính, nhanh.  
- **t-SNE**: bảo toàn lân cận cục bộ, trực quan hoá cụm tốt nhưng không giữ cấu trúc toàn cục.  
- **UMAP**: nhanh, giữ cấu trúc toàn cục tốt hơn, hữu ích cho dữ liệu lớn.

### 4.2. Đánh giá
- **Intrinsic**: word analogy, similarity (Spearman), clustering metrics.  
- **Extrinsic**: hiệu quả trên tác vụ đích (retrieval/classification).  
- **Retrieval**: Recall@k, nDCG, MRR; latency (P50/P95), throughput (QPS).

---

## 5. Tìm kiếm Lân cận Xấp xỉ (ANN) & Vector DB
### 5.1. Thuật toán & Cấu trúc chỉ mục
- **IVF / PQ / OPQ**: lượng tử hoá (FAISS) cho bộ nhớ/độ trễ thấp.  
- **HNSW**: đồ thị thứ bậc, độ chính xác cao với độ trễ thấp.  
- **ScaNN / Annoy**: lựa chọn thay thế theo ngữ cảnh.

### 5.2. Hệ thống
- **FAISS** (CPU/GPU), **HNSWlib**, vector DB (Milvus, Weaviate, pgvector…).  
- Cân bằng **độ chính xác – độ trễ – chi phí**: tinh chỉnh nlist, nprobe (IVF), efSearch/efConstruction (HNSW).

---

## 6. Pitfalls & Thực hành tốt
- **Hubness**: điểm “hub” xuất hiện quá thường trong kNN khi \(d\) lớn → lệch kết quả. Cách giảm: normalization/whitening, mutual proximity, thuật toán ANN phù hợp.  
- **Anisotropy**: xử lý như 2.3.  
- **Bias & OOD**: đánh giá đa miền; thêm kiểm tra drift; cập nhật định kỳ.  
- **Chuẩn hoá & căn chỉnh**: L2‑normalize; chọn độ đo thống nhất giữa huấn luyện và suy luận.  
- **Quy trình reproducible**: seed, version hóa dữ liệu/mã, lưu checkpoint & config.

---

## 7. Pipeline minh họa (Embedding → Retrieval → Downstream)
```mermaid
flowchart LR
    A[Raw Data] --> B{Preprocess}
    B --> C[Encoder/Embedding Model]
    C --> D[Vector Store/Index<br/>(FAISS/HNSW)]
    E[Query/Text/Image] --> F[Query Encoder]
    F --> D
    D -->|k-NN| G[Candidates]
    G --> H[Re-ranker/Task Model]
    H --> I[Result/Action]
```

---

# PHẦN II — DEEPFAKE

## 8. Định nghĩa, Lịch sử & Phân loại
**Deepfake** là **synthetic media** (ảnh/video/âm thanh) được **tạo/chỉnh sửa bằng mô hình học sâu** (GAN, VAE, Diffusion, …) nhằm mô phỏng/gia công nội dung rất thuyết phục. Thuật ngữ phổ biến từ cuối 2017. Wikipedia “Deepfake”: [link](https://en.wikipedia.org/wiki/Deepfake).

**Phân loại tiêu biểu**:  
- **Face swap** (thay mặt), **face reenactment** (điều khiển biểu cảm/pose), **lip-sync** (đồng bộ môi‑tiếng).  
- **Audio deepfake** (voice cloning, timbre transfer).  
- **Text‑to‑Image/Video** (diffusion): tạo nội dung từ mô tả văn bản.  
- **3D/NeRF‑based** avatar/hologram.

---

## 9. Mô hình sinh & Xu hướng kỹ thuật
### 9.1. GAN, VAE và Biến thể
- **Autoencoder/Variational Autoencoder (VAE)**: nén vào latent, tái tạo đầu ra; dễ tối ưu, độ sắc nét hạn chế hơn GAN.  
- **GAN**: học phân phối qua trò chơi sinh‑phân biệt; **StyleGAN** mang lại ảnh khuôn mặt chất lượng cao.  
- **Neural rendering** & **motion transfer**: học trường ánh sáng/pose để tái hiện theo điều khiển.

### 9.2. Khuynh hướng Diffusion (ảnh & video)
- **DDPM/Score-based**: học khử nhiễu từ phân phối Gaussian → tạo ảnh sắc nét, kiểm soát điều kiện tốt (text/image/pose).  
- **Video Diffusion**: thêm ràng buộc thời gian (temporal consistency), memory/attention dọc trục thời gian; ví dụ: VDM, Make‑A‑Video, hệ thống T2V gần đây.  
- **Hybrid**: diffusion + motion prior + control nets.

> **Lưu ý đạo đức**: Phần này trình bày **khái niệm ở mức cao**, tránh hướng dẫn từng bước tạo deepfake nhằm giảm rủi ro lạm dụng.

---

## 10. Pipeline tạo & các điểm gây giả tạo (artifacts)
```mermaid
flowchart LR
    A[Data Collection] --> B{Preprocess<br/>(face align, VAD, clean)}
    B --> C[Model Training/Inference<br/>GAN/VAE/Diffusion]
    C --> D[Post-process<br/>(blending, color, compression)]
    D --> E[Output Media]
```
**Artifacts phổ biến**: vi phạm bảo toàn ánh sáng/bóng, biên mặt‑da, không khớp chuyển động vi mô, phản xạ mắt/corneal highlight thiếu tự nhiên, sai lệch tần số/cảm biến; nén video làm detector khó khăn hơn.

---

## 11. Phát hiện (Detection) & Chuỗi tin cậy nội dung
### 11.1. Nhóm phương pháp phát hiện
- **Sinh lý/hình học**: nháy mắt, micro‑expression, chuyển động đầu‑cổ, phản xạ mắt.  
- **Miền tần số/cảm biến**: pattern từ pipeline sinh/codec.  
- **Học sâu giám sát**: CNN/ViT 2D/3D, audio spectrogram CNN; chú trọng **generalization** out‑of‑distribution (cross‑dataset, nén).

### 11.2. Provenance & Labeling
- **C2PA / Content Credentials**: chuẩn công nghiệp để **ký, lưu metadata, và ghi vết chỉnh sửa**; hỗ trợ hiển thị dấu chứng thực cho người dùng cuối & máy đọc.  
- **Watermarking/Fingerprinting**: nhúng dấu (mạnh/yếu), nhận diện mô hình/nhà cung cấp; cân bằng giữa khả năng phát hiện và tác động chất lượng.

---

## 12. Bộ dữ liệu & Thước đo
- **FaceForensics++**: tập benchmark kinh điển cho phát hiện deepfake hình ảnh/video.  
- **DFDC (Deepfake Detection Challenge)**: quy mô lớn, đa dạng diễn viên.  
- **Celeb‑DF, DeeperForensics**: bổ sung khó hơn, khác miền.  
- **ASVspoof (2019/2021)**: benchmark **audio deepfake/ASV** với thước đo **EER/AUC**.

**Thước đo**: AUC, EER (audio), ROC, mAP/F1, balanced accuracy; đánh giá **robustness** với nén/biến dạng và **khả năng tổng quát** cross‑dataset.

---

## 13. Pháp lý—Đạo đức—Quản trị rủi ro
- **EU AI Act (2024–2025)**: yêu cầu **gắn nhãn rõ ràng** khi nội dung do AI tạo/chỉnh sửa (“deepfake”), và biện pháp kỹ thuật để **đánh dấu máy‑đọc được**.  
- **Chính sách nền tảng & báo chí**: khuyến cáo/áp dụng **Content Credentials (C2PA)** cho quy trình xuất bản.  
- **Quy định quốc gia**: nhiều nước tăng chế tài với **deepfake khiêu dâm/bôi nhọ** & can thiệp bầu cử.  
- **Quản trị doanh nghiệp**: thiết lập quy trình **human‑in‑the‑loop**, phân loại rủi ro, nhật ký bằng chứng, lưu vết mô hình/phiên bản, kiểm thử định kỳ detector.

> **Thông điệp đạo đức**: công nghệ tổng hợp có mặt tích cực (giải trí, giáo dục, phục hồi tư liệu) nhưng cần **minh bạch nguồn gốc**, **tôn trọng quyền riêng tư**, và **tuân thủ luật pháp**.

---

## 14. Case Study ngắn: Triển khai Hệ thống Tìm kiếm & Phát hiện
### 14.1. Semantic Search (Text/Image)
1. Chuẩn hoá dữ liệu → sinh **embedding** (SBERT/ViT/CLIP).  
2. Xây **chỉ mục ANN** (FAISS/HNSW) với cấu hình đo tương tự **cosine**.  
3. Tối ưu tham số (nlist/nprobe, efSearch) để cân bằng Recall@k–Latency.  
4. Theo dõi hubness/aniso; áp dụng whitening/mean‑center nếu cần.

### 14.2. Giám sát Deepfake trong pipeline nội dung
1. Tại **ingest**: xác thực **C2PA**; nếu không có, đưa vào hàng đợi phân tích.  
2. **Detector**: mô hình hình ảnh/video (3D CNN/ViT) + **audio detector** (ASVspoof).  
3. **Rules & Risk**: gắn nhãn cảnh báo, chuyển human review; lưu metadata/phán quyết.  
4. **Feedback loop**: cập nhật detector theo drift/miền mới.

---

## 15. Bảng thuật ngữ nhanh
| Thuật ngữ | Mô tả ngắn |
|---|---|
| Embedding | Biểu diễn dense chiều cố định cho đối tượng dữ liệu |
| Contrastive learning | Kéo gần cặp dương, đẩy xa cặp âm trong không gian |
| Anisotropy | Mất đẳng hướng trong phân bố véc‑tơ |
| Hubness | Một số điểm trở thành “trung tâm” trong kNN ở chiều cao |
| ANN | Approximate Nearest Neighbor – tìm kiếm lân cận xấp xỉ |
| C2PA | Chuẩn ký & chứng thực nguồn gốc nội dung |
| DFDC | Dataset lớn cho phát hiện deepfake |
| EER/AUC | Thước đo chuẩn trong phát hiện audio deepfake/ASV |

---

# TÀI LIỆU THAM KHẢO (ĐÃ CHỌN LỌC)
> Gồm nguồn nền tảng (Wikipedia), bài báo học thuật, thư viện hệ thống, và tiêu chuẩn.  
> **Yêu cầu đề bài**: tham chiếu hai mục Wikipedia chính—**Embedding** và **Deepfake** (đặt đầu danh sách).

**Wikipedia**  
1) *Embedding (machine learning)* — Wikipedia. https://en.wikipedia.org/wiki/Embedding_(machine_learning)  
2) *Deepfake* — Wikipedia. https://en.wikipedia.org/wiki/Deepfake

**Embedding & Representation Learning**  
3) Mikolov, T. et al. (2013). *Efficient Estimation of Word Representations in Vector Space (word2vec).* https://arxiv.org/abs/1301.3781  
4) Pennington, J. et al. (2014). *GloVe: Global Vectors for Word Representation.* https://nlp.stanford.edu/pubs/glove.pdf  
5) Reimers, N., & Gurevych, I. (2019). *Sentence-BERT.* https://arxiv.org/abs/1908.10084  
6) Radford, A. et al. (2021). *Learning Transferable Visual Models From Natural Language Supervision (CLIP).* https://arxiv.org/abs/2103.00020  
7) van der Maaten, L., & Hinton, G. (2008). *t-SNE.* https://www.jmlr.org/papers/volume9/vandermaaten08a/vandermaaten08a.pdf  
8) McInnes, L. et al. (2018). *UMAP.* https://arxiv.org/abs/1802.03426  
9) Johnson, J. et al. (2017). *Billion-scale Similarity Search with GPUs (FAISS).* https://arxiv.org/abs/1702.08734  
10) Malkov, Y., & Yashunin, D. (2018). *HNSW.* https://arxiv.org/abs/1603.09320  
11) Radovanović, M. et al. (2010). *Hubs in Space: Popular Nearest Neighbors in High-Dimensional Data.* https://dl.acm.org/doi/10.1145/1772690.1772767  
12) Ethayarajh, K. (2019). *How Contextual Are Contextualized Word Representations?* (anisotropy). https://aclanthology.org/D19-1006.pdf  
13) Chen, T. et al. (2020). *SimCLR.* https://arxiv.org/abs/2002.05709  
14) Oord, A. van den et al. (2018). *CPC / InfoNCE.* https://arxiv.org/abs/1807.03748  
15) Bojanowski, P. et al. (2017). *FastText.* https://arxiv.org/abs/1607.04606

**Deepfake, Detection & Policy**  
16) Rössler, A. et al. (2019). *FaceForensics++.* https://arxiv.org/abs/1901.08971  
17) Dolhansky, B. et al. (2020). *The Deepfake Detection Challenge Dataset.* https://arxiv.org/abs/2006.07397  
18) Li, Y. et al. (2018). *Exposing Deep Fakes Using Inconsistent Head Poses / Eye Blinking.* https://arxiv.org/abs/1806.02877  
19) ASVspoof 2021 Challenge. https://www.asvspoof.org/  
20) C2PA Specifications. https://c2pa.org/specifications/  
21) EU AI Act — Chính thức thông qua & yêu cầu gắn nhãn deepfake (tham chiếu tổng hợp EU). https://digital-strategy.ec.europa.eu/

**Thư viện/Hệ thống**  
22) FAISS. https://github.com/facebookresearch/faiss  
23) HNSWlib. https://github.com/nmslib/hnswlib  
24) Milvus. https://milvus.io/  
25) Weaviate. https://weaviate.io/  
26) pgvector (PostgreSQL). https://github.com/pgvector/pgvector

---

## PHỤ LỤC A — Công thức & Nhắc nhanh
- **Cosine similarity**: \(\mathrm{cos}(\theta)=\frac{\mathbf{u}\cdot \mathbf{v}}{\|\mathbf{u}\|\|\mathbf{v}\|}\).  
- **Triplet loss**: \(\mathcal{L}=\max(0, m + d(a,p) - d(a,n))\).  
- **PMI**: \(\log \frac{p(w,c)}{p(w)p(c)}\).  
- **InfoNCE**: như mục 2.2.  
- **Recall@k**: tỉ lệ truy vấn có ít nhất 1 kết quả đúng trong top‑k.

## PHỤ LỤC B — Checklist triển khai nhanh
- Chuẩn hoá dữ liệu, tokenizer/augment hợp lý.  
- Chọn encoder & loss sát nhiệm vụ (contrastive/triplet vs. LM fine‑tune).  
- L2 normalize; kiểm tra anisotropy/hubness.  
- Chỉ mục ANN (FAISS/HNSW), đo Recall@k/Latency.  
- Với nội dung người dùng tạo: bật C2PA/Content Credentials, detector hình/tiếng, human‑in‑the‑loop.

---

> **Kết luận**: Embedding là “ngôn ngữ hình học” cho dữ liệu hiện đại; Deepfake là mặt trái — và cũng là động lực — để xây dựng hệ sinh thái **tin cậy** dựa trên **chuỗi chứng thực nội dung** và **detector** mạnh. Hai chủ đề gặp nhau trong **không gian véc‑tơ**: cùng là bài toán học biểu diễn, tìm kiếm, nhận diện — nhưng với trách nhiệm xã hội và pháp lý đi kèm.
