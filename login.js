function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");
    const correctUser = "admin";
    const correctPass = "123456";

    if (username === "" || password === "") {
        error.innerText = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }

    if (username === correctUser && password === correctPass) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("user", username);

        alert("Đăng nhập thành công!");
    } else {
        error.innerText = "Sai tài khoản hoặc mật khẩu!";
    }
}
