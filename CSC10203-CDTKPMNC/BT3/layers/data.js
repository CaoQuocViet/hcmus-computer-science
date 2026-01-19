// Lớp Data - Truy cập dữ liệu nhân viên
const FS = require("fs")
const PATH = require("path")

// Đường dẫn đến folder dữ liệu
const DUONG_DAN_NHAN_VIEN = PATH.join(__dirname, "../Du_lieu_Media/Du_lieu/Nhan_vien")

// Đọc tất cả dữ liệu nhân viên từ file JSON
function Lay_Tat_Ca_Nhan_Vien() {
    var Danh_sach = []
    var Danh_sach_File = FS.readdirSync(DUONG_DAN_NHAN_VIEN)
    for (var Ten_file of Danh_sach_File) {
        if (Ten_file.endsWith(".json")) {
            var Noi_dung = FS.readFileSync(PATH.join(DUONG_DAN_NHAN_VIEN, Ten_file), "utf8")
            Danh_sach.push(JSON.parse(Noi_dung))
        }
    }
    return Danh_sach
}

// Đọc template HTML
function Lay_Khung_HTML() {
    var Duong_dan = PATH.join(__dirname, "../Du_lieu_Media/Du_lieu/HTML/Khung.html")
    return FS.readFileSync(Duong_dan, "utf8")
}

module.exports = { Lay_Tat_Ca_Nhan_Vien, Lay_Khung_HTML }
