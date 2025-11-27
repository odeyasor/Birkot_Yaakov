document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    const userName = sessionStorage.getItem('name');
    
    if (userName) {
        document.getElementById('cart-header').textContent = `הסל של: ${userName}`;
    }

    loadCartItems();
});

async function loadCartItems() {
    const token = sessionStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:3000/basket/getBasket', {
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load cart items');
        }

        const cartItems = await response.json();
        displayCartItems(cartItems);
    } catch (error) {
        console.error('Error loading cart items:', error);
    }
}

function displayCartItems(items) {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';

    items.forEach(item => {
        const itemElement = document.createElement('div');
        console.log(item)
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <h2>${item.prodName}</h2>
            <img src="${item.url}" alt="${item.prodName}">
            <p>מחיר: ${item.price}</p>
            <p>כמות: ${item.count}</p>
        `;
        cartContainer.appendChild(itemElement);
    });
}
