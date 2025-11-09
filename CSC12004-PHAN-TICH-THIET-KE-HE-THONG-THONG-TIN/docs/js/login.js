// Mock data và authentication
const users = {
    'nhanvien01': { password: '123456', role: 'nhanvien', name: 'Nhân viên X' },
    'chunhiem01': { password: '123456', role: 'chunhiem', name: 'TS. Nguyễn Văn A' },
    'hoidong01': { password: '123456', role: 'hoidong-khoahoc', name: 'PGS.TS. Trần Văn B' },
    'nghiemthu01': { password: '123456', role: 'hoidong-nghiemthu', name: 'PGS.TS. Phạm Văn D' }
};

function fillDemo(username, password, role) {
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;
    document.getElementById('role').value = role;
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    if (!username || !password || !role) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    const user = users[username];
    if (!user || user.password !== password || user.role !== role) {
        showNotification('Thông tin đăng nhập không chính xác!', 'error');
        return;
    }
    
    // Lưu thông tin người dùng
    sessionStorage.setItem('currentUser', JSON.stringify({
        username: username,
        role: role,
        name: user.name
    }));
    
    // Chuyển hướng theo vai trò
    switch(role) {
        case 'nhanvien':
            window.location.href = 'pages/nhanvien-dashboard.html';
            break;
        case 'chunhiem':
            window.location.href = 'pages/chunhiem-dashboard.html';
            break;
        case 'hoidong-khoahoc':
            window.location.href = 'pages/hoidong-khoahoc-dashboard.html';
            break;
        case 'hoidong-nghiemthu':
            window.location.href = 'pages/hoidong-nghiemthu-dashboard.html';
            break;
    }
});

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
