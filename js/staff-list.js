class StaffList {
    constructor() {
        this.arr = [];
    }
    addStaff(staff) {
        this.arr.push(staff);
    }

    findIndex(account) {
        let index = -1;
        for(let i = 0; i < this.arr.length; i++) {
            const staff = this.arr[i];
            if(staff.account === account) {
                index = i;
                break;
            }
        }
        return index;
    }

    removeStaff(account) {
        const index = this.findIndex(account);

        if(index !== -1) {
            this.arr.splice(index, 1);
        }
    }

    getStaff(account) {
        const index = this.findIndex(account);

        if(index !== -1) {
            return this.arr[index];
        }
        return null;
    }

    updateStaff(staff) {
        const index = this.findIndex(staff.account);

        if(index !== -1) {
            this.arr[index] = staff;
        }
    }

    searchStaff(key) {
        let findStaff = [];
        for(let i = 0; i < this.arr.length ; i++) {
            const staff = this.arr[i];
            // Chuyển xếp loại thành chữ thường
            const typeLowerCase = staff.type.toLowerCase();
            // Chuyển key thành viết thường
            const keyLowerCase = key.toLowerCase();

            const index = typeLowerCase.indexOf(keyLowerCase);

            if(index !== -1) {
                findStaff.push(staff);
            }
        }
        return findStaff;
    }

    filterStaff(type) {
        if(type === "all") {
            return this.arr;
        }

        let filter = [];
        for(let i = 0; i < this.arr.length; i++) {
            const staff = this.arr[i];

            if(staff.type === type) {
                filter.push(staff);
            }
        }
        return filter;
    }
}

export default StaffList;