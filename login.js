function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    error.innerText = "";

    if (!username || !password) {
        error.innerText = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }

    // lấy user từ localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("user", username);
        alert("Đăng nhập thành công!");
        window.location.href = "home.html"; // chuyển sang trang home
    } else {
        error.innerText = "Sai tài khoản hoặc mật khẩu!";
    }
}
