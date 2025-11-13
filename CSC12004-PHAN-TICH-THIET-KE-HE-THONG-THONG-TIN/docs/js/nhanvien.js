// Nhân viên dashboard functionality - Updated for exact UC compliance

// Mock data từ database
let hoSoData = [];
let linhVucData = [];
let nguoiDungData = [];
let hoidongData = [];
let tienDoData = [];
let nghiemThuData = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadMockData();
    updateStats();
    loadHoSoTable();
    updateNavigationBadges();
    
    // Handle URL hash on page load/reload
    handleUrlHash();
});

// Listen for hash changes (back/forward buttons)
window.addEventListener('hashchange', handleUrlHash);

// Handle URL hash to show correct section
function handleUrlHash() {
    const hash = window.location.hash.substring(1); // Remove # symbol
    if (hash && document.getElementById(hash)) {
        showSectionByHash(hash);
    }
}

// Show section based on hash without requiring event
function showSectionByHash(sectionId) {
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
    const navLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (navLink) {
        navLink.classList.add('active');
    }
    
    // Update breadcrumb
    updateBreadcrumb(sectionId);
    
    // Load section data
    loadSectionData(sectionId);
}

// Load mock data from seed files
function loadMockData() {
    // Mock hồ sơ data với nhiều trạng thái khác nhau
    hoSoData = [
        {
            id: 'DT2025001',
            ten: 'Ứng dụng AI trong y tế',
            nguoiDeXuat: 'Nguyễn Văn A',
            email: 'nguyenvana@edu.vn',
            sdt: '0912345678',
            linhVuc: 'Công nghệ thông tin',
            trangThai: 'da-tao',
            ngayTao: '2025-11-05',
            ngayBatDau: '2025-12-01',
            ngayKetThuc: '2026-11-30',
            kinhPhi: 50000000,
            moTa: 'Nghiên cứu ứng dụng AI trong chẩn đoán y tế',
            documents: []
        },
        {
            id: 'DT2025002',
            ten: 'Nghiên cứu năng lượng tái tạo',
            nguoiDeXuat: 'Lê Văn C',
            email: 'levanc@edu.vn',
            sdt: '0923456789',
            linhVuc: 'Môi trường',
            trangThai: 'cho-kiem-tra',
            ngayTao: '2025-11-01',
            ngayBatDau: '2025-12-01',
            ngayKetThuc: '2026-11-30',
            kinhPhi: 75000000,
            moTa: 'Nghiên cứu các giải pháp năng lượng tái tạo',
            documents: [
                { category: 'decuong', name: 'decuong.pdf', size: '2MB' },
                { category: 'muctieu', name: 'muctieu.docx', size: '1.5MB' },
                { category: 'thuyetminh', name: 'thuyetminh.pdf', size: '3MB' },
                { category: 'kehoach', name: 'kehoach.xlsx', size: '800KB' },
                { category: 'thanhvien', name: 'thanhvien.pdf', size: '500KB' }
            ]
        },
        {
            id: 'DT2025003',
            ten: 'Phát triển hệ thống IoT',
            nguoiDeXuat: 'Trần Thị B',
            email: 'tranthib@edu.vn',
            sdt: '0934567890',
            linhVuc: 'Công nghệ thông tin',
            trangThai: 'da-hoan-thien',
            ngayTao: '2025-10-15',
            ngayBatDau: '2025-11-01',
            ngayKetThuc: '2026-10-31',
            kinhPhi: 100000000,
            moTa: 'Xây dựng hệ thống IoT thông minh',
            documents: []
        },
        {
            id: 'DT2024001',
            ten: 'Blockchain trong quản lý chuỗi cung ứng',
            nguoiDeXuat: 'Phạm Văn D',
            email: 'phamvand@edu.vn',
            sdt: '0945678901',
            linhVuc: 'Công nghệ thông tin',
            trangThai: 'da-phe-duyet',
            ngayTao: '2024-12-01',
            ngayBatDau: '2025-01-01',
            ngayKetThuc: '2025-12-31',
            kinhPhi: 80000000,
            moTa: 'Ứng dụng blockchain trong quản lý chuỗi cung ứng',
            documents: []
        },
        {
            id: 'DT2024002',
            ten: 'Machine Learning trong dự báo thời tiết',
            nguoiDeXuat: 'Hoàng Thị E',
            email: 'hoangthie@edu.vn',
            sdt: '0956789012',
            linhVuc: 'Khoa học tự nhiên',
            trangThai: 'dang-thuc-hien',
            ngayTao: '2024-06-01',
            ngayBatDau: '2024-07-01',
            ngayKetThuc: '2025-06-30',
            kinhPhi: 90000000,
            moTa: 'Ứng dụng machine learning để dự báo thời tiết',
            documents: [],
            progressReports: [
                { ky: 1, ngayNop: '2024-10-15', tienDo: 25, trangThai: 'da-kiem-tra' },
                { ky: 2, ngayNop: '2025-01-15', tienDo: 50, trangThai: 'da-kiem-tra' },
                { ky: 3, ngayNop: '2025-04-15', tienDo: 75, trangThai: 'cho-kiem-tra' }
            ]
        },
        {
            id: 'DT2024003',
            ten: 'Nghiên cứu vật liệu nano',
            nguoiDeXuat: 'Nguyễn Văn F',
            email: 'nguyenvanf@edu.vn',
            sdt: '0967890123',
            linhVuc: 'Khoa học tự nhiên',
            trangThai: 'dang-thuc-hien',
            ngayTao: '2024-01-15',
            ngayBatDau: '2024-02-01',
            ngayKetThuc: '2025-01-31',
            kinhPhi: 120000000,
            moTa: 'Nghiên cứu tính chất và ứng dụng vật liệu nano',
            documents: [],
            progressReports: [
                { ky: 1, ngayNop: '2024-05-15', tienDo: 25, trangThai: 'da-kiem-tra' },
                { ky: 2, ngayNop: '2024-08-15', tienDo: 50, trangThai: 'da-kiem-tra' },
                { ky: 3, ngayNop: '2024-11-15', tienDo: 75, trangThai: 'da-kiem-tra' }
            ],
            sapNghiemThu: true,
            hanNopNghiemThu: '2025-01-31'
        },
        {
            id: 'DT2024004',
            ten: 'Ứng dụng AR/VR trong giáo dục',
            nguoiDeXuat: 'Lê Thị G',
            email: 'lethig@edu.vn',
            sdt: '0978901234',
            linhVuc: 'Công nghệ thông tin',
            trangThai: 'can-bo-sung',
            ngayTao: '2024-11-01',
            ngayBatDau: '2025-01-01',
            ngayKetThuc: '2025-12-31',
            kinhPhi: 70000000,
            moTa: 'Nghiên cứu ứng dụng thực tế ảo trong giáo dục',
            documents: [],
            yeuCauBoSung: 'Cần bổ sung tài liệu khảo sát thị trường và phân tích chi phí chi tiết'
        },
        {
            id: 'DT2024005',
            ten: 'Nghiên cứu thuật toán tối ưu',
            nguoiDeXuat: 'Võ Văn H',
            email: 'vovanh@edu.vn',
            sdt: '0989012345',
            linhVuc: 'Khoa học tự nhiên',
            trangThai: 'cho-xet-duyet',
            ngayTao: '2024-10-20',
            ngayBatDau: '2025-02-01',
            ngayKetThuc: '2026-01-31',
            kinhPhi: 60000000,
            moTa: 'Phát triển thuật toán tối ưu cho bài toán lịch trình',
            documents: []
        },
        {
            id: 'DT2024006',
            ten: 'Phân tích dữ liệu lớn trong y tế',
            nguoiDeXuat: 'Đặng Thị I',
            email: 'dangthii@edu.vn',
            sdt: '0990123456',
            linhVuc: 'Y học',
            trangThai: 'cho-kiem-tra',
            ngayTao: '2024-11-08',
            ngayBatDau: '2025-01-15',
            ngayKetThuc: '2025-12-15',
            kinhPhi: 110000000,
            moTa: 'Ứng dụng big data trong chẩn đoán y tế',
            documents: []
        }
    ];

    // Mock lĩnh vực data
    linhVucData = [
        'Công nghệ thông tin',
        'Khoa học tự nhiên', 
        'Khoa học xã hội',
        'Y học',
        'Nông nghiệp',
        'Môi trường'
    ];

    // Load lĩnh vực vào select
    const linhVucSelect = document.getElementById('linhVucFilter');
    linhVucData.forEach(lv => {
        const option = document.createElement('option');
        option.value = lv;
        option.textContent = lv;
        linhVucSelect.appendChild(option);
    });

    // Mock hội đồng khoa học
    hoidongData = [
        { id: 'HD001', ten: 'GS.TS Nguyễn Văn X', chuyenMon: 'Công nghệ thông tin' },
        { id: 'HD002', ten: 'PGS.TS Trần Thị Y', chuyenMon: 'Khoa học máy tính' },
        { id: 'HD003', ten: 'TS. Lê Văn Z', chuyenMon: 'Trí tuệ nhân tạo' }
    ];
}

// Navigation functions
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
    if (event && event.target) {
        event.target.closest('.nav-link').classList.add('active');
    }
    
    // Update URL hash without reloading page
    window.history.replaceState(null, null, `#${sectionId}`);
    
    // Update breadcrumb
    updateBreadcrumb(sectionId);
    
    // Load section data
    loadSectionData(sectionId);
}

function updateBreadcrumb(sectionId) {
    const titles = {
        'quan-ly-hoso': 'Quản lý Hồ sơ',
        'kiem-tra-hoso': 'Kiểm tra hồ sơ',
        'gui-xet-duyet': 'Gửi xét duyệt',
        'thong-bao-yeu-cau-chinh-sua': 'Thông báo yêu cầu chỉnh sửa',
        'xac-nhan-phe-duyet': 'Xác nhận phê duyệt',
        'lich-bao-cao': 'Lịch báo cáo tiến độ',
        'kiem-tra-tien-do': 'Kiểm tra tiến độ',
        'cap-nhat-tien-do': 'Cập nhật tiến độ',
        'tong-hop-tien-do': 'Tổng hợp tiến độ',
        'nhac-nop-nghiem-thu': 'Nhắc nộp nghiệm thu',
        'lap-danh-sach-nghiem-thu': 'Lập danh sách nghiệm thu',
        'kiem-tra-nghiem-thu': 'Kiểm tra nghiệm thu',
        'luu-tru-ket-qua': 'Lưu trữ kết quả',
        'xac-nhan-hoan-tat': 'Xác nhận hoàn tất'
    };
    
    document.getElementById('currentPage').textContent = titles[sectionId] || 'Trang chủ';
}

function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'quan-ly-hoso':
            loadHoSoTable();
            updateStats();
            break;
        case 'kiem-tra-hoso':
            loadKiemTraTable();
            break;
        case 'gui-xet-duyet':
            loadGuiXetDuyetTable();
            break;
        case 'thong-bao-yeu-cau-chinh-sua':
            loadChinhSuaTable();
            break;
        case 'xac-nhan-phe-duyet':
            loadPheDuyetTable();
            break;
        case 'lich-bao-cao':
            loadLichBaoCaoTable();
            break;
        case 'kiem-tra-tien-do':
            loadKiemTraTienDoTable();
            break;
        case 'cap-nhat-tien-do':
            loadCapNhatTienDoTable();
            break;
        case 'tong-hop-tien-do':
            loadTongHopTienDoTable();
            break;
        case 'nhac-nop-nghiem-thu':
            loadNhacNopTable();
            break;
        case 'lap-danh-sach-nghiem-thu':
            loadDanhSachNghiemThuTable();
            break;
        case 'kiem-tra-nghiem-thu':
            loadKiemTraNghiemThuTable();
            break;
        case 'luu-tru-ket-qua':
            loadLuuTruTable();
            break;
        case 'xac-nhan-hoan-tat':
            loadDeTaiHoanTatTable();
            break;
    }
}

// Stats functions
function updateStats() {
    document.getElementById('totalHoSo').textContent = hoSoData.length;
    document.getElementById('choKiemTra').textContent = hoSoData.filter(h => h.trangThai === 'cho-kiem-tra').length;
    document.getElementById('daHoanThien').textContent = hoSoData.filter(h => h.trangThai === 'da-hoan-thien').length;
    document.getElementById('dangThucHien').textContent = hoSoData.filter(h => h.trangThai === 'dang-thuc-hien').length;
}

function updateNavigationBadges() {
    const choKiemTraCount = hoSoData.filter(h => h.trangThai === 'cho-kiem-tra').length;
    document.getElementById('choKiemTraBadge').textContent = choKiemTraCount;
    
    // UC 1.7: Cập nhật badge cho yêu cầu chỉnh sửa
    const choChinhSuaCount = hoSoData.filter(h => 
        h.trangThai === 'can-bo-sung' || 
        h.trangThai === 'cho-kiem-tra' ||
        (h.trangThai === 'da-tao' && h.documents && h.documents.length > 0)
    ).length;
    const choChinhSuaBadge = document.getElementById('choChinhSuaBadge');
    if (choChinhSuaBadge) {
        choChinhSuaBadge.textContent = choChinhSuaCount;
    }
}

// UC 1.1: Tạo hồ sơ sơ bộ
function showCreateForm() {
    showModal('createModal');
    // Set default dates
    const today = new Date();
    const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    
    document.getElementById('ngayBatDau').value = today.toISOString().split('T')[0];
    document.getElementById('ngayKetThuc').value = nextYear.toISOString().split('T')[0];
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('createForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const tenDeTai = document.getElementById('tenDeTai').value;
        const nguoiDeXuat = document.getElementById('nguoiDeXuat').value;
        const linhVuc = document.getElementById('linhVuc').value;
        const ngayBatDau = document.getElementById('ngayBatDau').value;
        const ngayKetThuc = document.getElementById('ngayKetThuc').value;
        const kinhPhi = document.getElementById('kinhPhi').value;
        const moTa = document.getElementById('moTa').value;
        
        // Validation
        if (!tenDeTai || !nguoiDeXuat || !linhVuc || !ngayBatDau || !ngayKetThuc) {
            showNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
            return;
        }
        
        if (new Date(ngayKetThuc) <= new Date(ngayBatDau)) {
            showNotification('Ngày kết thúc phải sau ngày bắt đầu', 'error');
            return;
        }
        
        // Show confirmation
        if (confirm(`Xác nhận tạo hồ sơ:\n\n• Tên đề tài: ${tenDeTai}\n• Người đề xuất: ${nguoiDeXuat}\n• Lĩnh vực: ${linhVuc}\n• Thời gian: ${ngayBatDau} - ${ngayKetThuc}\n\nSau khi tạo:\n• Hệ thống sẽ tạo mã hồ sơ tự động\n• Gửi thông báo nội bộ cho người đề xuất\n• Hướng dẫn người đề xuất hoàn thiện hồ sơ`)) {
            
            // Create new record
            const newId = `DT${new Date().getFullYear()}${String(hoSoData.length + 1).padStart(3, '0')}`;
            const newHoSo = {
                id: newId,
                ten: tenDeTai,
                nguoiDeXuat: nguoiDeXuat,
                linhVuc: linhVuc,
                trangThai: 'da-tao',
                ngayTao: new Date().toISOString().split('T')[0],
                ngayBatDau: ngayBatDau,
                ngayKetThuc: ngayKetThuc,
                kinhPhi: parseInt(kinhPhi) || 0,
                moTa: moTa,
                documents: []
            };
            
            hoSoData.push(newHoSo);
            
            // Show success
            hideModal('createModal');
            showNotification('Tạo hồ sơ thành công!\n\nMã hồ sơ: ' + newId + '\nĐã gửi thông báo cho: ' + nguoiDeXuat + '\n\nTrạng thái hiện tại: Đã tạo', 'success');
            
            // Update display
            updateStats();
            loadHoSoTable();
            updateNavigationBadges();
            
            // Reset form
            document.getElementById('createForm').reset();
            
            // Simulate internal notification
            setTimeout(() => {
                showNotification('Đã gửi thông báo nội bộ cho người đề xuất', 'info');
            }, 2000);
        }
    });
});

function saveDraft() {
    showNotification('Đã lưu nháp', 'info');
}

// Load tables
function loadHoSoTable() {
    const tableBody = document.getElementById('hoSoTable');
    tableBody.innerHTML = '';
    
    hoSoData.forEach(hoSo => {
        const row = `
            <tr>
                <td><strong>${hoSo.id}</strong></td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${hoSo.linhVuc}</td>
                <td><span class="status status-${hoSo.trangThai}">${getStatusText(hoSo.trangThai)}</span></td>
                <td>${formatDate(hoSo.ngayTao)}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewHoSo('${hoSo.id}')">
                        <i class="fas fa-eye"></i> Xem
                    </button>
                    ${hoSo.trangThai === 'da-tao' ? `
                        <button class="btn btn-warning btn-sm" onclick="editHoSo('${hoSo.id}')">
                            <i class="fas fa-edit"></i> Sửa
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="deleteHoSo('${hoSo.id}')">
                            <i class="fas fa-trash"></i> Xóa
                        </button>
                    ` : ''}
                    ${hoSo.trangThai === 'da-hoan-thien' ? `
                        <button class="btn btn-primary btn-sm" onclick="guiXetDuyet('${hoSo.id}')">
                            <i class="fas fa-paper-plane"></i> Gửi xét duyệt
                        </button>
                    ` : ''}
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// UC 1.4: Kiểm tra hồ sơ đề tài
function loadKiemTraTable() {
    const choKiemTra = hoSoData.filter(h => h.trangThai === 'cho-kiem-tra');
    const tableBody = document.getElementById('kiemTraTable');
    tableBody.innerHTML = '';
    
    if (choKiemTra.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Không có hồ sơ nào cần kiểm tra</td></tr>';
        return;
    }
    
    choKiemTra.forEach(hoSo => {
        const row = `
            <tr>
                <td><strong>${hoSo.id}</strong></td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${formatDate(hoSo.ngayTao)}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="kiemTraHoSo('${hoSo.id}')">
                        <i class="fas fa-search"></i> Kiểm tra
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function kiemTraHoSo(hoSoId) {
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    if (!hoSo) return;
    
    const documentCategories = [
        { key: 'decuong', name: 'Đề cương nghiên cứu' },
        { key: 'muctieu', name: 'Mục tiêu nghiên cứu' },
        { key: 'thuyetminh', name: 'Thuyết minh đề tài' },
        { key: 'kehoach', name: 'Kế hoạch triển khai' },
        { key: 'thanhvien', name: 'Danh sách thành viên' }
    ];
    
    let content = `
        <h4>Thông tin đề tài: ${hoSo.ten}</h4>
        <p><strong>Người đề xuất:</strong> ${hoSo.nguoiDeXuat}</p>
        <p><strong>Lĩnh vực:</strong> ${hoSo.linhVuc}</p>
        
        <h5>Kiểm tra tài liệu:</h5>
        <div id="documentChecklist">
    `;
    
    documentCategories.forEach(category => {
        const doc = hoSo.documents ? hoSo.documents.find(d => d.category === category.key) : null;
        const checked = doc ? 'checked' : '';
        const disabled = doc ? '' : 'disabled';
        
        content += `
            <div class="form-group">
                <label>
                    <input type="checkbox" ${checked} ${disabled} data-category="${category.key}">
                    ${category.name}
                    ${doc ? `<span style="color: green;"> Đã tải lên: ${doc.name}</span>` : '<span style="color: red;"> Chưa có</span>'}
                </label>
            </div>
        `;
    });
    
    content += `
        </div>
        
        <div class="form-group" style="margin-top: 20px;">
            <label for="yeuCauBoSung">Yêu cầu bổ sung (nếu có):</label>
            <textarea id="yeuCauBoSung" class="form-textarea" rows="3" placeholder="Nhập nội dung yêu cầu bổ sung..."></textarea>
        </div>
        
        <div style="margin-top: 20px; text-align: right;">
            <button class="btn btn-success" onclick="xacNhanHoSoHopLe('${hoSoId}')">
                <i class="fas fa-check"></i> Xác nhận hồ sơ hợp lệ
            </button>
            <button class="btn btn-warning" onclick="yeuCauBoSungHoSo('${hoSoId}')">
                <i class="fas fa-exclamation-triangle"></i> Yêu cầu bổ sung
            </button>
        </div>
    `;
    
    document.getElementById('kiemTraContent').innerHTML = content;
    showModal('kiemTraModal');
}

function xacNhanHoSoHopLe(hoSoId) {
    // Check if all documents are checked
    const checkboxes = document.querySelectorAll('#documentChecklist input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    
    if (!allChecked) {
        showNotification('Chưa kiểm tra toàn bộ hồ sơ!', 'error');
        return;
    }
    
    if (confirm('Xác nhận hồ sơ này hợp lệ?')) {
        const hoSo = hoSoData.find(h => h.id === hoSoId);
        
        if (hoSo) {
            hoSo.trangThai = 'da-hoan-thien';
            
            showNotification('Đã xác nhận hồ sơ hợp lệ!', 'success');
            hideModal('kiemTraModal');
            loadKiemTraTable();
            updateStats();
            updateNavigationBadges();
            
            // Simulate sending notification
            setTimeout(() => {
                showNotification('Đã gửi thông báo tới chủ nhiệm đề tài', 'info');
            }, 1000);
        }
    }
}

function yeuCauBoSungHoSo(hoSoId) {
    const yeuCau = document.getElementById('yeuCauBoSung').value.trim();
    
    if (!yeuCau) {
        showNotification('Vui lòng nhập nội dung yêu cầu bổ sung!', 'error');
        return;
    }
    
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (hoSo) {
        hoSo.trangThai = 'can-bo-sung';
        hoSo.yeuCauBoSung = yeuCau;
        
        showNotification('Đã gửi yêu cầu bổ sung!', 'success');
        hideModal('kiemTraModal');
        loadKiemTraTable();
        updateStats();
        updateNavigationBadges();
        
        // Simulate sending notification
        setTimeout(() => {
            showNotification('Đã gửi thông báo tới chủ nhiệm đề tài', 'info');
        }, 1000);
    }
}

// UC 1.5: Gửi xét duyệt
function loadGuiXetDuyetTable() {
    const daHoanThien = hoSoData.filter(h => h.trangThai === 'da-hoan-thien');
    const tableBody = document.getElementById('guiXetDuyetTable');
    tableBody.innerHTML = '';
    
    if (daHoanThien.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Không có hồ sơ nào sẵn sàng gửi xét duyệt</td></tr>';
        return;
    }
    
    daHoanThien.forEach(hoSo => {
        const row = `
            <tr>
                <td><strong>${hoSo.id}</strong></td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${hoSo.linhVuc}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="guiXetDuyet('${hoSo.id}')">
                        <i class="fas fa-paper-plane"></i> Gửi xét duyệt
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function guiXetDuyet(hoSoId) {
    let membersList = '';
    hoidongData.forEach(member => {
        membersList += `<option value="${member.id}">${member.ten} - ${member.chuyenMon}</option>`;
    });
    
    const content = `
        <h4>Chọn thành viên Hội đồng khoa học</h4>
        <div class="form-group">
            <label for="hoidongSelect">Hội đồng khoa học:</label>
            <select id="hoidongSelect" class="form-select" multiple size="5">
                ${membersList}
            </select>
            <div class="form-help">Giữ Ctrl để chọn nhiều thành viên</div>
        </div>
        
        <div style="margin-top: 20px; text-align: right;">
            <button class="btn btn-secondary" onclick="hideModal('kiemTraModal')">Hủy</button>
            <button class="btn btn-primary" onclick="xacNhanGuiXetDuyet('${hoSoId}')">
                <i class="fas fa-paper-plane"></i> Gửi
            </button>
        </div>
    `;
    
    document.getElementById('kiemTraContent').innerHTML = content;
    showModal('kiemTraModal');
}

function xacNhanGuiXetDuyet(hoSoId) {
    const selectedMembers = Array.from(document.getElementById('hoidongSelect').selectedOptions);
    
    if (selectedMembers.length === 0) {
        showNotification('Vui lòng chọn ít nhất một thành viên hội đồng!', 'error');
        return;
    }
    
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (hoSo) {
        hoSo.trangThai = 'cho-xet-duyet';
        hoSo.hoidongXetDuyet = selectedMembers.map(option => option.value);
        
        showNotification('Đã gửi hồ sơ xét duyệt!', 'success');
        hideModal('kiemTraModal');
        loadGuiXetDuyetTable();
        updateStats();
        
        // Simulate sending notification to council members
        setTimeout(() => {
            showNotification('Đã gửi thông báo đến các thành viên Hội đồng', 'info');
        }, 1000);
    }
}

// UC 1.2: Xác nhận phê duyệt và triển khai
function loadPheDuyetTable() {
    const daPheDuyet = hoSoData.filter(h => h.trangThai === 'da-phe-duyet');
    const tableBody = document.getElementById('pheDuyetTable');
    tableBody.innerHTML = '';
    
    if (daPheDuyet.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Chưa có hồ sơ nào được phê duyệt</td></tr>';
        return;
    }
    
    daPheDuyet.forEach(hoSo => {
        const row = `
            <tr>
                <td><strong>${hoSo.id}</strong></td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${hoSo.linhVuc}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="xacNhanTrienKhai('${hoSo.id}')">
                        <i class="fas fa-check-circle"></i> Xác nhận triển khai
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function xacNhanTrienKhai(hoSoId) {
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    if (!hoSo) return;
    
    const content = `
        <h4>Xác nhận triển khai đề tài: ${hoSo.ten}</h4>
        
        <div class="form-group">
            <label class="form-label">Ngày bắt đầu thực tế:</label>
            <input type="date" id="ngayBatDauTrienKhai" class="form-input" value="${new Date().toISOString().split('T')[0]}">
        </div>
        
        <div class="form-group">
            <label class="form-label">Ngày kết thúc dự kiến:</label>
            <input type="date" id="ngayKetThucTrienKhai" class="form-input" value="${hoSo.ngayKetThuc}">
        </div>
        
        <div class="form-group">
            <label class="form-label">Kinh phí được phê duyệt (VNĐ):</label>
            <input type="number" id="kinhPhiTrienKhai" class="form-input" value="${hoSo.kinhPhi}">
        </div>
        
        <div class="form-group">
            <label class="form-label">Ghi chú triển khai:</label>
            <textarea id="ghiChuTrienKhai" class="form-textarea" rows="3" placeholder="Nhập ghi chú về triển khai đề tài..."></textarea>
        </div>
        
        <div style="margin-top: 20px; text-align: right;">
            <button class="btn btn-secondary" onclick="hideModal('kiemTraModal')">Hủy</button>
            <button class="btn btn-success" onclick="hoanTatXacNhanTrienKhai('${hoSoId}')">
                <i class="fas fa-check"></i> Hoàn tất
            </button>
        </div>
    `;
    
    document.getElementById('kiemTraContent').innerHTML = content;
    showModal('kiemTraModal');
}

function hoanTatXacNhanTrienKhai(hoSoId) {
    const ngayBatDau = document.getElementById('ngayBatDauTrienKhai').value;
    const ngayKetThuc = document.getElementById('ngayKetThucTrienKhai').value;
    const kinhPhi = document.getElementById('kinhPhiTrienKhai').value;
    const ghiChu = document.getElementById('ghiChuTrienKhai').value;
    
    if (!ngayBatDau || !ngayKetThuc) {
        showNotification('Vui lòng nhập đầy đủ thông tin ngày!', 'error');
        return;
    }
    
    if (new Date(ngayKetThuc) <= new Date(ngayBatDau)) {
        showNotification('Ngày kết thúc phải sau ngày bắt đầu!', 'error');
        return;
    }
    
    if (confirm('Xác nhận chuyển trạng thái đề tài sang "Đang thực hiện"?')) {
        const hoSo = hoSoData.find(h => h.id === hoSoId);
        
        if (hoSo) {
            hoSo.trangThai = 'dang-thuc-hien';
            hoSo.thongTinTrienKhai = {
                ngayBatDau,
                ngayKetThuc,
                kinhPhi,
                ghiChu,
                ngayXacNhan: new Date().toISOString().split('T')[0]
            };
            hoSo.progressReports = [];
            
            showNotification('Đã xác nhận triển khai thành công!\n\nMã đề tài: ' + hoSo.id + '\nĐã gửi thông báo cho: ' + hoSo.nguoiDeXuat + '\n\n• Đã tạo lịch nhắc nhở đánh giá định kỳ\n• Đã tạo lịch báo cáo tiến độ\n• Đã tạo deadline', 'success');
            hideModal('kiemTraModal');
            loadPheDuyetTable();
            updateStats();
            
            // Simulate creating reminder schedule and sending notification
            setTimeout(() => {
                showNotification('Đã gửi thông báo nội bộ và tạo lịch nhắc nhở', 'info');
            }, 2000);
        }
    }
}

// UC 1.9: Thông báo lịch báo cáo tiến độ
function loadLichBaoCaoTable() {
    const dangThucHien = hoSoData.filter(h => h.trangThai === 'dang-thuc-hien');
    const tableBody = document.getElementById('lichBaoCaoTable');
    tableBody.innerHTML = '';
    
    // Update overview stats
    const today = new Date();
    let canBaoCao3Ngay = 0;
    let canBaoCao7Ngay = 0;
    let dangThucHienBinhThuong = 0;
    
    if (dangThucHien.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Chưa có đề tài nào cần báo cáo</td></tr>';
        document.getElementById('canBaoCao3Ngay').textContent = '0';
        document.getElementById('canBaoCao7Ngay').textContent = '0';
        document.getElementById('dangThucHienBinhThuong').textContent = '0';
        return;
    }
    
    dangThucHien.forEach(hoSo => {
        // Mock tính toán hạn báo cáo
        const ngayBatDau = new Date(hoSo.thongTinTrienKhai?.ngayBatDau || hoSo.ngayBatDau);
        const monthsDiff = Math.floor((today - ngayBatDau) / (1000 * 60 * 60 * 24 * 30));
        const kyHienTai = Math.floor(monthsDiff / 3) + 1; // Báo cáo theo quý
        
        // Mock hạn báo cáo tiếp theo
        const hanBaoCao = new Date(today);
        hanBaoCao.setDate(today.getDate() + Math.floor(Math.random() * 30)); // Random 0-30 ngày
        
        const daysToDeadline = Math.floor((hanBaoCao - today) / (1000 * 60 * 60 * 24));
        let trangThaiUuTien = '';
        let iconTrangThai = '';
        
        if (daysToDeadline <= 3) {
            canBaoCao3Ngay++;
            trangThaiUuTien = 'style="color: #e74c3c; font-weight: bold;"';
            iconTrangThai = 'KHẨN CẤP';
        } else if (daysToDeadline <= 7) {
            canBaoCao7Ngay++;
            trangThaiUuTien = 'style="color: #f39c12; font-weight: bold;"';
            iconTrangThai = 'Sắp hết hạn';
        } else {
            dangThucHienBinhThuong++;
            iconTrangThai = 'Bình thường';
        }
        
        const soLanNhac = Math.floor(Math.random() * 3); // 0-2 lần
        
        const row = `
            <tr ${trangThaiUuTien}>
                <td><strong>${hoSo.id}</strong></td>
                <td>${iconTrangThai} ${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>
                    ${hanBaoCao.toLocaleDateString('vi-VN')} 
                    <br><small>(còn ${daysToDeadline} ngày)</small>
                </td>
                <td>Kỳ ${kyHienTai}/4 (Quý ${kyHienTai}/2025)</td>
                <td>
                    ${daysToDeadline <= 0 ? 'Quá hạn' : 
                      daysToDeadline <= 3 ? 'Cần báo cáo' : 
                      daysToDeadline <= 7 ? 'Sắp đến hạn' : 
                      'Bình thường'}
                    <br><small>Đã nhắc: ${soLanNhac} lần</small>
                </td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="xemLichChiTiet('${hoSo.id}')">
                        <i class="fas fa-eye"></i> Xem chi tiết
                    </button>
                    <button class="btn btn-warning btn-sm" onclick="guiNhacNho('${hoSo.id}')">
                        <i class="fas fa-bell"></i> Gửi nhắc nhở
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
    
    // Update overview stats
    document.getElementById('canBaoCao3Ngay').textContent = canBaoCao3Ngay;
    document.getElementById('canBaoCao7Ngay').textContent = canBaoCao7Ngay;
    document.getElementById('dangThucHienBinhThuong').textContent = dangThucHienBinhThuong;
}

function xemLichChiTiet(hoSoId) {
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    if (!hoSo) return;
    
    const content = `
        <h4>LỊCH BÁO CÁO CHI TIẾT</h4>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h5>THÔNG TIN ĐỀ TÀI</h5>
            <p><strong>Tên đề tài:</strong> ${hoSo.ten}</p>
            <p><strong>Mã:</strong> ${hoSo.id}</p>
            <p><strong>Chủ nhiệm:</strong> ${hoSo.nguoiDeXuat}</p>

            <p><strong>SĐT:</strong> ${hoSo.sdt}</p>
            <p><strong>Thời gian thực hiện:</strong> ${hoSo.ngayBatDau} - ${hoSo.ngayKetThuc}</p>
            <p><strong>Trạng thái:</strong> Đang thực hiện</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h5>LỊCH BÁO CÁO TIẾN ĐỘ</h5>
            <div style="border-left: 3px solid #27ae60; padding-left: 15px; margin: 10px 0;">
                <strong>Kỳ 1 - Quý 1/2025</strong> - • Đã hoàn thành<br>
                <small>Hạn nộp: 31/03/2025 | Ngày nộp: 28/03/2025 (sớm 3 ngày)</small>
            </div>
            <div style="border-left: 3px solid #e74c3c; padding-left: 15px; margin: 10px 0;">
                <strong>Kỳ 2 - Quý 2/2025</strong> - Sắp đến hạn<br>
                <small>Hạn nộp: 30/06/2025 (còn 5 ngày) | Trạng thái: Chưa nộp | Đã nhắc: 1 lần</small>
            </div>
            <div style="border-left: 3px solid #f39c12; padding-left: 15px; margin: 10px 0;">
                <strong>Kỳ 3 - Quý 3/2025</strong> - Sắp tới<br>
                <small>Hạn nộp: 30/09/2025 (còn 95 ngày) | Trạng thái: Chưa đến kỳ</small>
            </div>
            <div style="border-left: 3px solid #f39c12; padding-left: 15px; margin: 10px 0;">
                <strong>Kỳ 4 - Báo cáo tổng kết</strong> - Sắp tới<br>
                <small>Hạn nộp: ${hoSo.ngayKetThuc} | Trạng thái: Chưa đến kỳ</small>
            </div>
        </div>
        
        <div style="text-align: right;">
            <button class="btn btn-primary" onclick="guiNhacNho('${hoSo.id}')">
                <i class="fas fa-bell"></i> Gửi nhắc nhở ngay
            </button>
        </div>
    `;
    
    document.getElementById('kiemTraContent').innerHTML = content;
    showModal('kiemTraModal');
}

function guiNhacNho(hoSoId) {
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    if (!hoSo) return;
    
    const content = `
        <h4>GỬI NHẮC NHỞ BÁO CÁO TIẾN ĐỘ</h4>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>Người nhận:</strong> ${hoSo.nguoiDeXuat}</p>
            <p><strong>Đề tài:</strong> ${hoSo.ten} (${hoSo.id})</p>
            <p><strong>Kỳ báo cáo:</strong> Kỳ 2/4 - Quý 2/2025</p>
            <p><strong>Hạn nộp:</strong> 30/06/2025 (còn 5 ngày)</p>
        </div>
        
        <div class="form-group">
            <label class="form-label">Nội dung thông báo: (Có thể chỉnh sửa)</label>
            <textarea id="noiDungEmail" class="form-textarea" rows="10">Kính gửi ${hoSo.nguoiDeXuat},

Đây là thư nhắc nhở về việc nộp báo cáo tiến độ đề tài:

• Tên đề tài: ${hoSo.ten}
• Mã đề tài: ${hoSo.id}
• Kỳ báo cáo: Kỳ 2/4 - Quý 2/2025
• Hạn nộp: 30/06/2025 (còn 5 ngày)

Vui lòng truy cập hệ thống để nộp báo cáo tiến độ:
https://detai.edu.vn/bao-cao/${hoSo.id}

Nội dung báo cáo cần bao gồm:
- Các công việc đã hoàn thành
- Kết quả đạt được
- Khó khăn phát sinh (nếu có)
- Kế hoạch kỳ tiếp theo

Nếu cần hỗ trợ, vui lòng liên hệ:
Nhân viên X - nhanvienx@edu.vn - 0987654321

Trân trọng,
Phòng Quản lý Khoa học</textarea>
        </div>
        
        <div style="margin: 15px 0;">
            <label><input type="checkbox" checked> ☑ Gửi bản sao (CC) cho mình</label><br>
            <label><input type="checkbox"> ☐ Đánh dấu ưu tiên cao</label>
        </div>
        
        <div style="text-align: right; margin-top: 20px;">
            <button class="btn btn-secondary" onclick="hideModal('kiemTraModal')">Hủy</button>
            <button class="btn btn-primary" onclick="xacNhanGuiThongBao('${hoSo.id}')">
                <i class="fas fa-paper-plane"></i> Gửi thông báo
            </button>
        </div>
    `;
    
    document.getElementById('kiemTraContent').innerHTML = content;
    showModal('kiemTraModal');
}

function xacNhanGuiThongBao(hoSoId) {
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    if (!hoSo) return;
    
    // Add notification to system
    addNotification(
        'Nhắc nhở báo cáo tiến độ', 
        `Đề tài "${hoSo.ten}" sắp đến hạn báo cáo tiến độ kỳ 2/4. Vui lòng nộp báo cáo trước 30/06/2025.`,
        'warning'
    );
    
    showNotification('Gửi thông báo thành công!\n\nNgười nhận: ' + hoSo.nguoiDeXuat + '\nThời gian: ' + new Date().toLocaleString('vi-VN') + '\n\nHệ thống đã ghi nhận lần nhắc nhở', 'success');
    hideModal('kiemTraModal');
    loadLichBaoCaoTable();
}

// UC 1.11: Kiểm tra hồ sơ tiến độ
function loadKiemTraTienDoTable() {
    const choKiemTraTienDo = hoSoData.filter(h => 
        h.trangThai === 'dang-thuc-hien' && 
        h.progressReports && 
        h.progressReports.some(r => r.trangThai === 'cho-kiem-tra')
    );
    
    const tableBody = document.getElementById('kiemTraTienDoTable');
    tableBody.innerHTML = '';
    
    if (choKiemTraTienDo.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Chưa có báo cáo tiến độ nào cần kiểm tra</td></tr>';
        return;
    }
    
    choKiemTraTienDo.forEach(hoSo => {
        const reportCanKiemTra = hoSo.progressReports.find(r => r.trangThai === 'cho-kiem-tra');
        
        const row = `
            <tr>
                <td><strong>${hoSo.id}</strong></td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>Kỳ ${reportCanKiemTra.ky}/4 (Quý ${reportCanKiemTra.ky}/2025)</td>
                <td>${new Date(reportCanKiemTra.ngayNop).toLocaleDateString('vi-VN')}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="kiemTraBaoCaoTienDo('${hoSo.id}', ${reportCanKiemTra.ky})">
                        <i class="fas fa-search"></i> Kiểm tra
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function kiemTraBaoCaoTienDo(hoSoId, ky) {
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    const report = hoSo.progressReports.find(r => r.ky === ky);
    
    if (!hoSo || !report) return;
    
    const content = `
        <h4>BÁO CÁO TIẾN ĐỘ CHI TIẾT</h4>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>Tên:</strong> ${hoSo.ten}</p>
            <p><strong>Mã:</strong> ${hoSo.id}</p>
            <p><strong>Chủ nhiệm:</strong> ${hoSo.nguoiDeXuat}</p>
            <p><strong>Kỳ báo cáo:</strong> Quý ${ky}/2025 (Kỳ ${ky}/4)</p>
            <p><strong>Ngày nộp:</strong> ${new Date(report.ngayNop).toLocaleDateString('vi-VN')}</p>
            <p><strong>Trạng thái:</strong> Đã kiểm tra hợp lệ</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h5>TIẾN ĐỘ THỰC HIỆN</h5>
            <div style="background: #fff; padding: 10px; border-radius: 5px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span>Tổng quan tiến độ:</span>
                    <span><strong>${report.tienDo}%</strong></span>
                </div>
                <div style="width: 100%; background: #e0e0e0; border-radius: 10px; height: 8px;">
                    <div style="width: ${report.tienDo}%; background: #4CAF50; border-radius: 10px; height: 8px;"></div>
                </div>
                <p style="margin-top: 10px; color: #666;">• Hoàn thành: ${Math.floor(report.tienDo/10)} công việc chính</p>
                <p style="color: #666;">• Đánh giá: ${report.tienDo >= 75 ? 'Vượt kế hoạch' : report.tienDo >= 25 ? 'Đúng kế hoạch •' : 'Chậm tiến độ'}</p>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Nhận xét của nhân viên:</label>
            <textarea id="nhanXetNhanVien" class="form-textarea" rows="3" placeholder="Nhập nhận xét về báo cáo tiến độ...">Báo cáo đầy đủ, tiến độ đúng kế hoạch. Kết quả đạt được tốt. Đề nghị tiếp tục theo dõi và hỗ trợ.</textarea>
        </div>
        
        <div style="text-align: right; margin-top: 20px;">
            <button class="btn btn-secondary" onclick="hideModal('kiemTraModal')">Hủy</button>
            <button class="btn btn-warning" onclick="yeuCauBoSungBaoCao('${hoSo.id}', ${ky})">
                <i class="fas fa-exclamation-triangle"></i> Yêu cầu bổ sung
            </button>
            <button class="btn btn-success" onclick="xacNhanBaoCaoHopLe('${hoSo.id}', ${ky})">
                <i class="fas fa-check"></i> Xác nhận hợp lệ
            </button>
        </div>
    `;
    
    document.getElementById('kiemTraContent').innerHTML = content;
    showModal('kiemTraModal');
}

function xacNhanBaoCaoHopLe(hoSoId, ky) {
    const nhanXet = document.getElementById('nhanXetNhanVien').value.trim();
    
    if (!nhanXet) {
        showNotification('Vui lòng nhập nhận xét!', 'error');
        return;
    }
    
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    const report = hoSo.progressReports.find(r => r.ky === ky);
    
    if (hoSo && report) {
        report.trangThai = 'da-kiem-tra';
        report.nhanXetNhanVien = nhanXet;
        report.ngayKiemTra = new Date().toISOString().split('T')[0];
        
        showNotification('Đã xác nhận báo cáo tiến độ hợp lệ!', 'success');
        hideModal('kiemTraModal');
        loadKiemTraTienDoTable();
        
        setTimeout(() => {
            showNotification('Đã gửi thông báo xác nhận cho chủ nhiệm đề tài', 'info');
        }, 1000);
    }
}

function yeuCauBoSungBaoCao(hoSoId, ky) {
    const nhanXet = document.getElementById('nhanXetNhanVien').value.trim();
    
    if (!nhanXet) {
        showNotification('Vui lòng nhập yêu cầu bổ sung!', 'error');
        return;
    }
    
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    const report = hoSo.progressReports.find(r => r.ky === ky);
    
    if (hoSo && report) {
        report.trangThai = 'can-bo-sung';
        report.yeuCauBoSung = nhanXet;
        
        showNotification('Đã gửi yêu cầu bổ sung báo cáo!', 'success');
        hideModal('kiemTraModal');
        loadKiemTraTienDoTable();
        
        setTimeout(() => {
            showNotification('Đã gửi thông báo yêu cầu bổ sung cho chủ nhiệm đề tài', 'info');
        }, 1000);
    }
}

// UC 1.12: Cập nhật tiến độ định kỳ
function loadCapNhatTienDoTable() {
    const daKiemTraTienDo = hoSoData.filter(h => 
        h.trangThai === 'dang-thuc-hien' && 
        h.progressReports && 
        h.progressReports.some(r => r.trangThai === 'da-kiem-tra' && !r.daXacNhan)
    );
    
    const tableBody = document.getElementById('capNhatTienDoTable');
    tableBody.innerHTML = '';
    
    if (daKiemTraTienDo.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Chưa có tiến độ nào cần cập nhật</td></tr>';
        return;
    }
    
    daKiemTraTienDo.forEach(hoSo => {
        const reportDaKiemTra = hoSo.progressReports.filter(r => r.trangThai === 'da-kiem-tra' && !r.daXacNhan);
        
        reportDaKiemTra.forEach(report => {
            const row = `
                <tr>
                    <td><strong>${hoSo.id}</strong></td>
                    <td>${hoSo.ten}</td>
                    <td>${hoSo.nguoiDeXuat}</td>
                    <td>Kỳ ${report.ky}/4 (Quý ${report.ky}/2025)</td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="flex: 1; background: #e0e0e0; border-radius: 10px; height: 8px;">
                                <div style="width: ${report.tienDo}%; background: #4CAF50; border-radius: 10px; height: 8px;"></div>
                            </div>
                            <span><strong>${report.tienDo}%</strong></span>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-success btn-sm" onclick="xacNhanTienDo('${hoSo.id}', ${report.ky})">
                            <i class="fas fa-check"></i> Xác nhận tiến độ
                        </button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    });
}

function xacNhanTienDo(hoSoId, ky) {
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    const report = hoSo.progressReports.find(r => r.ky === ky);
    
    if (!hoSo || !report) return;
    
    const content = `
        <h4>XÁC NHẬN TIẾN ĐỘ ĐỀ TÀI</h4>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>📄 Đề tài:</strong> ${hoSo.ten}</p>
            <p><strong>Mã:</strong> ${hoSo.id}</p>
            <p><strong>Chủ nhiệm:</strong> ${hoSo.nguoiDeXuat}</p>
            <p><strong>Kỳ báo cáo:</strong> Quý ${ky}/2025 (Kỳ ${ky}/4)</p>
            <p><strong>Tiến độ:</strong> ${report.tienDo}% (${Math.floor(report.tienDo/10)} công việc hoàn thành)</p>
        </div>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h5>Sau khi xác nhận:</h5>
            <p>• Đánh dấu giai đoạn tiến độ Quý ${ky} đã nộp</p>
            <p>• Cập nhật thanh tiến trình tổng thể của đề tài</p>
            <p>• Gửi thông báo xác nhận cho chủ nhiệm đề tài</p>
            <p>• Tạo nhắc nhở cho kỳ báo cáo tiếp theo</p>
        </div>
        
        <div style="background: #e8f5e8; border: 1px solid #4caf50; padding: 15px; border-radius: 8px;">
            <h5>Thông báo sẽ được gửi qua hệ thống nội bộ:</h5>
            <p><strong>Tiêu đề:</strong> Báo cáo tiến độ Quý ${ky}/2025 đã được xác nhận</p>
            <p><strong>Nội dung:</strong> Báo cáo tiến độ "${hoSo.ten}" đã được xác nhận với tiến độ ${report.tienDo}%. Kỳ báo cáo tiếp theo: Quý ${ky + 1}/2025.</p>
        </div>
        
        <div style="margin: 15px 0;">
            <label><input type="checkbox" checked> ☑ Gửi email xác nhận cho chủ nhiệm</label><br>
            <label><input type="checkbox" checked> ☑ Tạo lịch nhắc nhở cho kỳ tiếp theo</label>
        </div>
        
        <div style="text-align: right; margin-top: 20px;">
            <button class="btn btn-secondary" onclick="hideModal('kiemTraModal')">Hủy</button>
            <button class="btn btn-success" onclick="hoanTatXacNhanTienDo('${hoSo.id}', ${ky})">
                <i class="fas fa-check"></i> Xác nhận
            </button>
        </div>
    `;
    
    document.getElementById('kiemTraContent').innerHTML = content;
    showModal('kiemTraModal');
}

function hoanTatXacNhanTienDo(hoSoId, ky) {
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    const report = hoSo.progressReports.find(r => r.ky === ky);
    
    if (hoSo && report) {
        report.daXacNhan = true;
        report.ngayXacNhan = new Date().toISOString().split('T')[0];
        
        showNotification('Xác nhận tiến độ thành công!\n\nMã đề tài: ' + hoSo.id + '\nKỳ báo cáo: Quý ' + ky + '/2025\nTiến độ: ' + report.tienDo + '%\nThời gian: ' + new Date().toLocaleString('vi-VN') + '\n\n• Đã đánh dấu giai đoạn hoàn thành\n• Đã gửi email cho ' + hoSo.nguoiDeXuat + '\n• Đã tạo nhắc nhở cho Quý ' + (ky + 1) + '/2025', 'success');
        hideModal('kiemTraModal');
        loadCapNhatTienDoTable();
    }
}

// UC 1.13: Gửi tổng hợp tiến độ các đề tài
function loadTongHopTienDoTable() {
    const dangThucHien = hoSoData.filter(h => h.trangThai === 'dang-thuc-hien');
    const container = document.getElementById('danhSachDeTaiTongHop');
    
    if (dangThucHien.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">Chưa có đề tài nào để tổng hợp</p>';
        return;
    }
    
    let content = '<div style="max-height: 300px; overflow-y: auto;">';
    dangThucHien.forEach(hoSo => {
        const avgProgress = hoSo.progressReports ? 
            hoSo.progressReports.reduce((sum, r) => sum + r.tienDo, 0) / hoSo.progressReports.length : 0;
        
        content += `
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                <label style="display: flex; align-items: center; cursor: pointer;">
                    <input type="checkbox" class="de-tai-checkbox" value="${hoSo.id}" style="margin-right: 10px;">
                    <div style="flex: 1;">
                        <strong>${hoSo.ten}</strong><br>
                        <small style="color: #666;">Mã: ${hoSo.id} | Chủ nhiệm: ${hoSo.nguoiDeXuat}</small><br>
                        <div style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
                            <span style="font-size: 12px;">Tiến độ trung bình:</span>
                            <div style="flex: 1; background: #e0e0e0; border-radius: 10px; height: 6px; max-width: 100px;">
                                <div style="width: ${avgProgress}%; background: #4CAF50; border-radius: 10px; height: 6px;"></div>
                            </div>
                            <span style="font-size: 12px;"><strong>${Math.round(avgProgress)}%</strong></span>
                        </div>
                    </div>
                </label>
            </div>
        `;
    });
    content += '</div>';
    
    content += `
        <div style="margin-top: 20px; text-align: center;">
            <button class="btn btn-secondary" onclick="chonTatCaDeTai()">
                <i class="fas fa-check-square"></i> Chọn tất cả
            </button>
            <button class="btn btn-secondary" onclick="boChonTatCaDeTai()">
                <i class="fas fa-square"></i> Bỏ chọn tất cả
            </button>
        </div>
    `;
    
    container.innerHTML = content;
}

function chonTatCaDeTai() {
    document.querySelectorAll('.de-tai-checkbox').forEach(cb => cb.checked = true);
}

function boChonTatCaDeTai() {
    document.querySelectorAll('.de-tai-checkbox').forEach(cb => cb.checked = false);
}

function taoTongHopTienDo() {
    const selectedIds = Array.from(document.querySelectorAll('.de-tai-checkbox:checked')).map(cb => cb.value);
    
    if (selectedIds.length === 0) {
        showNotification('Vui lòng chọn ít nhất một đề tài để tổng hợp!', 'error');
        return;
    }
    
    // Mock tạo bảng tổng hợp
    const selectedProjects = hoSoData.filter(h => selectedIds.includes(h.id));
    
    let tongHopContent = `
        <h4>BẢNG TỔNG HỢP TIẾN ĐỘ CÁC ĐỀ TÀI</h4>
        <p><strong>Ngày tạo:</strong> ${new Date().toLocaleDateString('vi-VN')}</p>
        <p><strong>Số đề tài:</strong> ${selectedIds.length}</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
                <tr style="background: #f8f9fa;">
                    <th style="border: 1px solid #ddd; padding: 10px;">STT</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Mã đề tài</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Tên đề tài</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Chủ nhiệm</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Tiến độ</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    selectedProjects.forEach((hoSo, index) => {
        const avgProgress = hoSo.progressReports ? 
            hoSo.progressReports.reduce((sum, r) => sum + r.tienDo, 0) / hoSo.progressReports.length : 0;
        
        tongHopContent += `
            <tr>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">${index + 1}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${hoSo.id}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${hoSo.ten}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${hoSo.nguoiDeXuat}</td>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">${Math.round(avgProgress)}%</td>
            </tr>
        `;
    });
    
    tongHopContent += `
            </tbody>
        </table>
        
        <div style="text-align: right; margin-top: 30px;">
            <button class="btn btn-secondary" onclick="hideModal('kiemTraModal')">Đóng</button>
            <button class="btn btn-primary" onclick="guiBaoCaoTongHop()">
                <i class="fas fa-paper-plane"></i> Gửi báo cáo
            </button>
        </div>
    `;
    
    document.getElementById('kiemTraContent').innerHTML = tongHopContent;
    showModal('kiemTraModal');
}

function guiBaoCaoTongHop() {
    showNotification('Đã tạo và gửi báo cáo tổng hợp thành công!\n\nBáo cáo đã được gửi đến hội đồng khoa học', 'success');
    hideModal('kiemTraModal');
}

// UC 1.14: Nhắc nộp hồ sơ nghiệm thu
function loadNhacNopTable() {
    const canNghiemThu = hoSoData.filter(h => h.sapNghiemThu);
    const tableBody = document.getElementById('nhacNopTable');
    tableBody.innerHTML = '';
    
    if (canNghiemThu.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Không có đề tài nào đến hạn nộp trong vòng 10 ngày</td></tr>';
        return;
    }
    
    canNghiemThu.forEach(hoSo => {
        const hanNop = new Date(hoSo.hanNopNghiemThu);
        const today = new Date();
        const daysLeft = Math.floor((hanNop - today) / (1000 * 60 * 60 * 24));
        
        let tinhTrang = '';
        if (daysLeft < 0) {
            tinhTrang = 'Quá hạn';
        } else if (daysLeft <= 3) {
            tinhTrang = 'Khẩn cấp';
        } else if (daysLeft <= 10) {
            tinhTrang = 'Sắp đến hạn';
        } else {
            tinhTrang = 'Bình thường';
        }
        
        const row = `
            <tr>
                <td><strong>${hoSo.id}</strong></td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${hanNop.toLocaleDateString('vi-VN')} (${daysLeft >= 0 ? 'còn ' + daysLeft + ' ngày' : 'quá hạn ' + Math.abs(daysLeft) + ' ngày'})</td>
                <td>${tinhTrang}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="nhacNopNghiemThu('${hoSo.id}')">
                        <i class="fas fa-bell"></i> Gửi thông báo
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function nhacNopNghiemThu(hoSoId) {
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    if (!hoSo) return;
    
    showNotification(`Đã gửi thông báo nhắc nộp hồ sơ nghiệm thu!\n\nĐề tài: ${hoSo.ten}\nChủ nhiệm: ${hoSo.nguoiDeXuat}\nHạn nộp: ${new Date(hoSo.hanNopNghiemThu).toLocaleDateString('vi-VN')}`, 'success');
}

// Other placeholder functions
function loadDanhSachNghiemThuTable() {
    const container = document.getElementById('danhSachDeTaiNghiemThu');
    const sanSangNghiemThu = hoSoData.filter(h => h.sapNghiemThu);
    
    if (sanSangNghiemThu.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">Chưa có đề tài nào sẵn sàng nghiệm thu</p>';
        return;
    }
    
    let content = '';
    sanSangNghiemThu.forEach(hoSo => {
        content += `
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                <label style="display: flex; align-items: center; cursor: pointer;">
                    <input type="checkbox" class="nghiem-thu-checkbox" value="${hoSo.id}" style="margin-right: 10px;">
                    <div>
                        <strong>${hoSo.ten}</strong><br>
                        <small style="color: #666;">Mã: ${hoSo.id} | Chủ nhiệm: ${hoSo.nguoiDeXuat} | Hạn nộp: ${new Date(hoSo.hanNopNghiemThu).toLocaleDateString('vi-VN')}</small>
                    </div>
                </label>
            </div>
        `;
    });
    
    container.innerHTML = content;
}

function lapDanhSachNghiemThu() {
    const selectedIds = Array.from(document.querySelectorAll('.nghiem-thu-checkbox:checked')).map(cb => cb.value);
    
    if (selectedIds.length === 0) {
        showNotification('Vui lòng chọn ít nhất một đề tài!', 'error');
        return;
    }
    
    if (confirm(`Xác nhận lập danh sách nghiệm thu cho ${selectedIds.length} đề tài?`)) {
        // Update status
        selectedIds.forEach(id => {
            const hoSo = hoSoData.find(h => h.id === id);
            if (hoSo) {
                hoSo.trangThai = 'cho-danh-gia-nghiem-thu';
            }
        });
        
        showNotification(`Đã lập danh sách nghiệm thu cho ${selectedIds.length} đề tài!\n\nDanh sách đã được gửi cho hội đồng nghiệm thu`, 'success');
        loadDanhSachNghiemThuTable();
    }
}

function loadKiemTraNghiemThuTable() {
    const tableBody = document.getElementById('kiemTraNghiemThuTable');
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Chưa có hồ sơ nghiệm thu nào cần kiểm tra</td></tr>';
}

function loadLuuTruTable() {
    const tableBody = document.getElementById('luuTruTable');
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Chưa có kết quả nào cần lưu trữ</td></tr>';
}

function loadHoanTatTable() {
    const tableBody = document.getElementById('hoanTatTable');
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Chưa có đề tài nào hoàn tất</td></tr>';
}

// Utility functions
function filterByStatus(status) {
    // Update tab appearance
    document.querySelectorAll('[id^="tab"]').forEach(tab => tab.classList.remove('btn-primary'));
    if (status === '') {
        document.getElementById('tabAll').classList.add('btn-primary');
    } else {
        const tabId = 'tab' + status.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
        document.getElementById(tabId)?.classList.add('btn-primary');
    }
    
    // Filter and reload table
    const filtered = status ? hoSoData.filter(h => h.trangThai === status) : hoSoData;
    loadFilteredHoSoTable(filtered);
}

function loadFilteredHoSoTable(data) {
    const tableBody = document.getElementById('hoSoTable');
    tableBody.innerHTML = '';
    
    data.forEach(hoSo => {
        const row = `
            <tr>
                <td><strong>${hoSo.id}</strong></td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${hoSo.linhVuc}</td>
                <td><span class="status status-${hoSo.trangThai}">${getStatusText(hoSo.trangThai)}</span></td>
                <td>${formatDate(hoSo.ngayTao)}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewHoSo('${hoSo.id}')">
                        <i class="fas fa-eye"></i> Xem
                    </button>
                    ${hoSo.trangThai === 'da-tao' ? `
                        <button class="btn btn-warning btn-sm" onclick="editHoSo('${hoSo.id}')">
                            <i class="fas fa-edit"></i> Sửa
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="deleteHoSo('${hoSo.id}')">
                            <i class="fas fa-trash"></i> Xóa
                        </button>
                    ` : ''}
                    ${hoSo.trangThai === 'da-hoan-thien' ? `
                        <button class="btn btn-primary btn-sm" onclick="guiXetDuyet('${hoSo.id}')">
                            <i class="fas fa-paper-plane"></i> Gửi xét duyệt
                        </button>
                    ` : ''}
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function applyFilters() {
    // Implementation for filters
    loadHoSoTable();
}

function viewHoSo(id) {
    const hoSo = hoSoData.find(h => h.id === id);
    if (hoSo) {
        alert(`Thông tin hồ sơ:\n\nMã: ${hoSo.id}\nTên: ${hoSo.ten}\nNguời đề xuất: ${hoSo.nguoiDeXuat}\nLĩnh vực: ${hoSo.linhVuc}\nTrạng thái: ${getStatusText(hoSo.trangThai)}`);
    }
}

function editHoSo(id) {
    showNotification('Chức năng sửa hồ sơ', 'info');
}

function deleteHoSo(id) {
    if (confirm('Bạn có chắc chắn muốn xóa hồ sơ này?')) {
        const index = hoSoData.findIndex(h => h.id === id);
        if (index !== -1) {
            hoSoData.splice(index, 1);
            loadHoSoTable();
            updateStats();
            updateNavigationBadges();
            showNotification('Đã xóa hồ sơ thành công', 'success');
        }
    }
}

function getStatusText(status) {
    const statusMap = {
        'da-tao': 'Đã tạo',
        'cho-kiem-tra': 'Chờ kiểm tra',
        'da-hoan-thien': 'Đã hoàn thiện',
        'can-bo-sung': 'Cần bổ sung',
        'cho-xet-duyet': 'Chờ xét duyệt',
        'da-phe-duyet': 'Đã phê duyệt',
        'dang-thuc-hien': 'Đang thực hiện'
    };
    return statusMap[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
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

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// ============= UC 1.7: THÔNG BÁO YÊU CẦU CHỈNH SỬA =============

function loadChinhSuaTable() {
    const tbody = document.getElementById('chinhSuaTable');
    if (!tbody) return;
    
    // Lọc các hồ sơ cần chỉnh sửa (có vấn đề hoặc cần bổ sung)
    const hoSoCanChinhSua = hoSoData.filter(hs => 
        hs.trangThai === 'can-bo-sung' || 
        hs.trangThai === 'cho-kiem-tra' ||
        (hs.trangThai === 'da-tao' && hs.documents && hs.documents.length > 0)
    );
    
    tbody.innerHTML = hoSoCanChinhSua.map(hs => `
        <tr>
            <td>${hs.id}</td>
            <td>${hs.ten}</td>
            <td>${hs.nguoiDeXuat}</td>
            <td>${formatDate(hs.ngayTao)}</td>
            <td>
                <span class="status-badge status-${hs.trangThai}">
                    ${getStatusText(hs.trangThai)}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="guiYeuCauChinhSua('${hs.id}')">
                    Yêu cầu chỉnh sửa
                </button>
            </td>
        </tr>
    `).join('');
}

function guiYeuCauChinhSua(hoSoId) {
    const hoSo = hoSoData.find(hs => hs.id === hoSoId);
    if (!hoSo) return;
    
    // Load thông tin đề tài vào modal
    document.getElementById('thongTinDeTai').innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div><strong>Mã hồ sơ:</strong> ${hoSo.id}</div>
            <div><strong>Tên đề tài:</strong> ${hoSo.ten}</div>
            <div><strong>Chủ nhiệm:</strong> ${hoSo.nguoiDeXuat}</div>
            <div><strong>Lĩnh vực:</strong> ${hoSo.linhVuc}</div>
            <div><strong>Email:</strong> ${hoSo.email}</div>
            <div><strong>Số điện thoại:</strong> ${hoSo.sdt}</div>
        </div>
    `;
    
    // Set default deadline (7 days from now)
    const defaultDeadline = new Date();
    defaultDeadline.setDate(defaultDeadline.getDate() + 7);
    document.getElementById('hanChotChinhSua').value = defaultDeadline.toISOString().slice(0, 16);
    
    showModal('thongBaoChinhSuaModal');
    
    // Handle form submission
    const form = document.getElementById('thongBaoChinhSuaForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const yeuCau = {
            hoSoId: hoSoId,
            loaiChinhSua: document.getElementById('loaiChinhSua').value,
            noiDungChinhSua: document.getElementById('noiDungChinhSua').value,
            lyDoChinhSua: document.getElementById('lyDoChinhSua').value,
            hanChot: document.getElementById('hanChotChinhSua').value,
            mucDoUuTien: document.getElementById('mucDoUuTien').value,
            ghiChu: document.getElementById('ghiChuThem').value,
            ngayGui: new Date().toISOString().slice(0, 19),
            nguoiGui: 'Nhân viên X'
        };
        
        // Gửi thông báo (mock)
        sendChinhSuaNotification(yeuCau);
        
        // Update trạng thái hồ sơ
        hoSo.trangThai = 'can-chinh-sua';
        hoSo.yeuCauChinhSua = yeuCau;
        
        hideModal('thongBaoChinhSuaModal');
        form.reset();
        loadChinhSuaTable();
        updateStats();
        updateNavigationBadges();
        
        showNotification(`Đã gửi yêu cầu chỉnh sửa đến ${hoSo.nguoiDeXuat}`, 'success');
    };
}

function sendChinhSuaNotification(yeuCau) {
    // Mock gửi email/thông báo đến chủ nhiệm đề tài
    console.log('Gửi thông báo yêu cầu chỉnh sửa:', yeuCau);
    
    // Log thông báo vào hệ thống
    const thongBao = {
        id: 'TB' + Date.now(),
        type: 'yeu-cau-chinh-sua',
        recipient: yeuCau.hoSoId,
        content: yeuCau,
        status: 'da-gui',
        timestamp: new Date().toISOString()
    };
    
    // Lưu vào localStorage để demo
    let thongBaoList = JSON.parse(localStorage.getItem('thongBaoList') || '[]');
    thongBaoList.push(thongBao);
    localStorage.setItem('thongBaoList', JSON.stringify(thongBaoList));
}

function updateChinhSuaFields() {
    const loaiChinhSua = document.getElementById('loaiChinhSua').value;
    const noiDungField = document.getElementById('noiDungChinhSua');
    
    // Gợi ý nội dung dựa trên loại chỉnh sửa
    const suggestions = {
        'thong-tin-co-ban': 'Vui lòng kiểm tra và cập nhật lại thông tin cơ bản như tên đề tài, mô tả, thời gian thực hiện...',
        'tai-lieu-dinh-kem': 'Cần bổ sung hoặc cập nhật các tài liệu đính kèm theo yêu cầu...',
        'noi-dung-nghien-cuu': 'Nội dung nghiên cứu cần được làm rõ hơn, bổ sung phương pháp và kết quả dự kiến...',
        'kinh-phi': 'Cần điều chỉnh kinh phí và bảng chi tiết phân bổ kinh phí...',
        'thoi-gian': 'Cần điều chỉnh lại thời gian thực hiện và các mốc quan trọng...'
    };
    
    if (suggestions[loaiChinhSua]) {
        noiDungField.placeholder = suggestions[loaiChinhSua];
    }
}

// Initialize default tab
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tabAll')?.classList.add('btn-primary');
});

// ==================== XÁC NHẬN HOÀN TẤT ĐỀ TÀI FUNCTIONS ====================

// Mock data cho đề tài hoàn tất
let deTaiHoanTatData = [
    {
        maDeTai: 'DT001',
        tenDeTai: 'Ứng dụng AI trong giáo dục',
        chuNhiem: 'TS. Nguyễn Văn A',
        ngayNghiemThu: '2024-11-15',
        diemTB: 8.5,
        ketQua: 'Đạt',
        trangThai: 'Đã đánh giá nghiệm thu',
        xepLoai: 'Tốt',
        quyetDinh: 'Chấp nhận hoàn tất',
        bienBan: 'Hội đồng nghiệm thu đã xem xét đầy đủ hồ sơ và nghe báo cáo của tác giả. Đề tài đạt các mục tiêu đề ra, có tính khả thi và ứng dụng cao. Sản phẩm nghiên cứu hoàn thiện, tài liệu rõ ràng. Hội đồng thống nhất đánh giá đề tài đạt yêu cầu.',
        phieuDanhGia: [
            { thanh_vien: 'PGS.TS. Nguyễn Văn X', diem: 8.5, nhan_xet: 'Đề tài có tính ứng dụng cao, kết quả nghiên cứu rõ ràng' },
            { thanh_vien: 'GS.TS. Trần Thị Y', diem: 8.2, nhan_xet: 'Phương pháp nghiên cứu phù hợp, cần cải thiện phần thực nghiệm' },
            { thanh_vien: 'TS. Lê Văn Z', diem: 8.8, nhan_xet: 'Kết quả vượt mong đợi, có thể áp dụng thực tế' }
        ]
    },
    {
        maDeTai: 'DT002',
        tenDeTai: 'Nghiên cứu IoT trong nông nghiệp',
        chuNhiem: 'ThS. Lê Thị B',
        ngayNghiemThu: '2024-11-20',
        diemTB: 9.2,
        ketQua: 'Đạt',
        trangThai: 'Đã đánh giá nghiệm thu',
        xepLoai: 'Xuất sắc',
        quyetDinh: 'Chấp nhận hoàn tất',
        bienBan: 'Đề tài có tính sáng tạo và ứng dụng thực tiễn cao. Kết quả nghiên cứu vượt mong đợi với nhiều đóng góp mới.',
        phieuDanhGia: [
            { thanh_vien: 'GS.TS. Phạm Văn M', diem: 9.0, nhan_xet: 'Kết quả nghiên cứu vượt trội, có tính ứng dụng cao' },
            { thanh_vien: 'PGS.TS. Hoàng Thị N', diem: 9.3, nhan_xet: 'Phương pháp sáng tạo, kết quả ấn tượng' },
            { thanh_vien: 'TS. Nguyễn Văn P', diem: 9.3, nhan_xet: 'Đề tài có giá trị khoa học và thực tiễn cao' }
        ]
    },
    {
        maDeTai: 'DT003',
        tenDeTai: 'Blockchain trong chuỗi cung ứng',
        chuNhiem: 'TS. Trần Văn C',
        ngayNghiemThu: '2024-11-10',
        diemTB: 5.8,
        ketQua: 'Chưa đạt',
        trangThai: 'Đã đánh giá nghiệm thu',
        xepLoai: 'Không đạt',
        quyetDinh: 'Yêu cầu bổ sung',
        bienBan: 'Đề tài chưa đạt một số mục tiêu đề ra. Cần bổ sung thêm dữ liệu thực nghiệm và hoàn thiện phần kết luận.',
        phieuDanhGia: [
            { thanh_vien: 'GS.TS. Vũ Thị Q', diem: 6.0, nhan_xet: 'Ý tưởng tốt nhưng thực hiện chưa đầy đủ' },
            { thanh_vien: 'PGS.TS. Đỗ Văn R', diem: 5.5, nhan_xet: 'Cần bổ sung thêm thực nghiệm' },
            { thanh_vien: 'TS. Bùi Thị S', diem: 6.0, nhan_xet: 'Phần lý thuyết tốt, thực hành chưa đủ' }
        ]
    },
    {
        maDeTai: 'DT004',
        tenDeTai: 'Machine Learning dự báo thời tiết',
        chuNhiem: 'PGS.TS. Phạm Thị D',
        ngayNghiemThu: '2024-10-25',
        diemTB: 8.8,
        ketQua: 'Đã hoàn tất',
        trangThai: 'Đã hoàn tất',
        xepLoai: 'Tốt',
        quyetDinh: 'Hoàn tất thành công',
        bienBan: 'Đề tài đã hoàn tất thành công với kết quả đáng kể. Đã được xác nhận hoàn tất.',
        phieuDanhGia: [
            { thanh_vien: 'GS.TS. Cao Văn T', diem: 8.5, nhan_xet: 'Kết quả tốt, có thể áp dụng thực tế' },
            { thanh_vien: 'PGS.TS. Lý Thị U', diem: 9.0, nhan_xet: 'Phương pháp hiệu quả, kết quả ổn định' },
            { thanh_vien: 'TS. Mai Văn V', diem: 9.0, nhan_xet: 'Đạt được mục tiêu đề ra' }
        ]
    }
];

// Mock data cho nghiệm thu
let nhacNopNghiemThuData = [
    {
        maDeTai: 'DT001',
        tenDeTai: 'Ứng dụng AI trong giáo dục',
        chuNhiem: 'TS. Nguyễn Văn A',
        email: 'nguyenvana@edu.vn',
        hanNop: '2024-12-01',
        tinhTrang: 'Sắp hết hạn',
        soNgayConLai: 3,
        lanNhac: 2
    },
    {
        maDeTai: 'DT002',
        tenDeTai: 'Nghiên cứu IoT trong nông nghiệp',
        chuNhiem: 'ThS. Lê Thị B',
        email: 'lethib@edu.vn',
        hanNop: '2024-11-25',
        tinhTrang: 'Quá hạn',
        soNgayConLai: -5,
        lanNhac: 3
    },
    {
        maDeTai: 'DT003',
        tenDeTai: 'Blockchain trong chuỗi cung ứng',
        chuNhiem: 'TS. Trần Văn C',
        email: 'tranvanc@edu.vn',
        hanNop: '2024-12-15',
        tinhTrang: 'Bình thường',
        soNgayConLai: 15,
        lanNhac: 0
    },
    {
        maDeTai: 'DT004',
        tenDeTai: 'Machine Learning dự báo thời tiết',
        chuNhiem: 'PGS.TS. Phạm Thị D',
        email: 'phamthid@edu.vn',
        hanNop: '2024-11-30',
        tinhTrang: 'Cần nhắc',
        soNgayConLai: 7,
        lanNhac: 1
    }
];

let danhSachNghiemThuData = [
    {
        maDeTai: 'DT001',
        tenDeTai: 'Ứng dụng AI trong giáo dục',
        chuNhiem: 'TS. Nguyễn Văn A',
        ngayHoanThanh: '2024-11-20',
        trangThai: 'Sẵn sàng nghiệm thu',
        hoSoDay: true,
        sanPhamHoanThien: true
    },
    {
        maDeTai: 'DT002',
        tenDeTai: 'Nghiên cứu IoT trong nông nghiệp',
        chuNhiem: 'ThS. Lê Thị B',
        ngayHoanThanh: '2024-11-18',
        trangThai: 'Đã lập danh sách',
        hoSoDay: true,
        sanPhamHoanThien: true
    },
    {
        maDeTai: 'DT003',
        tenDeTai: 'Blockchain trong chuỗi cung ứng',
        chuNhiem: 'TS. Trần Văn C',
        ngayHoanThanh: '2024-11-22',
        trangThai: 'Chờ kiểm tra',
        hoSoDay: false,
        sanPhamHoanThien: true
    }
];

let kiemTraNghiemThuData = [
    {
        maDeTai: 'DT001',
        tenDeTai: 'Ứng dụng AI trong giáo dục',
        chuNhiem: 'TS. Nguyễn Văn A',
        ngayNop: '2024-11-15',
        tinhTrang: 'Đầy đủ',
        ketQua: 'Đạt yêu cầu',
        ghiChu: 'Hồ sơ hoàn chỉnh, sẵn sàng nghiệm thu'
    },
    {
        maDeTai: 'DT002',
        tenDeTai: 'Nghiên cứu IoT trong nông nghiệp',
        chuNhiem: 'ThS. Lê Thị B',
        ngayNop: '2024-11-18',
        tinhTrang: 'Thiếu tài liệu',
        ketQua: 'Cần bổ sung',
        ghiChu: 'Thiếu báo cáo kỹ thuật chi tiết'
    },
    {
        maDeTai: 'DT003',
        tenDeTai: 'Blockchain trong chuỗi cung ứng',
        chuNhiem: 'TS. Trần Văn C',
        ngayNop: '2024-11-20',
        tinhTrang: 'Đang kiểm tra',
        ketQua: 'Chờ xử lý',
        ghiChu: 'Đang trong quá trình kiểm tra'
    }
];

let luuTruKetQuaData = [
    {
        maDeTai: 'DT001',
        tenDeTai: 'Ứng dụng AI trong giáo dục',
        chuNhiem: 'TS. Nguyễn Văn A',
        ketQua: 'Đạt',
        diemTB: 8.5,
        ngayNghiemThu: '2024-11-15',
        trangThai: 'Đã lưu trữ',
        bienBan: 'Có',
        bangDiem: 'Có'
    },
    {
        maDeTai: 'DT002',
        tenDeTai: 'Nghiên cứu IoT trong nông nghiệp',
        chuNhiem: 'ThS. Lê Thị B',
        ketQua: 'Đạt',
        diemTB: 9.2,
        ngayNghiemThu: '2024-11-20',
        trangThai: 'Chờ lưu trữ',
        bienBan: 'Có',
        bangDiem: 'Có'
    },
    {
        maDeTai: 'DT003',
        tenDeTai: 'Blockchain trong chuỗi cung ứng',
        chuNhiem: 'TS. Trần Văn C',
        ketQua: 'Chưa đạt',
        diemTB: 5.8,
        ngayNghiemThu: '2024-11-10',
        trangThai: 'Đã lưu trữ',
        bienBan: 'Có',
        bangDiem: 'Có'
    },
    {
        maDeTai: 'DT004',
        tenDeTai: 'Machine Learning dự báo thời tiết',
        chuNhiem: 'PGS.TS. Phạm Thị D',
        ketQua: 'Đạt',
        diemTB: 8.8,
        ngayNghiemThu: '2024-10-25',
        trangThai: 'Đã lưu trữ',
        bienBan: 'Có',
        bangDiem: 'Có'
    }
];

// Xem chi tiết kết quả nghiệm thu
function xemChiTietKetQua(maDeTai) {
    const deTai = deTaiHoanTatData.find(dt => dt.maDeTai === maDeTai);
    if (!deTai) {
        alert('Không tìm thấy thông tin đề tài!');
        return;
    }
    
    // Điền thông tin vào modal
    document.getElementById('detailMaDeTai').textContent = deTai.maDeTai;
    document.getElementById('detailTenDeTai').textContent = deTai.tenDeTai;
    document.getElementById('detailChuNhiem').textContent = deTai.chuNhiem;
    document.getElementById('detailNgayNghiemThu').textContent = new Date(deTai.ngayNghiemThu).toLocaleDateString('vi-VN');
    document.getElementById('detailDiem').textContent = deTai.diemTB.toFixed(1);
    document.getElementById('detailXepLoai').textContent = deTai.xepLoai;
    document.getElementById('detailXepLoai').className = `status ${getStatusClass(deTai.ketQua)}`;
    document.getElementById('detailQuyetDinh').textContent = deTai.quyetDinh;
    document.getElementById('detailBienBan').textContent = deTai.bienBan;
    
    // Điền phiếu đánh giá
    const tbody = document.getElementById('detailPhieuDanhGia');
    tbody.innerHTML = '';
    deTai.phieuDanhGia.forEach(phieu => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${phieu.thanh_vien}</td>
            <td style="text-align: center; font-weight: bold;">${phieu.diem}</td>
            <td>${phieu.nhan_xet}</td>
        `;
    });
    
    showModal('chiTietKetQuaModal');
}

// Xác nhận hoàn tất đề tài
function xacNhanHoanTat(maDeTai) {
    const deTai = deTaiHoanTatData.find(dt => dt.maDeTai === maDeTai);
    if (!deTai) {
        alert('Không tìm thấy thông tin đề tài!');
        return;
    }
    
    if (deTai.ketQua === 'Chưa đạt') {
        alert('Không thể xác nhận hoàn tất đề tài chưa đạt yêu cầu!');
        return;
    }
    
    if (deTai.trangThai === 'Đã hoàn tất') {
        alert('Đề tài này đã được xác nhận hoàn tất!');
        return;
    }
    
    // Điền thông tin vào modal xác nhận
    document.getElementById('confirmMaDeTai').textContent = deTai.maDeTai;
    document.getElementById('confirmTenDeTai').textContent = deTai.tenDeTai;
    document.getElementById('confirmKetQua').textContent = `${deTai.ketQua} (${deTai.diemTB}/10)`;
    document.getElementById('confirmKetQua').className = `status ${getStatusClass(deTai.ketQua)}`;
    
    // Set ngày mặc định cho hạn phản hồi (7 ngày từ hôm nay)
    const today = new Date();
    today.setDate(today.getDate() + 7);
    document.getElementById('hanPhanHoi').value = today.toISOString().split('T')[0];
    
    showModal('xacNhanHoanTatModal');
}

// Gửi yêu cầu bổ sung
function guiYeuCauBoSung(maDeTai) {
    const deTai = deTaiHoanTatData.find(dt => dt.maDeTai === maDeTai);
    if (!deTai) {
        alert('Không tìm thấy thông tin đề tài!');
        return;
    }
    
    if (deTai.ketQua !== 'Chưa đạt') {
        alert('Chỉ có thể gửi yêu cầu bổ sung cho đề tài chưa đạt yêu cầu!');
        return;
    }
    
    // Điền thông tin vào modal
    document.getElementById('boSungMaDeTai').textContent = deTai.maDeTai;
    document.getElementById('boSungTenDeTai').textContent = deTai.tenDeTai;
    
    // Set ngày mặc định cho hạn phản hồi (30 ngày từ hôm nay)
    const today = new Date();
    today.setDate(today.getDate() + 30);
    document.getElementById('hanPhanHoi').value = today.toISOString().split('T')[0];
    
    showModal('yeuCauBoSungModal');
}

// Submit xác nhận hoàn tất
function submitXacNhanHoanTat(event) {
    event.preventDefault();
    
    const maDeTai = document.getElementById('confirmMaDeTai').textContent;
    const ghiChu = document.getElementById('ghiChuCuoiCung').value.trim();
    const guiThongBao = document.getElementById('chkGuiThongBao').checked;
    const capNhatTrangThai = document.getElementById('chkCapNhatTrangThai').checked;
    
    // Cập nhật data
    const deTai = deTaiHoanTatData.find(dt => dt.maDeTai === maDeTai);
    if (deTai && capNhatTrangThai) {
        deTai.trangThai = 'Đã hoàn tất';
        deTai.ketQua = 'Đã hoàn tất';
        deTai.ghiChuCuoi = ghiChu;
        deTai.ngayHoanTat = new Date().toISOString().split('T')[0];
    }
    
    // Gửi thông báo nếu được chọn
    if (guiThongBao) {
        // Gọi API gửi thông báo (mock)
        console.log(`Gửi thông báo hoàn tất đến chủ nhiệm đề tài ${maDeTai}`);
    }
    
    // Refresh bảng
    loadDeTaiHoanTatTable();
    hideModal('xacNhanHoanTatModal');
    
    showNotification('Đã xác nhận hoàn tất đề tài thành công!', 'success');
}

// Submit yêu cầu bổ sung
function submitYeuCauBoSung(event) {
    event.preventDefault();
    
    const maDeTai = document.getElementById('boSungMaDeTai').textContent;
    const noiDung = document.getElementById('noiDungYeuCau').value.trim();
    const hanPhanHoi = document.getElementById('hanPhanHoi').value;
    
    if (!noiDung) {
        alert('Vui lòng nhập nội dung yêu cầu bổ sung!');
        return;
    }
    
    if (!hanPhanHoi) {
        alert('Vui lòng chọn hạn phản hồi!');
        return;
    }
    
    // Mock gửi yêu cầu bổ sung
    console.log('Gửi yêu cầu bổ sung:', {
        maDeTai: maDeTai,
        noiDung: noiDung,
        hanPhanHoi: hanPhanHoi,
        ngayGui: new Date().toISOString().split('T')[0]
    });
    
    hideModal('yeuCauBoSungModal');
    showNotification('Đã gửi yêu cầu bổ sung thành công!', 'success');
    
    // Reset form
    document.getElementById('noiDungYeuCau').value = '';
}

// Filter đề tài hoàn tất
function filterDeTaiHoanTat(loai) {
    // Update active button
    document.querySelectorAll('.filter-tabs .btn').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
    });
    event.target.classList.remove('btn-outline-primary');
    event.target.classList.add('btn-primary');
    
    loadDeTaiHoanTatTable(loai);
}

// Load bảng đề tài hoàn tất với filter
function loadDeTaiHoanTatTable(filter = 'all') {
    console.log('loadDeTaiHoanTatTable được gọi với filter:', filter);
    console.log('deTaiHoanTatData:', deTaiHoanTatData);
    
    let filteredData = deTaiHoanTatData;
    
    if (filter === 'dat') {
        filteredData = deTaiHoanTatData.filter(dt => dt.ketQua === 'Đạt');
    } else if (filter === 'chua-dat') {
        filteredData = deTaiHoanTatData.filter(dt => dt.ketQua === 'Chưa đạt');
    } else if (filter === 'hoan-tat') {
        filteredData = deTaiHoanTatData.filter(dt => dt.ketQua === 'Đã hoàn tất');
    }
    
    const tbody = document.getElementById('deTaiHoanTatTable');
    if (!tbody) {
        console.log('Không tìm thấy element deTaiHoanTatTable');
        return;
    }
    
    tbody.innerHTML = '';
    
    filteredData.forEach(deTai => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${deTai.maDeTai}</td>
            <td style="text-align: left;">
                <strong>${deTai.tenDeTai}</strong><br>
                <small class="text-muted">Chủ nhiệm: ${deTai.chuNhiem}</small>
            </td>
            <td style="text-align: center;">${new Date(deTai.ngayNghiemThu).toLocaleDateString('vi-VN')}</td>
            <td style="text-align: center;">
                <span style="font-weight: bold; font-size: 16px;">${deTai.diemTB.toFixed(1)}</span>/10
            </td>
            <td style="text-align: center;">
                <span class="status ${getStatusClass(deTai.ketQua)}">${deTai.ketQua}</span>
            </td>
            <td style="text-align: center;">
                <button class="btn btn-info btn-sm" onclick="xemChiTietKetQua('${deTai.maDeTai}')" title="Xem chi tiết">
                    <i class="fas fa-eye"></i>
                </button>
                ${deTai.ketQua === 'Đạt' && deTai.trangThai !== 'Đã hoàn tất' ? `
                    <button class="btn btn-success btn-sm" onclick="xacNhanHoanTat('${deTai.maDeTai}')" title="Xác nhận hoàn tất">
                        <i class="fas fa-check-circle"></i>
                    </button>
                ` : ''}
                ${deTai.ketQua === 'Chưa đạt' ? `
                    <button class="btn btn-warning btn-sm" onclick="guiYeuCauBoSung('${deTai.maDeTai}')" title="Gửi yêu cầu bổ sung">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                ` : ''}
            </td>
        `;
    });
    
    // Update statistics
    updateHoanTatStats(filteredData);
}

// Refresh bảng đề tài hoàn tất
function refreshDeTaiHoanTat() {
    loadDeTaiHoanTatTable();
    showNotification('Đã làm mới dữ liệu!', 'info');
}

// Update statistics for hoàn tất section
function updateHoanTatStats(data = deTaiHoanTatData) {
    const totalEl = document.getElementById('statTongDeTai');
    const datEl = document.getElementById('statDat');
    const chuaDatEl = document.getElementById('statChuaDat');
    const hoanTatEl = document.getElementById('statHoanTat');
    
    if (totalEl) totalEl.textContent = data.length;
    if (datEl) datEl.textContent = data.filter(dt => dt.ketQua === 'Đạt').length;
    if (chuaDatEl) chuaDatEl.textContent = data.filter(dt => dt.ketQua === 'Chưa đạt').length;
    if (hoanTatEl) hoanTatEl.textContent = data.filter(dt => dt.ketQua === 'Đã hoàn tất').length;
}

// Helper functions
function getStatusClass(ketQua) {
    switch(ketQua) {
        case 'Đạt': return 'status-dat';
        case 'Chưa đạt': return 'status-chua-dat';
        case 'Đã hoàn tất': return 'status-hoan-tat';
        default: return 'status-da-danh-gia';
    }
}

function getStatusIcon(ketQua) {
    // Removed emoji icons, using only CSS status classes for colors
    return '';
}

// Load table on page load if in xac-nhan-hoan-tat section
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('deTaiHoanTatTable')) {
        loadDeTaiHoanTatTable();
    }
});

// ==================== NGHIỆM THU SECTION FUNCTIONS ====================

// UC 1.14: Nhắc nộp hồ sơ nghiệm thu
function loadNhacNopTable() {
    const tbody = document.getElementById('nhacNopTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    nhacNopNghiemThuData.forEach(item => {
        const row = tbody.insertRow();
        const tinhTrangClass = getTinhTrangClass(item.tinhTrang);
        
        row.innerHTML = `
            <td>${item.maDeTai}</td>
            <td style="text-align: left;">
                <strong>${item.tenDeTai}</strong><br>
                <small class="text-muted">Chủ nhiệm: ${item.chuNhiem}</small>
            </td>
            <td>${item.chuNhiem}</td>
            <td style="text-align: center;">${new Date(item.hanNop).toLocaleDateString('vi-VN')}</td>
            <td style="text-align: center;">
                <span class="status ${tinhTrangClass}">${item.tinhTrang}</span>
                ${item.soNgayConLai > 0 ? `<br><small>Còn ${item.soNgayConLai} ngày</small>` : 
                  item.soNgayConLai < 0 ? `<br><small class="text-danger">Quá hạn ${Math.abs(item.soNgayConLai)} ngày</small>` : ''}
            </td>
            <td style="text-align: center;">
                <button class="btn btn-warning btn-sm" onclick="guiThongBaoNhac('${item.maDeTai}')" title="Gửi thông báo nhắc">
                    <i class="fas fa-bell"></i> Nhắc (${item.lanNhac})
                </button>
                <button class="btn btn-info btn-sm" onclick="xemLichSuNhac('${item.maDeTai}')" title="Xem lịch sử nhắc">
                    <i class="fas fa-history"></i>
                </button>
            </td>
        `;
    });
}

// UC 1.16: Lập danh sách đề tài cần nghiệm thu
function loadDanhSachNghiemThuTable() {
    const container = document.getElementById('danhSachDeTaiNghiemThu');
    if (!container) return;
    
    container.innerHTML = '';
    
    danhSachNghiemThuData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'form-check';
        div.style.marginBottom = '15px';
        div.style.padding = '15px';
        div.style.border = '1px solid #ddd';
        div.style.borderRadius = '6px';
        
        const statusColor = item.trangThai === 'Sẵn sàng nghiệm thu' ? '#27ae60' : 
                          item.trangThai === 'Đã lập danh sách' ? '#3498db' : '#f39c12';
        
        div.innerHTML = `
            <input type="checkbox" class="form-check-input" id="dt_${item.maDeTai}" 
                ${item.trangThai === 'Sẵn sàng nghiệm thu' ? 'checked' : ''}>
            <label class="form-check-label" for="dt_${item.maDeTai}" style="margin-left: 10px;">
                <strong>${item.maDeTai}: ${item.tenDeTai}</strong><br>
                <small>Chủ nhiệm: ${item.chuNhiem}</small><br>
                <small>Ngày hoàn thành: ${new Date(item.ngayHoanThanh).toLocaleDateString('vi-VN')}</small><br>
                <span style="color: ${statusColor}; font-weight: bold;">${item.trangThai}</span><br>
                <small>Hồ sơ: ${item.hoSoDay ? 'Đầy đủ' : 'Thiếu'} | 
                Sản phẩm: ${item.sanPhamHoanThien ? 'Hoàn thiện' : 'Chưa xong'}</small>
            </label>
        `;
        
        container.appendChild(div);
    });
}

// UC 1.19: Kiểm tra hồ sơ nghiệm thu
function loadKiemTraNghiemThuTable() {
    const tbody = document.getElementById('kiemTraNghiemThuTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    kiemTraNghiemThuData.forEach(item => {
        const row = tbody.insertRow();
        const tinhTrangClass = item.tinhTrang === 'Đầy đủ' ? 'status-dat' : 
                             item.tinhTrang === 'Thiếu tài liệu' ? 'status-chua-dat' : 'status-da-danh-gia';
        
        row.innerHTML = `
            <td>${item.maDeTai}</td>
            <td style="text-align: left;">
                <strong>${item.tenDeTai}</strong><br>
                <small class="text-muted">${item.chuNhiem}</small>
            </td>
            <td>${item.chuNhiem}</td>
            <td style="text-align: center;">${new Date(item.ngayNop).toLocaleDateString('vi-VN')}</td>
            <td style="text-align: center;">
                <span class="status ${tinhTrangClass}">${item.tinhTrang}</span>
            </td>
            <td style="text-align: center;">
                <button class="btn btn-info btn-sm" onclick="kiemTraChiTiet('${item.maDeTai}')" title="Kiểm tra chi tiết">
                    <i class="fas fa-search"></i>
                </button>
                ${item.tinhTrang === 'Đầy đủ' ? `
                    <button class="btn btn-success btn-sm" onclick="pheDuyetNghiemThu('${item.maDeTai}')" title="Phê duyệt">
                        <i class="fas fa-check"></i>
                    </button>
                ` : ''}
                ${item.tinhTrang === 'Thiếu tài liệu' ? `
                    <button class="btn btn-warning btn-sm" onclick="yeuCauBoSungNghiemThu('${item.maDeTai}')" title="Yêu cầu bổ sung">
                        <i class="fas fa-edit"></i>
                    </button>
                ` : ''}
            </td>
        `;
    });
}

// UC 1.18: Lưu trữ biên bản, bảng điểm và kết quả
function loadLuuTruTable() {
    const tbody = document.getElementById('luuTruTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    luuTruKetQuaData.forEach(item => {
        const row = tbody.insertRow();
        const ketQuaClass = getStatusClass(item.ketQua);
        const trangThaiClass = item.trangThai === 'Đã lưu trữ' ? 'status-hoan-tat' : 'status-da-danh-gia';
        
        row.innerHTML = `
            <td>${item.maDeTai}</td>
            <td style="text-align: left;">
                <strong>${item.tenDeTai}</strong><br>
                <small class="text-muted">${item.chuNhiem}</small>
            </td>
            <td>${item.chuNhiem}</td>
            <td style="text-align: center;">
                <span class="status ${ketQuaClass}">${item.ketQua}</span><br>
                <small>Điểm: ${item.diemTB}/10</small>
            </td>
            <td style="text-align: center;">${new Date(item.ngayNghiemThu).toLocaleDateString('vi-VN')}</td>
            <td style="text-align: center;">
                <button class="btn btn-info btn-sm" onclick="xemTaiLieu('${item.maDeTai}')" title="Xem tài liệu">
                    <i class="fas fa-file-alt"></i>
                </button>
                ${item.trangThai === 'Chờ lưu trữ' ? `
                    <button class="btn btn-success btn-sm" onclick="luuTruKetQua('${item.maDeTai}')" title="Lưu trữ">
                        <i class="fas fa-save"></i>
                    </button>
                ` : `
                    <button class="btn btn-secondary btn-sm" onclick="taiVeKetQua('${item.maDeTai}')" title="Tải về">
                        <i class="fas fa-download"></i>
                    </button>
                `}
            </td>
        `;
    });
}

// Helper functions cho nghiệm thu
function getTinhTrangClass(tinhTrang) {
    switch(tinhTrang) {
        case 'Sắp hết hạn': return 'status-chua-dat';
        case 'Quá hạn': return 'status-can-bo-sung';
        case 'Cần nhắc': return 'status-cho-kiem-tra';
        default: return 'status-da-hoan-thien';
    }
}

function getTinhTrangIcon(tinhTrang) {
    // Removed emoji icons, using only CSS status classes for colors
    return '';
}

// Action functions (mock implementations)
function guiThongBaoNhac(maDeTai) {
    const item = nhacNopNghiemThuData.find(dt => dt.maDeTai === maDeTai);
    if (item) {
        item.lanNhac++;
        showNotification(`Đã gửi thông báo nhắc đến chủ nhiệm đề tài ${maDeTai}`, 'success');
        loadNhacNopTable();
    }
}

function xemLichSuNhac(maDeTai) {
    alert(`Lịch sử nhắc đề tài ${maDeTai}\n- Lần 1: 10/11/2024\n- Lần 2: 15/11/2024`);
}

function lapDanhSachNghiemThu() {
    const selectedItems = [];
    document.querySelectorAll('#danhSachDeTaiNghiemThu input:checked').forEach(checkbox => {
        selectedItems.push(checkbox.id.replace('dt_', ''));
    });
    
    if (selectedItems.length === 0) {
        alert('Vui lòng chọn ít nhất một đề tài!');
        return;
    }
    
    showNotification(`Đã lập danh sách nghiệm thu cho ${selectedItems.length} đề tài`, 'success');
}

function kiemTraChiTiet(maDeTai) {
    const item = kiemTraNghiemThuData.find(dt => dt.maDeTai === maDeTai);
    if (item) {
        alert(`Chi tiết kiểm tra ${maDeTai}:\n${item.ghiChu}`);
    }
}

function pheDuyetNghiemThu(maDeTai) {
    showNotification(`Đã phê duyệt hồ sơ nghiệm thu đề tài ${maDeTai}`, 'success');
}

function yeuCauBoSungNghiemThu(maDeTai) {
    const noiDung = prompt(`Nhập yêu cầu bổ sung cho đề tài ${maDeTai}:`);
    if (noiDung) {
        showNotification(`Đã gửi yêu cầu bổ sung cho đề tài ${maDeTai}`, 'success');
    }
}

function xemTaiLieu(maDeTai) {
    alert(`Xem tài liệu đề tài ${maDeTai}:\n- Biên bản nghiệm thu\n- Bảng điểm chi tiết\n- Kết quả đánh giá`);
}

function luuTruKetQua(maDeTai) {
    const item = luuTruKetQuaData.find(dt => dt.maDeTai === maDeTai);
    if (item) {
        item.trangThai = 'Đã lưu trữ';
        showNotification(`Đã lưu trữ kết quả đề tài ${maDeTai}`, 'success');
        loadLuuTruTable();
    }
}

function taiVeKetQua(maDeTai) {
    showNotification(`Đang tải về kết quả đề tài ${maDeTai}...`, 'info');
}
