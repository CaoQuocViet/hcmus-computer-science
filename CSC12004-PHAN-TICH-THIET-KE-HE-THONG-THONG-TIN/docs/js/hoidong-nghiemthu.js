// HỘI ĐỒNG NGHIỆM THU - Dashboard Functionality
// Theo đặc tả UC 1.17: Đánh giá nghiệm thu

// Mock Data
const nghiemThuData = [
    {
        id: 'DT001',
        maDeTai: 'DT001',
        tenDeTai: 'Nghiên cứu ứng dụng AI trong giáo dục',
        chuNhiem: 'TS. Nguyễn Văn A',
        ngayNop: '2024-11-01',
        trangThai: 'cho-nghiem-thu',
        documents: [
            { id: 1, name: 'Báo cáo tổng kết', file: 'bao-cao-tong-ket.pdf' },
            { id: 2, name: 'Sản phẩm nghiên cứu', file: 'san-pham-nghien-cuu.pdf' },
            { id: 3, name: 'Bài báo khoa học', file: 'bai-bao-khoa-hoc.pdf' },
            { id: 4, name: 'Demo ứng dụng', file: 'demo-ung-dung.mp4' },
            { id: 5, name: 'Tài liệu hướng dẫn', file: 'tai-lieu-huong-dan.pdf' }
        ],
        ketQua: null
    },
    {
        id: 'DT002',
        maDeTai: 'DT002',
        tenDeTai: 'Hệ thống IoT cho nông nghiệp thông minh',
        chuNhiem: 'TS. Lê Thị B',
        ngayNop: '2024-10-28',
        trangThai: 'cho-nghiem-thu',
        documents: [
            { id: 1, name: 'Báo cáo tổng kết', file: 'iot-bao-cao.pdf' },
            { id: 2, name: 'Hệ thống IoT', file: 'he-thong-iot.pdf' },
            { id: 3, name: 'Nghiên cứu thực nghiệm', file: 'thuc-nghiem.pdf' },
            { id: 4, name: 'Video demo', file: 'iot-demo.mp4' },
            { id: 5, name: 'Tài liệu kỹ thuật', file: 'tai-lieu-ky-thuat.pdf' }
        ],
        ketQua: null
    },
    {
        id: 'DT003',
        maDeTai: 'DT003',
        tenDeTai: 'Blockchain trong quản lý chuỗi cung ứng',
        chuNhiem: 'PGS. Nguyễn Văn C',
        ngayNop: '2024-11-05',
        trangThai: 'cho-nghiem-thu',
        documents: [
            { id: 1, name: 'Báo cáo tổng kết', file: 'blockchain-report.pdf' },
            { id: 2, name: 'Hệ thống blockchain', file: 'blockchain-system.pdf' },
            { id: 3, name: 'Case study', file: 'blockchain-casestudy.pdf' },
            { id: 4, name: 'Demo hệ thống', file: 'blockchain-demo.mp4' },
            { id: 5, name: 'White paper', file: 'blockchain-whitepaper.pdf' }
        ],
        ketQua: null
    },
    {
        id: 'DT004',
        maDeTai: 'DT004',
        tenDeTai: 'Machine Learning trong dự báo thời tiết',
        chuNhiem: 'TS. Hoàng Thị D',
        ngayNop: '2024-11-07',
        trangThai: 'cho-nghiem-thu',
        documents: [
            { id: 1, name: 'Báo cáo tổng kết', file: 'ml-weather-report.pdf' },
            { id: 2, name: 'Mô hình ML', file: 'ml-weather-model.pdf' },
            { id: 3, name: 'Dataset và kết quả', file: 'weather-dataset.pdf' },
            { id: 4, name: 'Web app demo', file: 'weather-app-demo.mp4' },
            { id: 5, name: 'Hướng dẫn sử dụng', file: 'weather-manual.pdf' }
        ],
        ketQua: null
    }
];

let currentDeTai = null;
let currentDocument = null;

document.addEventListener('DOMContentLoaded', function() {
    loadNghiemThuData();
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to clicked nav link
    event.target.classList.add('active');
    
    // Update breadcrumb
    document.getElementById('currentPage').textContent = 'Đánh giá nghiệm thu';
}

// UC 1.17: Load danh sách đề tài cần nghiệm thu
function loadNghiemThuData() {
    const tbody = document.getElementById('nghiemThuTable');
    if (!tbody) return;
    
    tbody.innerHTML = nghiemThuData.map(dt => `
        <tr>
            <td>${dt.maDeTai}</td>
            <td>${dt.tenDeTai}</td>
            <td>${dt.chuNhiem}</td>
            <td>${formatDate(dt.ngayNop)}</td>
            <td><span class="status status-${dt.trangThai}">${getStatusText(dt.trangThai)}</span></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="danhGiaNghiemThu('${dt.id}')">
                    <i class="fas fa-clipboard-list"></i> Đánh giá
                </button>
            </td>
        </tr>
    `).join('');
}

// UC 1.17: Mở modal đánh giá nghiệm thu
function danhGiaNghiemThu(deTaiId) {
    currentDeTai = nghiemThuData.find(dt => dt.id === deTaiId);
    if (!currentDeTai) return;
    
    const modalContent = document.getElementById('nghiemThuContent');
    
    modalContent.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #2c3e50; margin-bottom: 15px;">THÔNG TIN ĐỀ TÀI</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p><strong>Mã đề tài:</strong> ${currentDeTai.maDeTai}</p>
                <p><strong>Tên đề tài:</strong> ${currentDeTai.tenDeTai}</p>
                <p><strong>Chủ nhiệm:</strong> ${currentDeTai.chuNhiem}</p>
                <p><strong>Ngày nộp hồ sơ:</strong> ${formatDate(currentDeTai.ngayNop)}</p>
            </div>
        </div>

        <div style="margin-bottom: 20px;">
            <h4 style="color: #2c3e50; margin-bottom: 15px;">HỒ SƠ NGHIỆM THU</h4>
            <div class="document-list">
                ${currentDeTai.documents.map((doc, index) => `
                    <div class="document-item ${index === 0 ? 'active' : ''}" 
                         onclick="viewDocument(${doc.id}, '${doc.name}', '${doc.file}')">
                        ${doc.name}
                    </div>
                `).join('')}
            </div>
            
            <div class="document-viewer" id="documentViewer">
                <div style="text-align: center; padding: 60px 0; color: #666;">
                    <i class="fas fa-file-pdf" style="font-size: 48px; margin-bottom: 15px;"></i>
                    <p>Chọn tài liệu để xem nội dung</p>
                </div>
            </div>
        </div>

        <div class="evaluation-section">
            <h4 style="color: #2c3e50; margin-bottom: 15px;">PHIẾU ĐÁNH GIÁ</h4>
            
            <div class="score-group">
                <div class="score-item">
                    <label class="form-label">Tính mới và khoa học <span class="required">*</span></label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="number" class="score-input" id="score1" min="0" max="10" step="0.1" placeholder="0.0">
                        <span>/10 điểm</span>
                    </div>
                    <div style="font-size: 12px; color: #666; margin-top: 5px;">Tính sáng tạo, độc đáo của nghiên cứu</div>
                </div>
                
                <div class="score-item">
                    <label class="form-label">Chất lượng sản phẩm <span class="required">*</span></label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="number" class="score-input" id="score2" min="0" max="10" step="0.1" placeholder="0.0">
                        <span>/10 điểm</span>
                    </div>
                    <div style="font-size: 12px; color: #666; margin-top: 5px;">Chất lượng kết quả đạt được</div>
                </div>
                
                <div class="score-item">
                    <label class="form-label">Tính ứng dụng <span class="required">*</span></label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="number" class="score-input" id="score3" min="0" max="10" step="0.1" placeholder="0.0">
                        <span>/10 điểm</span>
                    </div>
                    <div style="font-size: 12px; color: #666; margin-top: 5px;">Khả năng ứng dụng thực tiễn</div>
                </div>
                
                <div class="score-item">
                    <label class="form-label">Báo cáo và trình bày <span class="required">*</span></label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="number" class="score-input" id="score4" min="0" max="10" step="0.1" placeholder="0.0">
                        <span>/10 điểm</span>
                    </div>
                    <div style="font-size: 12px; color: #666; margin-top: 5px;">Chất lượng báo cáo và trình bày</div>
                </div>
            </div>

            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <label class="form-label">Điểm tổng kết:</label>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <input type="number" class="score-input" id="finalScore" min="0" max="10" step="0.1" placeholder="0.0" readonly style="font-size: 24px; font-weight: bold; color: #6f42c1;">
                    <span style="font-size: 18px; font-weight: 600;">/10 điểm</span>
                    <span id="classification" style="padding: 8px 16px; border-radius: 20px; font-weight: 600;"></span>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Nhận xét chi tiết:</label>
                <textarea id="detailComment" class="form-textarea" rows="4" 
                          placeholder="Nhận xét chi tiết về đề tài...&#10;&#10;Ví dụ:&#10;- Ưu điểm: Nghiên cứu có tính thời sự cao, phương pháp nghiên cứu phù hợp...&#10;- Hạn chế: Cần mở rộng phạm vi ứng dụng...&#10;- Đề xuất: Tiếp tục phát triển theo hướng..."></textarea>
            </div>

            <div style="text-align: right; margin-top: 20px;">
                <button type="button" class="btn btn-secondary" onclick="hideModal('nghiemThuModal')">
                    Hủy
                </button>
                <button type="button" class="btn btn-primary" onclick="luuKetQuaDanhGia()">
                    <i class="fas fa-save"></i> Lưu kết quả đánh giá
                </button>
            </div>
        </div>
    `;
    
    // Show first document by default
    if (currentDeTai.documents.length > 0) {
        const firstDoc = currentDeTai.documents[0];
        viewDocument(firstDoc.id, firstDoc.name, firstDoc.file);
    }
    
    // Setup score calculation
    setupScoreCalculation();
    
    showModal('nghiemThuModal');
}

// Setup automatic score calculation
function setupScoreCalculation() {
    const scoreInputs = ['score1', 'score2', 'score3', 'score4'];
    const finalScoreInput = document.getElementById('finalScore');
    const classificationSpan = document.getElementById('classification');
    
    function calculateTotal() {
        let total = 0;
        let count = 0;
        
        scoreInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            const value = parseFloat(input.value);
            if (!isNaN(value) && value >= 0 && value <= 10) {
                total += value;
                count++;
            }
        });
        
        if (count === scoreInputs.length) {
            const average = total / count;
            finalScoreInput.value = average.toFixed(1);
            
            // Update classification
            let classification = '';
            let classStyle = '';
            
            if (average >= 8.5) {
                classification = 'XUẤT SẮC';
                classStyle = 'background: #28a745; color: white;';
            } else if (average >= 7.0) {
                classification = 'TỐT';
                classStyle = 'background: #17a2b8; color: white;';
            } else if (average >= 5.5) {
                classification = 'KHẮC';
                classStyle = 'background: #ffc107; color: #212529;';
            } else if (average >= 4.0) {
                classification = 'TRUNG BÌNH';
                classStyle = 'background: #fd7e14; color: white;';
            } else {
                classification = 'KÉM';
                classStyle = 'background: #dc3545; color: white;';
            }
            
            classificationSpan.textContent = classification;
            classificationSpan.setAttribute('style', classStyle);
        } else {
            finalScoreInput.value = '';
            classificationSpan.textContent = '';
            classificationSpan.setAttribute('style', '');
        }
    }
    
    scoreInputs.forEach(inputId => {
        document.getElementById(inputId).addEventListener('input', calculateTotal);
    });
}

// UC 1.17: Xem tài liệu nghiệm thu
function viewDocument(docId, docName, fileName) {
    currentDocument = { id: docId, name: docName, file: fileName };
    
    // Update active document
    document.querySelectorAll('.document-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Simulate document content
    const viewer = document.getElementById('documentViewer');
    viewer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h5 style="color: #2c3e50;">${docName}</h5>
            <p style="color: #666; font-size: 12px;">File: ${fileName}</p>
        </div>
        <div style="border: 2px dashed #ddd; padding: 40px; text-align: center; border-radius: 8px;">
            ${getDocumentIcon(fileName)}
            <p><strong>Nội dung "${docName}"</strong></p>
            <p style="color: #666; font-size: 14px;">
                ${getDocumentPreview(docId)}
            </p>
            <div style="margin-top: 20px;">
                <button class="btn btn-info btn-sm" onclick="downloadDocument('${fileName}')">
                    <i class="fas fa-download"></i> Tải xuống
                </button>
                ${fileName.includes('.mp4') ? `
                    <button class="btn btn-success btn-sm" onclick="playVideo('${fileName}')" style="margin-left: 10px;">
                        <i class="fas fa-play"></i> Phát video
                    </button>
                ` : ''}
            </div>
        </div>
    `;
}

function getDocumentIcon(fileName) {
    if (fileName.includes('.mp4')) {
        return '<i class="fas fa-video" style="font-size: 64px; color: #e74c3c; margin-bottom: 15px;"></i>';
    } else if (fileName.includes('.pdf')) {
        return '<i class="fas fa-file-pdf" style="font-size: 64px; color: #dc3545; margin-bottom: 15px;"></i>';
    } else {
        return '<i class="fas fa-file" style="font-size: 64px; color: #6c757d; margin-bottom: 15px;"></i>';
    }
}

function getDocumentPreview(docId) {
    const previews = {
        1: "Báo cáo tổng kết đầy đủ về quá trình thực hiện đề tài, kết quả đạt được, khó khăn gặp phải và kinh nghiệm rút ra...",
        2: "Sản phẩm cụ thể của nghiên cứu: phần mềm, hệ thống, mô hình, thuật toán hoặc các kết quả nghiên cứu khác...",
        3: "Các bài báo khoa học đã công bố hoặc chuẩn bị công bố từ kết quả nghiên cứu của đề tài...",
        4: "Video demo trực quan về sản phẩm, kết quả nghiên cứu, cách thức hoạt động và ứng dụng thực tế...",
        5: "Tài liệu hướng dẫn sử dụng, cài đặt, vận hành hệ thống hoặc ứng dụng kết quả nghiên cứu..."
    };
    return previews[docId] || "Nội dung tài liệu nghiệm thu...";
}

function downloadDocument(fileName) {
    showNotification(`Đang tải xuống file: ${fileName}`, 'info');
    // TODO: Implement actual download functionality
}

function playVideo(fileName) {
    showNotification(`Đang phát video: ${fileName}`, 'info');
    // TODO: Implement actual video player
}

// UC 1.17: Lưu kết quả đánh giá
function luuKetQuaDanhGia() {
    const scores = ['score1', 'score2', 'score3', 'score4'].map(id => {
        const value = parseFloat(document.getElementById(id).value);
        return isNaN(value) ? null : value;
    });
    
    if (scores.includes(null) || scores.some(score => score < 0 || score > 10)) {
        showNotification('Vui lòng nhập đầy đủ điểm số hợp lệ (0-10) cho tất cả tiêu chí!', 'error');
        return;
    }
    
    const finalScore = parseFloat(document.getElementById('finalScore').value);
    const detailComment = document.getElementById('detailComment').value.trim();
    
    if (!detailComment) {
        showNotification('Vui lòng nhập nhận xét chi tiết!', 'error');
        return;
    }
    
    // Update đề tài
    if (currentDeTai) {
        const classification = document.getElementById('classification').textContent;
        
        currentDeTai.ketQua = {
            diemSo: {
                tinhMoiKhoaHoc: scores[0],
                chatLuongSanPham: scores[1],
                tinhUngDung: scores[2],
                baoCaoTrinhBay: scores[3]
            },
            diemTongKet: finalScore,
            xepLoai: classification,
            nhanXet: detailComment,
            ngayDanhGia: new Date().toISOString(),
            nguoiDanhGia: 'PGS.TS. Phạm Văn D'
        };
        
        currentDeTai.trangThai = 'da-nghiem-thu';
        
        showNotification(`Đã lưu kết quả đánh giá! Điểm: ${finalScore}/10 - Xếp loại: ${classification}`, 'success');
        
        // Refresh table
        loadNghiemThuData();
        hideModal('nghiemThuModal');
    }
}

// Helper functions
function getStatusText(status) {
    const statusMap = {
        'cho-nghiem-thu': 'Chờ nghiệm thu',
        'da-nghiem-thu': 'Đã nghiệm thu',
        'dang-danh-gia': 'Đang đánh giá'
    };
    return statusMap[status] || status;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
}

function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}
