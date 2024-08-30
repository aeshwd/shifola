// List of products
const products = [
    { id: 1, name: 'YONEX Shorts M 2598 |Badminton|Tennis', price: 1190, imageUrl: 'images/pro1.jpg' },
    { id: 2, name: 'YONEX Tshirt Polo M 2402 T-Shirt|Badminton |Tennis ', price: 899, imageUrl: 'images/pro2.jpg' },
    { id: 3, name: 'YONEX T-Shirt 2529 |Badminton|Tennis', price: 1200, imageUrl: 'images/pro3.jpg' },
    /* { id: 4, name: 'YONEX Skirts Women', price: 999, imageUrl: 'images/pro4.jpeg' },
    { id: 5, name: 'Yonex Mens 15134EX Shorts - White', price: 1400, imageUrl: 'images/pro5.jpeg' }, */
    { id: 6, name: 'Yonex Power Cushion 65Z3 SHB65Z3MEX Badminton Shoes ', price: 5400, imageUrl: 'images/pro6.jpeg' },
];

// Function to update cart count in the navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
   document.getElementById('cart-count').textContent = `(${cartCount})`; 
    localStorage.setItem('cartCount', cartCount);
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);
    alert("Item has been added to cart. Please go to cart menu to buy it now. Thanks For shopping with us.");
    if (cartItem) {
        cartItem.quantity += 1;
        
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Function to display products on the page
function displayProducts() {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹ ${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productItem);

    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
});


