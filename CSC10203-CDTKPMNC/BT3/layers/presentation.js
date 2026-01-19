// Lớp Presentation - Tạo giao diện HTML
const { Lay_Khung_HTML } = require("./data")

// Tạo HTML cho một nhân viên
function Tao_HTML_Nhan_vien(NV) {
    var Ten_DV = NV.Don_vi ? NV.Don_vi.Ten + (NV.Don_vi.Chi_nhanh ? " - " + NV.Don_vi.Chi_nhanh.Ten : "") : "N/A"
    return `<div style="display:flex; background:#fff; margin:10px 0; padding:10px; border-radius:5px; box-shadow:0 1px 3px rgba(0,0,0,0.1)">
        <img src="/Media/${NV.Ma_so}.png" style="width:80px;height:80px;object-fit:cover;border-radius:5px" onerror="this.src='/Media/PET.png'">
        <div style="margin-left:15px">
            <div style="color:blue;font-weight:bold">${NV.Ho_ten}</div>
            <div>Mã: ${NV.Ma_so} | Tuổi: ${NV.Tuoi} | ${NV.Gioi_tinh}</div>
            <div>Đơn vị: ${Ten_DV}</div>
            <div>SĐT: ${NV.Dien_thoai || "N/A"}</div>
        </div>
    </div>`
}

// Tạo HTML form tra cứu
function Tao_Form_Tra_Cuu(Tieu_chi_da_chon, Gia_tri_da_nhap) {
    return `
        <h4>Ứng dụng Tra cứu Nhân viên</h4>
        <form action="/Tra_cuu" method="post">
            <div style="margin:10px 0">
                Tiêu chí: 
                <select name="Th_Tieu_chi" class="form-control" style="width:150px;display:inline-block">
                    <option value="Ho_ten" ${Tieu_chi_da_chon === "Ho_ten" ? "selected" : ""}>Họ tên</option>
                    <option value="Tuoi" ${Tieu_chi_da_chon === "Tuoi" ? "selected" : ""}>Tuổi</option>
                    <option value="Don_vi" ${Tieu_chi_da_chon === "Don_vi" ? "selected" : ""}>Đơn vị</option>
                </select>
            </div>
            <div style="margin:10px 0">
                Giá trị: <input name="Th_Gia_tri" value="${Gia_tri_da_nhap || ""}" class="form-control" style="width:250px;display:inline-block" autocomplete="off" required>
            </div>
            <button type="submit" class="btn btn-primary">Tra cứu</button>
        </form>`
}

// Tạo HTML kết quả tra cứu
function Tao_HTML_Ket_Qua(Ket_qua, Tieu_chi, Gia_tri) {
    var Ten_TC = Tieu_chi === "Ho_ten" ? "Họ tên" : Tieu_chi === "Tuoi" ? "Tuổi" : "Đơn vị"
    var HTML_KQ = Ket_qua.length === 0
        ? `<div class="alert alert-warning">Không tìm thấy!</div>`
        : `<div class="alert alert-success">Tìm thấy ${Ket_qua.length} nhân viên</div>` + Ket_qua.map(Tao_HTML_Nhan_vien).join("")

    return `<hr><h5>Kết quả theo ${Ten_TC}: "${Gia_tri}"</h5>${HTML_KQ}`
}

// Render trang với Khung.html
function Render_Trang(Noi_dung) {
    var Khung = Lay_Khung_HTML()
    return Khung.replace("Chuoi_HTML", Noi_dung)
}

module.exports = { Tao_Form_Tra_Cuu, Tao_HTML_Ket_Qua, Render_Trang }
