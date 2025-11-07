-- ================================================
-- HỆ THỐNG QUẢN LÝ ĐỀ TÀI NGHIÊN CỨU KHOA HỌC
-- Research Project Management System Database Schema
-- ================================================

-- Xóa các bảng nếu đã tồn tại
DROP TABLE IF EXISTS phieu_nhan_xet CASCADE;
DROP TABLE IF EXISTS dot_danh_gia CASCADE;
DROP TABLE IF EXISTS tong_hop_ket_qua CASCADE;
DROP TABLE IF EXISTS thanh_vien_hoi_dong CASCADE;
DROP TABLE IF EXISTS hoi_dong_khoa_hoc CASCADE;
DROP TABLE IF EXISTS tai_lieu_bao_cao CASCADE;
DROP TABLE IF EXISTS bao_cao_tien_do CASCADE;
DROP TABLE IF EXISTS lich_bao_cao CASCADE;
DROP TABLE IF EXISTS tai_lieu_ho_so CASCADE;
DROP TABLE IF EXISTS ho_so_de_tai CASCADE;
DROP TABLE IF EXISTS thong_bao CASCADE;
DROP TABLE IF EXISTS de_xuat CASCADE;
DROP TABLE IF EXISTS thanh_vien_de_tai CASCADE;
DROP TABLE IF EXISTS de_tai CASCADE;
DROP TABLE IF EXISTS trang_thai_de_tai CASCADE;
DROP TABLE IF EXISTS trang_thai_bao_cao CASCADE;
DROP TABLE IF EXISTS linh_vuc CASCADE;
DROP TABLE IF EXISTS nguoi_dung CASCADE;


-- ================================================
-- CÁC BẢNG CƠ BẢN
-- ================================================

-- NGƯỜI DÙNG
CREATE TABLE nguoi_dung (
    ma_nguoi_dung SERIAL PRIMARY KEY,
    ten_dang_nhap VARCHAR(50) UNIQUE NOT NULL,
    mat_khau_hash VARCHAR(255) NOT NULL,
    ho_ten VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    so_dien_thoai VARCHAR(20),
    vai_tro VARCHAR(30) NOT NULL CHECK (vai_tro IN ('quan_tri', 'nhan_vien', 'chu_nhiem', 'thanh_vien_hoi_dong', 'nghien_cuu_vien')),
    don_vi VARCHAR(100),
    chuc_danh VARCHAR(100),
    trang_thai_hoat_dong BOOLEAN DEFAULT TRUE,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LĨNH VỰC
CREATE TABLE linh_vuc (
    ma_linh_vuc SERIAL PRIMARY KEY,
    ma_code VARCHAR(20) UNIQUE NOT NULL,
    ten_linh_vuc VARCHAR(100) NOT NULL,
    mo_ta TEXT,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TRẠNG THÁI BÁO CÁO
CREATE TABLE trang_thai_bao_cao (
    ma_trang_thai SERIAL PRIMARY KEY,
    ma_code VARCHAR(30) UNIQUE NOT NULL,
    ten_trang_thai VARCHAR(100) NOT NULL,
    mo_ta TEXT,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TRẠNG THÁI ĐỀ TÀI
CREATE TABLE trang_thai_de_tai (
    ma_trang_thai SERIAL PRIMARY KEY,
    ma_code VARCHAR(30) UNIQUE NOT NULL,
    ten_trang_thai VARCHAR(100) NOT NULL,
    mo_ta TEXT,
    thu_tu_hien_thi INTEGER,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ĐỀ TÀI
CREATE TABLE de_tai (
    ma_de_tai SERIAL PRIMARY KEY,
    ma_code VARCHAR(50) UNIQUE NOT NULL,
    tieu_de VARCHAR(500) NOT NULL,
    mo_ta TEXT,
    ma_linh_vuc INTEGER REFERENCES linh_vuc(ma_linh_vuc),
    chu_nhiem INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    ma_trang_thai VARCHAR(30) REFERENCES trang_thai_de_tai(ma_code) DEFAULT 'da_tao',
    ngay_bat_dau_du_kien DATE,
    ngay_ket_thuc_du_kien DATE,
    ngay_bat_dau_thuc_te DATE,
    ngay_ket_thuc_thuc_te DATE,
    kinh_phi DECIMAL(15, 2),
    muc_tieu TEXT,
    ket_qua_mong_doi TEXT,
    nguoi_de_xuat INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    nguoi_phe_duyet INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    ngay_phe_duyet TIMESTAMP,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- THÀNH VIÊN ĐỀ TÀI
CREATE TABLE thanh_vien_de_tai (
    ma_thanh_vien SERIAL PRIMARY KEY,
    ma_de_tai INTEGER REFERENCES de_tai(ma_de_tai) ON DELETE CASCADE,
    ma_nguoi_dung INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    vai_tro_trong_de_tai VARCHAR(100) NOT NULL,
    nhiem_vu TEXT,
    ngay_tham_gia DATE DEFAULT CURRENT_DATE,
    ngay_roi_di DATE,
    trang_thai_hoat_dong BOOLEAN DEFAULT TRUE,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ĐỀ XUẤT
CREATE TABLE de_xuat (
    ma_de_xuat SERIAL PRIMARY KEY,
    ma_de_tai INTEGER REFERENCES de_tai(ma_de_tai) ON DELETE CASCADE,
    nguoi_de_xuat INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    loai_de_xuat VARCHAR(50) NOT NULL CHECK (loai_de_xuat IN ('ban_dau', 'chinh_sua', 'bo_sung')),
    tieu_de VARCHAR(500) NOT NULL,
    noi_dung TEXT,
    ngay_nop TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    trang_thai VARCHAR(30) DEFAULT 'da_nop',
    nguoi_xem_xet INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    ngay_xem_xet TIMESTAMP,
    nhan_xet TEXT,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- THÔNG BÁO
CREATE TABLE thong_bao (
    ma_thong_bao SERIAL PRIMARY KEY,
    nguoi_nhan INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    nguoi_gui INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    loai_thong_bao VARCHAR(50) NOT NULL,
    tieu_de VARCHAR(255) NOT NULL,
    noi_dung TEXT NOT NULL,
    loai_doi_tuong_lien_quan VARCHAR(50),
    ma_doi_tuong_lien_quan INTEGER,
    da_doc BOOLEAN DEFAULT FALSE,
    ngay_gui TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_doc TIMESTAMP,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- HỒ SƠ ĐỀ TÀI
-- ================================================

-- HỒ SƠ ĐỀ TÀI
CREATE TABLE ho_so_de_tai (
    ma_ho_so SERIAL PRIMARY KEY,
    ma_de_tai INTEGER REFERENCES de_tai(ma_de_tai) ON DELETE CASCADE,
    loai_ho_so VARCHAR(50) NOT NULL CHECK (loai_ho_so IN ('ban_dau', 'tien_do', 'ket_thuc', 'chinh_sua')),
    phien_ban INTEGER DEFAULT 1,
    trang_thai VARCHAR(30) DEFAULT 'nhap' CHECK (trang_thai IN ('nhap', 'cho_duyet', 'da_duyet', 'tu_choi', 'can_chinh_sua')),
    nguoi_nop INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    ngay_nop TIMESTAMP,
    nguoi_duyet INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    ngay_duyet TIMESTAMP,
    nhan_xet TEXT,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TÀI LIỆU HỒ SƠ
CREATE TABLE tai_lieu_ho_so (
    ma_tai_lieu SERIAL PRIMARY KEY,
    ma_ho_so INTEGER REFERENCES ho_so_de_tai(ma_ho_so) ON DELETE CASCADE,
    danh_muc VARCHAR(100) NOT NULL,
    ten_tai_lieu VARCHAR(255) NOT NULL,
    ten_file VARCHAR(255) NOT NULL,
    duong_dan_file VARCHAR(500) NOT NULL,
    kich_thuoc_file INTEGER,
    loai_file VARCHAR(50),
    bat_buoc BOOLEAN DEFAULT FALSE,
    nguoi_tai_len INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    ngay_tai_len TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mo_ta TEXT
);

-- ================================================
-- BÁO CÁO TIẾN ĐỘ
-- ================================================

-- LỊCH BÁO CÁO
CREATE TABLE lich_bao_cao (
    ma_lich_bao_cao SERIAL PRIMARY KEY,
    ma_de_tai INTEGER REFERENCES de_tai(ma_de_tai) ON DELETE CASCADE,
    so_ky INTEGER NOT NULL,
    ten_ky VARCHAR(100) NOT NULL,
    ngay_bao_cao_du_kien DATE NOT NULL,
    da_gui_nhac_nho BOOLEAN DEFAULT FALSE,
    ngay_gui_nhac_nho TIMESTAMP,
    da_hoan_thanh BOOLEAN DEFAULT FALSE,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BÁO CÁO TIẾN ĐỘ
CREATE TABLE bao_cao_tien_do (
    ma_bao_cao SERIAL PRIMARY KEY,
    ma_lich_bao_cao INTEGER REFERENCES lich_bao_cao(ma_lich_bao_cao) ON DELETE CASCADE,
    ma_de_tai INTEGER REFERENCES de_tai(ma_de_tai) ON DELETE CASCADE,
    ky_bao_cao VARCHAR(100) NOT NULL,
    ngay_bao_cao DATE NOT NULL,
    tom_tat TEXT,
    cong_viec_hoan_thanh TEXT,
    thanh_tuu TEXT,
    kho_khan TEXT,
    ke_hoach_tiep_theo TEXT,
    kinh_phi_su_dung DECIMAL(15, 2),
    ma_trang_thai VARCHAR(30) REFERENCES trang_thai_bao_cao(ma_code) DEFAULT 'cho_nop',
    nguoi_nop INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    ngay_nop TIMESTAMP,
    nguoi_duyet INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    ngay_duyet TIMESTAMP,
    nhan_xet TEXT,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TÀI LIỆU BÁO CÁO
CREATE TABLE tai_lieu_bao_cao (
    ma_tai_lieu SERIAL PRIMARY KEY,
    ma_bao_cao INTEGER REFERENCES bao_cao_tien_do(ma_bao_cao) ON DELETE CASCADE,
    ten_tai_lieu VARCHAR(255) NOT NULL,
    ten_file VARCHAR(255) NOT NULL,
    duong_dan_file VARCHAR(500) NOT NULL,
    kich_thuoc_file INTEGER,
    loai_file VARCHAR(50),
    nguoi_tai_len INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    ngay_tai_len TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mo_ta TEXT
);

-- ================================================
-- HỘI ĐỒNG KHOA HỌC
-- ================================================

-- HỘI ĐỒNG KHOA HỌC
CREATE TABLE hoi_dong_khoa_hoc (
    ma_hoi_dong SERIAL PRIMARY KEY,
    ma_code VARCHAR(50) UNIQUE NOT NULL,
    ten_hoi_dong VARCHAR(200) NOT NULL,
    loai_hoi_dong VARCHAR(50) NOT NULL CHECK (loai_hoi_dong IN ('phe_duyet', 'danh_gia', 'ca_hai')),
    mo_ta TEXT,
    ngay_thanh_lap DATE,
    ngay_giai_tan DATE,
    trang_thai_hoat_dong BOOLEAN DEFAULT TRUE,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- THÀNH VIÊN HỘI ĐỒNG
CREATE TABLE thanh_vien_hoi_dong (
    ma_thanh_vien_hoi_dong SERIAL PRIMARY KEY,
    ma_hoi_dong INTEGER REFERENCES hoi_dong_khoa_hoc(ma_hoi_dong) ON DELETE CASCADE,
    ma_nguoi_dung INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    chuc_vu VARCHAR(50) NOT NULL CHECK (chuc_vu IN ('chu_tich', 'pho_chu_tich', 'thu_ky', 'thanh_vien', 'phan_bien')),
    chuyen_mon VARCHAR(200),
    ngay_tham_gia DATE DEFAULT CURRENT_DATE,
    ngay_roi_di DATE,
    trang_thai_hoat_dong BOOLEAN DEFAULT TRUE,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ĐỢT ĐÁNH GIÁ
CREATE TABLE dot_danh_gia (
    ma_dot_danh_gia SERIAL PRIMARY KEY,
    ma_de_tai INTEGER REFERENCES de_tai(ma_de_tai) ON DELETE CASCADE,
    ma_hoi_dong INTEGER REFERENCES hoi_dong_khoa_hoc(ma_hoi_dong),
    loai_dot VARCHAR(50) NOT NULL CHECK (loai_dot IN ('xet_duyet_ban_dau', 'xet_duyet_chinh_sua', 'danh_gia_ket_thuc')),
    lan_thu INTEGER DEFAULT 1,
    ngay_phan_cong DATE DEFAULT CURRENT_DATE,
    han_danh_gia DATE,
    trang_thai VARCHAR(30) DEFAULT 'cho_xu_ly' CHECK (trang_thai IN ('cho_xu_ly', 'dang_xu_ly', 'hoan_thanh', 'huy')),
    quyet_dinh_chung VARCHAR(30) CHECK (quyet_dinh_chung IN ('phe_duyet', 'tu_choi', 'can_chinh_sua', 'cho_xu_ly')),
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PHIẾU NHẬN XÉT
CREATE TABLE phieu_nhan_xet (
    ma_nhan_xet SERIAL PRIMARY KEY,
    ma_dot_danh_gia INTEGER REFERENCES dot_danh_gia(ma_dot_danh_gia) ON DELETE CASCADE,
    ma_thanh_vien_hoi_dong INTEGER REFERENCES thanh_vien_hoi_dong(ma_thanh_vien_hoi_dong),
    ma_nguoi_danh_gia INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    diem DECIMAL(5, 2),
    diem_manh TEXT,
    diem_yeu TEXT,
    nhan_xet TEXT,
    de_xuat VARCHAR(30) CHECK (de_xuat IN ('phe_duyet', 'tu_choi', 'chinh_sua')),
    ngay_danh_gia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TỔNG HỢP KẾT QUẢ
CREATE TABLE tong_hop_ket_qua (
    ma_tong_hop SERIAL PRIMARY KEY,
    ma_de_tai INTEGER REFERENCES de_tai(ma_de_tai) ON DELETE CASCADE,
    ma_dot_danh_gia INTEGER REFERENCES dot_danh_gia(ma_dot_danh_gia),
    tong_so_danh_gia INTEGER DEFAULT 0,
    diem_trung_binh DECIMAL(5, 2),
    so_phieu_phe_duyet INTEGER DEFAULT 0,
    so_phieu_tu_choi INTEGER DEFAULT 0,
    so_phieu_chinh_sua INTEGER DEFAULT 0,
    quyet_dinh_cuoi_cung VARCHAR(30) CHECK (quyet_dinh_cuoi_cung IN ('phe_duyet', 'tu_choi', 'can_chinh_sua')),
    xep_loai VARCHAR(20) CHECK (xep_loai IN ('xuat_sac', 'tot', 'trung_binh', 'yeu', 'khong_dat')),
    ghi_chu TEXT,
    nguoi_tong_hop INTEGER REFERENCES nguoi_dung(ma_nguoi_dung),
    ngay_tong_hop TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_thong_bao TIMESTAMP,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- CHỈ MỤC TỐI ƯU HÓA
-- ================================================

-- Chỉ mục người dùng
CREATE INDEX idx_nguoi_dung_ten_dang_nhap ON nguoi_dung(ten_dang_nhap);
CREATE INDEX idx_nguoi_dung_email ON nguoi_dung(email);
CREATE INDEX idx_nguoi_dung_vai_tro ON nguoi_dung(vai_tro);

-- Chỉ mục đề tài
CREATE INDEX idx_de_tai_ma_code ON de_tai(ma_code);
CREATE INDEX idx_de_tai_chu_nhiem ON de_tai(chu_nhiem);
CREATE INDEX idx_de_tai_trang_thai ON de_tai(ma_trang_thai);
CREATE INDEX idx_de_tai_linh_vuc ON de_tai(ma_linh_vuc);

-- Chỉ mục thành viên đề tài
CREATE INDEX idx_thanh_vien_de_tai_de_tai ON thanh_vien_de_tai(ma_de_tai);
CREATE INDEX idx_thanh_vien_de_tai_nguoi_dung ON thanh_vien_de_tai(ma_nguoi_dung);

-- Chỉ mục thông báo
CREATE INDEX idx_thong_bao_nguoi_nhan ON thong_bao(nguoi_nhan);
CREATE INDEX idx_thong_bao_da_doc ON thong_bao(da_doc);
CREATE INDEX idx_thong_bao_ngay_gui ON thong_bao(ngay_gui);

-- Chỉ mục hồ sơ
CREATE INDEX idx_ho_so_de_tai_de_tai ON ho_so_de_tai(ma_de_tai);
CREATE INDEX idx_ho_so_de_tai_trang_thai ON ho_so_de_tai(trang_thai);
CREATE INDEX idx_tai_lieu_ho_so_ho_so ON tai_lieu_ho_so(ma_ho_so);

-- Chỉ mục báo cáo tiến độ
CREATE INDEX idx_bao_cao_tien_do_de_tai ON bao_cao_tien_do(ma_de_tai);
CREATE INDEX idx_bao_cao_tien_do_lich ON bao_cao_tien_do(ma_lich_bao_cao);
CREATE INDEX idx_bao_cao_tien_do_trang_thai ON bao_cao_tien_do(ma_trang_thai);
CREATE INDEX idx_lich_bao_cao_de_tai ON lich_bao_cao(ma_de_tai);
CREATE INDEX idx_tai_lieu_bao_cao_bao_cao ON tai_lieu_bao_cao(ma_bao_cao);

-- Chỉ mục hội đồng
CREATE INDEX idx_hoi_dong_ma_code ON hoi_dong_khoa_hoc(ma_code);
CREATE INDEX idx_hoi_dong_loai ON hoi_dong_khoa_hoc(loai_hoi_dong);
CREATE INDEX idx_thanh_vien_hoi_dong_hoi_dong ON thanh_vien_hoi_dong(ma_hoi_dong);
CREATE INDEX idx_thanh_vien_hoi_dong_nguoi_dung ON thanh_vien_hoi_dong(ma_nguoi_dung);

-- Chỉ mục đánh giá
CREATE INDEX idx_dot_danh_gia_de_tai ON dot_danh_gia(ma_de_tai);
CREATE INDEX idx_dot_danh_gia_hoi_dong ON dot_danh_gia(ma_hoi_dong);
CREATE INDEX idx_dot_danh_gia_trang_thai ON dot_danh_gia(trang_thai);
CREATE INDEX idx_phieu_nhan_xet_dot ON phieu_nhan_xet(ma_dot_danh_gia);
CREATE INDEX idx_phieu_nhan_xet_nguoi_danh_gia ON phieu_nhan_xet(ma_nguoi_danh_gia);
CREATE INDEX idx_tong_hop_ket_qua_de_tai ON tong_hop_ket_qua(ma_de_tai);
