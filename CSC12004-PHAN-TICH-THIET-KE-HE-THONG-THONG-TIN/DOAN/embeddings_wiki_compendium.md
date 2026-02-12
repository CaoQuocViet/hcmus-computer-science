# Embeddings trong Machine Learning — Bản tổng hợp có cấu trúc
*Phiên bản:* 2025-10-31  
*Tác giả:* Tổng hợp từ Wikipedia và các trang liên kết (kèm tài liệu tham khảo ở cuối).

---

## 1) Khái niệm & Trực giác
**Embedding** (biểu diễn nhúng) là kỹ thuật *representation learning* ánh xạ dữ liệu phức tạp, nhiều chiều (từ, câu, ảnh, nút đồ thị, người dùng‑món hàng, v.v.) về **không gian vectơ** có số chiều thấp/trung bình, sao cho **cấu trúc/quan hệ ngữ nghĩa** trong dữ liệu vẫn được bảo toàn ở mức hữu ích. Khác với one‑hot (thủ công & thưa), embedding **được học trực tiếp từ dữ liệu**, nén thông tin quan trọng và cho phép so sánh tương tự/khác biệt bằng các độ đo như *cosine similarity*, *Euclidean distance* hay *dot product*.

**Lợi ích chính**: (i) giảm chiều & khắc phục rời rạc‑thưa; (ii) tự trích chọn đặc trưng; (iii) phù hợp cho phép đo tương tự để truy xuất/khuyến nghị; (iv) là nền tảng cho nhiều mô hình hiện đại (Transformer, CLIP, RAG, vector DB...).

---

## 2) Các hướng học embedding (Technique)
### 2.1. Ngôn ngữ tự nhiên (NLP)
- **Word2Vec**: *CBOW* & *Skip‑gram* học phân phối đồng xuất hiện để đặt từ có ngữ cảnh tương tự gần nhau.  
- **GloVe**: phân tích ma trận đồng xuất hiện toàn cục để tìm véc‑tơ từ.  
- **fastText**: dùng *subword (n‑gram ký tự)*, cải thiện OOV và ngôn ngữ giàu hình thái.  
- **Sentence/Document Embedding**: trung bình/ghép pooling, **SBERT/USE** dùng mạng *siamese/contrastive* trên nền BERT để thu véc‑tơ câu/đoạn.  
- **Contextual embeddings (ELMo/BERT/Transformer)**: véc‑tơ phụ thuộc ngữ cảnh, lấy từ *hidden states* (ví dụ token `[CLS]` hay pooling).

### 2.2. Thị giác máy tính & đa phương thức
- **Image embeddings**: lấy từ backbone CNN/ViT (*global average pooling*, token `[CLS]`...).  
- **CLIP**: huấn luyện *contrastive* đồng thời hai encoder (ảnh‑văn bản) để đặt ảnh và caption vào chung một không gian; hỗ trợ truy hồi xuyên modality, zero‑shot, v.v.

### 2.3. Đồ thị & tri thức
- **DeepWalk / node2vec**: coi *random walks* như câu để học véc‑tơ nút (tương tự Word2Vec).  
- **Knowledge Graph Embedding**: *TransE/TransR/RotatE/TorusE...* ánh xạ (h, r, t) với hình học dịch chuyển/quay (Euclid/phức/torus) để dự đoán liên kết.

### 2.4. Học tương phản & metric learning
- **Contrastive / InfoNCE**: kéo gần cặp dương, đẩy xa cặp âm (có/không giám sát).  
- **Triplet loss**: tối ưu khoảng cách *anchor‑positive* < *anchor‑negative* + margin; phổ biến trong nhận dạng khuôn mặt, truy hồi, v.v.  
- **Siamese networks**: hai/tựa‑đồng trọng số chia sẻ để so khớp tương tự.

### 2.5. Tự mã hoá & giảm chiều
- **Autoencoder / Denoising / Variational**: dùng *bottleneck* làm embedding.  
- **t‑SNE / UMAP**: kỹ thuật giảm chiều *phi tuyến* để **quan sát/khám phá** phân bố embedding (không phải để suy luận dự đoán cho dữ liệu mới).

---

## 3) Độ đo tương tự & hình học
- **Cosine similarity**: so góc (phù hợp khi chuẩn hoá L2); **Dot product** nhạy độ lớn; **Euclidean** dễ suy giảm phân biệt ở chiều cao (*curse of dimensionality*).  
- **Hubness** (hiện tượng “điểm trung tâm” xuất hiện quá thường trong lân cận) có thể ảnh hưởng truy hồi/khuyến nghị; cân nhắc chuẩn hoá, giảm chiều, hoặc kỹ thuật giảm hubness.  
- **Không gian thay thế**: đôi khi dùng **siêu hyperbolic** cho dữ liệu phân cấp/cây.

---

## 4) Ứng dụng điển hình
- **Tìm kiếm ngữ nghĩa / truy hồi**: so véc‑tơ truy vấn với kho véc‑tơ (ANN).  
- **Khuyến nghị**: hai‑tháp (*two‑tower*) user/item embeddings, so khớp bằng dot/cosine.  
- **Đa phương thức**: tìm ảnh theo văn bản (CLIP), tổng hợp văn‑ảnh.  
- **RAG (Retrieval‑Augmented Generation)**: nhúng tài liệu & truy hồi theo véc‑tơ để bổ sung ngữ cảnh cho LLM.  
- **Phân cụm/Khám phá**: dùng t‑SNE/UMAP để hiểu cụm lớp, kiểm tra chất lượng biểu diễn.

---

## 5) Hạ tầng triển khai embeddings
- **Approximate Nearest Neighbor (ANN)**: LSH, HNSW/NSW, PQ… để truy vấn nhanh.  
- **Vector Databases**: pgvector, FAISS, Milvus, Qdrant, Pinecone, v.v.; lưu véc‑tơ + metadata, hỗ trợ lọc & *hybrid search*, RAG pipelines.  
- **Chu kỳ cập nhật**: đóng băng (offline) vs cập nhật gia tăng; chiến lược OOV; *feature store*; kiểm soát phiên bản mô hình.

---

## 6) Đánh giá & thực hành tốt
- **Intrinsic**: tương tự từ/câu, analogy, STS, clustering metrics…  
- **Extrinsic**: chất lượng trong downstream (tìm kiếm, phân loại, CTR/khuyến nghị).  
- **Thực hành**: chuẩn hoá L2 trước cosine; chọn chiều (128–1024 tuỳ tác vụ); cân bằng negatives; *temperature* trong contrastive; giám sát *perplexity* (t‑SNE) & *n_neighbors/min_dist* (UMAP) khi trực quan hoá; cảnh giác bias dữ liệu, OOD, drift mô hình.

---

## 7) Bảng nhanh: kỹ thuật ↔ mục tiêu
| Kỹ thuật | Ý tưởng chính | Khoảng cách/Loss | Dùng cho |
|---|---|---|---|
| Word2Vec/fastText | phân phối đồng xuất hiện | cosine/dot, NS/NCE | từ/ngôn ngữ |
| GloVe | factor hoá co‑occurrence | cosine | từ/ngôn ngữ |
| SBERT/USE | siamese/contrastive trên BERT | cosine/Triplet/InfoNCE | câu/đoạn |
| Autoencoder/VAE | bottleneck mã hoá | MSE/KL | nén đặc trưng |
| CLIP | contrastive ảnh‑văn | InfoNCE | đa phương thức |
| DeepWalk/node2vec | random‑walk như câu | cosine | nút đồ thị |
| TransE/RotatE | hình học dịch/chuyển | L1/L2, argmin(h+r≈t) | KG completion |
| t‑SNE/UMAP | bảo toàn lân cận để vẽ | KLdiv / đồ thị mờ | trực quan hoá |

---

## 8) Thuật ngữ
**Embedding space**: không gian véc‑tơ; **ANN**: tìm lân cận xấp xỉ; **Hubness**: điểm “hub” xuất hiện nhiều trong lân cận; **RAG**: truy hồi‑tăng cường sinh; **Two‑tower**: mô hình hai encoder user/item.

---

## 9) Tài liệu tham khảo (ít nhất 10)
1. **Embedding (machine learning)** — Wikipedia: Khái niệm, “Technique”, độ đo tương tự.  
2. **Feature learning (Representation learning)** — Wikipedia.  
3. **One‑hot** — Wikipedia.  
4. **Feature vector** — Wikipedia.  
5. **Cosine similarity** & **Euclidean distance** — Wikipedia.  
6. **Word2Vec** — Wikipedia; **Efficient Estimation of Word Representations in Vector Space** (Mikolov et al., 2013).  
7. **GloVe** — Stanford NLP project page.  
8. **fastText** — Wikipedia & fastText docs (pretrained Wiki vectors).  
9. **Sentence embedding / SBERT** — Wikipedia (Sentence‑BERT paper).  
10. **Triplet loss** — Wikipedia (FaceNet, 2015).  
11. **Siamese neural network** — Wikipedia.  
12. **Knowledge graph embedding** — Wikipedia (TransE/RotatE/TorusE).  
13. **DeepWalk** (arXiv, 2014), **node2vec** (Wikipedia).  
14. **t‑SNE** — Wikipedia.  
15. **UMAP** — Nonlinear dimensionality reduction (Wikipedia) & arXiv 2018 + docs.  
16. **Nearest neighbor search / (1+ε)-ANN** — Wikipedia.  
17. **Curse of dimensionality** (hubness) — Wikipedia (+ JMLR 2010).  
18. **Vector database** — Wikipedia; ứng dụng RAG/ANN.  
19. **Recommender system** — Wikipedia (ứng dụng embedding, two‑tower).

---

### Phụ lục A — Gợi ý quy trình thực hành
1) Chọn encoder phù hợp miền dữ liệu (BERT/SBERT cho văn bản; ViT/ResNet cho ảnh; CLIP cho đa phương thức; Graph methods cho đồ thị).  
2) Xác định *objective*: contrastive (InfoNCE), triplet, hoặc mục tiêu dự đoán (CBOW/SG).  
3) Xây pipeline ANN/Vector DB + chỉ số chất lượng (recall@k, MRR, NDCG).  
4) Theo dõi drift & cập nhật embedding; lưu vết phiên bản; kiểm thử định kỳ intrinsic/extrinsic.  

---

### Phụ lục B — Mẹo trực quan hoá
- t‑SNE: thử nhiều *perplexity* (5–50), chú ý cụm có thể đánh lừa trực giác.  
- UMAP: điều chỉnh *n_neighbors*, *min_dist* để cân bằng cục bộ/toàn cục.

