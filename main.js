// Dữ liệu sản phẩm
const productsData = [
    {id: 1, name: "Tai nghe", price: 250000, img: "https://via.placeholder.com/150"},
    {id: 2, name: "Áo thun", price: 150000, img: "https://via.placeholder.com/150"},
    {id: 3, name: "Balo", price: 300000, img: "https://via.placeholder.com/150"}
];

// Giỏ hàng
let cart = [];

// Hàm kiểm tra login
function isLoggedIn() {
    const isLogin = localStorage.getItem("isLogin");
    const user = localStorage.getItem("user");
    return isLogin && user;
}

// Render danh sách sản phẩm
function renderProducts() {
    const container = document.getElementById("products");
    const searchValue = document.getElementById("search").value.toLowerCase();
    container.innerHTML = "";

    productsData
        .filter(p => p.name.toLowerCase().includes(searchValue))
        .forEach(p => {
            const div = document.createElement("div");
            div.classList.add("product");
            div.innerHTML = `
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>${p.price.toLocaleString()} đ</p>
                <button onclick="addToCart(${p.id})">Thêm vào giỏ</button>
            `;
            container.appendChild(div);
        });
}

// Thêm sản phẩm vào giỏ
function addToCart(id) {
    if (!isLoggedIn()) {
        alert("Vui lòng đăng nhập để mua hàng!");
        window.location.href = "index.html";
        return;
    }

    const product = productsData.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({...product, qty: 1});
    }
    updateCart();
}

// Xóa sản phẩm khỏi giỏ
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Cập nhật giỏ hàng
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const totalPrice = document.getElementById("totalPrice");

    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span>${item.name} x${item.qty}</span>
            <span>${(item.price * item.qty).toLocaleString()} đ</span>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">Xóa</button>
        `;
        cartItems.appendChild(div);
    });

    cartCount.innerText = cart.reduce((acc, item) => acc + item.qty, 0);
    totalPrice.innerText = total.toLocaleString();
}

// Mở/đóng giỏ hàng
function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
}

// Logout
function logout() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    alert("Bạn đã đăng xuất!");
    window.location.href = "index.html";
}

// DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    // Nếu chưa login → redirect
    if (!isLoggedIn()) {
        window.location.href = "index.html";
        return;
    }

    // Hiển thị tên user ở phần welcome
    const usernameElement = document.getElementById("username");
    const loggedUser = localStorage.getItem("user");
    if (usernameElement && loggedUser) {
        usernameElement.innerText = loggedUser;
    }

    // Form thanh toán
    const checkoutForm = document.querySelector(".checkout-form");
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function(e){
            e.preventDefault();
            if(cart.length === 0){
                alert("Giỏ hàng trống!");
                return;
            }
            const name = this.querySelector('input[placeholder="Tên người nhận"]').value;
            const phone = this.querySelector('input[placeholder="Số điện thoại"]').value;
            const address = this.querySelector('textarea').value;
            const total = document.getElementById("totalPrice").innerText;

            alert(`Cảm ơn ${name}! Bạn đã đặt hàng thành công.\nTổng tiền: ${total} đ\nGiao tới: ${address}`);
            cart = [];
            updateCart();
            this.reset();
            toggleCart();
        });
    }

    // Render sản phẩm
    renderProducts();
});
