// Chủ nhiệm đề tài dashboard functionality

document.addEventListener('DOMContentLoaded', function() {
    const user = checkAuth();
    if (user && user.role === 'chunhiem') {
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
        case 'ho-so-cua-toi':
            loadHoSoCuaToi();
            break;
        case 'tien-do-de-tai':
            loadTienDoDeTai();
            break;
        case 'nghiem-thu':
            loadNghiemThuCuaToi();
            break;
    }
}

function loadDashboard() {
    const user = getCurrentUser();
    const hoSoData = getHoSoData();
    
    // Filter projects by current user (mock - in real app would use user ID)
    const myProjects = hoSoData.filter(h => 
        h.nguoiDeXuat === user.name || 
        h.nguoiDeXuat.includes('Nguyễn') // Mock condition for demo
    );
    
    // Update statistics
    document.getElementById('totalDeTai').textContent = myProjects.length;
    document.getElementById('dangThucHien').textContent = myProjects.filter(h => h.trangThai === 'dang-thuc-hien').length;
    document.getElementById('choXuLy').textContent = myProjects.filter(h => 
        ['da-tao', 'cho-kiem-tra', 'can-bo-sung', 'cho-chinh-sua'].includes(h.trangThai)
    ).length;
    document.getElementById('hoanTat').textContent = myProjects.filter(h => h.trangThai === 'hoan-tat').length;
    
    // Load projects table
    const tableBody = document.getElementById('myProjectsTable');
    tableBody.innerHTML = '';
    
    myProjects.forEach(hoSo => {
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.linhVuc}</td>
                <td><span class="status ${hoSo.trangThai}">${getStatusText(hoSo.trangThai)}</span></td>
                <td>${formatDate(hoSo.ngayTao)}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// UC 1.3: Tải lên tài liệu hồ sơ
function loadHoSoCuaToi() {
    const user = getCurrentUser();
    const hoSoData = getHoSoData();
    
    // Filter projects by current user
    const myProjects = hoSoData.filter(h => 
        h.nguoiDeXuat === user.name || 
        h.nguoiDeXuat.includes('Trần') // Mock condition for demo
    );
    
    const tableBody = document.getElementById('hoSoCuaToiTable');
    tableBody.innerHTML = '';
    
    myProjects.forEach(hoSo => {
        let actionButton = '';
        
        if (hoSo.trangThai === 'da-tao') {
            actionButton = `<button class="btn btn-primary" onclick="hoanThienHoSo('${hoSo.id}')">
                <i class="fas fa-upload"></i> Hoàn thiện hồ sơ
            </button>`;
        } else if (hoSo.trangThai === 'dang-chinh-sua') {
            actionButton = `<button class="btn btn-warning" onclick="capNhatHoSo('${hoSo.id}')">
                <i class="fas fa-edit"></i> Cập nhật hồ sơ
            </button>`;
        } else {
            actionButton = `<button class="btn btn-secondary" onclick="xemHoSo('${hoSo.id}')">
                <i class="fas fa-eye"></i> Xem hồ sơ
            </button>`;
        }
        
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td><span class="status ${hoSo.trangThai}">${getStatusText(hoSo.trangThai)}</span></td>
                <td>${formatDate(hoSo.ngayTao)}</td>
                <td>${actionButton}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function hoanThienHoSo(hoSoId) {
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (!hoSo) return;
    
    const documentCategories = [
        { key: 'decuong', name: 'Đề cương nghiên cứu', required: true },
        { key: 'muctieu', name: 'Mục tiêu nghiên cứu', required: true },
        { key: 'thuyetminh', name: 'Thuyết minh đề tài', required: true },
        { key: 'kehoach', name: 'Kế hoạch triển khai', required: true },
        { key: 'thanhvien', name: 'Danh sách thành viên', required: true }
    ];
    
    let content = `
        <h4>Hoàn thiện hồ sơ: ${hoSo.ten}</h4>
        <p class="alert info">
            <i class="fas fa-info-circle"></i>
            Vui lòng tải lên đầy đủ 5 tài liệu bắt buộc để hoàn thiện hồ sơ
        </p>
        
        <form id="hoanThienForm">
    `;
    
    documentCategories.forEach(category => {
        const existingDoc = hoSo.documents ? hoSo.documents.find(d => d.category === category.key) : null;
        
        content += `
            <div class="form-group">
                <label for="${category.key}">
                    ${category.name} ${category.required ? '*' : ''}
                    ${existingDoc ? '<span style="color: green;">✓ Đã tải lên</span>' : ''}
                </label>
                <input type="file" id="${category.key}" name="${category.key}" 
                       accept=".pdf,.doc,.docx" ${category.required ? 'required' : ''}>
                ${existingDoc ? `<small>File hiện tại: ${existingDoc.name}</small>` : ''}
            </div>
        `;
    });
    
    content += `
            <div class="form-group">
                <label for="thanhVienList">Danh sách thành viên tham gia:</label>
                <textarea id="thanhVienList" name="thanhVienList" rows="4" 
                         placeholder="Nhập danh sách thành viên (mỗi người một dòng)...">${hoSo.thanhVien || ''}</textarea>
            </div>
            
            <div style="margin-top: 20px;">
                <button type="button" class="btn btn-primary" onclick="xuLyHoanThienHoSo('${hoSoId}')">
                    <i class="fas fa-upload"></i> Gửi hồ sơ
                </button>
            </div>
        </form>
    `;
    
    document.getElementById('hoanThienContent').innerHTML = content;
    showModal('hoanThienHoSoModal');
}

function xuLyHoanThienHoSo(hoSoId) {
    const form = document.getElementById('hoanThienForm');
    const formData = new FormData(form);
    
    // Validate required files
    const requiredCategories = ['decuong', 'muctieu', 'thuyetminh', 'kehoach', 'thanhvien'];
    const missingFiles = [];
    
    requiredCategories.forEach(category => {
        const fileInput = document.getElementById(category);
        if (!fileInput.files.length) {
            // Check if file already exists
            const hoSoData = getHoSoData();
            const hoSo = hoSoData.find(h => h.id === hoSoId);
            const existingDoc = hoSo.documents ? hoSo.documents.find(d => d.category === category) : null;
            
            if (!existingDoc) {
                missingFiles.push(category);
            }
        }
    });
    
    if (missingFiles.length > 0) {
        showNotification('Vui lòng tải đủ tài liệu bắt buộc!', 'error');
        
        // Highlight missing fields
        missingFiles.forEach(category => {
            document.getElementById(category).parentElement.classList.add('error');
        });
        return;
    }
    
    // Process file uploads (mock)
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (!hoSo.documents) hoSo.documents = [];
    
    requiredCategories.forEach(category => {
        const fileInput = document.getElementById(category);
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            
            // Remove existing document of same category
            hoSo.documents = hoSo.documents.filter(d => d.category !== category);
            
            // Add new document
            hoSo.documents.push({
                name: file.name,
                category: category,
                uploaded: true,
                size: file.size,
                uploadDate: new Date().toISOString()
            });
        }
    });
    
    // Update team members
    hoSo.thanhVien = formData.get('thanhVienList');
    
    // Check if all 5 documents are present
    const docCount = hoSo.documents.length;
    if (docCount >= 5) {
        hoSo.trangThai = 'cho-kiem-tra';
        showNotification('Hồ sơ đã được gửi để kiểm tra!', 'success');
        
        // Simulate sending notification to staff
        setTimeout(() => {
            showNotification('Đã gửi thông báo cho nhân viên', 'info');
        }, 1000);
    } else {
        showNotification('Đã lưu tiến trình tải tài liệu', 'info');
    }
    
    saveHoSoData(hoSoData);
    hideModal('hoanThienHoSoModal');
    loadHoSoCuaToi();
}

// UC 1.8: Cập nhật hồ sơ đã chỉnh sửa
function capNhatHoSo(hoSoId) {
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (!hoSo) return;
    
    let content = `
        <h4>Cập nhật hồ sơ: ${hoSo.ten}</h4>
        
        ${hoSo.yeuCauChinhSua ? `
        <div class="alert warning">
            <i class="fas fa-exclamation-triangle"></i>
            <strong>Yêu cầu chỉnh sửa:</strong><br>
            ${hoSo.yeuCauChinhSua}
        </div>
        ` : ''}
        
        <form id="capNhatForm">
            <div class="form-group">
                <label for="taiLieuDaChinhSua">Tải lên tài liệu đã chỉnh sửa:</label>
                <input type="file" id="taiLieuDaChinhSua" name="taiLieuDaChinhSua" 
                       accept=".pdf,.doc,.docx" multiple required>
                <small>Có thể chọn nhiều file cùng lúc</small>
            </div>
            
            <div class="form-group">
                <label for="ghiChuChinhSua">Ghi chú về việc chỉnh sửa:</label>
                <textarea id="ghiChuChinhSua" name="ghiChuChinhSua" rows="3" 
                         placeholder="Mô tả những thay đổi đã thực hiện..."></textarea>
            </div>
            
            <div style="margin-top: 20px;">
                <button type="button" class="btn btn-primary" onclick="xuLyCapNhatHoSo('${hoSoId}')">
                    <i class="fas fa-paper-plane"></i> Gửi lại
                </button>
            </div>
        </form>
    `;
    
    document.getElementById('capNhatContent').innerHTML = content;
    showModal('capNhatHoSoModal');
}

function xuLyCapNhatHoSo(hoSoId) {
    const fileInput = document.getElementById('taiLieuDaChinhSua');
    const ghiChu = document.getElementById('ghiChuChinhSua').value;
    
    if (fileInput.files.length === 0) {
        showNotification('Vui lòng chọn ít nhất một file!', 'error');
        return;
    }
    
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (hoSo) {
        // Update documents (mock)
        Array.from(fileInput.files).forEach(file => {
            if (!hoSo.documents) hoSo.documents = [];
            
            hoSo.documents.push({
                name: file.name,
                category: 'updated',
                uploaded: true,
                size: file.size,
                uploadDate: new Date().toISOString()
            });
        });
        
        hoSo.ghiChuChinhSua = ghiChu;
        hoSo.trangThai = 'cho-xet-duyet-lai';
        hoSo.ngayCapNhat = new Date().toISOString().split('T')[0];
        
        saveHoSoData(hoSoData);
        
        showNotification('Đã gửi lại hồ sơ đã chỉnh sửa!', 'success');
        hideModal('capNhatHoSoModal');
        loadHoSoCuaToi();
        
        // Simulate sending notification to staff
        setTimeout(() => {
            showNotification('Đã gửi thông báo cho nhân viên', 'info');
        }, 1000);
    }
}

// UC 1.10: Tải dữ liệu định kỳ trên hệ thống
function loadTienDoDeTai() {
    const user = getCurrentUser();
    const hoSoData = getHoSoData();
    
    // Filter projects that are being implemented by current user
    const dangThucHien = hoSoData.filter(h => 
        h.trangThai === 'dang-thuc-hien' && 
        (h.nguoiDeXuat === user.name || h.nguoiDeXuat.includes('Đặng'))
    );
    
    const tableBody = document.getElementById('tienDoTable');
    tableBody.innerHTML = '';
    
    dangThucHien.forEach(hoSo => {
        const progressCount = hoSo.progressReports ? hoSo.progressReports.length : 0;
        const nextReport = progressCount + 1;
        
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressCount * 25}%"></div>
                        </div>
                        <small>${progressCount}/4 kỳ báo cáo</small>
                    </div>
                </td>
                <td>Kỳ ${nextReport <= 4 ? nextReport : 'Hoàn thành'}</td>
                <td>
                    ${nextReport <= 4 ? `
                        <button class="btn btn-primary" onclick="taiBaoCaoTienDo('${hoSo.id}', ${nextReport})">
                            <i class="fas fa-upload"></i> Tải báo cáo kỳ ${nextReport}
                        </button>
                    ` : `
                        <span class="status hoan-tat">Đã hoàn thành</span>
                    `}
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function taiBaoCaoTienDo(hoSoId, ky) {
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (!hoSo) return;
    
    let content = `
        <h4>Báo cáo tiến độ kỳ ${ky}: ${hoSo.ten}</h4>
        
        <form id="baoCaoForm">
            <div class="form-group required">
                <label for="congViecHoanThanh">Các công việc đã hoàn thành:</label>
                <textarea id="congViecHoanThanh" name="congViecHoanThanh" rows="4" required
                         placeholder="Mô tả chi tiết các công việc đã thực hiện..."></textarea>
            </div>
            
            <div class="form-group required">
                <label for="ketQuaDatDuoc">Kết quả đạt được:</label>
                <textarea id="ketQuaDatDuoc" name="ketQuaDatDuoc" rows="3" required
                         placeholder="Liệt kê các kết quả cụ thể đã đạt được..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="khoKhanPhatSinh">Khó khăn phát sinh:</label>
                <textarea id="khoKhanPhatSinh" name="khoKhanPhatSinh" rows="3"
                         placeholder="Mô tả các khó khăn gặp phải (nếu có)..."></textarea>
            </div>
            
            <div class="form-group required">
                <label for="keHoachTiepTheo">Kế hoạch tiếp theo:</label>
                <textarea id="keHoachTiepTheo" name="keHoachTiepTheo" rows="3" required
                         placeholder="Kế hoạch công việc cho kỳ tiếp theo..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="taiLieuBaoCao">Tài liệu báo cáo:</label>
                <input type="file" id="taiLieuBaoCao" name="taiLieuBaoCao" 
                       accept=".pdf,.doc,.docx" multiple>
                <small>Tải lên các tài liệu minh chứng, báo cáo chi tiết</small>
            </div>
            
            <div style="margin-top: 20px;">
                <button type="button" class="btn btn-primary" onclick="guiBaoCaoTienDo('${hoSoId}', ${ky})">
                    <i class="fas fa-paper-plane"></i> Gửi báo cáo
                </button>
            </div>
        </form>
    `;
    
    document.getElementById('baoCaoContent').innerHTML = content;
    showModal('baoCaoTienDoModal');
}

function guiBaoCaoTienDo(hoSoId, ky) {
    const form = document.getElementById('baoCaoForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['congViecHoanThanh', 'ketQuaDatDuoc', 'keHoachTiepTheo'];
    let hasError = false;
    
    requiredFields.forEach(field => {
        const value = formData.get(field);
        if (!value || value.trim() === '') {
            document.getElementById(field).parentElement.classList.add('error');
            hasError = true;
        } else {
            document.getElementById(field).parentElement.classList.remove('error');
        }
    });
    
    if (hasError) {
        showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        return;
    }
    
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (hoSo) {
        if (!hoSo.progressReports) hoSo.progressReports = [];
        
        const baoCao = {
            ky: ky,
            congViecHoanThanh: formData.get('congViecHoanThanh'),
            ketQuaDatDuoc: formData.get('ketQuaDatDuoc'),
            khoKhanPhatSinh: formData.get('khoKhanPhatSinh'),
            keHoachTiepTheo: formData.get('keHoachTiepTheo'),
            trangThai: 'cho-kiem-tra',
            ngayNop: new Date().toISOString().split('T')[0],
            files: []
        };
        
        // Handle file uploads (mock)
        const fileInput = document.getElementById('taiLieuBaoCao');
        Array.from(fileInput.files).forEach(file => {
            baoCao.files.push(file.name);
        });
        
        hoSo.progressReports.push(baoCao);
        saveHoSoData(hoSoData);
        
        showNotification(`Đã gửi báo cáo tiến độ kỳ ${ky} thành công!`, 'success');
        hideModal('baoCaoTienDoModal');
        loadTienDoDeTai();
        
        // Simulate sending notification to staff
        setTimeout(() => {
            showNotification('Đã gửi thông báo cho nhân viên', 'info');
        }, 1000);
    }
}

// UC 1.15: Tải lên hồ sơ nghiệm thu
function loadNghiemThuCuaToi() {
    const user = getCurrentUser();
    const hoSoData = getHoSoData();
    
    // Filter projects that are near completion
    const canNghiemThu = hoSoData.filter(h => 
        h.trangThai === 'dang-thuc-hien' && 
        h.progressReports && 
        h.progressReports.length >= 3 &&
        (h.nguoiDeXuat === user.name || h.nguoiDeXuat.includes('Bùi'))
    );
    
    const tableBody = document.getElementById('nghiemThuTable');
    tableBody.innerHTML = '';
    
    if (canNghiemThu.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Chưa có đề tài nào cần nghiệm thu</td></tr>';
        return;
    }
    
    canNghiemThu.forEach(hoSo => {
        const progressCount = hoSo.progressReports ? hoSo.progressReports.length : 0;
        const hanNghiemThu = new Date();
        hanNghiemThu.setMonth(hanNghiemThu.getMonth() + 1);
        
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressCount * 25}%"></div>
                        </div>
                        <small>${progressCount}/4 kỳ báo cáo</small>
                    </div>
                </td>
                <td>${formatDate(hanNghiemThu)}</td>
                <td>
                    <button class="btn btn-warning" onclick="taiHoSoNghiemThu('${hoSo.id}')">
                        <i class="fas fa-upload"></i> Tải hồ sơ nghiệm thu
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function taiHoSoNghiemThu(hoSoId) {
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (!hoSo) return;
    
    const nghiemThuCategories = [
        { key: 'baocao-tongket', name: 'Báo cáo tổng kết', required: true },
        { key: 'sanpham-nghiencuu', name: 'Sản phẩm nghiên cứu', required: true },
        { key: 'tailieu-minh-chung', name: 'Tài liệu minh chứng', required: true },
        { key: 'bang-danh-gia', name: 'Bảng tự đánh giá', required: true },
        { key: 'tailieu-khac', name: 'Tài liệu khác', required: false }
    ];
    
    let content = `
        <h4>Tải hồ sơ nghiệm thu: ${hoSo.ten}</h4>
        <p class="alert info">
            <i class="fas fa-info-circle"></i>
            Vui lòng tải lên đầy đủ hồ sơ nghiệm thu theo danh mục yêu cầu
        </p>
        
        <form id="nghiemThuForm">
    `;
    
    nghiemThuCategories.forEach(category => {
        const existingDoc = hoSo.nghiemThuDocs ? hoSo.nghiemThuDocs.find(d => d.category === category.key) : null;
        
        content += `
            <div class="form-group ${category.required ? 'required' : ''}">
                <label for="${category.key}">
                    ${category.name} ${category.required ? '*' : ''}
                    ${existingDoc ? '<span style="color: green;">✓ Đã tải lên</span>' : ''}
                </label>
                <input type="file" id="${category.key}" name="${category.key}" 
                       accept=".pdf,.doc,.docx" ${category.required ? 'required' : ''}>
                ${existingDoc ? `<small>File hiện tại: ${existingDoc.name}</small>` : ''}
            </div>
        `;
    });
    
    content += `
            <div class="form-group">
                <label for="tomTatKetQua">Tóm tắt kết quả nghiên cứu:</label>
                <textarea id="tomTatKetQua" name="tomTatKetQua" rows="4" 
                         placeholder="Tóm tắt các kết quả chính đã đạt được...">${hoSo.tomTatKetQua || ''}</textarea>
            </div>
            
            <div style="margin-top: 20px;">
                <button type="button" class="btn btn-primary" onclick="guiHoSoNghiemThu('${hoSoId}')">
                    <i class="fas fa-paper-plane"></i> Gửi hồ sơ nghiệm thu
                </button>
            </div>
        </form>
    `;
    
    document.getElementById('nghiemThuContent').innerHTML = content;
    showModal('nghiemThuModal');
}

function guiHoSoNghiemThu(hoSoId) {
    const form = document.getElementById('nghiemThuForm');
    const formData = new FormData(form);
    
    // Validate required files
    const requiredCategories = ['baocao-tongket', 'sanpham-nghiencuu', 'tailieu-minh-chung', 'bang-danh-gia'];
    const missingFiles = [];
    
    requiredCategories.forEach(category => {
        const fileInput = document.getElementById(category);
        if (!fileInput.files.length) {
            // Check if file already exists
            const hoSoData = getHoSoData();
            const hoSo = hoSoData.find(h => h.id === hoSoId);
            const existingDoc = hoSo.nghiemThuDocs ? hoSo.nghiemThuDocs.find(d => d.category === category) : null;
            
            if (!existingDoc) {
                missingFiles.push(category);
            }
        }
    });
    
    if (missingFiles.length > 0) {
        showNotification('Vui lòng tải đủ tài liệu bắt buộc!', 'error');
        return;
    }
    
    // Process file uploads (mock)
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (!hoSo.nghiemThuDocs) hoSo.nghiemThuDocs = [];
    
    // Process all categories
    ['baocao-tongket', 'sanpham-nghiencuu', 'tailieu-minh-chung', 'bang-danh-gia', 'tailieu-khac'].forEach(category => {
        const fileInput = document.getElementById(category);
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            
            // Remove existing document of same category
            hoSo.nghiemThuDocs = hoSo.nghiemThuDocs.filter(d => d.category !== category);
            
            // Add new document
            hoSo.nghiemThuDocs.push({
                name: file.name,
                category: category,
                uploaded: true,
                size: file.size,
                uploadDate: new Date().toISOString()
            });
        }
    });
    
    hoSo.tomTatKetQua = formData.get('tomTatKetQua');
    hoSo.nghiemThuStatus = 'cho-kiem-tra';
    hoSo.ngayNopNghiemThu = new Date().toISOString().split('T')[0];
    
    saveHoSoData(hoSoData);
    
    showNotification('Đã gửi hồ sơ nghiệm thu thành công!', 'success');
    hideModal('nghiemThuModal');
    loadNghiemThuCuaToi();
    
    // Simulate sending notification to staff
    setTimeout(() => {
        showNotification('Đã gửi thông báo cho nhân viên', 'info');
    }, 1000);
}

function xemHoSo(hoSoId) {
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (hoSo) {
        alert(`Thông tin hồ sơ:\nMã: ${hoSo.id}\nTên: ${hoSo.ten}\nTrạng thái: ${getStatusText(hoSo.trangThai)}\nNgày tạo: ${formatDate(hoSo.ngayTao)}`);
    }
}
