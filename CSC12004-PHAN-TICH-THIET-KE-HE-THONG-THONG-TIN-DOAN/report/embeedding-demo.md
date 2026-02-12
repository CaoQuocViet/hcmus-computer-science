# Hybrid Search with Milvus

Để trải nghiệm kết quả cuối cùng của hướng dẫn này, có thể truy cập trực tiếp tại: https://demos.milvus.io/hybrid-search/

Hướng dẫn này trình bày cách thực hiện **hybrid search** với Milvus và mô hình **BGE-M3**. Mô hình BGE-M3 có thể chuyển văn bản thành **dense vector** và **sparse vector**. Milvus hỗ trợ lưu cả hai loại vector trong một collection, cho phép hybrid search nhằm tăng độ liên quan của kết quả.

Milvus hỗ trợ các phương pháp truy hồi: **Dense**, **Sparse**, và **Hybrid**:

- **Dense Retrieval**: Tận dụng ngữ cảnh ngữ nghĩa để hiểu ý nghĩa phía sau truy vấn.
- **Sparse Retrieval**: Nhấn mạnh khớp từ khóa để tìm kết quả dựa trên các thuật ngữ cụ thể, tương đương full-text search.
- **Hybrid Retrieval**: Kết hợp cả Dense và Sparse, vừa nắm bắt ngữ cảnh tổng thể vừa giữ được các từ khóa cụ thể để có kết quả toàn diện.

Bằng cách tích hợp các phương pháp này, **Milvus Hybrid Search** cân bằng độ tương đồng ngữ nghĩa và từ vựng, cải thiện độ liên quan tổng thể của kết quả tìm kiếm. Notebook này sẽ hướng dẫn quy trình thiết lập và sử dụng các chiến lược truy hồi, làm nổi bật hiệu quả của chúng trong nhiều kịch bản tìm kiếm.

## Dependencies and Environment

```bash
pip install --upgrade pymilvus "pymilvus[model]"
```

## Download Dataset

Để minh họa tìm kiếm, cần một tập tài liệu (corpus). Tập dữ liệu **Quora Duplicate Questions** sẽ được sử dụng và đặt vào thư mục cục bộ.

Nguồn dữ liệu: **First Quora Dataset Release: Question Pairs**

Chạy cell sau để tải dữ liệu:

```bash
wget http://qim.fs.quoracdn.net/quora_duplicate_questions.tsv
```

## Load and Prepare Data

Tải dữ liệu và chuẩn bị một corpus nhỏ để tìm kiếm.

```python
import pandas as pd

file_path = "quora_duplicate_questions.tsv"
df = pd.read_csv(file_path, sep="\t")
questions = set()
for _, row in df.iterrows():
    obj = row.to_dict()
    questions.add(obj["question1"][:512])
    questions.add(obj["question2"][:512])
    if len(questions) > 500:  # Skip this if you want to use the full dataset
        break

docs = list(questions)

# example question
print(docs[0])
```

```
What is the strongest Kevlar cord?
```

## Use BGE-M3 Model for Embeddings

Mô hình **BGE-M3** có thể tạo embedding văn bản dưới dạng **dense vector** và **sparse vector**.

```python
from pymilvus.model.hybrid import BGEM3EmbeddingFunction

ef = BGEM3EmbeddingFunction(use_fp16=False, device="cpu")
dense_dim = ef.dim["dense"]

# Generate embeddings using BGE-M3 model
docs_embeddings = ef(docs)
```

```
Fetching 30 files: 100%|██████████| 30/30 [00:00<00:00, 302473.85it/s]
Inference Embeddings: 100%|██████████| 32/32 [01:59<00:00,  3.74s/it]
```

## Setup Milvus Collection and Index

Thiết lập collection trong Milvus và tạo index cho các trường vector.

- Việc đặt **uri** là file cục bộ, ví dụ `./milvus.db`, là cách tiện lợi nhất, vì nó tự động dùng **Milvus Lite** để lưu toàn bộ dữ liệu vào một file này.
- Với dữ liệu quy mô lớn, ví dụ hơn một triệu vector, có thể thiết lập Milvus server có hiệu năng tốt hơn trên **Docker** hoặc **Kubernetes**. Trong thiết lập này, hãy dùng **server uri**, ví dụ `http://localhost:19530`, làm `uri`.
- Để dùng **Zilliz Cloud** (dịch vụ đám mây được quản lý toàn phần cho Milvus), cần điều chỉnh `uri` và `token`, tương ứng với **Public Endpoint** và **API key** trong Zilliz Cloud.

```python
from pymilvus import (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

# Connect to Milvus given URI
connections.connect(uri="./milvus.db")

# Specify the data schema for the new Collection
fields = [
    # Use auto generated id as primary key
    FieldSchema(
        name="pk", dtype=DataType.VARCHAR, is_primary=True, auto_id=True, max_length=100
    ),
    # Store the original text to retrieve based on semantically distance
    FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=512),
    # Milvus now supports both sparse and dense vectors,
    # we can store each in a separate field to conduct hybrid search on both vectors
    FieldSchema(name="sparse_vector", dtype=DataType.SPARSE_FLOAT_VECTOR),
    FieldSchema(name="dense_vector", dtype=DataType.FLOAT_VECTOR, dim=dense_dim),
]
schema = CollectionSchema(fields)

# Create collection (drop the old one if exists)
col_name = "hybrid_demo"
if utility.has_collection(col_name):
    Collection(col_name).drop()
col = Collection(col_name, schema, consistency_level="Bounded")

# To make vector search efficient, we need to create indices for the vector fields
sparse_index = {"index_type": "SPARSE_INVERTED_INDEX", "metric_type": "IP"}
col.create_index("sparse_vector", sparse_index)
dense_index = {"index_type": "AUTOINDEX", "metric_type": "IP"}
col.create_index("dense_vector", dense_index)
col.load()
```

## Insert Data into Milvus Collection

Chèn các document và embedding của chúng vào collection.

```python
# For efficiency, we insert 50 records in each small batch
for i in range(0, len(docs), 50):
    batched_entities = [
        docs[i : i + 50],
        docs_embeddings["sparse"][i : i + 50],
        docs_embeddings["dense"][i : i + 50],
    ]
    col.insert(batched_entities)
print("Number of entities inserted:", col.num_entities)
```

```
Number of entities inserted: 502
```

## Enter Your Search Query

```python
# Enter your search query
query = input("Enter your search query: ")
print(query)

# Generate embeddings for the query
query_embeddings = ef([query])
# print(query_embeddings)
```

```
How to start learning programming?
```

## Run the Search

Đầu tiên, cần chuẩn bị vài hàm tiện ích để chạy tìm kiếm:

- `dense_search`: chỉ tìm trên trường **dense vector**
- `sparse_search`: chỉ tìm trên trường **sparse vector**
- `hybrid_search`: tìm trên cả hai trường vector với **weighted reranker**

```python
from pymilvus import (
    AnnSearchRequest,
    WeightedRanker,
)


def dense_search(col, query_dense_embedding, limit=10):
    search_params = {"metric_type": "IP", "params": {}}
    res = col.search(
        [query_dense_embedding],
        anns_field="dense_vector",
        limit=limit,
        output_fields=["text"],
        param=search_params,
    )[0]
    return [hit.get("text") for hit in res]


def sparse_search(col, query_sparse_embedding, limit=10):
    search_params = {
        "metric_type": "IP",
        "params": {},
    }
    res = col.search(
        [query_sparse_embedding],
        anns_field="sparse_vector",
        limit=limit,
        output_fields=["text"],
        param=search_params,
    )[0]
    return [hit.get("text") for hit in res]


def hybrid_search(
    col,
    query_dense_embedding,
    query_sparse_embedding,
    sparse_weight=1.0,
    dense_weight=1.0,
    limit=10,
):
    dense_search_params = {"metric_type": "IP", "params": {}}
    dense_req = AnnSearchRequest(
        [query_dense_embedding], "dense_vector", dense_search_params, limit=limit
    )
    sparse_search_params = {"metric_type": "IP", "params": {}}
    sparse_req = AnnSearchRequest(
        [query_sparse_embedding], "sparse_vector", sparse_search_params, limit=limit
    )
    rerank = WeightedRanker(sparse_weight, dense_weight)
    res = col.hybrid_search(
        [sparse_req, dense_req], rerank=rerank, limit=limit, output_fields=["text"]
    )[0]
    return [hit.get("text") for hit in res]
```

Chạy ba loại tìm kiếm với các hàm đã định nghĩa:

```python
dense_results = dense_search(col, query_embeddings["dense"][0])
sparse_results = sparse_search(col, query_embeddings["sparse"][[0]])
hybrid_results = hybrid_search(
    col,
    query_embeddings["dense"][0],
    query_embeddings["sparse"][[0]],
    sparse_weight=0.7,
    dense_weight=1.0,
)
```

## Display Search Results

Để hiển thị kết quả của Dense, Sparse và Hybrid, cần có vài tiện ích để định dạng kết quả.

```python
def doc_text_formatting(ef, query, docs):
    tokenizer = ef.model.tokenizer
    query_tokens_ids = tokenizer.encode(query, return_offsets_mapping=True)
    query_tokens = tokenizer.convert_ids_to_tokens(query_tokens_ids)
    formatted_texts = []

    for doc in docs:
        ldx = 0
        landmarks = []
        encoding = tokenizer.encode_plus(doc, return_offsets_mapping=True)
        tokens = tokenizer.convert_ids_to_tokens(encoding["input_ids"])[1:-1]
        offsets = encoding["offset_mapping"][1:-1]
        for token, (start, end) in zip(tokens, offsets):
            if token in query_tokens:
                if len(landmarks) != 0 and start == landmarks[-1]:
                    landmarks[-1] = end
                else:
                    landmarks.append(start)
                    landmarks.append(end)
        close = False
        formatted_text = ""
        for i, c in enumerate(doc):
            if ldx == len(landmarks):
                pass
            elif i == landmarks[ldx]:
                if close:
                    formatted_text += "</span>"
                else:
                    formatted_text += "<span style='color:red'>"
                close = not close
                ldx = ldx + 1
            formatted_text += c
        if close is True:
            formatted_text += "</span>"
        formatted_texts.append(formatted_text)
    return formatted_texts
```

Sau đó, có thể hiển thị kết quả ở dạng văn bản kèm highlight:

```python
from IPython.display import Markdown, display

# Dense search results
display(Markdown("**Dense Search Results:**"))
formatted_results = doc_text_formatting(ef, query, dense_results)
for result in dense_results:
    display(Markdown(result))

# Sparse search results
display(Markdown("\n**Sparse Search Results:**"))
formatted_results = doc_text_formatting(ef, query, sparse_results)
for result in formatted_results:
    display(Markdown(result))

# Hybrid search results
display(Markdown("\n**Hybrid Search Results:**"))
formatted_results = doc_text_formatting(ef, query, hybrid_results)
for result in formatted_results:
    display(Markdown(result))
```
