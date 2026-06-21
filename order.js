const products = [
    { id: 1, name: "นมชมพูเย็น", price: 45, category: "drinks", img: "assets/เมนูร้าน/493473120_2528534147485932_1438962868243656304_n.jpg" },
    { id: 2, name: "เซ็ตปังปิ้งเนยนม", price: 59, category: "sweets", img: "assets/เมนูร้าน/492412841_2527023350970345_4918805182070823305_n.jpg" },
    { id: 3, name: "ปังปิ้งโอวัลตินภูเขาไฟ", price: 69, category: "sweets", img: "assets/เมนูร้าน/493540617_2527023530970327_8570458719034524791_n.jpg" },
    { id: 4, name: "ปังเย็นเครื่องแน่น", price: 89, category: "sweets", img: "assets/เมนูร้าน/492846847_2529634777375869_7035050521733813971_n.jpg" },
    { id: 5, name: "ปังปิ้งราดช็อกโกแลต", price: 49, category: "sweets", img: "assets/เมนูร้าน/44318093_775478239458207_3282462492936110080_n.jpg" },
    { id: 6, name: "ของทอดทานเล่น", price: 79, category: "fried", img: "assets/เมนูร้าน/44342331_775477832791581_5534039281854578688_n.jpg" }
];

let cart = {};
let currentCategory = "all";

// DOM Elements
const productListEl = document.getElementById("product-list");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart");
const cartCountEl = document.getElementById("cart-count");
const cartItemsEl = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const confirmBtn = document.getElementById("confirm-order-btn");
const catBtns = document.querySelectorAll(".cat-btn");

// Init
function renderProducts() {
    productListEl.innerHTML = "";
    const filtered = currentCategory === "all" ? products : products.filter(p => p.category === currentCategory);
    
    filtered.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <img src="${p.img}" alt="${p.name}" class="product-img">
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div class="product-price">${p.price} ฿</div>
            </div>
            <div class="product-actions">
                <div class="qty-control">
                    <button class="qty-btn minus" onclick="changeTempQty(${p.id}, -1)">-</button>
                    <span class="qty-num" id="temp-qty-${p.id}">1</span>
                    <button class="qty-btn plus" onclick="changeTempQty(${p.id}, 1)">+</button>
                </div>
                <button class="add-btn" onclick="addToCart(${p.id})">เพิ่มลงตะกร้า</button>
            </div>
        `;
        productListEl.appendChild(div);
    });
}

function changeTempQty(id, delta) {
    const el = document.getElementById(`temp-qty-${id}`);
    let qty = parseInt(el.innerText) + delta;
    if(qty < 1) qty = 1;
    el.innerText = qty;
}

// Add function to global window so inline onclick works
window.changeTempQty = changeTempQty;

function addToCart(id) {
    const qtyEl = document.getElementById(`temp-qty-${id}`);
    const qty = parseInt(qtyEl.innerText);
    
    if(cart[id]) {
        cart[id].qty += qty;
    } else {
        const product = products.find(p => p.id === id);
        cart[id] = { ...product, qty };
    }
    
    // Reset temp qty
    qtyEl.innerText = "1";
    updateCartUI();
    
    // Add cart animation
    cartBtn.style.transform = "scale(1.2)";
    setTimeout(() => cartBtn.style.transform = "scale(1)", 200);
}

window.addToCart = addToCart;

function updateCartUI() {
    const items = Object.values(cart);
    const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    cartCountEl.innerText = totalItems;
    totalPriceEl.innerText = totalPrice + " ฿";
    
    if(items.length === 0) {
        cartItemsEl.innerHTML = `<div class="empty-cart-msg">ยังไม่มีรายการอาหารในตะกร้า</div>`;
        confirmBtn.disabled = true;
    } else {
        confirmBtn.disabled = false;
        cartItemsEl.innerHTML = items.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${item.price} ฿ / รายการ</div>
                </div>
                <div class="qty-control">
                    <button class="qty-btn minus" onclick="updateCartItem(${item.id}, -1)">-</button>
                    <span class="qty-num">${item.qty}</span>
                    <button class="qty-btn plus" onclick="updateCartItem(${item.id}, 1)">+</button>
                </div>
            </div>
        `).join("");
    }
}

function updateCartItem(id, delta) {
    if(cart[id]) {
        cart[id].qty += delta;
        if(cart[id].qty <= 0) {
            delete cart[id];
        }
        updateCartUI();
    }
}

window.updateCartItem = updateCartItem;

// Event Listeners
catBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        catBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        currentCategory = e.target.dataset.category;
        renderProducts();
    });
});

cartBtn.addEventListener("click", () => {
    // Show modal with animation
    cartModal.style.display = "block";
    setTimeout(() => cartModal.classList.add("show"), 10);
});

closeCartBtn.addEventListener("click", () => {
    cartModal.classList.remove("show");
    setTimeout(() => cartModal.style.display = "none", 300);
});

confirmBtn.addEventListener("click", () => {
    confirmBtn.innerText = "กำลังส่งออเดอร์...";
    setTimeout(() => {
        alert("ส่งออเดอร์เข้าห้องครัวเรียบร้อยแล้ว!");
        cart = {};
        updateCartUI();
        cartModal.classList.remove("show");
        setTimeout(() => cartModal.style.display = "none", 300);
        confirmBtn.innerText = "ยืนยันสั่งอาหาร";
    }, 1500);
});

// Initial render
renderProducts();
