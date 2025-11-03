// Hội đồng nghiệm thu dashboard functionality

document.addEventListener('DOMContentLoaded', function() {
    const user = checkAuth();
    if (user && user.role === 'nghiemthu') {
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
        case 'danh-gia-nghiem-thu':
            loadDanhGiaNghiemThu();
            break;
        case 'lich-su-nghiem-thu':
            loadLichSuNghiemThu();
            break;
    }
}

function loadDashboard() {
    const hoSoData = getHoSoData();
    const myEvaluations = getMyNghiemThuEvaluations();
    
    // Filter projects that need acceptance testing (mock data)
    const choNghiemThu = hoSoData.filter(h => 
        h.nghiemThuStatus === 'cho-kiem-tra' || 
        (h.trangThai === 'dang-thuc-hien' && h.progressReports && h.progressReports.length >= 4)
    );
    
    const daNghiemThu = myEvaluations.length;
    const loaiDat = myEvaluations.filter(e => e.ketQua === 'dat').length;
    const khongDat = myEvaluations.filter(e => e.ketQua === 'khong-dat').length;
    
    // Update statistics
    document.getElementById('totalChoNghiemThu').textContent = choNghiemThu.length;
    document.getElementById('daNghiemThu').textContent = daNghiemThu;
    document.getElementById('loaiDat').textContent = loaiDat;
    document.getElementById('khongDat').textContent = khongDat;
    
    // Load recent projects
    const tableBody = document.getElementById('recentNghiemThuTable');
    tableBody.innerHTML = '';
    
    choNghiemThu.slice(0, 5).forEach(hoSo => {
        const evaluation = myEvaluations.find(e => e.hoSoId === hoSo.id);
        const status = evaluation ? 'Đã nghiệm thu' : 'Chờ nghiệm thu';
        const statusClass = evaluation ? 'hoan-tat' : 'cho-kiem-tra';
        
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${hoSo.linhVuc}</td>
                <td>${formatDate(hoSo.ngayNopNghiemThu || hoSo.ngayTao)}</td>
                <td><span class="status ${statusClass}">${status}</span></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// UC 1.17: Đánh giá nghiệm thu
function loadDanhGiaNghiemThu() {
    const hoSoData = getHoSoData();
    const myEvaluations = getMyNghiemThuEvaluations();
    
    // Filter projects that need acceptance testing
    const canNghiemThu = hoSoData.filter(h => 
        h.nghiemThuStatus === 'cho-kiem-tra' || 
        (h.trangThai === 'dang-thuc-hien' && h.progressReports && h.progressReports.length >= 4)
    );
    
    const tableBody = document.getElementById('danhGiaNghiemThuTable');
    tableBody.innerHTML = '';
    
    if (canNghiemThu.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Không có đề tài nào cần nghiệm thu</td></tr>';
        return;
    }
    
    canNghiemThu.forEach(hoSo => {
        const evaluation = myEvaluations.find(e => e.hoSoId === hoSo.id);
        const actionButton = evaluation ? 
            `<button class="btn btn-secondary" onclick="xemKetQuaNghiemThu('${hoSo.id}')">
                <i class="fas fa-eye"></i> Xem kết quả
            </button>` :
            `<button class="btn btn-primary" onclick="danhGiaNghiemThu('${hoSo.id}')">
                <i class="fas fa-clipboard-check"></i> Đánh giá
            </button>`;
        
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${hoSo.linhVuc}</td>
                <td>${formatDate(hoSo.ngayNopNghiemThu || hoSo.ngayTao)}</td>
                <td>${actionButton}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function danhGiaNghiemThu(hoSoId) {
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (!hoSo) return;
    
    let content = `
        <h4>Đánh giá nghiệm thu đề tài: ${hoSo.ten}</h4>
        
        <div class="form-container" style="margin-bottom: 20px; background: #f8f9fa; padding: 15px; border-radius: 5px;">
            <p><strong>Mã đề tài:</strong> ${hoSo.id}</p>
            <p><strong>Chủ nhiệm đề tài:</strong> ${hoSo.nguoiDeXuat}</p>
            <p><strong>Lĩnh vực:</strong> ${hoSo.linhVuc}</p>
            <p><strong>Thời gian thực hiện:</strong> ${hoSo.thoiGianThucHien} tháng</p>
            ${hoSo.tomTatKetQua ? `<p><strong>Tóm tắt kết quả:</strong> ${hoSo.tomTatKetQua}</p>` : ''}
        </div>
        
        <h5>Hồ sơ nghiệm thu:</h5>
        <div style="margin-bottom: 20px;">
    `;
    
    if (hoSo.nghiemThuDocs && hoSo.nghiemThuDocs.length > 0) {
        hoSo.nghiemThuDocs.forEach(doc => {
            content += `
                <div class="file-item">
                    <div class="file-info">
                        <i class="fas fa-file-pdf"></i>
                        <span>${doc.name}</span>
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="xemTaiLieuNghiemThu('${doc.name}')">
                        <i class="fas fa-eye"></i> Xem
                    </button>
                </div>
            `;
        });
    } else {
        content += '<p style="color: #666; font-style: italic;">Chưa có hồ sơ nghiệm thu</p>';
    }
    
    content += `
        </div>
        
        <h5>Báo cáo tiến độ:</h5>
        <div style="margin-bottom: 20px;">
    `;
    
    if (hoSo.progressReports && hoSo.progressReports.length > 0) {
        hoSo.progressReports.forEach((report, index) => {
            content += `
                <div class="file-item">
                    <div class="file-info">
                        <i class="fas fa-chart-line"></i>
                        <span>Báo cáo kỳ ${report.ky || index + 1} - ${formatDate(report.ngayNop)}</span>
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="xemBaoCaoTienDo('${hoSo.id}', ${index})">
                        <i class="fas fa-eye"></i> Xem
                    </button>
                </div>
            `;
        });
    } else {
        content += '<p style="color: #666; font-style: italic;">Chưa có báo cáo tiến độ</p>';
    }
    
    content += `
        </div>
        
        <form id="nghiemThuForm">
            <div class="form-row">
                <div class="form-group required">
                    <label for="diem">Điểm đánh giá (0-10):</label>
                    <input type="number" id="diem" name="diem" min="0" max="10" step="0.1" required>
                </div>
                <div class="form-group required">
                    <label for="xepLoai">Xếp loại:</label>
                    <select id="xepLoai" name="xepLoai" required>
                        <option value="">-- Chọn xếp loại --</option>
                        <option value="xuat-sac">Xuất sắc (9.0 - 10)</option>
                        <option value="gioi">Giỏi (7.0 - 8.9)</option>
                        <option value="kha">Khá (5.5 - 6.9)</option>
                        <option value="trung-binh">Trung bình (4.0 - 5.4)</option>
                        <option value="yeu">Yếu (< 4.0)</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group required">
                <label for="ketQua">Kết quả nghiệm thu:</label>
                <div style="margin-top: 10px;">
                    <label style="margin-right: 20px;">
                        <input type="radio" name="ketQua" value="dat" required>
                        <i class="fas fa-check-circle" style="color: green; margin-left: 5px;"></i> Đạt
                    </label>
                    <label>
                        <input type="radio" name="ketQua" value="khong-dat" required>
                        <i class="fas fa-times-circle" style="color: red; margin-left: 5px;"></i> Không đạt
                    </label>
                </div>
            </div>
            
            <div class="form-group">
                <label for="nhanXetChung">Nhận xét chung:</label>
                <textarea id="nhanXetChung" name="nhanXetChung" rows="4" 
                         placeholder="Nhận xét về kết quả nghiên cứu, chất lượng thực hiện..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="kiemNhien">Kiến nghị:</label>
                <textarea id="kiemNhien" name="kiemNhien" rows="3" 
                         placeholder="Các kiến nghị cho việc ứng dụng, phát triển tiếp theo..."></textarea>
            </div>
            
            <div id="yeuCauBoSungGroup" class="form-group" style="display: none;">
                <label for="yeuCauBoSung">Yêu cầu bổ sung (nếu không đạt):</label>
                <textarea id="yeuCauBoSung" name="yeuCauBoSung" rows="3" 
                         placeholder="Chi tiết các yêu cầu bổ sung, làm rõ..."></textarea>
            </div>
            
            <div style="margin-top: 20px;">
                <button type="button" class="btn btn-primary" onclick="hoanTatDanhGia('${hoSoId}')">
                    <i class="fas fa-save"></i> Hoàn tất đánh giá
                </button>
            </div>
        </form>
    `;
    
    document.getElementById('danhGiaNghiemThuContent').innerHTML = content;
    
    // Add event listeners
    const diemInput = document.getElementById('diem');
    const xepLoaiSelect = document.getElementById('xepLoai');
    const ketQuaRadios = document.querySelectorAll('input[name="ketQua"]');
    const yeuCauBoSungGroup = document.getElementById('yeuCauBoSungGroup');
    
    diemInput.addEventListener('input', function() {
        const diem = parseFloat(this.value);
        if (diem >= 9.0) xepLoaiSelect.value = 'xuat-sac';
        else if (diem >= 7.0) xepLoaiSelect.value = 'gioi';
        else if (diem >= 5.5) xepLoaiSelect.value = 'kha';
        else if (diem >= 4.0) xepLoaiSelect.value = 'trung-binh';
        else xepLoaiSelect.value = 'yeu';
        
        // Auto select result based on score
        const datRadio = document.querySelector('input[name="ketQua"][value="dat"]');
        const khongDatRadio = document.querySelector('input[name="ketQua"][value="khong-dat"]');
        
        if (diem >= 5.0) {
            datRadio.checked = true;
            yeuCauBoSungGroup.style.display = 'none';
        } else {
            khongDatRadio.checked = true;
            yeuCauBoSungGroup.style.display = 'block';
        }
    });
    
    ketQuaRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'khong-dat') {
                yeuCauBoSungGroup.style.display = 'block';
                document.getElementById('yeuCauBoSung').required = true;
            } else {
                yeuCauBoSungGroup.style.display = 'none';
                document.getElementById('yeuCauBoSung').required = false;
            }
        });
    });
    
    showModal('danhGiaNghiemThuModal');
}

function xemTaiLieuNghiemThu(fileName) {
    showNotification(`Đang mở tài liệu nghiệm thu: ${fileName}`, 'info');
    // In real application, this would open the document viewer
}

function xemBaoCaoTienDo(hoSoId, reportIndex) {
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (hoSo && hoSo.progressReports && hoSo.progressReports[reportIndex]) {
        const report = hoSo.progressReports[reportIndex];
        alert(`Báo cáo tiến độ kỳ ${report.ky || reportIndex + 1}\n\nCông việc hoàn thành: ${report.congViecHoanThanh || 'N/A'}\nKết quả đạt được: ${report.ketQuaDatDuoc || 'N/A'}\nKế hoạch tiếp theo: ${report.keHoachTiepTheo || 'N/A'}`);
    }
}

function hoanTatDanhGia(hoSoId) {
    const form = document.getElementById('nghiemThuForm');
    const formData = new FormData(form);
    
    const diem = formData.get('diem');
    const xepLoai = formData.get('xepLoai');
    const ketQua = formData.get('ketQua');
    const nhanXetChung = formData.get('nhanXetChung');
    const kiemNhien = formData.get('kiemNhien');
    const yeuCauBoSung = formData.get('yeuCauBoSung');
    
    // Validate required fields
    if (!diem || !xepLoai || !ketQua) {
        showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        return;
    }
    
    if (ketQua === 'khong-dat' && !yeuCauBoSung.trim()) {
        showNotification('Vui lòng nhập yêu cầu bổ sung khi kết quả không đạt!', 'error');
        return;
    }
    
    const user = getCurrentUser();
    const evaluation = {
        hoSoId: hoSoId,
        userId: user.username,
        userName: user.name,
        diem: parseFloat(diem),
        xepLoai: xepLoai,
        ketQua: ketQua,
        nhanXetChung: nhanXetChung,
        kiemNhien: kiemNhien,
        yeuCauBoSung: yeuCauBoSung,
        ngayDanhGia: new Date().toISOString().split('T')[0]
    };
    
    // Save evaluation
    const evaluations = getMyNghiemThuEvaluations();
    const existingIndex = evaluations.findIndex(e => e.hoSoId === hoSoId);
    
    if (existingIndex >= 0) {
        evaluations[existingIndex] = evaluation;
    } else {
        evaluations.push(evaluation);
    }
    
    localStorage.setItem('myNghiemThuEvaluations', JSON.stringify(evaluations));
    
    // Update project status
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (hoSo) {
        if (ketQua === 'dat') {
            hoSo.trangThai = 'hoan-tat';
            hoSo.ketQua = 'Đạt';
        } else {
            hoSo.ketQua = 'Không đạt';
            hoSo.yeuCauBoSungNghiemThu = yeuCauBoSung;
        }
        
        hoSo.diem = parseFloat(diem);
        hoSo.xepLoai = xepLoai;
        hoSo.nghiemThuKetQua = evaluation;
        hoSo.ngayNghiemThu = new Date().toISOString().split('T')[0];
        
        saveHoSoData(hoSoData);
    }
    
    showNotification('Đã hoàn tất đánh giá nghiệm thu!', 'success');
    hideModal('danhGiaNghiemThuModal');
    loadDanhGiaNghiemThu();
    
    // Simulate sending notification to staff
    setTimeout(() => {
        showNotification('Đã gửi thông báo cho nhân viên', 'info');
    }, 1000);
}

function getMyNghiemThuEvaluations() {
    const evaluations = localStorage.getItem('myNghiemThuEvaluations');
    return evaluations ? JSON.parse(evaluations) : [];
}

function loadLichSuNghiemThu() {
    const evaluations = getMyNghiemThuEvaluations();
    const tableBody = document.getElementById('lichSuNghiemThuTable');
    tableBody.innerHTML = '';
    
    if (evaluations.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Chưa có đánh giá nghiệm thu nào</td></tr>';
        return;
    }
    
    const hoSoData = getHoSoData();
    
    evaluations.forEach(evaluation => {
        const hoSo = hoSoData.find(h => h.id === evaluation.hoSoId);
        if (!hoSo) return;
        
        const ketQuaText = evaluation.ketQua === 'dat' ? 'Đạt' : 'Không đạt';
        const ketQuaClass = evaluation.ketQua === 'dat' ? 'da-hoan-thien' : 'can-bo-sung';
        
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${evaluation.diem.toFixed(1)}</td>
                <td><span class="status ${ketQuaClass}">${ketQuaText}</span></td>
                <td>${formatDate(evaluation.ngayDanhGia)}</td>
                <td>
                    <button class="btn btn-secondary" onclick="xemChiTietNghiemThu('${evaluation.hoSoId}')">
                        <i class="fas fa-eye"></i> Xem chi tiết
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function xemKetQuaNghiemThu(hoSoId) {
    xemChiTietNghiemThu(hoSoId);
}

function xemChiTietNghiemThu(hoSoId) {
    const evaluations = getMyNghiemThuEvaluations();
    const evaluation = evaluations.find(e => e.hoSoId === hoSoId);
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (!evaluation || !hoSo) return;
    
    const ketQuaText = evaluation.ketQua === 'dat' ? 'Đạt' : 'Không đạt';
    const ketQuaIcon = evaluation.ketQua === 'dat' ? 
        '<i class="fas fa-check-circle" style="color: green;"></i>' :
        '<i class="fas fa-times-circle" style="color: red;"></i>';
    
    const xepLoaiMap = {
        'xuat-sac': 'Xuất sắc',
        'gioi': 'Giỏi',
        'kha': 'Khá',
        'trung-binh': 'Trung bình',
        'yeu': 'Yếu'
    };
    
    let content = `
        <h4>Chi tiết đánh giá nghiệm thu</h4>
        
        <div class="form-container" style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p><strong>Mã đề tài:</strong> ${hoSo.id}</p>
            <p><strong>Tên đề tài:</strong> ${hoSo.ten}</p>
            <p><strong>Chủ nhiệm đề tài:</strong> ${hoSo.nguoiDeXuat}</p>
            <p><strong>Lĩnh vực:</strong> ${hoSo.linhVuc}</p>
        </div>
        
        <div class="form-container" style="background: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #3498db;">
            <p><strong>Người đánh giá:</strong> ${evaluation.userName}</p>
            <p><strong>Ngày đánh giá:</strong> ${formatDate(evaluation.ngayDanhGia)}</p>
            <p><strong>Điểm:</strong> <span style="font-size: 18px; font-weight: bold; color: #2c3e50;">${evaluation.diem.toFixed(1)}/10</span></p>
            <p><strong>Xếp loại:</strong> ${xepLoaiMap[evaluation.xepLoai] || evaluation.xepLoai}</p>
            <p><strong>Kết quả:</strong> ${ketQuaIcon} ${ketQuaText}</p>
            
            ${evaluation.nhanXetChung ? `
                <div style="margin-top: 15px;">
                    <strong>Nhận xét chung:</strong>
                    <p style="background: #f8f9fa; padding: 10px; border-radius: 3px; margin-top: 5px;">${evaluation.nhanXetChung}</p>
                </div>
            ` : ''}
            
            ${evaluation.kiemNhien ? `
                <div style="margin-top: 15px;">
                    <strong>Kiến nghị:</strong>
                    <p style="background: #e8f5e8; padding: 10px; border-radius: 3px; margin-top: 5px; border-left: 3px solid #27ae60;">${evaluation.kiemNhien}</p>
                </div>
            ` : ''}
            
            ${evaluation.yeuCauBoSung ? `
                <div style="margin-top: 15px;">
                    <strong>Yêu cầu bổ sung:</strong>
                    <p style="background: #fff3cd; padding: 10px; border-radius: 3px; margin-top: 5px; border-left: 3px solid #ffc107;">${evaluation.yeuCauBoSung}</p>
                </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('chiTietNghiemThuContent').innerHTML = content;
    showModal('chiTietNghiemThuModal');
}
