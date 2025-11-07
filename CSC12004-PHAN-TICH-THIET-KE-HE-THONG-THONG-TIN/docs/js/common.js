// Common JavaScript functions
function getCurrentUser() {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function checkAuth() {
    const user = getCurrentUser();
    if (!user) {
        alert('Vui lòng đăng nhập!');
        window.location.href = '../index.html';
        return null;
    }
    return user;
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

function formatDate(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.toLocaleDateString('vi-VN');
}

function generateId() {
    return 'ID' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Mock data for the system
const mockData = {
    hoSo: [
        {
            id: 'HS001',
            ten: 'Ứng dụng AI trong giáo dục',
            nguoiDeXuat: 'Nguyễn Văn X',
            linhVuc: 'Công nghệ thông tin',
            trangThai: 'da-tao',
            ngayTao: '2024-01-15',
            documents: []
        },
        {
            id: 'HS002', 
            ten: 'Nghiên cứu năng lượng tái tạo',
            nguoiDeXuat: 'Trần Thị Y',
            linhVuc: 'Kỹ thuật',
            trangThai: 'cho-kiem-tra',
            ngayTao: '2024-01-10',
            documents: [
                { name: 'De_cuong.pdf', category: 'decuong', uploaded: true },
                { name: 'Muc_tieu.pdf', category: 'muctieu', uploaded: true },
                { name: 'Thuyet_minh.pdf', category: 'thuyetminh', uploaded: true },
                { name: 'Ke_hoach.pdf', category: 'kehoach', uploaded: true },
                { name: 'Danh_sach_thanh_vien.pdf', category: 'thanhvien', uploaded: true }
            ]
        },
        {
            id: 'HS003',
            ten: 'Phát triển hệ thống IoT',
            nguoiDeXuat: 'Lê Văn Z',
            linhVuc: 'Công nghệ thông tin', 
            trangThai: 'da-hoan-thien',
            ngayTao: '2024-01-05',
            documents: [
                { name: 'De_cuong.pdf', category: 'decuong', uploaded: true },
                { name: 'Muc_tieu.pdf', category: 'muctieu', uploaded: true },
                { name: 'Thuyet_minh.pdf', category: 'thuyetminh', uploaded: true },
                { name: 'Ke_hoach.pdf', category: 'kehoach', uploaded: true },
                { name: 'Danh_sach_thanh_vien.pdf', category: 'thanhvien', uploaded: true }
            ]
        },
        {
            id: 'HS004',
            ten: 'Nghiên cứu blockchain trong y tế',
            nguoiDeXuat: 'Phạm Thị A',
            linhVuc: 'Y học',
            trangThai: 'cho-xet-duyet',
            ngayTao: '2024-01-01',
            documents: [
                { name: 'De_cuong.pdf', category: 'decuong', uploaded: true },
                { name: 'Muc_tieu.pdf', category: 'muctieu', uploaded: true },
                { name: 'Thuyet_minh.pdf', category: 'thuyetminh', uploaded: true },
                { name: 'Ke_hoach.pdf', category: 'kehoach', uploaded: true },
                { name: 'Danh_sach_thanh_vien.pdf', category: 'thanhvien', uploaded: true }
            ]
        },
        {
            id: 'HS005',
            ten: 'Phát triển robot phục vụ',
            nguoiDeXuat: 'Hoàng Văn B',
            linhVuc: 'Kỹ thuật cơ khí',
            trangThai: 'da-phe-duyet',
            ngayTao: '2023-12-20',
            documents: []
        },
        {
            id: 'HS006',
            ten: 'Nghiên cứu trí tuệ nhân tạo',
            nguoiDeXuat: 'Đặng Thị C',
            linhVuc: 'Công nghệ thông tin',
            trangThai: 'dang-thuc-hien',
            ngayTao: '2023-12-15',
            progressReports: [
                {
                    ky: 1,
                    trangThai: 'da-nop',
                    ngayNop: '2024-03-15',
                    files: ['bao_cao_ky1.pdf']
                }
            ]
        },
        {
            id: 'HS007',
            ten: 'Ứng dụng machine learning',
            nguoiDeXuat: 'Vũ Văn D',
            linhVuc: 'Công nghệ thông tin',
            trangThai: 'cho-chinh-sua',
            ngayTao: '2023-11-10',
            yeuCauChinhSua: 'Cần bổ sung thêm dữ liệu thực nghiệm và tham khảo'
        },
        {
            id: 'HS008',
            ten: 'Nghiên cứu vật liệu nano',
            nguoiDeXuat: 'Bùi Thị E',
            linhVuc: 'Hóa học',
            trangThai: 'hoan-tat',
            ngayTao: '2023-10-01',
            ketQua: 'Đạt',
            diem: 8.5
        }
    ],
    
    hoidongKhoahoc: [
        { id: 'HD001', ten: 'TS. Nguyễn Văn An', chuyenMon: 'Công nghệ thông tin' },
        { id: 'HD002', ten: 'PGS. Trần Thị Bình', chuyenMon: 'Kỹ thuật' },
        { id: 'HD003', ten: 'GS. Lê Văn Cường', chuyenMon: 'Y học' }
    ],
    
    hoidongNghiemthu: [
        { id: 'NT001', ten: 'PGS.TS Phạm Văn Minh', chuyenMon: 'Công nghệ thông tin' },
        { id: 'NT002', ten: 'TS. Hoàng Thị Lan', chuyenMon: 'Kỹ thuật' },
        { id: 'NT003', ten: 'GS.TS Đặng Văn Nam', chuyenMon: 'Hóa học' }
    ]
};

// Save mock data to localStorage if not exists
function initMockData() {
    if (!localStorage.getItem('hoSoData')) {
        localStorage.setItem('hoSoData', JSON.stringify(mockData.hoSo));
    }
    if (!localStorage.getItem('hoidongData')) {
        localStorage.setItem('hoidongData', JSON.stringify(mockData.hoidongKhoahoc));
    }
    if (!localStorage.getItem('nghiemthuData')) {
        localStorage.setItem('nghiemthuData', JSON.stringify(mockData.hoidongNghiemthu));
    }
}

// Get data from localStorage
function getHoSoData() {
    return JSON.parse(localStorage.getItem('hoSoData') || '[]');
}

function getHoidongData() {
    return JSON.parse(localStorage.getItem('hoidongData') || '[]');
}

function getNghiemthuData() {
    return JSON.parse(localStorage.getItem('nghiemthuData') || '[]');
}

// Save data to localStorage
function saveHoSoData(data) {
    localStorage.setItem('hoSoData', JSON.stringify(data));
}

function saveHoidongData(data) {
    localStorage.setItem('hoidongData', JSON.stringify(data));
}

function saveNghiemthuData(data) {
    localStorage.setItem('nghiemthuData', JSON.stringify(data));
}

// File upload handling
function handleFileUpload(inputElement, category, hoSoId) {
    const files = Array.from(inputElement.files);
    const hoSoData = getHoSoData();
    const hoSo = hoSoData.find(h => h.id === hoSoId);
    
    if (!hoSo) return;
    
    files.forEach(file => {
        if (!hoSo.documents) hoSo.documents = [];
        
        hoSo.documents.push({
            name: file.name,
            category: category,
            uploaded: true,
            size: file.size,
            uploadDate: new Date().toISOString()
        });
    });
    
    saveHoSoData(hoSoData);
    showNotification('Tải tệp thành công!', 'success');
}

// Status mapping
const statusMap = {
    'da-tao': 'Đã tạo',
    'cho-kiem-tra': 'Chờ kiểm tra', 
    'da-hoan-thien': 'Đã hoàn thiện',
    'cho-xet-duyet': 'Chờ xét duyệt',
    'da-phe-duyet': 'Đã phê duyệt',
    'dang-thuc-hien': 'Đang thực hiện',
    'can-bo-sung': 'Cần bổ sung',
    'cho-chinh-sua': 'Chờ chỉnh sửa',
    'dang-chinh-sua': 'Đang chỉnh sửa',
    'hoan-tat': 'Hoàn tất'
};

function getStatusText(status) {
    return statusMap[status] || status;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initMockData();
});
