// Nhân viên dashboard functionality - Updated for exact UC compliance

// Mock data từ database
let hoSoData = [];
let linhVucData = [];
let nguoiDungData = [];
let hoidongData = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadMockData();
    updateStats();
    loadHoSoTable();
    updateNavigationBadges();
});

// Load mock data from seed files
function loadMockData() {
    // Mock hồ sơ data
    hoSoData = [
        {
            id: 'DT2025001',
            ten: 'Ứng dụng AI trong y tế',
            nguoiDeXuat: 'Nguyễn Văn A',
            linhVuc: 'Công nghệ thông tin',
            trangThai: 'da-tao',
            ngayTao: '2025-01-05',
            ngayBatDau: '2025-01-01',
            ngayKetThuc: '2025-12-31',
            kinhPhi: 50000000,
            moTa: 'Nghiên cứu ứng dụng AI trong chẩn đoán y tế',
            documents: []
        },
        {
            id: 'DT2025002',
            ten: 'Nghiên cứu năng lượng tái tạo',
            nguoiDeXuat: 'Lê Văn C',
            linhVuc: 'Môi trường',
            trangThai: 'cho-kiem-tra',
            ngayTao: '2025-01-01',
            ngayBatDau: '2025-02-01',
            ngayKetThuc: '2026-01-31',
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
            linhVuc: 'Công nghệ thông tin',
            trangThai: 'da-hoan-thien',
            ngayTao: '2025-01-10',
            ngayBatDau: '2025-03-01',
            ngayKetThuc: '2026-02-28',
            kinhPhi: 100000000,
            moTa: 'Xây dựng hệ thống IoT thông minh',
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
    event.target.closest('.nav-link').classList.add('active');
    
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
            loadHoanTatTable();
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
        if (confirm(`Xác nhận tạo hồ sơ:\n\n• Tên đề tài: ${tenDeTai}\n• Người đề xuất: ${nguoiDeXuat}\n• Lĩnh vực: ${linhVuc}\n• Thời gian: ${ngayBatDau} - ${ngayKetThuc}\n\nSau khi tạo:\n• Hệ thống sẽ tạo mã hồ sơ tự động\n• Gửi email thông báo cho người đề xuất\n• Hướng dẫn người đề xuất hoàn thiện hồ sơ`)) {
            
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
            showNotification('Tạo hồ sơ thành công!\n\nMã hồ sơ: ' + newId + '\n📧 Đã gửi email cho: ' + nguoiDeXuat + '\n\nTrạng thái hiện tại: 🟡 Đã tạo', 'success');
            
            // Update display
            updateStats();
            loadHoSoTable();
            updateNavigationBadges();
            
            // Reset form
            document.getElementById('createForm').reset();
            
            // Simulate email notification
            setTimeout(() => {
                showNotification('Đã gửi email thông báo cho người đề xuất', 'info');
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
                    ${doc ? `<span style="color: green;"> • Đã tải lên: ${doc.name}</span>` : '<span style="color: red;"> ✗ Chưa có</span>'}
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

// Other UC functions - placeholder implementations
function loadPheDuyetTable() {
    const tableBody = document.getElementById('pheDuyetTable');
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Chưa có hồ sơ nào được phê duyệt</td></tr>';
}

function loadLichBaoCaoTable() {
    const tableBody = document.getElementById('lichBaoCaoTable');
    tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Chưa có đề tài nào cần báo cáo</td></tr>';
}

function loadKiemTraTienDoTable() {
    const tableBody = document.getElementById('kiemTraTienDoTable');
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Chưa có báo cáo tiến độ nào cần kiểm tra</td></tr>';
}

function loadCapNhatTienDoTable() {
    const tableBody = document.getElementById('capNhatTienDoTable');
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Chưa có tiến độ nào cần cập nhật</td></tr>';
}

function loadTongHopTienDoTable() {
    const container = document.getElementById('danhSachDeTaiTongHop');
    container.innerHTML = '<p>Chưa có đề tài nào để tổng hợp</p>';
}

function loadNhacNopTable() {
    const tableBody = document.getElementById('nhacNopTable');
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Không có đề tài nào đến hạn nộp trong vòng 10 ngày</td></tr>';
}

function loadDanhSachNghiemThuTable() {
    const container = document.getElementById('danhSachDeTaiNghiemThu');
    container.innerHTML = '<p>Chưa có đề tài nào sẵn sàng nghiệm thu</p>';
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

// Initialize default tab
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tabAll')?.classList.add('btn-primary');
});
