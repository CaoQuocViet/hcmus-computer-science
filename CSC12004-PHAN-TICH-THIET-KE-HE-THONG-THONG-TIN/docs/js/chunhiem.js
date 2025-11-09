// CHỦ NHIỆM ĐỀ TÀI - Dashboard Functionality
// Theo đặc tả UC 1.3, 1.8, 1.10, 1.15

// Mock Data - Bổ sung đủ dữ liệu cho demo
const hoSoData = [
    {
        id: 'HS001',
        maHoSo: 'HS001',
        tenDeTai: 'Nghiên cứu ứng dụng AI trong giáo dục',
        linhVuc: 'Công nghệ thông tin',
        trangThai: 'da-tao',
        ngayTao: '2024-10-15',
        chuNhiem: 'TS. Nguyễn Văn A',
        yeuCauChinhSua: '',
        documents: {
            1: null, 2: null, 3: null, 4: null, 5: null
        },
        thanhVienList: ''
    },
    {
        id: 'HS002',
        maHoSo: 'HS002',
        tenDeTai: 'Phát triển ứng dụng mobile cho du lịch',
        linhVuc: 'Công nghệ thông tin',
        trangThai: 'cho-kiem-tra',
        ngayTao: '2024-10-01',
        chuNhiem: 'TS. Nguyễn Văn A',
        yeuCauChinhSua: '',
        documents: {
            1: 'de-cuong-du-lich.pdf', 2: 'cv-chunhiem.pdf', 3: 'kinh-phi.xlsx', 4: 'tai-lieu-tham-khao.pdf', 5: 'bao-cao-so-bo.docx'
        },
        thanhVienList: 'Nguyễn Thị B, Trần Văn C'
    },
    {
        id: 'HS003',
        maHoSo: 'HS003',
        tenDeTai: 'Phát triển hệ thống quản lý thông minh',
        linhVuc: 'Công nghệ thông tin',
        trangThai: 'dang-chinh-sua',
        ngayTao: '2024-09-20',
        chuNhiem: 'TS. Nguyễn Văn A',
        yeuCauChinhSua: 'Cần bổ sung thêm tài liệu tham khảo và làm rõ phương pháp nghiên cứu',
        ngayYeuCau: '2024-11-01',
        documents: {
            1: 'de-cuong-v1.pdf', 2: 'cv-chunhiem.pdf', 3: null, 4: null, 5: null
        },
        thanhVienList: ''
    },
    {
        id: 'HS004',
        maHoSo: 'HS004',
        tenDeTai: 'Nghiên cứu blockchain trong tài chính',
        linhVuc: 'Công nghệ thông tin',
        trangThai: 'da-hoan-thien',
        ngayTao: '2024-08-15',
        chuNhiem: 'TS. Nguyễn Văn A',
        yeuCauChinhSua: '',
        documents: {
            1: 'de-cuong-blockchain.pdf', 2: 'cv-chunhiem.pdf', 3: 'kinh-phi-blockchain.xlsx', 4: 'tai-lieu-blockchain.pdf', 5: 'bao-cao-blockchain.docx'
        },
        thanhVienList: 'Lê Văn D, Phạm Thị E, Hoàng Văn F'
    },
    {
        id: 'HS005',
        maHoSo: 'HS005',
        tenDeTai: 'Ứng dụng IoT trong nông nghiệp',
        linhVuc: 'Công nghệ thông tin',
        trangThai: 'da-phe-duyet',
        ngayTao: '2024-07-10',
        chuNhiem: 'TS. Nguyễn Văn A',
        yeuCauChinhSua: '',
        documents: {
            1: 'de-cuong-iot.pdf', 2: 'cv-chunhiem.pdf', 3: 'kinh-phi-iot.xlsx', 4: 'tai-lieu-iot.pdf', 5: 'bao-cao-iot.docx'
        },
        thanhVienList: 'Nguyễn Văn G, Trần Thị H'
    },
    {
        id: 'HS006',
        maHoSo: 'HS006',
        tenDeTai: 'Machine Learning trong y tế',
        linhVuc: 'Công nghệ thông tin',
        trangThai: 'dang-thuc-hien',
        ngayTao: '2024-06-01',
        chuNhiem: 'TS. Nguyễn Văn A',
        yeuCauChinhSua: '',
        documents: {
            1: 'de-cuong-ml-yte.pdf', 2: 'cv-chunhiem.pdf', 3: 'kinh-phi-ml.xlsx', 4: 'tai-lieu-ml.pdf', 5: 'bao-cao-ml.docx'
        },
        thanhVienList: 'Lê Thị I, Phạm Văn J, Hoàng Thị K'
    }
];

const tienDoData = [
    {
        id: 'DT001',
        maDeTai: 'DT001',
        tenDeTai: 'Nghiên cứu ứng dụng AI trong giáo dục',
        kyBaoCao: 'Quý 1/2025',
        hanNop: '2025-01-15',
        trangThai: 'can-nop',
        chuNhiem: 'TS. Nguyễn Văn A'
    },
    {
        id: 'DT002', 
        maDeTai: 'DT002',
        tenDeTai: 'Ứng dụng IoT trong nông nghiệp',
        kyBaoCao: 'Quý 4/2024',
        hanNop: '2024-12-31',
        trangThai: 'da-nop',
        chuNhiem: 'TS. Nguyễn Văn A'
    },
    {
        id: 'DT003',
        maDeTai: 'DT003',
        tenDeTai: 'Machine Learning trong y tế',
        kyBaoCao: 'Quý 4/2024',
        hanNop: '2024-11-30',
        trangThai: 'can-nop',
        chuNhiem: 'TS. Nguyễn Văn A'
    },
    {
        id: 'DT004',
        maDeTai: 'DT004',
        tenDeTai: 'Nghiên cứu blockchain trong tài chính',
        kyBaoCao: 'Quý 3/2024',
        hanNop: '2024-09-30',
        trangThai: 'da-nop',
        chuNhiem: 'TS. Nguyễn Văn A'
    },
    {
        id: 'DT005',
        maDeTai: 'DT005',
        tenDeTai: 'Phát triển ứng dụng mobile cho du lịch',
        kyBaoCao: 'Quý 1/2025',
        hanNop: '2025-02-28',
        trangThai: 'can-nop',
        chuNhiem: 'TS. Nguyễn Văn A'
    }
];

const nghiemThuData = [
    {
        id: 'DT002',
        maDeTai: 'DT002', 
        tenDeTai: 'Ứng dụng IoT trong nông nghiệp',
        hanNopNghiemThu: '2025-02-28',
        trangThai: 'can-nop-nghiem-thu',
        chuNhiem: 'TS. Nguyễn Văn A'
    },
    {
        id: 'DT004',
        maDeTai: 'DT004',
        tenDeTai: 'Nghiên cứu blockchain trong tài chính',
        hanNopNghiemThu: '2025-01-15',
        trangThai: 'can-nop-nghiem-thu',
        chuNhiem: 'TS. Nguyễn Văn A'
    },
    {
        id: 'DT006',
        maDeTai: 'DT006',
        tenDeTai: 'Machine Learning trong y tế',
        hanNopNghiemThu: '2025-03-31',
        trangThai: 'can-nop-nghiem-thu',
        chuNhiem: 'TS. Nguyễn Văn A'
    }
];

// Global variables
let selectedFiles = {};
let uploadProgress = {};

document.addEventListener('DOMContentLoaded', function() {
    loadHoSoCuaToi();
    loadUploadOptions();
    loadChinhSuaHoSo();
    loadTienDoData();
    loadLichBaoCao();
    loadNghiemThuData();
    
    // Setup drag and drop functionality
    setupDragAndDrop();
    
    // Initialize notification system
    updateNotificationCount();
    
    // Simulate nhận thông báo từ hệ thống sau 3 giây
    setTimeout(() => {
        addSystemNotification(
            'Hồ sơ cần bổ sung',
            'Hồ sơ HS004 cần bổ sung thêm thông tin về kinh phí thực hiện',
            'warning',
            'UC_1_4'
        );
    }, 3000);
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
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to corresponding nav link
    const navLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (navLink) {
        navLink.classList.add('active');
    }
    
    // Update breadcrumb
    const pageNames = {
        'ho-so-cua-toi': 'Hồ sơ của tôi',
        'tai-len-tai-lieu': 'Tải lên tài liệu', 
        'chinh-sua-ho-so': 'Chỉnh sửa hồ sơ',
        'tai-len-tien-do': 'Tải lên tiến độ',
        'lich-bao-cao': 'Lịch báo cáo',
        'tai-len-nghiem-thu': 'Tải lên nghiệm thu'
    };
    const currentPageEl = document.getElementById('currentPage');
    if (currentPageEl) {
        currentPageEl.textContent = pageNames[sectionId] || sectionId;
    }
}

// UC 1.3: Hồ sơ của tôi
function loadHoSoCuaToi() {
    const tbody = document.getElementById('hoSoTable');
    if (!tbody) return;
    
    tbody.innerHTML = hoSoData.map(hs => `
        <tr>
            <td>${hs.maHoSo}</td>
            <td>${hs.tenDeTai}</td>
            <td>${hs.linhVuc}</td>
            <td><span class="status status-${hs.trangThai}">${getStatusText(hs.trangThai)}</span></td>
            <td>${formatDate(hs.ngayTao)}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="xemChiTiet('${hs.id}')">
                    <i class="fas fa-eye"></i> Xem
                </button>
                ${hs.trangThai === 'da-tao' ? `
                    <button class="btn btn-primary btn-sm" onclick="hoanThienHoSo('${hs.id}')">
                        <i class="fas fa-upload"></i> Hoàn thiện
                    </button>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// Load upload options
function loadUploadOptions() {
    const select = document.getElementById('hoSoSelect');
    if (!select) return;
    
    // Chỉ hiển thị hồ sơ trạng thái "đã tạo"
    const availableHoSo = hoSoData.filter(hs => hs.trangThai === 'da-tao');
    
    select.innerHTML = '<option value="">Chọn hồ sơ...</option>' + 
        availableHoSo.map(hs => `<option value="${hs.id}">${hs.maHoSo} - ${hs.tenDeTai}</option>`).join('');
}

function loadUploadForm() {
    const select = document.getElementById('hoSoSelect');
    const uploadForm = document.getElementById('uploadForm');
    
    if (select.value) {
        uploadForm.style.display = 'block';
        resetUploadForm();
    } else {
        uploadForm.style.display = 'none';
    }
}

function resetUploadForm() {
    selectedFiles = {};
    uploadProgress = {};
    
    // Reset all upload areas
    for (let i = 1; i <= 5; i++) {
        const status = document.querySelector(`#uploadForm .document-section:nth-child(${i}) .upload-status`);
        if (status) {
            status.textContent = 'Chưa tải lên';
            status.className = 'upload-status pending';
        }
        const fileInput = document.getElementById(`file${i}`);
        if (fileInput) {
            fileInput.value = '';
        }
    }
    
    const thanhVienInput = document.getElementById('thanhVienList');
    if (thanhVienInput) {
        thanhVienInput.value = '';
    }
    
    const guiBtn = document.getElementById('guiBtn');
    if (guiBtn) {
        guiBtn.disabled = true;
    }
}

function selectFile(docType) {
    document.getElementById(`file${docType}`).click();
}

function uploadFile(docType) {
    const fileInput = document.getElementById(`file${docType}`);
    const file = fileInput.files[0];
    
    if (!file) return;
    
    // Validate file
    const maxSizes = {1: 10, 2: 5, 3: 5, 4: 5, 5: 20}; // MB
    const allowedTypes = {
        1: ['.pdf', '.doc', '.docx'],
        2: ['.pdf', '.doc', '.docx'],
        3: ['.pdf', '.doc', '.docx', '.xls', '.xlsx'],
        4: ['.pdf', '.xls', '.xlsx'],
        5: ['.pdf', '.doc', '.docx']
    };
    
    const fileSizeMB = file.size / (1024 * 1024);
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    
    if (fileSizeMB > maxSizes[docType]) {
        showNotification(`File quá lớn! Kích thước tối đa cho tài liệu này là ${maxSizes[docType]}MB`, 'error');
        fileInput.value = '';
        return;
    }
    
    if (!allowedTypes[docType].includes(fileExt)) {
        showNotification(`Định dạng file không hợp lệ! Chỉ chấp nhận: ${allowedTypes[docType].join(', ')}`, 'error');
        fileInput.value = '';
        return;
    }
    
    // Simulate upload process
    selectedFiles[docType] = file;
    simulateFileUpload(docType, file);
}

function simulateFileUpload(docType, file) {
    const status = document.querySelector(`#uploadForm .document-section:nth-child(${docType}) .upload-status`);
    const uploadArea = document.querySelector(`#uploadForm .document-section:nth-child(${docType}) .upload-area`);
    
    if (!status || !uploadArea) return;
    
    status.textContent = 'Đang tải lên...';
    status.className = 'upload-status pending';
    
    // Add progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = '<div class="progress" style="width: 0%"></div>';
    uploadArea.appendChild(progressBar);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Upload completed
            status.textContent = `${file.name}`;
            status.className = 'upload-status completed';
            uploadArea.removeChild(progressBar);
            
            // Check if all files uploaded
            checkUploadCompletion();
        }
        
        progressBar.querySelector('.progress').style.width = progress + '%';
    }, 200);
}

function checkUploadCompletion() {
    const completedCount = Object.keys(selectedFiles).length;
    const thanhVienList = document.getElementById('thanhVienList').value.trim();
    
    // Cần đủ 5 tài liệu và danh sách thành viên
    if (completedCount >= 5 && thanhVienList) {
        const guiBtn = document.getElementById('guiBtn');
        if (guiBtn) {
            guiBtn.disabled = false;
        }
    }
}

// UC 1.3: Gửi hồ sơ hoàn thiện - TUÂN THỦ ĐẶCTA UC
function guiHoSo() {
    const hoSoId = document.getElementById('hoSoSelect').value;
    const thanhVienList = document.getElementById('thanhVienList').value;
    
    // Bước 10: Kiểm tra đầy đủ 5 tài liệu bắt buộc
    if (!hoSoId || Object.keys(selectedFiles).length < 5 || !thanhVienList.trim()) {
        showNotification('Vui lòng hoàn thiện đầy đủ 5 tài liệu bắt buộc và danh sách thành viên!', 'error');
        return;
    }
    
    // Bước 11: Chuyển trạng thái sang "Chờ kiểm tra"
    const hoSo = hoSoData.find(hs => hs.id === hoSoId);
    if (hoSo) {
        hoSo.trangThai = 'cho-kiem-tra';
        hoSo.documents = {...selectedFiles};
        hoSo.thanhVienList = thanhVienList;
        hoSo.ngayGui = new Date().toISOString();
        
        // Bước 12: Gửi thông báo cho Nhân viên (theo đặc tả UC 1.3)
        addSystemNotification(
            'Hồ sơ đã gửi thành công', 
            `Hồ sơ ${hoSo.maHoSo} - "${hoSo.tenDeTai}" đã được gửi và chuyển sang trạng thái "Chờ kiểm tra"`, 
            'success',
            'UC_1_3'
        );
        
        showNotification('Đã gửi hồ sơ thành công! Hồ sơ chuyển sang trạng thái "Chờ kiểm tra"', 'success');
        
        // Reset form
        document.getElementById('hoSoSelect').value = '';
        document.getElementById('uploadForm').style.display = 'none';
        
        // Refresh data
        loadHoSoCuaToi();
        loadUploadOptions();
    }
}

// UC 1.8: Load danh sách hồ sơ cần chỉnh sửa
function loadChinhSuaHoSo() {
    const tbody = document.getElementById('chinhSuaTable');
    if (!tbody) return;
    
    const chinhSuaHoSo = hoSoData.filter(hs => hs.trangThai === 'dang-chinh-sua');
    
    tbody.innerHTML = chinhSuaHoSo.map(hs => `
        <tr>
            <td>${hs.maHoSo}</td>
            <td>${hs.tenDeTai}</td>
            <td style="max-width: 300px;">${hs.yeuCauChinhSua}</td>
            <td>${formatDate(hs.ngayYeuCau)}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="chinhSuaHoSo('${hs.id}')">
                    <i class="fas fa-edit"></i> Chỉnh sửa
                </button>
            </td>
        </tr>
    `).join('');
}

// UC 1.8: Cập nhật hồ sơ đã chỉnh sửa - TUÂN THỦ ĐẶC TẢ UC
function chinhSuaHoSo(hoSoId) {
    const hoSo = hoSoData.find(hs => hs.id === hoSoId);
    if (!hoSo) {
        showNotification('Không tìm thấy hồ sơ', 'error');
        return;
    }
    
    // Bước 1-4: Theo UC 1.8 - Hiển thị modal chỉnh sửa
    const modalContent = `
        <div class="modal" id="chinhSuaModal" style="display: block;">
            <div class="modal-content" style="max-width: 600px; margin: 3% auto;">
                <div class="modal-header">
                    <h3 class="modal-title">CẬP NHẬT HỒ SƠ ĐÃ CHỈNH SỬA</h3>
                    <button class="close" onclick="hideModal('chinhSuaModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Thông tin hồ sơ:</label>
                        <div style="padding: 12px; background: #f8f9fa; border-radius: 6px; margin-bottom: 15px;">
                            <div><strong>Mã hồ sơ:</strong> ${hoSo.maHoSo}</div>
                            <div><strong>Tên đề tài:</strong> ${hoSo.tenDeTai}</div>
                            <div><strong>Lĩnh vực:</strong> ${hoSo.linhVuc}</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Yêu cầu chỉnh sửa từ Hội đồng:</label>
                        <div style="padding: 12px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; margin-bottom: 15px;">
                            <div style="color: #856404; font-size: 14px;">${hoSo.yeuCauChinhSua}</div>
                            <small style="color: #856404;">Ngày yêu cầu: ${formatDate(hoSo.ngayYeuCau)}</small>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Tải lên tài liệu đã chỉnh sửa: <span class="required">*</span></label>
                        <div class="upload-zone" style="border: 2px dashed #ddd; padding: 20px; text-align: center; border-radius: 6px;">
                            <i class="fas fa-cloud-upload-alt" style="font-size: 24px; color: #666; margin-bottom: 10px;"></i>
                            <div>Kéo thả file vào đây hoặc <button type="button" onclick="document.getElementById('fileChinhSua').click()" style="color: #3498db; background: none; border: none; text-decoration: underline; cursor: pointer;">chọn file</button></div>
                            <input type="file" id="fileChinhSua" style="display: none;" accept=".pdf,.doc,.docx,.xls,.xlsx" onchange="handleChinhSuaFile(this)">
                            <div id="fileChinhSuaStatus" style="margin-top: 10px; font-size: 13px; color: #666;"></div>
                            <small>Định dạng: PDF, DOC, DOCX, XLS, XLSX | Tối đa: 10MB</small>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Ghi chú chỉnh sửa:</label>
                        <textarea id="ghiChuChinhSua" class="form-textarea" rows="3" 
                                  placeholder="Mô tả những thay đổi đã thực hiện (tùy chọn)"></textarea>
                    </div>
                    
                    <div style="text-align: right; margin-top: 20px; gap: 10px; display: flex; justify-content: flex-end;">
                        <button type="button" class="btn btn-secondary" onclick="hideModal('chinhSuaModal')">Hủy</button>
                        <button type="button" class="btn btn-primary" onclick="guiLaiHoSo('${hoSoId}')" id="guiLaiBtn" disabled>
                            📤 Gửi lại hồ sơ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

// UC 1.8: Xử lý file chỉnh sửa
function handleChinhSuaFile(input) {
    const file = input.files[0];
    const statusDiv = document.getElementById('fileChinhSuaStatus');
    const guiLaiBtn = document.getElementById('guiLaiBtn');
    
    if (!file) {
        statusDiv.innerHTML = '';
        guiLaiBtn.disabled = true;
        return;
    }
    
    // Bước 6: Xác thực file (theo đặc tả UC 1.8)
    if (file.size > 10 * 1024 * 1024) {
        statusDiv.innerHTML = '<div style="color: #e74c3c;">File quá lớn! Tối đa 10MB</div>';
        guiLaiBtn.disabled = true;
        input.value = '';
        return;
    }
    
    const allowedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExt)) {
        statusDiv.innerHTML = '<div style="color: #e74c3c;">Định dạng file không hợp lệ!</div>';
        guiLaiBtn.disabled = true;
        input.value = '';
        return;
    }
    
    // File hợp lệ
    statusDiv.innerHTML = `<div style="color: #27ae60;">${file.name} (${(file.size/1024/1024).toFixed(2)}MB)</div>`;
    guiLaiBtn.disabled = false;
}

// UC 1.8: Gửi lại hồ sơ đã chỉnh sửa  
function guiLaiHoSo(hoSoId) {
    const fileInput = document.getElementById('fileChinhSua');
    const ghiChuEl = document.getElementById('ghiChuChinhSua');
    
    const file = fileInput.files[0];
    const ghiChu = ghiChuEl ? ghiChuEl.value : '';
    
    if (!file) {
        showNotification('Vui lòng tải lên tài liệu đã chỉnh sửa', 'error');
        return;
    }
    
    // Bước 7-9: Gửi lại và cập nhật trạng thái (theo UC 1.8)
    const hoSo = hoSoData.find(hs => hs.id === hoSoId);
    if (hoSo) {
        hoSo.trangThai = 'cho-xet-duyet-lai';
        hoSo.taiLieuChinhSua = {
            tenFile: file.name,
            kichThuoc: file.size,
            ghiChu: ghiChu,
            ngayChinhSua: new Date().toISOString()
        };
        
        // Bước 10: Gửi thông báo cho Nhân viên (theo đặc tả UC 1.8)
        addSystemNotification(
            'Hồ sơ đã được chỉnh sửa',
            `Chủ nhiệm đề tài đã gửi lại hồ sơ ${hoSo.maHoSo} - "${hoSo.tenDeTai}" sau khi chỉnh sửa`,
            'success',
            'UC_1_8'
        );
        
        hideModal('chinhSuaModal');
        loadChinhSuaHoSo(); // Refresh danh sách
        
        showNotification('Đã gửi lại hồ sơ thành công! Hồ sơ chuyển sang trạng thái "Chờ xét duyệt lại"', 'success');
    }
}

// UC 1.10: Load dữ liệu tiến độ 
function loadTienDoData() {
    const tbody = document.getElementById('tienDoTable');
    if (!tbody) return;
    
    tbody.innerHTML = tienDoData.map(td => `
        <tr>
            <td>${td.maDeTai}</td>
            <td>${td.tenDeTai}</td>
            <td>${td.kyBaoCao}</td>
            <td>${formatDate(td.hanNop)}</td>
            <td><span class="status status-${td.trangThai === 'can-nop' ? 'can-bo-sung' : 'da-hoan-thien'}">${td.trangThai === 'can-nop' ? 'Cần nộp' : 'Đã nộp'}</span></td>
            <td>
                ${td.trangThai === 'can-nop' ? `
                    <button class="btn btn-primary btn-sm" onclick="taiLenTienDo('${td.id}')">
                        <i class="fas fa-upload"></i> Tải lên
                    </button>
                ` : `
                    <button class="btn btn-info btn-sm" onclick="xemTienDo('${td.id}')">
                        <i class="fas fa-eye"></i> Xem
                    </button>
                `}
            </td>
        </tr>
    `).join('');
}

// UC 1.10: Tải dữ liệu định kỳ lên hệ thống - LUỒNG CHÍNH 
function taiLenTienDo(deTaiId) {
    // Bước 1-3: Đăng nhập và chọn chức năng (đã thực hiện)
    
    // Bước 4: Hệ thống hiển thị form tải dữ liệu
    const deTai = tienDoData.find(td => td.id === deTaiId);
    if (!deTai) {
        showNotification('Không tìm thấy thông tin đề tài', 'error');
        return;
    }
    
    // Bước 5: Chủ nhiệm chọn loại dữ liệu và tải file
    const modalContent = `
        <div class="modal" id="taiDuLieuModal" style="display: block;">
            <div class="modal-content" style="max-width: 500px; margin: 5% auto;">
                <div class="modal-header">
                    <h3 class="modal-title">TẢI DỮ LIỆU ĐỊNH KỲ</h3>
                    <button class="close" onclick="hideModal('taiDuLieuModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Đề tài:</label>
                        <div style="padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 13px;">
                            <strong>${deTai.tenDeTai}</strong><br>
                            <small>Mã: ${deTai.maDeTai} | Kỳ: ${deTai.kyBaoCao}</small>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Kỳ báo cáo: <span class="required">*</span></label>
                        <input type="text" value="${deTai.kyBaoCao}" class="form-input" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Loại dữ liệu: <span class="required">*</span></label>
                        <select id="loaiDuLieu" class="form-select" required>
                            <option value="">Chọn loại dữ liệu...</option>
                            <option value="bao-cao-tien-do">Báo cáo tiến độ</option>
                            <option value="tai-lieu-minh-chung">Tài liệu minh chứng</option>
                            <option value="ket-qua-thuc-hien">Kết quả thực hiện</option>
                            <option value="kinh-phi-su-dung">Kinh phí sử dụng</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Tải file: <span class="required">*</span></label>
                        <input type="file" id="fileTaiLen" class="form-input" 
                               accept=".pdf,.doc,.docx,.xls,.xlsx" required>
                        <div class="form-help" style="font-size: 11px;">📎 PDF, DOC, DOCX, XLS, XLSX | Max: 5MB</div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Ghi chú:</label>
                        <textarea id="ghiChuTaiLieu" class="form-textarea" rows="2" 
                                  placeholder="Ghi chú (tùy chọn)" style="font-size: 13px;"></textarea>
                    </div>
                    
                    <div style="text-align: right; margin-top: 20px;">
                        <button type="button" class="btn btn-secondary" onclick="hideModal('taiDuLieuModal')">Hủy</button>
                        <button type="button" class="btn btn-primary" onclick="xacNhanTaiLenDuLieu('${deTaiId}')">
                            Tải lên
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function xacNhanTaiLenDuLieu(deTaiId) {
    const loaiDuLieu = document.getElementById('loaiDuLieu').value;
    const fileTaiLen = document.getElementById('fileTaiLen').files[0];
    const ghiChu = document.getElementById('ghiChuTaiLieu').value;
    
    // Bước 6-8: Kiểm tra và xác nhận (theo database constraints)
    if (!loaiDuLieu || !fileTaiLen) {
        showNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
        return;
    }
    
    // Kiểm tra kích thước file (Max 5MB)
    if (fileTaiLen.size > 5 * 1024 * 1024) {
        showNotification('File quá lớn! Tối đa 5MB', 'error');
        return;
    }
    
    // Bước 9: Hệ thống lưu dữ liệu (theo schema database)
    const duLieuMoi = {
        ma_tai_lieu: 'TL' + Date.now(),
        ma_bao_cao: deTaiId,
        ten_tai_lieu: getLoaiTaiLieuText(loaiDuLieu),
        ten_file: fileTaiLen.name,
        kich_thuoc_file: fileTaiLen.size,
        loai_file: fileTaiLen.type,
        ngay_tai_len: new Date().toISOString(),
        mo_ta: ghiChu,
        nguoi_tai_len: 'chunhiem_current'
    };
    
    // Cập nhật trạng thái
    const deTai = tienDoData.find(td => td.id === deTaiId);
    deTai.trangThai = 'da-nop';
    deTai.duLieuDaTai = duLieuMoi;
    
    // Bước 10: Hiển thị kết quả và gửi thông báo cho nhân viên (UC 1.10)
    hideModal('taiDuLieuModal');
    loadTienDoData();
    
    // Gửi thông báo hệ thống cho nhân viên theo đặc tả UC 1.10
    addSystemNotification(
        'Báo cáo tiến độ đã được nộp',
        `Chủ nhiệm đề tài đã nộp ${getLoaiTaiLieuText(loaiDuLieu)} cho đề tài ${deTai.tenDeTai}`,
        'info',
        'UC_1_10'
    );
    
    showNotification('📤 Tải lên thành công: ' + getLoaiTaiLieuText(loaiDuLieu), 'success');
}

function loadLichBaoCao() {
    const tbody = document.getElementById('lichBaoCaoTable');
    if (!tbody) return;
    
    tbody.innerHTML = tienDoData.map(td => `
        <tr>
            <td>${td.maDeTai}</td>
            <td>${td.tenDeTai}</td>
            <td>${td.kyBaoCao}</td>
            <td>${formatDate(td.hanNop)}</td>
            <td><span class="status status-${td.trangThai === 'can-nop' ? 'can-bo-sung' : 'da-hoan-thien'}">${td.trangThai === 'can-nop' ? 'Sắp đến hạn' : 'Đã hoàn thành'}</span></td>
        </tr>
    `).join('');
}

// UC 1.15: Load dữ liệu nghiệm thu
function loadNghiemThuData() {
    const tbody = document.getElementById('nghiemThuTable');
    if (!tbody) return;
    
    tbody.innerHTML = nghiemThuData.map(nt => `
        <tr>
            <td>${nt.maDeTai}</td>
            <td>${nt.tenDeTai}</td>
            <td>${formatDate(nt.hanNopNghiemThu)}</td>
            <td><span class="status status-can-bo-sung">Cần nộp</span></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="taiLenNghiemThu('${nt.id}')">
                    <i class="fas fa-upload"></i> Tải lên
                </button>
            </td>
        </tr>
    `).join('');
}

// UC 1.15: Tải lên hồ sơ nghiệm thu - TUÂN THỦ ĐẶC TẢ UC
function taiLenNghiemThu(deTaiId) {
    const deTai = nghiemThuData.find(nt => nt.id === deTaiId);
    if (!deTai) {
        showNotification('Không tìm thấy thông tin đề tài', 'error');
        return;
    }
    
    // Bước 1-3: Theo UC 1.15 - Hiển thị form tải lên nghiệm thu
    const modalContent = `
        <div class="modal" id="nghiemThuModal" style="display: block;">
            <div class="modal-content" style="max-width: 650px; margin: 3% auto;">
                <div class="modal-header">
                    <h3 class="modal-title">TẢI LÊN HỒ SƠ NGHIỆM THU</h3>
                    <button class="close" onclick="hideModal('nghiemThuModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Thông tin đề tài:</label>
                        <div style="padding: 12px; background: #f8f9fa; border-radius: 6px; margin-bottom: 20px;">
                            <div><strong>Mã đề tài:</strong> ${deTai.maDeTai}</div>
                            <div><strong>Tên đề tài:</strong> ${deTai.tenDeTai}</div>
                            <div><strong>Hạn nộp:</strong> ${formatDate(deTai.hanNopNghiemThu)}</div>
                        </div>
                    </div>
                    
                    <!-- Bước 4-5: Danh mục hồ sơ nghiệm thu theo UC 1.15 -->
                    <div class="form-group">
                        <label class="form-label">Danh mục hồ sơ nghiệm thu cần tải lên:</label>
                        
                        <div class="document-category" style="margin-bottom: 15px;">
                            <div class="document-header" style="background: #e3f2fd; padding: 10px; border-radius: 6px 6px 0 0; font-weight: 600;">
                                📄 1. Báo cáo tổng kết nghiệm thu
                            </div>
                            <div class="upload-area-nt" style="border: 1px solid #ddd; padding: 15px; border-radius: 0 0 6px 6px;">
                                <input type="file" id="file_nt_1" accept=".pdf,.doc,.docx" onchange="handleNghiemThuFile(1, this)" style="margin-bottom: 10px;">
                                <div class="upload-status-nt" id="status_nt_1" style="font-size: 12px; color: #666;">Chưa tải lên</div>
                            </div>
                        </div>
                        
                        <div class="document-category" style="margin-bottom: 15px;">
                            <div class="document-header" style="background: #e8f5e8; padding: 10px; border-radius: 6px 6px 0 0; font-weight: 600;">
                                💰 2. Báo cáo quyết toán kinh phí
                            </div>
                            <div class="upload-area-nt" style="border: 1px solid #ddd; padding: 15px; border-radius: 0 0 6px 6px;">
                                <input type="file" id="file_nt_2" accept=".pdf,.xls,.xlsx" onchange="handleNghiemThuFile(2, this)" style="margin-bottom: 10px;">
                                <div class="upload-status-nt" id="status_nt_2" style="font-size: 12px; color: #666;">Chưa tải lên</div>
                            </div>
                        </div>
                        
                        <div class="document-category" style="margin-bottom: 15px;">
                            <div class="document-header" style="background: #fff3e0; padding: 10px; border-radius: 6px 6px 0 0; font-weight: 600;">
                                3. Sản phẩm/Kết quả nghiên cứu
                            </div>
                            <div class="upload-area-nt" style="border: 1px solid #ddd; padding: 15px; border-radius: 0 0 6px 6px;">
                                <input type="file" id="file_nt_3" accept=".pdf,.doc,.docx,.zip,.rar" onchange="handleNghiemThuFile(3, this)" style="margin-bottom: 10px;">
                                <div class="upload-status-nt" id="status_nt_3" style="font-size: 12px; color: #666;">Chưa tải lên</div>
                            </div>
                        </div>
                        
                        <div class="document-category" style="margin-bottom: 15px;">
                            <div class="document-header" style="background: #fce4ec; padding: 10px; border-radius: 6px 6px 0 0; font-weight: 600;">
                                4. Tài liệu đánh giá tự đánh giá
                            </div>
                            <div class="upload-area-nt" style="border: 1px solid #ddd; padding: 15px; border-radius: 0 0 6px 6px;">
                                <input type="file" id="file_nt_4" accept=".pdf,.doc,.docx" onchange="handleNghiemThuFile(4, this)" style="margin-bottom: 10px;">
                                <div class="upload-status-nt" id="status_nt_4" style="font-size: 12px; color: #666;">Chưa tải lên</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Ghi chú nghiệm thu:</label>
                        <textarea id="ghiChuNghiemThu" class="form-textarea" rows="2" 
                                  placeholder="Ghi chú thêm về hồ sơ nghiệm thu (tùy chọn)"></textarea>
                    </div>
                    
                    <div style="text-align: right; margin-top: 20px; gap: 10px; display: flex; justify-content: flex-end;">
                        <button type="button" class="btn btn-secondary" onclick="hideModal('nghiemThuModal')">Hủy</button>
                        <button type="button" class="btn btn-primary" onclick="guiHoSoNghiemThu('${deTaiId}')" id="guiNghiemThuBtn" disabled>
                            Gửi hồ sơ nghiệm thu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

let selectedNghiemThuFiles = {};

function handleNghiemThuFile(category, input) {
    const file = input.files[0];
    const statusDiv = document.getElementById(`status_nt_${category}`);
    
    if (!file) {
        delete selectedNghiemThuFiles[category];
        statusDiv.textContent = 'Chưa tải lên';
        statusDiv.style.color = '#666';
        checkNghiemThuCompletion();
        return;
    }
    
    // Validate file size (Max 20MB)
    if (file.size > 20 * 1024 * 1024) {
        statusDiv.innerHTML = 'File quá lớn! Tối đa 20MB';
        statusDiv.style.color = '#e74c3c';
        input.value = '';
        delete selectedNghiemThuFiles[category];
        checkNghiemThuCompletion();
        return;
    }
    
    // File hợp lệ
    selectedNghiemThuFiles[category] = file;
    statusDiv.innerHTML = `${file.name} (${(file.size/1024/1024).toFixed(2)}MB)`;
    statusDiv.style.color = '#27ae60';
    
    checkNghiemThuCompletion();
}

function checkNghiemThuCompletion() {
    const guiBtn = document.getElementById('guiNghiemThuBtn');
    const uploadedCount = Object.keys(selectedNghiemThuFiles).length;
    
    // Cần đủ 4 loại hồ sơ bắt buộc
    if (uploadedCount >= 4) {
        guiBtn.disabled = false;
    } else {
        guiBtn.disabled = true;
    }
}

// UC 1.15: Gửi hồ sơ nghiệm thu
function guiHoSoNghiemThu(deTaiId) {
    const ghiChu = document.getElementById('ghiChuNghiemThu').value;
    
    // Bước 7: Kiểm tra đầy đủ hồ sơ (UC 1.15)
    if (Object.keys(selectedNghiemThuFiles).length < 4) {
        showNotification('Vui lòng tải đủ 4 loại hồ sơ nghiệm thu bắt buộc', 'error');
        return;
    }
    
    // Cập nhật dữ liệu
    const deTai = nghiemThuData.find(nt => nt.id === deTaiId);
    if (deTai) {
        deTai.trangThai = 'da-nop-nghiem-thu';
        deTai.hoSoNghiemThu = {
            files: {...selectedNghiemThuFiles},
            ghiChu: ghiChu,
            ngayNop: new Date().toISOString()
        };
        
        // Bước 7: Gửi thông báo cho nhân viên (UC 1.15)
        addSystemNotification(
            'Hồ sơ nghiệm thu đã được nộp',
            `Đề tài ${deTai.tenDeTai} đã nộp đầy đủ hồ sơ nghiệm thu`,
            'success',
            'UC_1_15'
        );
        
        hideModal('nghiemThuModal');
        loadNghiemThuData(); // Refresh danh sách
        selectedNghiemThuFiles = {}; // Reset
        
        showNotification('Đã nộp hồ sơ nghiệm thu thành công!', 'success');
    }
}

// Helper functions
function getStatusText(status) {
    const statusMap = {
        'da-tao': 'Đã tạo',
        'cho-kiem-tra': 'Chờ kiểm tra', 
        'da-hoan-thien': 'Đã hoàn thiện',
        'can-bo-sung': 'Cần bổ sung',
        'dang-chinh-sua': 'Đang chỉnh sửa',
        'cho-xet-duyet': 'Chờ xét duyệt',
        'da-phe-duyet': 'Đã phê duyệt',
        'dang-thuc-hien': 'Đang thực hiện'
    };
    return statusMap[status] || status;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
}

function xemChiTiet(hoSoId) {
    const hoSo = hoSoData.find(hs => hs.id === hoSoId);
    if (hoSo) {
        alert(`Thông tin chi tiết hồ sơ:\n\nMã: ${hoSo.maHoSo}\nTên đề tài: ${hoSo.tenDeTai}\nLĩnh vực: ${hoSo.linhVuc}\nTrạng thái: ${getStatusText(hoSo.trangThai)}\nNgày tạo: ${formatDate(hoSo.ngayTao)}`);
    }
}

function hoanThienHoSo(hoSoId) {
    // Chuyển đến tab "Tải lên tài liệu" và auto-select hồ sơ
    showSection('tai-len-tai-lieu');
    
    // Đợi một chút để DOM update
    setTimeout(() => {
        const hoSoSelect = document.getElementById('hoSoSelect');
        if (hoSoSelect) {
            hoSoSelect.value = hoSoId;
            loadUploadForm();
            
            // Highlight form để user chú ý
            const uploadForm = document.getElementById('uploadForm');
            if (uploadForm && uploadForm.style.display !== 'none') {
                uploadForm.style.border = '2px solid #3498db';
                uploadForm.style.borderRadius = '8px';
                setTimeout(() => {
                    uploadForm.style.border = '';
                    uploadForm.style.borderRadius = '';
                }, 3000);
            }
        }
    }, 100);
    
    showNotification('Vui lòng tải lên đầy đủ 5 tài liệu bắt buộc để hoàn thiện hồ sơ', 'info');
}

function xemTienDo(deTaiId) {
    const deTai = tienDoData.find(td => td.id === deTaiId);
    if (!deTai) {
        showNotification('Không tìm thấy thông tin đề tài', 'error');
        return;
    }
    
    // Hiển thị modal xem chi tiết tiến độ
    const modalContent = `
        <div class="modal" id="xemTienDoModal" style="display: block;">
            <div class="modal-content" style="max-width: 500px; margin: 5% auto;">
                <div class="modal-header">
                    <h3 class="modal-title">CHI TIẾT TIẾN ĐỘ ĐỀ TÀI</h3>
                    <button class="close" onclick="hideModal('xemTienDoModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Thông tin đề tài:</label>
                        <div style="padding: 12px; background: #f8f9fa; border-radius: 6px; margin-bottom: 15px;">
                            <div><strong>Mã đề tài:</strong> ${deTai.maDeTai}</div>
                            <div><strong>Tên đề tài:</strong> ${deTai.tenDeTai}</div>
                            <div><strong>Kỳ báo cáo:</strong> ${deTai.kyBaoCao}</div>
                            <div><strong>Hạn nộp:</strong> ${formatDate(deTai.hanNop)}</div>
                            <div><strong>Trạng thái:</strong> <span class="status status-da-hoan-thien">Đã nộp</span></div>
                        </div>
                    </div>
                    
                    ${deTai.duLieuDaTai ? `
                        <div class="form-group">
                            <label class="form-label">Dữ liệu đã nộp:</label>
                            <div style="padding: 12px; background: #e8f5e8; border-radius: 6px;">
                                <div><strong>Loại tài liệu:</strong> ${deTai.duLieuDaTai.ten_tai_lieu}</div>
                                <div><strong>Tên file:</strong> ${deTai.duLieuDaTai.ten_file}</div>
                                <div><strong>Kích thước:</strong> ${(deTai.duLieuDaTai.kich_thuoc_file/1024/1024).toFixed(2)}MB</div>
                                <div><strong>Ngày tải lên:</strong> ${formatDate(deTai.duLieuDaTai.ngay_tai_len)}</div>
                                ${deTai.duLieuDaTai.mo_ta ? `<div><strong>Ghi chú:</strong> ${deTai.duLieuDaTai.mo_ta}</div>` : ''}
                            </div>
                        </div>
                    ` : '<div style="color: #666; font-style: italic;">Chưa có dữ liệu báo cáo</div>'}
                    
                    <div style="text-align: right; margin-top: 20px;">
                        <button type="button" class="btn btn-primary" onclick="hideModal('xemTienDoModal')">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
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

function setupDragAndDrop() {
    const uploadAreas = document.querySelectorAll('.upload-area');
    
    uploadAreas.forEach(area => {
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('dragover');
        });
        
        area.addEventListener('dragleave', () => {
            area.classList.remove('dragover');
        });
        
        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const docType = parseInt(area.getAttribute('onclick').match(/\d+/)[0]);
                const fileInput = document.getElementById(`file${docType}`);
                if (fileInput) {
                    // Create a new FileList-like object
                    const dt = new DataTransfer();
                    dt.items.add(files[0]);
                    fileInput.files = dt.files;
                    uploadFile(docType);
                }
            }
        });
    });
}

// Helper functions theo database schema
function getLoaiTaiLieuText(loaiDuLieu) {
    const mapping = {
        'bao-cao-tien-do': 'Báo cáo tiến độ',
        'tai-lieu-minh-chung': 'Tài liệu minh chứng', 
        'ket-qua-thuc-hien': 'Kết quả thực hiện',
        'kinh-phi-su-dung': 'Báo cáo kinh phí'
    };
    return mapping[loaiDuLieu] || loaiDuLieu;
}

// Modal helper functions
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
    }
}

// HỆ THỐNG THÔNG BÁO - Tuân thủ đặc tả UC
let systemNotifications = [
    {
        id: 1,
        title: 'Hồ sơ đã được kiểm tra',
        message: 'Hồ sơ HS002 - "Phát triển ứng dụng mobile cho du lịch" đã được nhân viên xác nhận hợp lệ',
        time: '10 phút trước',
        type: 'success',
        unread: true,
        source: 'UC_1_4' // Từ UC 1.4 - Kiểm tra hồ sơ đề tài
    },
    {
        id: 2,
        title: 'Yêu cầu chỉnh sửa hồ sơ',
        message: 'Hồ sơ HS003 cần bổ sung thêm tài liệu tham khảo và làm rõ phương pháp nghiên cứu',
        time: '2 giờ trước',
        type: 'warning',
        unread: true,
        source: 'UC_1_7' // Từ UC 1.7 - Thông báo yêu cầu chỉnh sửa
    },
    {
        id: 3,
        title: 'Nhắc nhở báo cáo tiến độ',
        message: 'Đề tài DT001 cần nộp báo cáo tiến độ Quý 1/2025 trong vòng 7 ngày tới',
        time: '1 ngày trước',
        type: 'info',
        unread: true,
        source: 'UC_1_9' // Từ UC 1.9 - Thông báo lịch báo cáo tiến độ
    }
];

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('show');
    
    if (dropdown.classList.contains('show')) {
        loadNotifications();
        // Click outside để đóng
        document.addEventListener('click', closeNotificationsOutside);
    } else {
        document.removeEventListener('click', closeNotificationsOutside);
    }
}

function closeNotificationsOutside(event) {
    const notificationCenter = document.querySelector('.notification-center');
    if (!notificationCenter.contains(event.target)) {
        document.getElementById('notificationDropdown').classList.remove('show');
        document.removeEventListener('click', closeNotificationsOutside);
    }
}

function loadNotifications() {
    const notificationList = document.getElementById('notificationList');
    
    if (systemNotifications.length === 0) {
        notificationList.innerHTML = '<div class="notification-item"><div class="notification-message">Không có thông báo mới</div></div>';
        return;
    }
    
    notificationList.innerHTML = systemNotifications.map(notification => {
        const typeIcon = {
            'success': 'fas fa-check-circle',
            'warning': 'fas fa-exclamation-triangle', 
            'info': 'fas fa-info-circle',
            'error': 'fas fa-times-circle'
        };
        
        return `
            <div class="notification-item ${notification.unread ? 'unread' : ''}" onclick="markAsRead(${notification.id})">
                <div class="notification-title">
                    <i class="${typeIcon[notification.type]}" style="color: ${getTypeColor(notification.type)}; margin-right: 6px;"></i>
                    ${notification.title}
                </div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${notification.time}</div>
            </div>
        `;
    }).join('');
    
    updateNotificationCount();
}

function getTypeColor(type) {
    const colors = {
        'success': '#27ae60',
        'warning': '#f39c12',
        'info': '#3498db', 
        'error': '#e74c3c'
    };
    return colors[type] || '#666';
}

function markAsRead(notificationId) {
    const notification = systemNotifications.find(n => n.id === notificationId);
    if (notification) {
        notification.unread = false;
        loadNotifications();
        
        // Xử lý hành động theo loại thông báo
        if (notification.source === 'UC_1_7') {
            // Chuyển đến trang chỉnh sửa hồ sơ
            showSection('chinh-sua-ho-so');
        } else if (notification.source === 'UC_1_9') {
            // Chuyển đến trang báo cáo tiến độ  
            showSection('tai-len-tien-do');
        }
        
        document.getElementById('notificationDropdown').classList.remove('show');
    }
}

function markAllAsRead() {
    systemNotifications.forEach(notification => {
        notification.unread = false;
    });
    loadNotifications();
}

function updateNotificationCount() {
    const unreadCount = systemNotifications.filter(n => n.unread).length;
    const countElement = document.getElementById('notificationCount');
    
    if (unreadCount > 0) {
        countElement.textContent = unreadCount;
        countElement.style.display = 'flex';
    } else {
        countElement.style.display = 'none';
    }
}

// Thêm thông báo mới theo đặc tả UC
function addSystemNotification(title, message, type = 'info', source = '') {
    const newNotification = {
        id: Date.now(),
        title: title,
        message: message,
        time: 'Vừa xong',
        type: type,
        unread: true,
        source: source
    };
    
    systemNotifications.unshift(newNotification);
    
    // Giữ tối đa 20 thông báo
    if (systemNotifications.length > 20) {
        systemNotifications = systemNotifications.slice(0, 20);
    }
    
    updateNotificationCount();
    
    // Hiện popup ngắn
    showNotificationPopup(title, message, type);
}

function showNotificationPopup(title, message, type) {
    const popup = document.createElement('div');
    popup.className = `notification-popup ${type}`;
    popup.innerHTML = `
        <div class="notification-popup-content">
            <strong>${title}</strong>
            <div>${message}</div>
        </div>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px;">&times;</button>
    `;
    
    // Add popup styles nếu chưa có
    if (!document.getElementById('notificationPopupStyles')) {
        const styles = document.createElement('style');
        styles.id = 'notificationPopupStyles';
        styles.textContent = `
            .notification-popup {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #2c3e50;
                color: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                z-index: 10000;
                max-width: 300px;
                display: flex;
                align-items: flex-start;
                gap: 10px;
                animation: slideIn 0.3s ease;
            }
            
            .notification-popup.success { background: #27ae60; }
            .notification-popup.warning { background: #f39c12; }
            .notification-popup.error { background: #e74c3c; }
            .notification-popup.info { background: #3498db; }
            
            .notification-popup-content { flex: 1; font-size: 14px; }
            .notification-popup-content strong { display: block; margin-bottom: 4px; }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(popup);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 5000);
}
