// Nhân viên dashboard functionality

document.addEventListener('DOMContentLoaded', function() {
    const user = checkAuth();
    if (user && user.role === 'nhanvien') {
        document.getElementById('userInfo').textContent = user.name;
        loadDashboard();
    } else {
        window.location.href = '../index.html';
    }
});

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).style.display = 'block';
    
    // Add active class to clicked nav link
    event.target.classList.add('active');
    
    // Load section data
    switch(sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'kiem-tra-hoso':
            loadKiemTraHoSo();
            break;
        case 'gui-xet-duyet':
            loadGuiXetDuyet();
            break;
        case 'xac-nhan-phe-duyet':
            loadXacNhanPheDuyet();
            break;
        case 'quan-ly-tien-do':
            loadQuanLyTienDo();
            break;
        case 'nghiem-thu':
            loadNghiemThu();
            break;
    }
}

function loadDashboard() {
    const hoSoData = getHoSoData();
    
    // Update statistics
    document.getElementById('totalHoSo').textContent = hoSoData.length;
    document.getElementById('choKiemTra').textContent = hoSoData.filter(h => h.trangThai === 'cho-kiem-tra').length;
    document.getElementById('daHoanThien').textContent = hoSoData.filter(h => h.trangThai === 'da-hoan-thien').length;
    document.getElementById('canBoSung').textContent = hoSoData.filter(h => h.trangThai === 'can-bo-sung').length;
    
    // Load recent records
    const recentHoSo = hoSoData.slice(-5).reverse();
    const tableBody = document.getElementById('recentHoSoTable');
    tableBody.innerHTML = '';
    
    recentHoSo.forEach(hoSo => {
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td><span class="status ${hoSo.trangThai}">${getStatusText(hoSo.trangThai)}</span></td>
                <td>${formatDate(hoSo.ngayTao)}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// UC 1.1: Tạo hồ sơ sơ bộ
document.getElementById('taoHoSoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const hoSoData = getHoSoData();
    
    const newHoSo = {
        id: generateId(),
        ten: formData.get('tenDeTai'),
        nguoiDeXuat: formData.get('nguoiDeXuat'),
        linhVuc: formData.get('linhVuc'),
        thoiGianThucHien: formData.get('thoiGianThucHien'),
        moTa: formData.get('moTa'),
        trangThai: 'da-tao',
        ngayTao: new Date().toISOString().split('T')[0],
        documents: []
    };
    
    hoSoData.push(newHoSo);
    saveHoSoData(hoSoData);
    
    showNotification('Tạo hồ sơ sơ bộ thành công!', 'success');
    e.target.reset();
    
    // Simulate sending notification to user
    setTimeout(() => {
        showNotification('Đã gửi thông báo cho người đề xuất', 'info');
    }, 1000);
});

// UC 1.4: Kiểm tra hồ sơ đề tài
function loadKiemTraHoSo() {
    const hoSoData = getHoSoData();
    const choKiemTra = hoSoData.filter(h => h.trangThai === 'cho-kiem-tra');
    
    const tableBody = document.getElementById('kiemTraHoSoTable');
    tableBody.innerHTML = '';
    
    choKiemTra.forEach(hoSo => {
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${formatDate(hoSo.ngayTao)}</td>
                <td>
                    <button class="btn btn-primary" onclick="kiemTraHoSo('${hoSo.id}')">
                        <i class="fas fa-eye"></i> Kiểm tra
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function kiemTraHoSo(hoSoId) {
    const hoSoData = getHoSoData();
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
                    ${doc ? `<span style="color: green;"> ✓ Đã tải lên: ${doc.name}</span>` : '<span style="color: red;"> ✗ Chưa có</span>'}
                </label>
            </div>
        `;
    });
    
    content += `
        </div>
        
        <div class="form-group" style="margin-top: 20px;">
            <label for="yeuCauBoSung">Yêu cầu bổ sung (nếu có):</label>
            <textarea id="yeuCauBoSung" rows="3" placeholder="Nhập nội dung yêu cầu bổ sung..."></textarea>
        </div>
        
        <div style="margin-top: 20px;">
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
        const hoSoData = getHoSoData();
        const hoSo = hoSoData.find(h => h.id === hoSoId);
        
        if (hoSo) {
            hoSo.trangThai = 'da-hoan-thien';
            saveHoSoData(hoSoData);
            
            showNotification('Đã xác nhận hồ sơ hợp lệ!', 'success');
            hideModal('kiemTraModal');
            loadKiemTraHoSo();
            
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
    
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (hoSo) {
        hoSo.trangThai = 'can-bo-sung';
        hoSo.yeuCauBoSung = yeuCau;
        saveHoSoData(hoSoData);
        
        showNotification('Đã gửi yêu cầu bổ sung!', 'success');
        hideModal('kiemTraModal');
        loadKiemTraHoSo();
        
        // Simulate sending notification
        setTimeout(() => {
            showNotification('Đã gửi thông báo tới chủ nhiệm đề tài', 'info');
        }, 1000);
    }
}

// UC 1.5: Gửi xét duyệt
function loadGuiXetDuyet() {
    const hoSoData = getHoSoData();
    const daHoanThien = hoSoData.filter(h => h.trangThai === 'da-hoan-thien');
    
    const tableBody = document.getElementById('guiXetDuyetTable');
    tableBody.innerHTML = '';
    
    daHoanThien.forEach(hoSo => {
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${hoSo.linhVuc}</td>
                <td>
                    <button class="btn btn-primary" onclick="guiXetDuyet('${hoSo.id}')">
                        <i class="fas fa-paper-plane"></i> Gửi xét duyệt
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function guiXetDuyet(hoSoId) {
    const hoidongData = getHoidongData();
    
    let content = `
        <h4>Chọn thành viên Hội đồng khoa học</h4>
        <div class="form-group">
            <label for="hoidongSelect">Hội đồng khoa học:</label>
            <select id="hoidongSelect" class="form-control" multiple size="5">
    `;
    
    hoidongData.forEach(member => {
        content += `<option value="${member.id}">${member.ten} - ${member.chuyenMon}</option>`;
    });
    
    content += `
            </select>
            <small>Giữ Ctrl để chọn nhiều thành viên</small>
        </div>
        
        <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="xacNhanGuiXetDuyet('${hoSoId}')">
                <i class="fas fa-paper-plane"></i> Gửi
            </button>
        </div>
    `;
    
    document.getElementById('guiXetDuyetContent').innerHTML = content;
    showModal('guiXetDuyetModal');
}

function xacNhanGuiXetDuyet(hoSoId) {
    const selectedMembers = Array.from(document.getElementById('hoidongSelect').selectedOptions);
    
    if (selectedMembers.length === 0) {
        showNotification('Vui lòng chọn ít nhất một thành viên hội đồng!', 'error');
        return;
    }
    
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (hoSo) {
        hoSo.trangThai = 'cho-xet-duyet';
        hoSo.hoidongXetDuyet = selectedMembers.map(option => option.value);
        saveHoSoData(hoSoData);
        
        showNotification('Đã gửi hồ sơ xét duyệt!', 'success');
        hideModal('guiXetDuyetModal');
        loadGuiXetDuyet();
        
        // Simulate sending notification to council members
        setTimeout(() => {
            showNotification('Đã gửi thông báo đến các thành viên Hội đồng', 'info');
        }, 1000);
    }
}

// UC 1.2: Xác nhận phê duyệt và triển khai
function loadXacNhanPheDuyet() {
    const hoSoData = getHoSoData();
    const daPheDuyet = hoSoData.filter(h => h.trangThai === 'da-phe-duyet');
    
    const tableBody = document.getElementById('xacNhanPheDuyetTable');
    tableBody.innerHTML = '';
    
    daPheDuyet.forEach(hoSo => {
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${hoSo.linhVuc}</td>
                <td>
                    <button class="btn btn-success" onclick="xacNhanTrienKhai('${hoSo.id}')">
                        <i class="fas fa-check-circle"></i> Xác nhận triển khai
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function xacNhanTrienKhai(hoSoId) {
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    let content = `
        <h4>Xác nhận triển khai đề tài: ${hoSo.ten}</h4>
        
        <div class="form-group">
            <label for="ngayBatDau">Ngày bắt đầu:</label>
            <input type="date" id="ngayBatDau" value="${new Date().toISOString().split('T')[0]}">
        </div>
        
        <div class="form-group">
            <label for="ngayKetThuc">Ngày kết thúc dự kiến:</label>
            <input type="date" id="ngayKetThuc">
        </div>
        
        <div class="form-group">
            <label for="kinhPhi">Kinh phí (VNĐ):</label>
            <input type="number" id="kinhPhi" placeholder="Nhập kinh phí đề tài">
        </div>
        
        <div class="form-group">
            <label for="ghiChuTrienKhai">Ghi chú triển khai:</label>
            <textarea id="ghiChuTrienKhai" rows="3" placeholder="Nhập ghi chú về triển khai đề tài..."></textarea>
        </div>
        
        <div style="margin-top: 20px;">
            <button class="btn btn-success" onclick="hoanTatXacNhanTrienKhai('${hoSoId}')">
                <i class="fas fa-check"></i> Hoàn tất
            </button>
        </div>
    `;
    
    document.getElementById('trienKhaiContent').innerHTML = content;
    showModal('trienKhaiModal');
}

function hoanTatXacNhanTrienKhai(hoSoId) {
    const ngayBatDau = document.getElementById('ngayBatDau').value;
    const ngayKetThuc = document.getElementById('ngayKetThuc').value;
    const kinhPhi = document.getElementById('kinhPhi').value;
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
        const hoSoData = getHoSoData();
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
            
            saveHoSoData(hoSoData);
            
            showNotification('Đã xác nhận triển khai thành công!', 'success');
            hideModal('trienKhaiModal');
            loadXacNhanPheDuyet();
            
            // Simulate creating reminder schedule and sending notification
            setTimeout(() => {
                showNotification('Đã tạo lịch nhắc nhở và gửi email thông báo', 'info');
            }, 1000);
        }
    }
}

// UC quản lý tiến độ
function loadQuanLyTienDo() {
    const hoSoData = getHoSoData();
    const dangThucHien = hoSoData.filter(h => h.trangThai === 'dang-thuc-hien');
    
    const tableBody = document.getElementById('quanLyTienDoTable');
    tableBody.innerHTML = '';
    
    dangThucHien.forEach(hoSo => {
        const progressCount = hoSo.progressReports ? hoSo.progressReports.length : 0;
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressCount * 25}%"></div>
                        </div>
                        <small>${progressCount}/4 kỳ báo cáo</small>
                    </div>
                </td>
                <td>
                    <button class="btn btn-info" onclick="xemTienDo('${hoSo.id}')">
                        <i class="fas fa-eye"></i> Xem tiến độ
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function xemTienDo(hoSoId) {
    // This would show progress details - implementing basic version
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (hoSo) {
        alert(`Tiến độ đề tài: ${hoSo.ten}\nSố kỳ đã báo cáo: ${hoSo.progressReports ? hoSo.progressReports.length : 0}/4`);
    }
}

// UC nghiệm thu
function loadNghiemThu() {
    const hoSoData = getHoSoData();
    // For demo, show projects that would be near completion
    const canNghiemThu = hoSoData.filter(h => 
        h.trangThai === 'dang-thuc-hien' && 
        h.progressReports && 
        h.progressReports.length >= 3
    );
    
    const tableBody = document.getElementById('nghiemThuTable');
    tableBody.innerHTML = '';
    
    if (canNghiemThu.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Chưa có đề tài nào cần nghiệm thu</td></tr>';
        return;
    }
    
    canNghiemThu.forEach(hoSo => {
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td><span class="status dang-thuc-hien">Sắp hoàn thành</span></td>
                <td>
                    <button class="btn btn-warning" onclick="nhacNopNghiemThu('${hoSo.id}')">
                        <i class="fas fa-bell"></i> Nhắc nộp hồ sơ
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function nhacNopNghiemThu(hoSoId) {
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (hoSo) {
        showNotification(`Đã gửi thông báo nhắc nộp hồ sơ nghiệm thu cho đề tài: ${hoSo.ten}`, 'success');
    }
}
