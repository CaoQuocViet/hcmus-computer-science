// Lớp Business - Xử lý logic nghiệp vụ
const { Lay_Tat_Ca_Nhan_Vien } = require("./data")

// Tính tuổi từ ngày sinh (format: "DD-MM-YYYY")
function Tinh_Tuoi(Ngay_sinh) {
    var Cac_phan = Ngay_sinh.split("-")
    var Nam = parseInt(Cac_phan[2])
    var Thang = parseInt(Cac_phan[1])
    var Ngay = parseInt(Cac_phan[0])
    var Hom_nay = new Date()
    var Tuoi = Hom_nay.getFullYear() - Nam
    if (Hom_nay.getMonth() + 1 < Thang || (Hom_nay.getMonth() + 1 === Thang && Hom_nay.getDate() < Ngay)) {
        Tuoi--
    }
    return Tuoi
}

// Tra cứu nhân viên theo tiêu chí
function Tra_Cuu_Nhan_Vien(Tieu_chi, Gia_tri) {
    var Danh_sach_NV = Lay_Tat_Ca_Nhan_Vien()
    var Gia_tri_lower = Gia_tri.toLowerCase().trim()
    var Ket_qua = []

    for (var NV of Danh_sach_NV) {
        var Phu_hop = false

        if (Tieu_chi === "Ho_ten" && NV.Ho_ten && NV.Ho_ten.toLowerCase().includes(Gia_tri_lower)) {
            Phu_hop = true
        } else if (Tieu_chi === "Tuoi" && Tinh_Tuoi(NV.Ngay_sinh) === parseInt(Gia_tri)) {
            Phu_hop = true
        } else if (Tieu_chi === "Don_vi" && NV.Don_vi) {
            var DV = (NV.Don_vi.Ten || "").toLowerCase()
            var CN = (NV.Don_vi.Chi_nhanh && NV.Don_vi.Chi_nhanh.Ten || "").toLowerCase()
            if (DV.includes(Gia_tri_lower) || CN.includes(Gia_tri_lower)) Phu_hop = true
        }

        if (Phu_hop) {
            // Thêm tuổi vào kết quả
            NV.Tuoi = Tinh_Tuoi(NV.Ngay_sinh)
            Ket_qua.push(NV)
        }
    }
    return Ket_qua
}

module.exports = { Tra_Cuu_Nhan_Vien, Tinh_Tuoi }
