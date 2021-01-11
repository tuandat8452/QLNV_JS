// khởi tạo đối tượng từ lớp DanhSachNhanVien
var dsnv = new DanhSachNhanVien();
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}
getLocalStorage();

getEle("btnThem").addEventListener("click", function() {
    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "block";
    getEle("manv").disabled = false;
    getEle("btnDong").click();
});

getEle("btnThemNV").addEventListener("click", function() {
    var maNV = getEle("msnv").value;
    var hoTenNV = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngaySinh = getEle("datepicker").value;
    var chucVuNV = getEle("chucvu").value;

    var isValid = true;

    isValid &=
        validation.kiemTraRong(maNV, "tbMaNV", "(*) Vui lòng nhập mã") &&
        validation.kiemTraDoDaiKiTu(
            maNV,
            "tbMaNV",
            "(*) Vui lòng nhập đầy đủ kí tự!",
            4,
            10
        ) &&
        validation.kiemTraTrungMaNV(maNV, "tbMaNV", "(*) Mã nhân viên đã tồn tại", dsnv.arr);
    isValid &=
        validation.kiemTraRong(hoTenNV, "tbTen", "(*) Vui lòng nhập tên") &&
        validation.kiemTraKiTu(hoTenNV, "tbTen", "(*) Vui lòng nhập đúng kí tự");
    isValid &=
        validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email") &&
        validation.checkEmail(email, "tbEmail", "(*) Email ko hợp lệ");
    isValid &= validation.kiemTraRong(
        matKhau,
        "tbMatKhau",
        "(*) Vui lòng nhập mật khẩu"
    );
    isValid &= validation.kiemTraRong(
        ngaySinh,
        "tbNgay",
        "(*) Vui lòng nhập ngày"
    );
    isValid &= validation.kiemTraChucVu(
        "chucvu",
        "tbChucVu",
        "(*) Vui lòng chọn chức vụ"
    );

    if (!isValid) return;

    // Khởi tạo đối tượng từ lớp NhanVien
    var nhanVien = new NhanVien(
        maNV,
        hoTenNV,
        email,
        matKhau,
        ngaySinh,
        chucVuNV
    );

    // Thêm nhân viên vào DanhSachNhanVien

    dsnv.themNhanVien(nhanVien);
    taoBang(dsnv.arr);

    // Lưu mảng nhân viên xuống LocalStorage
    setLocalStorage();

});

// Hàm tạo bảng
// function taoBang(arr) {
//     getEle("tableDanhSach").innerHTML = "";
//     for (var i = 0; i < arr.length; i++) {
//         // Tạo dòng
//         var tagTR = document.createElement("tr");
//         // Tạo cột
//         var tagTD_MaNV = document.createElement("td");
//         var tagTD_TenNV = document.createElement("td");
//         var tagTD_Email = document.createElement("td");
//         var tagTD_NgaySinh = document.createElement("td");
//         var tagTD_ChucVuNV = document.createElement("td");

//         // Tạo nội dung cho 5 cột
//         tagTD_MaNV.innerHTML = arr[i].manv;
//         tagTD_TenNV.innerHTML = arr[i].tennv;
//         tagTD_Email.innerHTML = arr[i].email;
//         tagTD_NgaySinh.innerHTML = arr[i].date;
//         tagTD_ChucVuNV.innerHTML = arr[i].chucVu;

//         // Gán 5 cột vào dòng
//         tagTR.appendChild(tagTD_MaNV);
//         tagTR.appendChild(tagTD_TenNV);
//         tagTR.appendChild(tagTD_Email);
//         tagTR.appendChild(tagTD_NgaySinh);
//         tagTR.appendChild(tagTD_ChucVuNV);

//         // Gán dòng cho <tbody>
//         getEle("tableDanhSach").appendChild(tagTR);
//     }
// }

function taoBang(arr) {
    var content = "";
    //foreach
    arr.forEach(function(item) {
        content += `
            <tr>
                <td>${item.manv}</td>
                <td>${item.tennv}</td>
                <td>${item.email}</td>
                <td>${item.date}</td>
                <td>${item.chucVu}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNhanVien('${item.manv}')">Edit</button>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${item.manv}')">Delete</button>
                </td>
            </tr>
        `;
    });
    getEle("tableDanhSach").innerHTML = content;
}

function xoaNhanVien(id) {
    dsnv._xoaNhanVien(id);
    taoBang(dsnv.arr);
    setLocalStorage();
}

function suaNhanVien(id) {
    getEle("btnThemNV").style.display = "none";
    getEle("btnCapNhat").style.display = "block";

    var nhanVien = dsnv.layThongTinNhanVien(id);

    // Hiển thị thông tin nhân viên ra từng ô input
    getEle("msnv").value = nhanVien.manv;
    getEle("msnv").disabled = true;
    getEle("name").value = nhanVien.tennv;
    getEle("email").value = nhanVien.email;
    getEle("password").value = nhanVien.matKhau;
    getEle("datepicker").value = nhanVien.date;
    getEle("chucvu").value = nhanVien.chucVu;
}

// Cập nhật thông tin
getEle("btnCapNhat").addEventListener("click", function() {
    // Lấy thông tin tin từ người đã sửa
    var maNV = getEle("msnv").value;
    var hoTenNV = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngaySinh = getEle("datepicker").value;
    var chucVuNV = getEle("chucvu").value;

    var nhanVien = new NhanVien(
        maNV,
        hoTenNV,
        email,
        matKhau,
        ngaySinh,
        chucVuNV
    );
    dsnv.capNhatNhanVien(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();
    getEle("btnDong").click();
});

// Chức năng tìm kiếm
getEle("searchName").addEventListener("keyup", function() {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNhanVien(keyword);
    taoBang(mangTimKiem);
});

// Lưu danh sách nhân viên
// Chuyển từ JSON => string
function setLocalStorage() {
    var arr = JSON.stringify(dsnv.arr);
    localStorage.setItem("DSNV", arr);
}

//Lấy danh sách nhân viên từ localStorage
// Chuyển từ string => JSON
function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        dsnv.arr = JSON.parse(localStorage.getItem("DSNV"));
        taoBang(dsnv.arr);
    }
}