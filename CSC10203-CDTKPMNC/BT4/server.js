// Server chính - Sử dụng Dịch vụ Dữ liệu
const EXPRESS = require("express")
const PATH = require("path")

var Ung_dung = EXPRESS()
Ung_dung.use(EXPRESS.urlencoded({ extended: true }))
Ung_dung.use("/Media", EXPRESS.static(PATH.join(__dirname, "../BT3/Du_lieu_Media/Media")))

const URL_DICH_VU = "http://localhost:3580"

// Tính tuổi
function Tinh_Tuoi(Ngay_sinh) {
    var P = Ngay_sinh.split("-")
    var Tuoi = new Date().getFullYear() - parseInt(P[2])
    if (new Date().getMonth() + 1 < parseInt(P[1])) Tuoi--
    return Tuoi
}

// Tạo HTML nhân viên
function Tao_HTML_NV(NV) {
    var Ten_DV = NV.Don_vi ? NV.Don_vi.Ten + (NV.Don_vi.Chi_nhanh ? " - " + NV.Don_vi.Chi_nhanh.Ten : "") : "N/A"
    return `<div style="display:flex;background:#fff;margin:10px 0;padding:10px;border-radius:5px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
        <img src="/Media/${NV.Ma_so}.png" style="width:80px;height:80px;object-fit:cover;border-radius:5px" onerror="this.src='/Media/PET.png'">
        <div style="margin-left:15px">
            <div style="color:blue;font-weight:bold">${NV.Ho_ten}</div>
            <div>Mã: ${NV.Ma_so} | Tuổi: ${NV.Tuoi} | ${NV.Gioi_tinh}</div>
            <div>Đơn vị: ${Ten_DV}</div>
            <div>SĐT: ${NV.Dien_thoai || "N/A"}</div>
        </div>
    </div>`
}

// Tạo form tra cứu
function Tao_Form(TC, GT) {
    return `<h4>Ứng dụng Tra cứu Nhân viên (Dịch vụ Dữ liệu)</h4>
        <form action="/Tra_cuu" method="post">
            <div style="margin:10px 0">Tiêu chí:
                <select name="Th_Tieu_chi" class="form-control" style="width:150px;display:inline-block">
                    <option value="Ho_ten" ${TC === "Ho_ten" ? "selected" : ""}>Họ tên</option>
                    <option value="Tuoi" ${TC === "Tuoi" ? "selected" : ""}>Tuổi</option>
                    <option value="Don_vi" ${TC === "Don_vi" ? "selected" : ""}>Đơn vị</option>
                </select>
            </div>
            <div style="margin:10px 0">Giá trị: <input name="Th_Gia_tri" value="${GT || ""}" class="form-control" style="width:250px;display:inline-block" required></div>
            <button type="submit" class="btn btn-primary">Tra cứu</button>
        </form>`
}

// Tra cứu nhân viên
function Tra_Cuu(Danh_sach, TC, GT) {
    var GT_lower = GT.toLowerCase().trim()
    var Ket_qua = []
    for (var NV of Danh_sach) {
        var OK = false
        if (TC === "Ho_ten" && NV.Ho_ten && NV.Ho_ten.toLowerCase().includes(GT_lower)) OK = true
        else if (TC === "Tuoi" && Tinh_Tuoi(NV.Ngay_sinh) === parseInt(GT)) OK = true
        else if (TC === "Don_vi" && NV.Don_vi) {
            var DV = (NV.Don_vi.Ten || "").toLowerCase()
            var CN = (NV.Don_vi.Chi_nhanh?.Ten || "").toLowerCase()
            if (DV.includes(GT_lower) || CN.includes(GT_lower)) OK = true
        }
        if (OK) { NV.Tuoi = Tinh_Tuoi(NV.Ngay_sinh); Ket_qua.push(NV) }
    }
    return Ket_qua
}

// Tạo HTML kết quả
function Tao_Ket_Qua(KQ, TC, GT) {
    var Ten_TC = TC === "Ho_ten" ? "Họ tên" : TC === "Tuoi" ? "Tuổi" : "Đơn vị"
    var HTML = KQ.length === 0
        ? `<div class="alert alert-warning">Không tìm thấy!</div>`
        : `<div class="alert alert-success">Tìm thấy ${KQ.length} nhân viên</div>` + KQ.map(Tao_HTML_NV).join("")
    return `<hr><h5>Kết quả theo ${Ten_TC}: "${GT}"</h5>${HTML}`
}

// Route trang chủ
Ung_dung.get("/", async function (req, res) {
    var Khung = await (await fetch(URL_DICH_VU + "/api/khung")).text()
    res.send(Khung.replace("Chuoi_HTML", Tao_Form("", "")))
})

// Route tra cứu
Ung_dung.post("/Tra_cuu", async function (req, res) {
    var TC = req.body.Th_Tieu_chi
    var GT = req.body.Th_Gia_tri

    // Gọi Dịch vụ Dữ liệu
    var Danh_sach = await (await fetch(URL_DICH_VU + "/api/nhanvien")).json()
    var Khung = await (await fetch(URL_DICH_VU + "/api/khung")).text()

    var KQ = Tra_Cuu(Danh_sach, TC, GT)
    var Noi_dung = Tao_Form(TC, GT) + Tao_Ket_Qua(KQ, TC, GT)
    res.send(Khung.replace("Chuoi_HTML", Noi_dung))
})

Ung_dung.listen(3579, () => console.log("Server chạy tại http://localhost:3579"))
