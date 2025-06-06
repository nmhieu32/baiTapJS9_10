class Staff {
    constructor(_account, _name, _email, _password, _dateWork, _salary, _position, _workingTime) {
        this.account = _account;
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.dateWork = _dateWork;
        this.salary = _salary;
        this.position = _position;
        this.workingTime = _workingTime;
        this.totalSalaryStaff = 0;
        this.type = "";
    }
    totalSalary() {
        switch(this.position) {
            case "Sếp":
                this.totalSalaryStaff = this.salary * 3;
                break;
            case "Trưởng phòng":
                this.totalSalaryStaff = this.salary * 2;
                break;
            case "Nhân viên":
                this.totalSalaryStaff = this.salary;
                break;
            default:
                break;
        }
    }

    typeStaff() {
        if(this.workingTime < 160) {
            this.type = "Trung bình";
        } else if (this.workingTime >= 160 && this.workingTime < 176) {
            this.type = "Khá";
        } else if(this.workingTime >= 176 && this.workingTime < 192) {
            this.type = "Giỏi";
        } else {
            this.type = "Xuất sắc";
        }
    }
}

export default Staff;