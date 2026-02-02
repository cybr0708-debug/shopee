// Kiểm tra login
if(!localStorage.getItem("isLogin") || !localStorage.getItem("user")){
    window.location.href = "index.html";
}

// Thêm sản phẩm vào productsData (nếu muốn lưu lâu thì dùng localStorage)
document.getElementById("addProductForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("newName").value;
    const price = Number(document.getElementById("newPrice").value);
    const stock = Number(document.getElementById("newStock").value);
    const img = document.getElementById("newImg").value || "https://via.placeholder.com/150";

    // Lấy productsData từ localStorage nếu có
    let productsData = JSON.parse(localStorage.getItem("productsData")) || [];

    const newProduct = {
        id: Date.now(),
        name,
        price,
        stock,
        img
    };

    productsData.push(newProduct);
    localStorage.setItem("productsData", JSON.stringify(productsData));

    alert("Thêm sản phẩm thành công 🎉");
    window.location.href = "home.html";
});
// Hiển thị tên user
const usernameEl = document.getElementById("username");
if(usernameEl){
    usernameEl.innerText = localStorage.getItem("user");
}

function logout() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    window.location.href = "index.html";
}
