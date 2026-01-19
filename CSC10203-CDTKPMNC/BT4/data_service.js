// Dịch vụ Dữ liệu - REST API cung cấp dữ liệu nhân viên
const EXPRESS = require("express")
const FS = require("fs")
const PATH = require("path")

var Dich_vu = EXPRESS()
const DUONG_DAN_NV = PATH.join(__dirname, "../BT3/Du_lieu_Media/Du_lieu/Nhan_vien")

// API: Lấy tất cả nhân viên
Dich_vu.get("/api/nhanvien", function (req, res) {
    var Danh_sach = []
    var Files = FS.readdirSync(DUONG_DAN_NV)
    for (var f of Files) {
        if (f.endsWith(".json")) {
            Danh_sach.push(JSON.parse(FS.readFileSync(PATH.join(DUONG_DAN_NV, f), "utf8")))
        }
    }
    res.json(Danh_sach)
})

// API: Lấy khung HTML
Dich_vu.get("/api/khung", function (req, res) {
    var Khung = FS.readFileSync(PATH.join(__dirname, "../BT3/Du_lieu_Media/Du_lieu/HTML/Khung.html"), "utf8")
    res.send(Khung)
})

Dich_vu.listen(3580, () => console.log("Dịch vụ Dữ liệu chạy tại http://localhost:3580"))
