// Cart functionality
let cart = [];
let cartCountElement = document.getElementById('cart-count');

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        let productElement = this.parentElement;
        let productId = productElement.getAttribute('data-id');
        let productName = productElement.querySelector('h2').innerText;
        let productPrice = productElement.querySelector('p').innerText;

        addToCart(productId, productName, productPrice);
    });
});

// Function to add item to cart
function addToCart(id, name, price) {
    let existingProduct = cart.find(product => product.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: parseFloat(price.replace('$', '')),
            quantity: 1
        });
    }

    updateCartCount();
}

// Function to update cart count
function updateCartCount() {
    let totalItems = cart.reduce((total, product) => total + product.quantity, 0);
    cartCountElement.innerText = totalItems;
}

const products = [
    { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 19.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 39.99, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', price: 49.99, image: 'https://via.placeholder.com/150' },
];

let cartCount = 0;

function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    alert(`Added Product ${productId} to the cart!`);
}

displayProducts();

function updateCartDisplay() {
    document.getElementById('cart-count').innerText = cartCount;

    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} (x${item.quantity})</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cartCount -= cart[itemIndex].quantity;
        cart.splice(itemIndex, 1);
        updateCartDisplay();
        alert(`Product removed from cart!`);
    }
}

document.getElementById('checkout-button').onclick = function() {
    alert('Proceeding to checkout...');
};

displayProducts();
