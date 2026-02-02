
let productsData = [
    { id: 1, name: "Tai nghe", price: 250000, stock: 5, img: "https://i.postimg.cc/k4JZDsks/shopping.webp" },
    { id: 2, name: "Áo thun", price: 150000, stock: 10, img: "https://i.postimg.cc/xdRprHcH/shopping.webp" },
    { id: 3, name: "Balo", price: 300000, stock: 3, img: "https://i.postimg.cc/fWF2hMTg/shopping.webp" }
];
let cart = [];
function isLoggedIn() {
    return localStorage.getItem("isLogin") && localStorage.getItem("user");
}
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
                <p class="stock">Còn lại: ${p.stock}</p>

                <input 
                    type="number" 
                    min="1" 
                    max="${p.stock}" 
                    value="1" 
                    id="qty-${p.id}" 
                    style="width:50px; margin-right:5px;"
                >

                <button onclick="addToCart(${p.id})" ${p.stock === 0 ? "disabled" : ""}>
                    ${p.stock === 0 ? "Hết hàng" : "Thêm vào giỏ"}
                </button>

                <!-- NÚT CHI TIẾT (THÊM) -->
                <button class="btn-detail" onclick="showDetail(${p.id})">
                    Chi tiết
                </button>
            `;

            container.appendChild(div);
        });
}
function addToCart(id) {
    if (!isLoggedIn()) {
        alert("Vui lòng đăng nhập để mua hàng!");
        window.location.href = "index.html";
        return;
    }
    const product = productsData.find(p => p.id === id);
    const qtyInput = document.getElementById(`qty-${id}`);
    let qty = parseInt(qtyInput.value);

    if (product.stock <= 0) {
        alert("Sản phẩm đã hết hàng!");
        return;
    }
    if (qty > product.stock) {
        alert(`Số lượng tối đa có thể mua là ${product.stock}!`);
        qty = product.stock;
    }
    const existing = cart.find(item => item.id === id);
    if (existing) {
        if (existing.qty + qty > product.stock) {
            alert(`Bạn chỉ có thể mua thêm ${product.stock - existing.qty} sản phẩm nữa!`);
            existing.qty = product.stock;
        } else {
            existing.qty += qty;
        }
    } else {
        cart.push({ ...product, qty: qty });
    }
    updateCart();
}
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}
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
    cartCount.innerText = cart.reduce((sum, i) => sum + i.qty, 0);
    totalPrice.innerText = total.toLocaleString();
}
function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
}
function logout() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    alert("Bạn đã đăng xuất!");
    window.location.href = "index.html";
}
function showDetail(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;

    alert(
        `📦 ${product.name}\n` +
        `💰 Giá: ${product.price.toLocaleString()} đ\n` +
        `📊 Còn lại: ${product.stock}\n\n` +
        `ForsakenShop cảm ơn bạn ❤️`
    );
}
document.addEventListener("DOMContentLoaded", () => {
    if (!isLoggedIn()) {
        window.location.href = "index.html";
        return;
    }

    const usernameEl = document.getElementById("username");
    if (usernameEl) {
        usernameEl.innerText = localStorage.getItem("user");
    }
    const formCheckout = document.querySelector(".checkout-form");
    if (formCheckout) {
        formCheckout.addEventListener("submit", function (e) {
            e.preventDefault();

            if (cart.length === 0) {
                alert("Giỏ hàng trống!");
                return;
            }
            cart.forEach(item => {
                const product = productsData.find(p => p.id === item.id);
                product.stock -= item.qty;
            });
            alert("Đặt hàng thành công 🎉");
            cart = [];
            updateCart();
            renderProducts();
            this.reset();
            toggleCart();
        });
    }
    renderProducts();
});
document.getElementById("goAddProduct").onclick = () => {
    window.location.href = "themsanpham.html";
};
