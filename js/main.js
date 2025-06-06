import Staff from "./staff.js";
import StaffList from "./staff-list.js";
import Validation from "./validation.js";

// Tạo đối tượng staffList từ lớp đt StaffList
const staffList = new StaffList();
const validation = new Validation();

export const getID = (id) => {
    return document.getElementById(id);
};

/**
 * Render danh sách nhân viên ra giao diện
 */
const renderStaff = (data) => {
    let contentHTMl = "";
    for (let i = 0; i < data.length; i++) {
        const staff = data[i];
        contentHTMl += `
            <tr>
                <td>${i + 1}</td>
                <td>${staff.account}</td>
                <td>${staff.name}</td>
                <td>${staff.email}</td>
                <td>${staff.dateWork}</td>
                <td>${staff.position}</td>
                <td>${staff.totalSalaryStaff}</td>
                <td>${staff.type}</td>
                <td>
                    <button class="btn btn-success" onclick="editStaff('${staff.account}')" data-toggle="modal" data-target="#myModal">Edit</button>
                    <button class="btn btn-danger" onclick="deleteStaff('${staff.account}')">Delete</button>
                </td>
            </tr>
        `;
    }
    getID("tableDanhSach").innerHTML = contentHTMl;
};

/**
 * Ẩn nút cập nhật và thay đổi tiêu đề
 */
getID("btnThem").onclick = () => {
    getID("btnCapNhat").style.display = "none";
    getID("btnThemNV").style.display = "block";

    getID("header-title").innerHTML = "Thêm Nhân viên";
    getID("tknv").disabled = false;

    clearError();
    
    resetForm();
}

/**
 * Hiện nút cập nhật và thay đổi tiêu đề
 */
const editStaff = (account) => {
    getID("btnCapNhat").style.display = "block";
    getID("btnThemNV").style.display = "none";

    getID("header-title").innerHTML = "Sửa Nhân viên";

    clearError();
    // lấy thông tin nhân viên
    const staff = staffList.getStaff(account);

    if (staff) {
        // Dom tới các input và show dữ liệu
        getID("tknv").value = staff.account;
        getID("tknv").disabled = true;
        getID("name").value = staff.name;
        getID("email").value = staff.email;
        getID("password").value = staff.password;
        getID("datepicker").value = staff.dateWork;
        getID("luongCB").value = staff.salary;
        getID("chucvu").value = staff.position;
        getID("gioLam").value = staff.workingTime;
    }

};
window.editStaff = editStaff;

/**
 * Cập nhật nhân viên
 */
getID("btnCapNhat").onclick = () => {
    // Lấy thông tin nhân viên
    const staff = getValue(true);

    if (!staff) return;

    staffList.updateStaff(staff);

    // Render DS NhanVien ra
    renderStaff(staffList.arr);

    // Lưu xuống localStorage
    setLocal(staffList.arr);

    // close modal
    getID("btnDong").click();
}

/**
 * Xoá nhân viên
 */
const deleteStaff = (account) => {

    staffList.removeStaff(account);

    renderStaff(staffList.arr);

    setLocal(staffList.arr);
};
window.deleteStaff = deleteStaff;

/**
 * Reset form
 */
const resetForm = () => {
    getID("formStaff").reset();
}

/**
 * Lấy thông tin nhân viên
 */
const getValue = (isUpdate = false) => {
    //lấy thông tin nhân viên
    const account = getID("tknv").value;
    const name = getID("name").value;
    const email = getID("email").value;
    const password = getID("password").value;
    const dateWork = getID("datepicker").value;
    const salary = getID("luongCB").value;
    const position = getID("chucvu").value;
    const workingTime = getID("gioLam").value;

    let isValid = true;
    
    // Kiểm tra Tài khoản

    if(!isUpdate) {
        isValid &= validation.checkEmpty(account, "tbTKNV", "(*) Vui lòng nhập Tài khoản") && validation.checkNumber(account, "tbTKNV", "(*) Tài khoản phải là số") && validation.checkLength(account, "tbTKNV", "(*) Tài khoản tối đa 4 - 6 ký số", 4, 6) && validation.checkAccountExist(account, "tbTKNV", "(*) Tài khoản đã tồn tại", staffList.arr);
    }
    // Kiểm tra họ tên
    isValid &= validation.checkEmpty(name, "tbTen", "(*) Vui lòng nhập Họ và tên") && validation.checkString(name, "tbTen", "Tên nhân viên phải là chữ");

    // Kiểm tra Email
    isValid &= validation.checkEmpty(email, "tbEmail", "(*) Vui lòng nhập Email") && validation.checkEmail(email, "tbEmail", "(*) Email không đúng định dạng");

    // Kiếm tra Password
    isValid &= validation.checkEmpty(password, "tbMatKhau", "(*) Vui lòng nhập Mật khẩu") && validation.checkPassword(password, "tbMatKhau", "(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt") && validation.checkLength(password, "tbMatKhau", "(*) Mật khẩu từ 6 - 10 ký tự", 6, 10);

    // Kiểm tra Ngày
    isValid &= validation.checkEmpty(dateWork, "tbNgay", "(*) Vui lòng nhập Ngày làm") && validation.checkDate(dateWork, "tbNgay", "(*) Ngày làm không đúng định dạng (mm/dd/yyyy)");

    // Kiểm tra Lương
    isValid &= validation.checkEmpty(salary, "tbLuongCB", "(*) Vui lòng nhập Lương cơ bản") && validation.checkNumber(salary, "tbLuongCB", "(*) Lương cơ bản phải là số") && validation.checkSalary(salary, "tbLuongCB", "(*) Lương cơ bản từ 1.000.000 - 20.000.000", 1000000, 20000000);

    // Kiểm tra giờ làm
    isValid &= validation.checkEmpty(workingTime, "tbGiolam", "(*) Vui lòng nhập Giờ làm") && validation.checkNumber(workingTime, "tbGiolam", "(*) Số giờ làm phải là số") && validation.checkSalary(workingTime, "tbGiolam", "(*) Số giờ làm từ 80 - 200 giờ", 80, 200);

    // Kiểm tra chức vụ
    isValid &= validation.checkSelect("chucvu", "tbChucVu", "(*) Vui lòng chọn chức vụ hợp lệ");

    if (!isValid) return;

    // Tạo đối tượng staff từ lớp đt Staff
    const staff = new Staff(account, name, email, password, dateWork, salary, position, workingTime);

    //Gọi phương thức totalSalary() và typeStaff() 
    staff.totalSalary();
    staff.typeStaff();

    return staff;
};

/**
 * Lưu dữ liệu xuống LocalStorage
 */
const setLocal = (data) => {
    // JSON.stringify chuyển dữ liệu mảng sang chuỗi
    localStorage.setItem("Staff_List", JSON.stringify(data));
};

/**
 * Lấy dữ liệu từ Local Storage
 */
const getLocal = (key) => {
    const dataString = localStorage.getItem(key);

    // Nếu không có dữ liệu trả về
    if (!dataString) return;

    // Chuyển từ chuỗi sang mảng (JSON.parse(data))
    const dataJson = JSON.parse(dataString);
    // gán dữ liệu vào mảng
    staffList.arr = dataJson;

    // render lại giao diện
    renderStaff(staffList.arr);
};
getLocal("Staff_List");

/**
 * Add Staff
 */
getID("btnThemNV").onclick = () => {

    // Lấy thông tin nhân viên
    const staff = getValue(false);

    if (!staff) return;
    // Gọi phương thức addStaff để thêm nhân viên vào danh sách
    staffList.addStaff(staff);

    // Render DS NhanVien ra
    renderStaff(staffList.arr);

    // Lưu xuống localStorage
    setLocal(staffList.arr);

    // close modal
    getID("btnDong").click();

}

/**
 * Tìm nhân viên theo Xếp loại
 */
getID("searchName").addEventListener("keyup", () => {
    const key = getID("searchName").value;

    const findStaff = staffList.searchStaff(key);

    renderStaff(findStaff);
});

/**
 * Xếp loại nhân viên
 * Callback function
 */
getID("filterDanhGia").addEventListener("change", () => {
    const type = getID("filterDanhGia").value;

    const arrFilter = staffList.filterStaff(type);

    renderStaff(arrFilter);
});

// Xoá thông báo lỗi
const clearError = () => {
    const error = document.querySelectorAll(".sp-thongbao");
    error.forEach(span => {
        span.innerHTML = "";
    });
};