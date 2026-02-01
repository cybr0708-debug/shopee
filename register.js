function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const error = document.getElementById("error");
    const success = document.getElementById("success");

    // reset message
    error.innerText = "";
    success.innerText = "";

    // check empty
    if (username === "" || password === "" || confirmPassword === "") {
        error.innerText = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }
    if (username.length < 3) {
        error.innerText = "Tên đăng nhập phải từ 3 ký tự trở lên!";
        return;
    }
    // check password length
    if (password.length < 8) {
        error.innerText = "Mật khẩu phải từ 8 ký tự trở lên!";
        return;
    }
    if (!/[A-Z]/.test(password)) {
        error.innerText = "Mật khẩu phải chứa ít nhất một chữ cái viết hoa!";
        return;
    }
    if (!/[0-9]/.test(password)) {
        error.innerText = "Mật khẩu phải chứa ít nhất một chữ số!";
        return;
    }
    // check password match
    if (password !== confirmPassword) {
        error.innerText = "Mật khẩu nhập lại không khớp!";
        return;
    }

    // get users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check duplicate username
    const isExist = users.some(user => user.username === username);
    if (isExist) {
        error.innerText = "Tên đăng nhập đã tồn tại!";
        return;
    }

    // add new user
    users.push({
        username: username,
        password: password
    });

    // save to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // success message
    success.innerText = "Đăng ký thành công! Chuyển sang đăng nhập...";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1200);
}
