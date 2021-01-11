function Validation() {
    this.kiemTraRong = function(input, spanId, mess) {
        if (input !== "") {
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        } else {
            getEle(spanId).style.display = "block";
            getEle(spanId).innerHTML = mess;
            return false;
        }
    };
    this.kiemTraChucVu = function(id, spanId, mess) {
        if (getEle(id).selectedIndex !== 0) {
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        } else {
            getEle(spanId).style.display = "block";
            getEle(spanId).innerHTML = mess;
            return false;
        }
    };

    this.kiemTraDoDaiKiTu = function(input, spanId, mess, min, max) {
        if (input.length >= min && input.length <= max) {
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = mess;
        return false;
    };

    this.kiemTraKiTu = function(input, spanId, mess) {
        var pattern = new RegExp(
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );
        if (pattern.test(input)) {
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = mess;
        return false;
    };

    this.checkEmail = function(input, spanId, mess) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (input.match(mailformat)) {
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = mess;
        return false;
    };

    this.kiemTraTrungMaNV = function(input, spanId, mess, arr) {
        var check = true;
        arr.forEach(function(item) {
            if (input === item.manv) {

                check = false;
            }

        });
        if (check) {
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = mess;
        return false;
    };
}