// Hội đồng khoa học dashboard functionality

document.addEventListener('DOMContentLoaded', function() {
    const user = checkAuth();
    if (user && user.role === 'hoidong') {
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
        case 'xet-duyet':
            loadXetDuyetDeTai();
            break;
        case 'lich-su-danh-gia':
            loadLichSuDanhGia();
            break;
    }
}

function loadDashboard() {
    const user = getCurrentUser();
    const hoSoData = getHoSoData();
    
    // Get evaluations by current user (mock data)
    const myEvaluations = getMyEvaluations();
    
    // Filter projects waiting for review
    const choXetDuyet = hoSoData.filter(h => h.trangThai === 'cho-xet-duyet');
    const daDanhGia = myEvaluations.length;
    const daPheDuyet = myEvaluations.filter(e => e.quyetDinh === 'phe-duyet').length;
    const yeuCauChinhSua = myEvaluations.filter(e => e.quyetDinh === 'chinh-sua').length;
    
    // Update statistics
    document.getElementById('totalChoXetDuyet').textContent = choXetDuyet.length;
    document.getElementById('daDanhGia').textContent = daDanhGia;
    document.getElementById('daPheDuyet').textContent = daPheDuyet;
    document.getElementById('yeuCauChinhSua').textContent = yeuCauChinhSua;
    
    // Load recent projects
    const tableBody = document.getElementById('recentProjectsTable');
    tableBody.innerHTML = '';
    
    choXetDuyet.slice(0, 5).forEach(hoSo => {
        const evaluation = myEvaluations.find(e => e.hoSoId === hoSo.id);
        const status = evaluation ? 'Đã đánh giá' : 'Chờ đánh giá';
        
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${hoSo.linhVuc}</td>
                <td>${formatDate(hoSo.ngayGuiXetDuyet || hoSo.ngayTao)}</td>
                <td>
                    <span class="status ${evaluation ? 'da-hoan-thien' : 'cho-kiem-tra'}">
                        ${status}
                    </span>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// UC 1.6: Xét Duyệt Đề Tài
function loadXetDuyetDeTai() {
    const hoSoData = getHoSoData();
    const choXetDuyet = hoSoData.filter(h => h.trangThai === 'cho-xet-duyet');
    
    const tableBody = document.getElementById('xetDuyetTable');
    tableBody.innerHTML = '';
    
    if (choXetDuyet.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Không có đề tài nào chờ xét duyệt</td></tr>';
        return;
    }
    
    const myEvaluations = getMyEvaluations();
    
    choXetDuyet.forEach(hoSo => {
        const evaluation = myEvaluations.find(e => e.hoSoId === hoSo.id);
        const actionButton = evaluation ? 
            `<button class="btn btn-secondary" onclick="xemDanhGia('${hoSo.id}')">
                <i class="fas fa-eye"></i> Xem đánh giá
            </button>` :
            `<button class="btn btn-primary" onclick="xetDuyetDeTai('${hoSo.id}')">
                <i class="fas fa-gavel"></i> Xét duyệt
            </button>`;
        
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td>${hoSo.linhVuc}</td>
                <td>${formatDate(hoSo.ngayGuiXetDuyet || hoSo.ngayTao)}</td>
                <td>${actionButton}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function xetDuyetDeTai(hoSoId) {
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (!hoSo) return;
    
    let content = `
        <h4>Thông tin đề tài: ${hoSo.ten}</h4>
        
        <div class="form-container" style="margin-bottom: 20px; background: #f8f9fa; padding: 15px; border-radius: 5px;">
            <p><strong>Mã hồ sơ:</strong> ${hoSo.id}</p>
            <p><strong>Người đề xuất:</strong> ${hoSo.nguoiDeXuat}</p>
            <p><strong>Lĩnh vực:</strong> ${hoSo.linhVuc}</p>
            <p><strong>Thời gian thực hiện:</strong> ${hoSo.thoiGianThucHien} tháng</p>
            ${hoSo.moTa ? `<p><strong>Mô tả:</strong> ${hoSo.moTa}</p>` : ''}
        </div>
        
        <h5>Tài liệu đính kèm:</h5>
        <div style="margin-bottom: 20px;">
    `;
    
    if (hoSo.documents && hoSo.documents.length > 0) {
        hoSo.documents.forEach(doc => {
            content += `
                <div class="file-item">
                    <div class="file-info">
                        <i class="fas fa-file-pdf"></i>
                        <span>${doc.name}</span>
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="xemTaiLieu('${doc.name}')">
                        <i class="fas fa-eye"></i> Xem
                    </button>
                </div>
            `;
        });
    } else {
        content += '<p style="color: #666; font-style: italic;">Không có tài liệu đính kèm</p>';
    }
    
    content += `
        </div>
        
        <form id="xetDuyetForm">
            <div class="form-group">
                <label>Quyết định xét duyệt:</label>
                <div style="margin-top: 10px;">
                    <label style="margin-right: 20px;">
                        <input type="radio" name="quyetDinh" value="phe-duyet" required>
                        <i class="fas fa-check-circle" style="color: green; margin-left: 5px;"></i> Phê duyệt
                    </label>
                    <label>
                        <input type="radio" name="quyetDinh" value="chinh-sua" required>
                        <i class="fas fa-edit" style="color: orange; margin-left: 5px;"></i> Yêu cầu chỉnh sửa
                    </label>
                </div>
            </div>
            
            <div class="form-group" id="chiTietYeuCauGroup" style="display: none;">
                <label for="chiTietYeuCau">Chi tiết yêu cầu chỉnh sửa:</label>
                <textarea id="chiTietYeuCau" name="chiTietYeuCau" rows="4" 
                         placeholder="Mô tả chi tiết những vấn đề cần chỉnh sửa..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="nhanXet">Nhận xét của hội đồng:</label>
                <textarea id="nhanXet" name="nhanXet" rows="3" 
                         placeholder="Nhận xét về đề tài, góp ý và đánh giá..."></textarea>
            </div>
            
            <div style="margin-top: 20px;">
                <button type="button" class="btn btn-primary" onclick="luuDanhGia('${hoSoId}')">
                    <i class="fas fa-save"></i> Lưu đánh giá
                </button>
            </div>
        </form>
    `;
    
    document.getElementById('xetDuyetContent').innerHTML = content;
    
    // Add event listener for radio buttons
    const radioButtons = document.querySelectorAll('input[name="quyetDinh"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            const chiTietGroup = document.getElementById('chiTietYeuCauGroup');
            if (this.value === 'chinh-sua') {
                chiTietGroup.style.display = 'block';
                document.getElementById('chiTietYeuCau').required = true;
            } else {
                chiTietGroup.style.display = 'none';
                document.getElementById('chiTietYeuCau').required = false;
            }
        });
    });
    
    showModal('xetDuyetModal');
}

function xemTaiLieu(fileName) {
    showNotification(`Đang mở tài liệu: ${fileName}`, 'info');
    // In real application, this would open the document viewer
}

function luuDanhGia(hoSoId) {
    const form = document.getElementById('xetDuyetForm');
    const formData = new FormData(form);
    
    const quyetDinh = formData.get('quyetDinh');
    const nhanXet = formData.get('nhanXet');
    const chiTietYeuCau = formData.get('chiTietYeuCau');
    
    if (!quyetDinh) {
        showNotification('Vui lòng chọn quyết định xét duyệt!', 'error');
        return;
    }
    
    if (quyetDinh === 'chinh-sua' && !chiTietYeuCau.trim()) {
        showNotification('Vui lòng nhập chi tiết yêu cầu chỉnh sửa!', 'error');
        return;
    }
    
    const user = getCurrentUser();
    const evaluation = {
        hoSoId: hoSoId,
        userId: user.username,
        userName: user.name,
        quyetDinh: quyetDinh,
        nhanXet: nhanXet,
        chiTietYeuCau: chiTietYeuCau,
        ngayDanhGia: new Date().toISOString().split('T')[0]
    };
    
    // Save evaluation
    const evaluations = getMyEvaluations();
    const existingIndex = evaluations.findIndex(e => e.hoSoId === hoSoId);
    
    if (existingIndex >= 0) {
        evaluations[existingIndex] = evaluation;
    } else {
        evaluations.push(evaluation);
    }
    
    localStorage.setItem('myEvaluations', JSON.stringify(evaluations));
    
    // Check if all council members have evaluated
    checkAllEvaluationsComplete(hoSoId);
    
    showNotification('Đã lưu đánh giá thành công!', 'success');
    hideModal('xetDuyetModal');
    loadXetDuyetDeTai();
}

function checkAllEvaluationsComplete(hoSoId) {
    // Simulate checking all evaluations (in real app, this would check all council members)
    const allEvaluations = getAllEvaluationsForProject(hoSoId);
    const totalMembers = 3; // Mock: assume 3 council members
    
    if (allEvaluations.length >= totalMembers) {
        const hoSoData = getHoSoData();
        const hoSo = hoSoData.find(h => h.id === hoSoId);
        
        if (hoSo) {
            // Check if any evaluation requires modification
            const requiresModification = allEvaluations.some(e => e.quyetDinh === 'chinh-sua');
            
            if (requiresModification) {
                hoSo.trangThai = 'cho-chinh-sua';
                hoSo.yeuCauChinhSua = allEvaluations
                    .filter(e => e.quyetDinh === 'chinh-sua')
                    .map(e => e.chiTietYeuCau)
                    .join('\n\n');
                
                showNotification('Đề tài yêu cầu chỉnh sửa. Đã gửi thông báo cho chủ nhiệm đề tài.', 'warning');
            } else {
                hoSo.trangThai = 'da-phe-duyet';
                showNotification('Đề tài đã được phê duyệt! Đã gửi thông báo cho nhân viên.', 'success');
            }
            
            hoSo.ketQuaXetDuyet = {
                ngayKetThuc: new Date().toISOString().split('T')[0],
                evaluations: allEvaluations
            };
            
            saveHoSoData(hoSoData);
        }
    }
}

function getAllEvaluationsForProject(hoSoId) {
    // Mock function to simulate getting all evaluations for a project
    // In real app, this would query database for all council member evaluations
    const myEvaluations = getMyEvaluations();
    const myEval = myEvaluations.find(e => e.hoSoId === hoSoId);
    
    if (myEval) {
        // Simulate other council member evaluations
        return [
            myEval,
            {
                hoSoId: hoSoId,
                userId: 'hoidong02',
                userName: 'PGS. Trần Thị Bình',
                quyetDinh: 'phe-duyet',
                nhanXet: 'Đề tài có tính khả thi cao',
                ngayDanhGia: new Date().toISOString().split('T')[0]
            },
            {
                hoSoId: hoSoId,
                userId: 'hoidong03',
                userName: 'GS. Lê Văn Cường',
                quyetDinh: myEval.quyetDinh === 'chinh-sua' ? 'chinh-sua' : 'phe-duyet',
                nhanXet: 'Đồng ý với đánh giá của các thành viên khác',
                ngayDanhGia: new Date().toISOString().split('T')[0]
            }
        ];
    }
    
    return [];
}

function getMyEvaluations() {
    const evaluations = localStorage.getItem('myEvaluations');
    return evaluations ? JSON.parse(evaluations) : [];
}

function loadLichSuDanhGia() {
    const evaluations = getMyEvaluations();
    const tableBody = document.getElementById('lichSuTable');
    tableBody.innerHTML = '';
    
    if (evaluations.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Chưa có đánh giá nào</td></tr>';
        return;
    }
    
    const hoSoData = getHoSoData();
    
    evaluations.forEach(evaluation => {
        const hoSo = hoSoData.find(h => h.id === evaluation.hoSoId);
        if (!hoSo) return;
        
        const quyetDinhText = evaluation.quyetDinh === 'phe-duyet' ? 'Phê duyệt' : 'Yêu cầu chỉnh sửa';
        const quyetDinhClass = evaluation.quyetDinh === 'phe-duyet' ? 'da-hoan-thien' : 'can-bo-sung';
        
        const row = `
            <tr>
                <td>${hoSo.id}</td>
                <td>${hoSo.ten}</td>
                <td>${hoSo.nguoiDeXuat}</td>
                <td><span class="status ${quyetDinhClass}">${quyetDinhText}</span></td>
                <td>${formatDate(evaluation.ngayDanhGia)}</td>
                <td>
                    <button class="btn btn-secondary" onclick="xemChiTietDanhGia('${evaluation.hoSoId}')">
                        <i class="fas fa-eye"></i> Xem chi tiết
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function xemDanhGia(hoSoId) {
    xemChiTietDanhGia(hoSoId);
}

function xemChiTietDanhGia(hoSoId) {
    const evaluations = getMyEvaluations();
    const evaluation = evaluations.find(e => e.hoSoId === hoSoId);
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (!evaluation || !hoSo) return;
    
    const quyetDinhText = evaluation.quyetDinh === 'phe-duyet' ? 'Phê duyệt' : 'Yêu cầu chỉnh sửa';
    const quyetDinhIcon = evaluation.quyetDinh === 'phe-duyet' ? 
        '<i class="fas fa-check-circle" style="color: green;"></i>' :
        '<i class="fas fa-edit" style="color: orange;"></i>';
    
    let content = `
        <h4>Chi tiết đánh giá đề tài</h4>
        
        <div class="form-container" style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p><strong>Mã hồ sơ:</strong> ${hoSo.id}</p>
            <p><strong>Tên đề tài:</strong> ${hoSo.ten}</p>
            <p><strong>Người đề xuất:</strong> ${hoSo.nguoiDeXuat}</p>
            <p><strong>Lĩnh vực:</strong> ${hoSo.linhVuc}</p>
        </div>
        
        <div class="form-container" style="background: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #3498db;">
            <p><strong>Người đánh giá:</strong> ${evaluation.userName}</p>
            <p><strong>Ngày đánh giá:</strong> ${formatDate(evaluation.ngayDanhGia)}</p>
            <p><strong>Quyết định:</strong> ${quyetDinhIcon} ${quyetDinhText}</p>
            
            ${evaluation.nhanXet ? `
                <div style="margin-top: 15px;">
                    <strong>Nhận xét:</strong>
                    <p style="background: #f8f9fa; padding: 10px; border-radius: 3px; margin-top: 5px;">${evaluation.nhanXet}</p>
                </div>
            ` : ''}
            
            ${evaluation.chiTietYeuCau ? `
                <div style="margin-top: 15px;">
                    <strong>Yêu cầu chỉnh sửa:</strong>
                    <p style="background: #fff3cd; padding: 10px; border-radius: 3px; margin-top: 5px; border-left: 3px solid #ffc107;">${evaluation.chiTietYeuCau}</p>
                </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('chiTietContent').innerHTML = content;
    showModal('chiTietModal');
}
