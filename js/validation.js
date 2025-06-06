import { getID } from "./../js/main.js";

class Validation {
    checkEmpty(value, idNoti, mes) {

        if (value === "") {

            getID(idNoti).innerHTML = mes;

            getID(idNoti).style.display = "block";

            return false;
        }
        getID(idNoti).innerHTML = "";
        getID(idNoti).style.display = "none";
        return true;
    }

    checkString(value, idNoti, mes) {
        const letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

        if (value.match(letter)) {
            getID(idNoti).innerHTML = "";
            getID(idNoti).style.display = "none";
            return true;
        }
        getID(idNoti).innerHTML = mes;

        getID(idNoti).style.display = "block";

        return false;
    }

    checkNumber(value, idNoti, mes) {
        const letter = /^[0-9]+$/;

        if (value.match(letter)) {
            getID(idNoti).innerHTML = "";
            getID(idNoti).style.display = "none";
            return true;
        }
        getID(idNoti).innerHTML = mes;

        getID(idNoti).style.display = "block";

        return false;
    }

    checkLength(value, idNoti, mes, min, max) {
        if (value.trim().length >= min && value.trim().length <= max) {
            getID(idNoti).innerHTML = "";
            getID(idNoti).style.display = "none";
            return true;
        }
        getID(idNoti).innerHTML = mes;

        getID(idNoti).style.display = "block";

        return false;
    }

    checkEmail(value, idNoti, mes) {
        const letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (value.match(letter)) {
            getID(idNoti).innerHTML = "";
            getID(idNoti).style.display = "none";
            return true;
        }
        getID(idNoti).innerHTML = mes;

        getID(idNoti).style.display = "block";

        return false;
    }

    checkPassword(value, idNoti, mes) {
        const letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

        if (value.match(letter)) {
            getID(idNoti).innerHTML = "";
            getID(idNoti).style.display = "none";
            return true;
        }
        getID(idNoti).innerHTML = mes;

        getID(idNoti).style.display = "block";

        return false;
    }

    checkDate(value, idNoti, mes) {
        const letter = /^(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;

        if (value.match(letter)) {
            getID(idNoti).innerHTML = "";
            getID(idNoti).style.display = "none";
            return true;
        }
        getID(idNoti).innerHTML = mes;

        getID(idNoti).style.display = "block";

        return false;
    }

    checkSalary(value, idNoti, mes, min, max) {
        if (value >= min && value <= max) {
            getID(idNoti).innerHTML = "";
            getID(idNoti).style.display = "none";
            return true;
        }
        getID(idNoti).innerHTML = mes;

        getID(idNoti).style.display = "block";

        return false;
    }

    checkSelect(idSelect, idNoti, mes) {
        if (getID(idSelect).selectedIndex !== 0) {
            getID(idNoti).innerHTML = "";
            getID(idNoti).style.display = "none";
            return true;
        }
        getID(idNoti).innerHTML = mes;

        getID(idNoti).style.display = "block";

        return false;
    }

    checkAccountExist(value, idNoti, mes, arr) {
        let isExist = false;
        for (let i = 0; i < arr.length; i++) {
            const staff = arr[i];
            if (staff.account === value) {
                isExist = true;
                break;
            }
        }

        if (isExist) {
            getID(idNoti).innerHTML = mes;

            getID(idNoti).style.display = "block";

            return false;
        }
        getID(idNoti).innerHTML = "";
        getID(idNoti).style.display = "none";
        return true;
    }
}

export default Validation;