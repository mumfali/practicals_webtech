// File: script.js

// Requirement 3: Store beauty products as objects in arrays (with image links)
const products = [
    { 
        id: 1, 
        title: "Matte Lipstick", 
        price: 18.99, 
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=150&q=80" 
    },
    { 
        id: 2, 
        title: "Hydrating Face Serum", 
        price: 34.50, 
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80" 
    },
    { 
        id: 3, 
        title: "Liquid Foundation", 
        price: 29.99, 
        image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=150&q=80" 
    },
    { 
        id: 4, 
        title: "Waterproof Mascara", 
        price: 15.00, 
        image: "https://media.istockphoto.com/id/485201410/photo/make-up-blue-eye-with-long-lashes-with-black-mascara.jpg?s=612x612&w=0&k=20&c=zqO8z2nofKbT_4DicftMaItbOZgKuAm7SpyilqfeUz4=" 
    },
    { 
        id: 5, 
        title: "Eyeshadow Palette", 
        price: 42.00, 
        image: "https://www.sugarcosmetics.com/cdn/shop/files/Blend-The-Rules-Eyeshadow-Palette-8.jpg?v=1743677313&width=1080"
    }
];

let cart = [];

// Requirement 3: Use map() to display products with images
function displayProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <div class="card">
            <div class="product-info">
                <img src="${p.image}" alt="${p.title}" class="product-img">
                <div>
                    <h3>${p.title}</h3>
                    <p>Price: $${p.price}</p>
                </div>
            </div>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Requirement 2: JavaScript events & DOM manipulation to add items
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Decrease quantity or remove if count reaches 0
function decreaseQuantity(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(id);
            return;
        }
    }
    updateCart();
}

// Requirement 3: Use filter() to remove items completely
function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-list');

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty</p>';
    } else {
        // Requirement 3: Use map() to display cart items with options (+, -, remove)
        cartList.innerHTML = cart.map(i => `
            <div class="card">
                <div class="product-info">
                    <img src="${i.image}" alt="${i.title}" class="product-img">
                    <span>${i.title} (x${i.quantity}) - $${(i.price * i.quantity).toFixed(2)}</span>
                </div>
                <div>
                    <button onclick="decreaseQuantity(${i.id})">-</button>
                    <button onclick="addToCart(${i.id})">+</button>
                    <button class="danger" onclick="removeFromCart(${i.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }

    // Requirement 3: Use reduce() to calculate the total price
    const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    document.getElementById('total-price').innerText = `$${total.toFixed(2)}`;
}

// Initialize application on load
displayProducts();