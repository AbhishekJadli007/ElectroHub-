// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isCartOpen = false;

// Initialize cart
function initCart() {
    updateCartCount();
    updateCartPreview();
    setupEventListeners();
    setupAddToCartButtons();
}

// Setup event listeners
function setupEventListeners() {
    // Toggle cart preview
    const cartIcon = document.querySelector('.cart-icon');
    const cartPreview = document.querySelector('.cart-preview');
    
    if (cartIcon && cartPreview) {
        cartIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            isCartOpen = !isCartOpen;
            cartPreview.classList.toggle('show');
        });

        // Close cart preview when clicking outside
        document.addEventListener('click', (e) => {
            if (!cartIcon.contains(e.target) && !cartPreview.contains(e.target)) {
                isCartOpen = false;
                cartPreview.classList.remove('show');
            }
        });

        // Handle checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (cart.length === 0) {
                    showNotification('Your cart is empty!', 'error');
                    return;
                }
                // Calculate total amount
                const total = cart.reduce((sum, item) => sum + item.price, 0);
                // Store cart total in localStorage
                localStorage.setItem('cartTotal', total);
                // Redirect to payment page with total amount
                window.location.href = `payment.html?total=${total}`;
            });
        }
    }
}

// Setup Add to Cart buttons
function setupAddToCartButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            const itemData = JSON.parse(button.dataset.item);
            addToCart(itemData);
        });
    });
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

// Update cart preview
function updateCartPreview() {
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    
    if (cartItems && totalAmount) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            totalAmount.textContent = '₹0';
            return;
        }

        let total = 0;
        cartItems.innerHTML = cart.map((item, index) => {
            total += item.price;
            const priceDisplay = item.type === 'rental' ? `₹${item.price}/week` : `₹${item.price}`;
            return `
                <div class="cart-preview-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>${priceDisplay}</p>
                        <small>${item.type === 'rental' ? 'Rental Item' : 'Purchase Item'}</small>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }).join('');

        totalAmount.textContent = `₹${total}`;
    }
}

// Add item to cart
function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartPreview();
    showNotification('Item added to cart!', 'success');
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartPreview();
    showNotification('Item removed from cart', 'error');
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', initCart);

// Make functions available globally
window.removeFromCart = removeFromCart; 