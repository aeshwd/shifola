// Function to update the cart display
function updateCart() {
    const cartItems = document.querySelector('.cart-list');
    cartItems.innerHTML = '';

    let subtotal = 0;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        // Display message and image when cart is empty
        cartItems.innerHTML = `
            <div class="empty-cart">
                <img src="images/no.gif" alt="Empty Cart">
                <p>No products in the cart</p>
               <a href="index.html" class="start" > <button>Start Shopping</button> </a>
            </div>
        `;
        document.querySelector('.cart-summary').style.display = 'none'; // Hide cart summary
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <p>${item.name}</p>
            <p class="pr">₹ ${item.price} x 
                <button onclick="decrementQuantity(${item.id})">-</button>
                <span id="quantity-${item.id}">${item.quantity}</span>
                <button onclick="incrementQuantity(${item.id})">+</button>
            </p>
            <p>Total: ₹ ${item.price * item.quantity}</p>
            <button onclick="removeFromCart(${item.id})" class="clear">Remove</button>
        `;
        cartItems.appendChild(cartItem);

        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('tax').innerText = tax.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
    document.querySelector('.cart-summary').style.display = 'block'; // Show cart summary
}

// Function to increment product quantity
function incrementQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        updateCartCount(); // Update cart count in the navbar
    }
}

// Function to decrement product quantity
function decrementQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        updateCartCount(); // Update cart count in the navbar
    }
}

// Function to remove product from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartCount(); // Update cart count in the navbar
}

// Function to apply discount coupon
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value;
    const subtotal = parseFloat(document.getElementById('subtotal').innerText);
    let discount = 0;

    // Validate coupon code
    const validCoupons = {
        'DISCOUNT10': 0.10,
        'DISCOUNT20': 0.20
    };

    if (validCoupons[couponCode] !== undefined) {
        discount = validCoupons[couponCode];
    } else if (subtotal > 20000) {
        discount = 0.20; // 20% discount
    } else if (subtotal > 5000) {
        discount = 0.10; // 10% discount
    }

    const discountAmount = subtotal * discount;
    const tax = subtotal * 0.05;
    const total = subtotal - discountAmount + tax;

    document.getElementById('total').innerText = total.toFixed(2);
    document.getElementById('discount-info').innerText = discount > 0 ? `Discount applied: ${discount * 100}%` : 'Invalid or no discount';
}

// Function to update cart count in the navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = `(${count})`;
}

// Display cart items and update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    updateCartCount();
});

