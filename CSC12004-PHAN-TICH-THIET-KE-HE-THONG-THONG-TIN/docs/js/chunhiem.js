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
    const pageNames = {
        'ho-so-cua-toi': 'Hồ sơ của tôi',
        'tai-len-tai-lieu': 'Tải lên tài liệu',
        'chinh-sua-ho-so': 'Chỉnh sửa hồ sơ',
        'tai-len-tien-do': 'Tải lên tiến độ',
        'lich-bao-cao': 'Lịch báo cáo',
        'tai-len-nghiem-thu': 'Tải lên nghiệm thu'
    };
    document.getElementById('currentPage').textContent = pageNames[sectionId] || sectionId;
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
            status.textContent = `✅ ${file.name}`;
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

// UC 1.3: Gửi hồ sơ hoàn thiện
function guiHoSo() {
    const hoSoId = document.getElementById('hoSoSelect').value;
    const thanhVienList = document.getElementById('thanhVienList').value;
    
    if (!hoSoId || Object.keys(selectedFiles).length < 5 || !thanhVienList.trim()) {
        showNotification('Vui lòng hoàn thiện đầy đủ 5 tài liệu bắt buộc và danh sách thành viên!', 'error');
        return;
    }
    
    // Update hồ sơ trạng thái
    const hoSo = hoSoData.find(hs => hs.id === hoSoId);
    if (hoSo) {
        hoSo.trangThai = 'cho-kiem-tra';
        hoSo.documents = {...selectedFiles};
        hoSo.thanhVienList = thanhVienList;
        
        showNotification('✅ Đã gửi hồ sơ thành công! Hồ sơ chuyển sang trạng thái "Chờ kiểm tra"', 'success');
        
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

function chinhSuaHoSo(hoSoId) {
    showNotification('🔧 Chức năng chỉnh sửa hồ sơ đang được phát triển', 'info');
    // TODO: Implement UC 1.8 - Cập nhật hồ sơ đã chỉnh sửa
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
        showNotification('❌ Không tìm thấy thông tin đề tài', 'error');
        return;
    }
    
    // Bước 5: Chủ nhiệm chọn loại dữ liệu và tải file
    const modalContent = `
        <div class="modal" id="taiDuLieuModal" style="display: block;">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">📊 TẢI DỮ LIỆU ĐỊNH KỲ</h3>
                    <button class="close" onclick="hideModal('taiDuLieuModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Đề tài:</label>
                        <div style="padding: 10px; background: #f8f9fa; border-radius: 5px;">
                            <strong>${deTai.tenDeTai}</strong> (${deTai.maDeTai})
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
                            <option value="bao-cao-tai-chinh">Báo cáo tài chính</option>
                            <option value="ket-qua-nghien-cuu">Kết quả nghiên cứu</option>
                            <option value="tai-lieu-khac">Tài liệu khác</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Tải file: <span class="required">*</span></label>
                        <input type="file" id="fileTaiLen" class="form-input" 
                               accept=".pdf,.doc,.docx,.xls,.xlsx" required>
                        <div class="form-help">🔧 Chỉ chấp nhận: PDF, DOC, DOCX, XLS, XLSX</div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Ghi chú:</label>
                        <textarea id="ghiChuTaiLieu" class="form-textarea" rows="3" 
                                  placeholder="Mô tả ngắn về nội dung tài liệu..."></textarea>
                    </div>
                    
                    <div style="text-align: right; margin-top: 20px;">
                        <button type="button" class="btn btn-secondary" onclick="hideModal('taiDuLieuModal')">Hủy</button>
                        <button type="button" class="btn btn-primary" onclick="xacNhanTaiLenDuLieu('${deTaiId}')">
                            📤 Tải lên
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
    
    // Bước 6-8: Kiểm tra và xác nhận
    if (!loaiDuLieu || !fileTaiLen) {
        showNotification('❌ Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
        return;
    }
    
    // Bước 9: Hệ thống lưu dữ liệu
    const duLieuMoi = {
        id: 'DL' + Date.now(),
        deTaiId: deTaiId,
        loai: loaiDuLieu,
        tenFile: fileTaiLen.name,
        kichThuoc: fileTaiLen.size,
        ngayTai: new Date().toISOString(),
        ghiChu: ghiChu,
        trangThai: 'da-tai-len'
    };
    
    // Cập nhật trạng thái
    const deTai = tienDoData.find(td => td.id === deTaiId);
    deTai.trangThai = 'da-nop';
    deTai.duLieuDaTai = duLieuMoi;
    
    // Bước 10: Hiển thị kết quả
    hideModal('taiDuLieuModal');
    loadTienDoData();
    showNotification(`✅ Đã tải lên thành công dữ liệu "${loaiDuLieu}" cho đề tài ${deTai.tenDeTai}`, 'success');
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

function taiLenNghiemThu(deTaiId) {
    showNotification('🏁 Chức năng tải lên hồ sơ nghiệm thu đang được phát triển', 'info');
    // TODO: Implement UC 1.15 - Tải lên hồ sơ nghiệm thu
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
    // Switch to upload section
    showSection('tai-len-tai-lieu');
    document.getElementById('hoSoSelect').value = hoSoId;
    loadUploadForm();
}

function xemTienDo(deTaiId) {
    showNotification('📊 Xem chi tiết báo cáo tiến độ', 'info');
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

// Modal helper functions
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
    }
}
