// npm install express
// Khai báo sử dụng thư viện hàm
const EXPRESS = require("express")
const PATH = require("path")

// Import các lớp
const { Tra_Cuu_Nhan_Vien } = require("./layers/business")
const { Tao_Form_Tra_Cuu, Tao_HTML_Ket_Qua, Render_Trang } = require("./layers/presentation")

// Khai báo và khởi động Ứng dụng
var Ung_dung = EXPRESS()
Ung_dung.use(EXPRESS.urlencoded({ extended: true }))

// Serve ảnh nhân viên từ folder Media
Ung_dung.use("/Media", EXPRESS.static(PATH.join(__dirname, "Du_lieu_Media/Media")))

// Đăng ký các route
Ung_dung.get("/", XL_Khoi_dong)
Ung_dung.post("/Tra_cuu", XL_Tra_cuu)

// Khởi động server
Ung_dung.listen(3579, function () {
    console.log("Server đang chạy tại http://localhost:3579")
})

// Xử lý trang chủ
function XL_Khoi_dong(req, res) {
    var Noi_dung = Tao_Form_Tra_Cuu("", "")
    res.send(Render_Trang(Noi_dung))
}

// Xử lý tra cứu
function XL_Tra_cuu(req, res) {
    var Tieu_chi = req.body.Th_Tieu_chi
    var Gia_tri = req.body.Th_Gia_tri

    // Gọi lớp Business để tra cứu
    var Ket_qua = Tra_Cuu_Nhan_Vien(Tieu_chi, Gia_tri)

    // Gọi lớp Presentation để tạo HTML
    var Noi_dung = Tao_Form_Tra_Cuu(Tieu_chi, Gia_tri) + Tao_HTML_Ket_Qua(Ket_qua, Tieu_chi, Gia_tri)
    res.send(Render_Trang(Noi_dung))
}
