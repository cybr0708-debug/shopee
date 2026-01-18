function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const error = document.getElementById("error");
    const success = document.getElementById("success");
    error.innerText = "";
    success.innerText = "";
    if (username === "" || password === "" || confirmPassword === "") {
        error.innerText = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }
    if (password.length < 6) {
        error.innerText = "Mật khẩu phải từ 6 ký tự trở lên!";
        return;
    }
    if (password !== confirmPassword) {
        error.innerText = "Mật khẩu nhập lại không khớp!";
        return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const isExist = users.some(user => user.username === username);
    if (isExist) {
        error.innerText = "Tên đăng nhập đã tồn tại!";
        return;
    }
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("currentUser", username);

    success.innerText = "Đăng ký thành công! Đang vào trang chủ...";
    setTimeout(() => {
        window.location.href = "home.html";
    }, 1200);
}
