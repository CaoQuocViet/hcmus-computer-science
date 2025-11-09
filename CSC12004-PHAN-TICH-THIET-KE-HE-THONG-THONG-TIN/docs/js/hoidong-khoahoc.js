// HỘI ĐỒNG KHOA HỌC - Dashboard Functionality
// Theo đặc tả UC 1.6: Xét duyệt đề tài

// Mock Data
const xetDuyetData = [
    {
        id: 'HS002',
        maHoSo: 'HS002',
        tenDeTai: 'Phát triển ứng dụng IoT cho nông nghiệp thông minh',
        chuNhiem: 'TS. Lê Thị B',
        linhVuc: 'Công nghệ thông tin',
        ngayGui: '2024-10-20',
        trangThai: 'cho-xet-duyet',
        documents: [
            { id: 1, name: 'Đề cương chi tiết', file: 'de-cuong-chi-tiet.pdf' },
            { id: 2, name: 'CV chủ nhiệm', file: 'cv-chu-nhiem.pdf' },
            { id: 3, name: 'Danh sách thành viên', file: 'danh-sach-thanh-vien.pdf' },
            { id: 4, name: 'Dự toán kinh phí', file: 'du-toan-kinh-phi.xlsx' },
            { id: 5, name: 'Tài liệu tham khảo', file: 'tai-lieu-tham-khao.pdf' }
        ],
        danhGia: null
    },
    {
        id: 'HS004',
        maHoSo: 'HS004',
        tenDeTai: 'Nghiên cứu ứng dụng blockchain trong quản lý chuỗi cung ứng',
        chuNhiem: 'PGS.TS. Nguyễn Văn C',
        linhVuc: 'Công nghệ thông tin',
        ngayGui: '2024-10-25',
        trangThai: 'cho-xet-duyet',
        documents: [
            { id: 1, name: 'Đề cương chi tiết', file: 'blockchain-de-cuong.pdf' },
            { id: 2, name: 'CV chủ nhiệm', file: 'cv-pgs-nguyen.pdf' },
            { id: 3, name: 'Danh sách thành viên', file: 'team-blockchain.pdf' },
            { id: 4, name: 'Dự toán kinh phí', file: 'budget-blockchain.xlsx' },
            { id: 5, name: 'Tài liệu tham khảo', file: 'blockchain-references.pdf' }
        ],
        danhGia: null
    }
];

let currentHoSo = null;
let currentDocument = null;

document.addEventListener('DOMContentLoaded', function() {
    loadXetDuyetData();
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
    document.getElementById('currentPage').textContent = 'Xét duyệt đề tài';
}

// UC 1.6: Load danh sách hồ sơ chờ xét duyệt
function loadXetDuyetData() {
    const tbody = document.getElementById('xetDuyetTable');
    if (!tbody) return;
    
    tbody.innerHTML = xetDuyetData.map(hs => `
        <tr>
            <td>${hs.maHoSo}</td>
            <td>${hs.tenDeTai}</td>
            <td>${hs.chuNhiem}</td>
            <td>${hs.linhVuc}</td>
            <td>${formatDate(hs.ngayGui)}</td>
            <td><span class="status status-${hs.trangThai}">${getStatusText(hs.trangThai)}</span></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="xetDuyetHoSo('${hs.id}')">
                    <i class="fas fa-eye"></i> Xét duyệt
                </button>
            </td>
        </tr>
    `).join('');
}

// UC 1.6: Mở modal xét duyệt hồ sơ
function xetDuyetHoSo(hoSoId) {
    currentHoSo = xetDuyetData.find(hs => hs.id === hoSoId);
    if (!currentHoSo) return;
    
    const modalContent = document.getElementById('xetDuyetContent');
    
    modalContent.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #2c3e50; margin-bottom: 15px;">📄 THÔNG TIN ĐỀ TÀI</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p><strong>Mã hồ sơ:</strong> ${currentHoSo.maHoSo}</p>
                <p><strong>Tên đề tài:</strong> ${currentHoSo.tenDeTai}</p>
                <p><strong>Chủ nhiệm:</strong> ${currentHoSo.chuNhiem}</p>
                <p><strong>Lĩnh vực:</strong> ${currentHoSo.linhVuc}</p>
                <p><strong>Ngày gửi:</strong> ${formatDate(currentHoSo.ngayGui)}</p>
            </div>
        </div>

        <div style="margin-bottom: 20px;">
            <h4 style="color: #2c3e50; margin-bottom: 15px;">📂 TÀI LIỆU HỒ SƠ</h4>
            <div class="document-list">
                ${currentHoSo.documents.map((doc, index) => `
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
            <h4 style="color: #2c3e50; margin-bottom: 15px;">📝 ĐÁNH GIÁ</h4>
            
            <div class="form-group">
                <label class="form-label">Quyết định: <span class="required">*</span></label>
                <div class="radio-group">
                    <div class="radio-item">
                        <input type="radio" name="decision" value="phe-duyet" id="pheDuyet">
                        <label for="pheDuyet">✅ Phê duyệt</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" name="decision" value="yeu-cau-chinh-sua" id="yeuCauChinhSua">
                        <label for="yeuCauChinhSua">📝 Yêu cầu chỉnh sửa</label>
                    </div>
                </div>
            </div>

            <div class="form-group" id="chinhSuaGroup" style="display: none;">
                <label class="form-label">Chi tiết yêu cầu chỉnh sửa: <span class="required">*</span></label>
                <textarea id="yeuCauChinhSuaText" class="form-textarea" 
                          placeholder="Nhập chi tiết yêu cầu chỉnh sửa...&#10;&#10;Ví dụ:&#10;- Cần bổ sung thêm tài liệu tham khảo về công nghệ mới nhất&#10;- Làm rõ phương pháp nghiên cứu&#10;- Điều chỉnh dự toán kinh phí phần thiết bị"></textarea>
            </div>

            <div style="text-align: right; margin-top: 20px;">
                <button type="button" class="btn btn-secondary" onclick="hideModal('xetDuyetModal')">
                    Hủy
                </button>
                <button type="button" class="btn btn-primary" onclick="luuDanhGia()">
                    <i class="fas fa-save"></i> Lưu đánh giá
                </button>
            </div>
        </div>
    `;
    
    // Show first document by default
    if (currentHoSo.documents.length > 0) {
        const firstDoc = currentHoSo.documents[0];
        viewDocument(firstDoc.id, firstDoc.name, firstDoc.file);
    }
    
    // Setup radio button event listeners
    document.querySelectorAll('input[name="decision"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const chinhSuaGroup = document.getElementById('chinhSuaGroup');
            if (this.value === 'yeu-cau-chinh-sua') {
                chinhSuaGroup.style.display = 'block';
            } else {
                chinhSuaGroup.style.display = 'none';
            }
        });
    });
    
    showModal('xetDuyetModal');
}

// UC 1.6: Xem tài liệu
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
            <i class="fas fa-file-pdf" style="font-size: 64px; color: #dc3545; margin-bottom: 15px;"></i>
            <p><strong>Nội dung tài liệu "${docName}"</strong></p>
            <p style="color: #666; font-size: 14px;">
                ${getDocumentPreview(docId)}
            </p>
            <button class="btn btn-info btn-sm" onclick="downloadDocument('${fileName}')">
                <i class="fas fa-download"></i> Tải xuống
            </button>
        </div>
    `;
}

function getDocumentPreview(docId) {
    const previews = {
        1: "Đề cương nghiên cứu chi tiết bao gồm: mục tiêu, phương pháp, kế hoạch thực hiện, kết quả dự kiến...",
        2: "Curriculum Vitae của chủ nhiệm đề tài: học vị, kinh nghiệm, các công trình khoa học đã công bố...",
        3: "Danh sách các thành viên tham gia đề tài, vai trò và trách nhiệm của từng thành viên...",
        4: "Bảng dự toán chi tiết kinh phí thực hiện đề tài: nhân công, thiết bị, vật tư, chi phí khác...",
        5: "Danh mục các tài liệu tham khảo, nghiên cứu liên quan đến chủ đề của đề tài..."
    };
    return previews[docId] || "Xem trước nội dung tài liệu...";
}

function downloadDocument(fileName) {
    showNotification(`📥 Đang tải xuống file: ${fileName}`, 'info');
    // TODO: Implement actual download functionality
}

// UC 1.6: Lưu đánh giá
function luuDanhGia() {
    const decision = document.querySelector('input[name="decision"]:checked');
    
    if (!decision) {
        showNotification('Vui lòng chọn quyết định đánh giá!', 'error');
        return;
    }
    
    let yeuCauChinhSua = '';
    if (decision.value === 'yeu-cau-chinh-sua') {
        yeuCauChinhSua = document.getElementById('yeuCauChinhSuaText').value.trim();
        if (!yeuCauChinhSua) {
            showNotification('Vui lòng nhập chi tiết yêu cầu chỉnh sửa!', 'error');
            return;
        }
    }
    
    // Update hồ sơ
    if (currentHoSo) {
        currentHoSo.danhGia = {
            quyetDinh: decision.value,
            yeuCauChinhSua: yeuCauChinhSua,
            ngayDanhGia: new Date().toISOString(),
            nguoiDanhGia: 'PGS.TS. Trần Văn B'
        };
        
        // Update trạng thái
        if (decision.value === 'phe-duyet') {
            currentHoSo.trangThai = 'da-phe-duyet';
            showNotification('✅ Đã phê duyệt đề tài thành công!', 'success');
        } else {
            currentHoSo.trangThai = 'yeu-cau-chinh-sua';
            showNotification('📝 Đã gửi yêu cầu chỉnh sửa!', 'success');
        }
        
        // Refresh table
        loadXetDuyetData();
        hideModal('xetDuyetModal');
    }
}

// Helper functions
function getStatusText(status) {
    const statusMap = {
        'cho-xet-duyet': 'Chờ xét duyệt',
        'da-phe-duyet': 'Đã phê duyệt',
        'yeu-cau-chinh-sua': 'Yêu cầu chỉnh sửa',
        'da-danh-gia': 'Đã đánh giá'
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
