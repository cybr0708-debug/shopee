// =================== Kiểm tra login ===================
if(!localStorage.getItem("isLogin") || !localStorage.getItem("user")){
    alert("Vui lòng đăng nhập trước khi thêm sản phẩm!");
    window.location.href = "index.html";
}

// Hiển thị tên user
const usernameEl = document.getElementById("username");
if(usernameEl){
    usernameEl.innerText = localStorage.getItem("user");
}

// =================== Logout ===================
function logout(){
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

// =================== Thêm sản phẩm ===================
document.getElementById("addProductForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("newName").value.trim();
    const price = Number(document.getElementById("newPrice").value);
    const stock = Number(document.getElementById("newStock").value);
    const img = document.getElementById("newImg").value.trim() || "https://via.placeholder.com/150";

    if(!name || price <= 0 || stock < 0){
        alert("Vui lòng nhập thông tin hợp lệ!");
        return;
    }

    // Lấy productsData từ localStorage
    let productsData = JSON.parse(localStorage.getItem("productsData")) || [];

    const newProduct = {
        id: Date.now(),
        name,
        price,
        stock,
        img,
        owner: localStorage.getItem("user")  // Lưu tên người tạo

    };

    productsData.push(newProduct);
    localStorage.setItem("productsData", JSON.stringify(productsData));

    alert("Thêm sản phẩm thành công 🎉");
    window.location.href = "home.html"; // Chuyển về home
});
