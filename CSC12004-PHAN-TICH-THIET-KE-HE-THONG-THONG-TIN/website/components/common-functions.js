// Common JavaScript Functions for All Dashboards
class DashboardManager {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'dashboard';
        this.init();
    }

    init() {
        this.checkAuth();
        this.setupEventListeners();
        this.showSection('dashboard');
    }

    checkAuth() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.updateUserInfo();
        } else {
            window.location.href = '../index.html';
        }
    }

    updateUserInfo() {
        const userInfoElement = document.getElementById('userInfo');
        if (userInfoElement && this.currentUser) {
            userInfoElement.innerHTML = `
                <i class="fas fa-circle" style="color: #10b981; font-size: 8px;"></i>
                ${this.currentUser.name}
            `;
        }
    }

    showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
            this.currentSection = sectionId;
        }

        // Update active sidebar item
        const sidebarItems = document.querySelectorAll('.nav-link');
        sidebarItems.forEach(item => item.classList.remove('active'));

        const activeItem = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        // Load section data
        this.loadSectionData(sectionId);
    }

    loadSectionData(sectionId) {
        // Override in specific dashboard implementations
        console.log(`Loading data for section: ${sectionId}`);
    }

    setupEventListeners() {
        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
            if (e.target.classList.contains('close')) {
                const modal = e.target.closest('.modal');
                if (modal) modal.style.display = 'none';
            }
        });

        // Form validation
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e.target);
        });

        // Hover effects for buttons
        this.addHoverEffects();
    }

    addHoverEffects() {
        const buttons = document.querySelectorAll('.enhanced-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            });

            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            min-width: 300px;
            max-width: 500px;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            animation: slideInRight 0.3s ease;
        `;

        // Set colors based on type
        const colors = {
            info: { bg: '#dbeafe', color: '#1e40af', border: '#3b82f6' },
            success: { bg: '#d1fae5', color: '#065f46', border: '#10b981' },
            warning: { bg: '#fef3c7', color: '#92400e', border: '#f59e0b' },
            error: { bg: '#fee2e2', color: '#991b1b', border: '#ef4444' }
        };

        const colorScheme = colors[type] || colors.info;
        notification.style.backgroundColor = colorScheme.bg;
        notification.style.color = colorScheme.color;
        notification.style.borderLeft = `4px solid ${colorScheme.border}`;

        document.body.appendChild(notification);

        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
    }

    getNotificationIcon(type) {
        const icons = {
            info: 'info-circle',
            success: 'check-circle',
            warning: 'exclamation-triangle',
            error: 'times-circle'
        };
        return icons[type] || 'info-circle';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }

    formatNumber(number) {
        return new Intl.NumberFormat('vi-VN').format(number);
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ef4444';
                field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                isValid = false;
            } else {
                field.style.borderColor = '#e5e7eb';
                field.style.boxShadow = '';
            }
        });

        return isValid;
    }

    handleFormSubmit(form) {
        if (this.validateForm(form)) {
            // Override in specific implementations
            console.log('Form submitted successfully');
        } else {
            this.showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        }
    }

    exportToExcel(data, filename) {
        // Simple CSV export (can be enhanced with actual Excel library)
        let csvContent = "data:text/csv;charset=utf-8,";
        
        if (data.length > 0) {
            // Add headers
            csvContent += Object.keys(data[0]).join(",") + "\n";
            
            // Add rows
            data.forEach(row => {
                csvContent += Object.values(row).join(",") + "\n";
            });
        }

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    logout() {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            localStorage.removeItem('currentUser');
            window.location.href = '../index.html';
        }
    }
}

// Mock Data Management
class MockDataManager {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        if (!localStorage.getItem('projectsData')) {
            const mockProjects = [
                {
                    id: 'DT2025001',
                    ten: 'Ứng dụng AI trong chẩn đoán y tế',
                    nguoiDeXuat: 'TS. Nguyễn Văn A',
                    donVi: 'Khoa Công nghệ thông tin',
                    linhVuc: 'Công nghệ thông tin',
                    trangThai: 'cho-xet-duyet',
                    ngayTao: '2025-11-03',
                    ngayCapNhat: '2025-11-07',
                    kinhPhi: 800000000,
                    thoiGian: 24,
                    documents: [],
                    progressReports: [],
                    priority: 'high'
                },
                {
                    id: 'DT2025002',
                    ten: 'Nghiên cứu năng lượng tái tạo',
                    nguoiDeXuat: 'PGS. Lê Văn B',
                    donVi: 'Khoa Kỹ thuật',
                    linhVuc: 'Kỹ thuật',
                    trangThai: 'cho-xet-duyet',
                    ngayTao: '2025-11-04',
                    ngayCapNhat: '2025-11-07',
                    kinhPhi: 1200000000,
                    thoiGian: 36,
                    documents: [],
                    progressReports: [],
                    priority: 'medium'
                },
                {
                    id: 'DT2025003',
                    ten: 'Phát triển hệ thống IoT thông minh',
                    nguoiDeXuat: 'TS. Trần Thị C',
                    donVi: 'Khoa Kỹ thuật điện tử',
                    linhVuc: 'Công nghệ thông tin',
                    trangThai: 'da-phe-duyet',
                    ngayTao: '2025-11-05',
                    ngayCapNhat: '2025-11-08',
                    kinhPhi: 500000000,
                    thoiGian: 24,
                    documents: [],
                    progressReports: [],
                    priority: 'low',
                    score: 42
                },
                {
                    id: 'DT2025101',
                    ten: 'Phát triển ứng dụng học tập thông minh',
                    nguoiDeXuat: 'TS. Đặng Văn Nam',
                    donVi: 'Khoa Công nghệ thông tin',
                    linhVuc: 'Công nghệ thông tin',
                    trangThai: 'dang-thuc-hien',
                    ngayTao: '2025-10-15',
                    ngayCapNhat: '2025-11-02',
                    kinhPhi: 600000000,
                    thoiGian: 24,
                    documents: [],
                    progressReports: [
                        { ky: 1, trangThai: 'da-nop', ngayNop: '2025-11-01' }
                    ],
                    priority: 'medium'
                },
                {
                    id: 'DT2025102',
                    ten: 'Nghiên cứu thuật toán tối ưu hóa',
                    nguoiDeXuat: 'TS. Đặng Văn Nam',
                    donVi: 'Khoa Toán - Tin học',
                    linhVuc: 'Toán - Tin học',
                    trangThai: 'dang-thuc-hien',
                    ngayTao: '2025-10-20',
                    ngayCapNhat: '2025-11-05',
                    kinhPhi: 400000000,
                    thoiGian: 18,
                    documents: [],
                    progressReports: [
                        { ky: 1, trangThai: 'da-nop', ngayNop: '2025-11-15' }
                    ],
                    priority: 'high'
                },
                {
                    id: 'DT2025103',
                    ten: 'Ứng dụng IoT trong nông nghiệp',
                    nguoiDeXuat: 'TS. Đặng Văn Nam',
                    donVi: 'Khoa Kỹ thuật',
                    linhVuc: 'Kỹ thuật',
                    trangThai: 'can-bo-sung',
                    ngayTao: '2025-10-25',
                    ngayCapNhat: '2025-11-06',
                    kinhPhi: 750000000,
                    thoiGian: 30,
                    documents: [],
                    progressReports: [],
                    priority: 'medium',
                    yeuCauChinhSua: 'Cần bổ sung chi tiết về phương pháp nghiên cứu và điều chỉnh ngân sách.'
                }
            ];
            
            localStorage.setItem('projectsData', JSON.stringify(mockProjects));
        }

        if (!localStorage.getItem('usersData')) {
            const mockUsers = [
                {
                    username: 'nhanvien1',
                    password: '123456',
                    name: 'Nguyễn Thị Lan',
                    role: 'nhanvien',
                    email: 'nhanvien1@university.edu.vn'
                },
                {
                    username: 'chunhiem1',
                    password: '123456',
                    name: 'TS. Đặng Văn Nam',
                    role: 'chunhiem',
                    email: 'chunhiem1@university.edu.vn'
                },
                {
                    username: 'hoidong1',
                    password: '123456',
                    name: 'PGS.TS. Nguyễn Văn Minh',
                    role: 'hoidong',
                    email: 'hoidong1@university.edu.vn'
                },
                {
                    username: 'nghiemthu1',
                    password: '123456',
                    name: 'TS. Lê Thị Hoa',
                    role: 'nghiemthu',
                    email: 'nghiemthu1@university.edu.vn'
                }
            ];
            
            localStorage.setItem('usersData', JSON.stringify(mockUsers));
        }
    }

    getProjects() {
        return JSON.parse(localStorage.getItem('projectsData') || '[]');
    }

    saveProjects(projects) {
        localStorage.setItem('projectsData', JSON.stringify(projects));
    }

    getUsers() {
        return JSON.parse(localStorage.getItem('usersData') || '[]');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
}

// Global instances
window.dashboardManager = new DashboardManager();
window.mockDataManager = new MockDataManager();

// Global functions for backward compatibility
function showSection(sectionId) {
    window.dashboardManager.showSection(sectionId);
}

function logout() {
    window.dashboardManager.logout();
}

function showModal(modalId) {
    window.dashboardManager.showModal(modalId);
}

function hideModal(modalId) {
    window.dashboardManager.hideModal(modalId);
}

function showNotification(message, type, duration) {
    window.dashboardManager.showNotification(message, type, duration);
}

// Add CSS for notifications
const notificationCSS = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.notification {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
}

.notification-close {
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.7;
    margin-left: 15px;
}

.notification-close:hover {
    opacity: 1;
}
`;

// Inject notification CSS
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);
