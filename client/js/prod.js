document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');

    const fetchProducts = async (lastId) => {
        const token = sessionStorage.getItem('token');
        try {
            let url = 'http://localhost:3000/prod/getProds';
            if (lastId) {
                url += `?lastId=${lastId}`;
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const products = await response.json();
            if (products.length > 0) {
                let last = products[products.length - 1].prodId;
                sessionStorage.setItem('last', last);
                displayProducts(products);
                attachEventListeners(); // הוספת מאזיני האירועים לאחר טעינת המוצרים
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const displayProducts = (products) => {
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <h2>${product.prodName}</h2>
                <img src="${product.url}" alt="${product.prodName}" style="width: 200px; height: 200px;">
                <p>${product.price}₪</p>
                <div class="quantity-control" data-product-id="${product.prodId}">
                    <button class="decrease-quantity">-</button>
                    <p id="quantity">1</p>
                    <button class="increase-quantity">+</button>
                </div>
                <button class="addToBasket">הוסף לסל</button>
            `;
            productContainer.appendChild(productElement);
        });
    };

    const addToBasket = (prodId, quantity) => {
        fetch('http://localhost:3000/basket/addToBasket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': gettoken() 
            },
            body: JSON.stringify({ prodId, quantity })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to add product to basket');
            }
        })
        .then(newBasketItem => {
            alert(`${newBasketItem.prodName} נוסף לסל  !`);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('שגיאה בהוספת המוצר לסל');
        });
    };

    const gettoken = () => {
        return sessionStorage.getItem('token');
    };



    const attachEventListeners = () => {
        document.querySelectorAll('.quantity-control').forEach(control => {
            const decreaseButton = control.querySelector('.decrease-quantity');
            const increaseButton = control.querySelector('.increase-quantity');
            const quantityElement = control.querySelector('#quantity');
            const prodId = control.dataset.productId;
    
            increaseButton.addEventListener('click', async () => {
                try {
                  
                    const response = await fetch('http://localhost:3000/basket/incrementCount', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': gettoken()
                        },
                        body: JSON.stringify({ prodId })
                    });
    
                    if (!response.ok) {
                        throw new Error('Failed to increment count');
                    }
    
                    const data = await response.json(); // מקבל את הנתונים מהשרת
                    quantityElement.innerHTML = data.newQuantity; // נניח שהשרת מחזיר אובייקט עם `newQuantity`
               
                } catch (error) {
                    console.error('Error:', error);
                }
            });
    
            decreaseButton.addEventListener('click', async () => {
                try {
                    const currentQuantity = parseInt(quantityElement.innerHTML);
                  
                        const response = await fetch('http://localhost:3000/basket/decrementCount', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': gettoken()
                            },
                            body: JSON.stringify({ prodId })
                        });
    
                        if (!response.ok) {
                            throw new Error('Failed to decrement count');
                        }
    
                        // עדכון הכמות ב-UI
                        quantityElement.innerHTML = currentQuantity - 1;
                   
                } catch (error) {
                    console.error('Error:', error);
                }
            });

            // מאזין כפתור הוסף לסל
            control.parentElement.querySelector('.addToBasket').addEventListener('click', () => {
                const currentQuantity = parseInt(quantityElement.innerHTML);
                addToBasket(prodId, currentQuantity); 
            });
            
        });
    };

    fetchProducts(0);

    function moreProduct() {
        fetchProducts(sessionStorage.getItem("last"));
    }

    document.querySelector('.moreproduct').addEventListener('click', moreProduct);
});
