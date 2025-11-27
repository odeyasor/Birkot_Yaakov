/*document.addEventListener('DOMContentLoaded', () => {
    // קבל את שם המשתמש מ-sessionStorage
    const userName = sessionStorage.getItem('name');
    
    if (userName) {
        // הצג את שם המשתמש בדף
        document.getElementById('cart-header').textContent = ` ${userName}`;
    } else {
        // אם אין שם משתמש, הפנה את המשתמש לדף ההתחברות
        window.location.href = 'login.html'; // החלף בכתובת הדף שלך להתחברות
    }
});
*/
async function calcAndUpdateBasket() {
    try {
        const token = sessionStorage.getItem('token');
        const userName = sessionStorage.getItem('name');

        console.log('Token from sessionStorage:', token); 
        console.log('User Name from sessionStorage:', userName);

        if (userName && token) {
            document.getElementById('cart-header').textContent = ` ${userName}`;
            console.log('User name displayed on page');
        } else {
            console.log('User name or token missing, redirecting to home');
            window.location.href = '../html/home.html';
            return;
        }

        console.log('Sending request to /order/calc');
        const response = await fetch('http://localhost:3000/order/calc', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        });

        console.log('Response Status:', response.status);
        if (!response.ok) {
            throw new Error('Error calculating total');
        }

        const data = await response.json();
        console.log('Response Data:', data);
        document.getElementById('money').textContent = `₪${data.sum}`;
        console.log('Sum displayed on page:', data.sum);
        
    } catch (error) {
        console.error('Error in calcAndUpdateBasket:', error);
        alert('שגיאה בעת חישוב הסכום');
    }
}


async function handlePayment() {
    try {
        const token = sessionStorage.getItem('token'); // ודא שהטוקן קיים

        // 2. צור את ההזמנה
        const response = await fetch('http://localhost:3000/order/pay-moveToOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // הוסף את הטוקן להירשם
            }
           // body: JSON.stringify({ /* פרטי העסקה */ })
        });

        if (!response.ok) {
            throw new Error('Error creating order');
        }

        alert('תשלום בוצע בהצלחה');
        window.location.href = 'thankyou.html'; // דף תודה
    } catch (error) {
        console.error('שגיאה:', error);
        alert('שגיאה בתשלום');
    }
}

/*
async function handlePayment() {
    try {
        // 2. צור את ההזמנה
        const response = await fetch('http://localhost:3000/order/pay-moveToOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            //body: JSON.stringify({ /* פרטי העסקה */ /*})
        });

        if (!response.ok) {
            throw new Error('Error creating order');
        }

        // 3. עדכן את המשתמש
        alert('תשלום בוצע בהצלחה');
        
        // ניתן לנתב לדף תודה או לעדכן את UI לפי הצורך
        //window.location.href = 'thankyou.html'; // דף תודה
    } catch (error) {
        console.error('שגיאה:', error);
        alert('שגיאה בתשלום');
    }
}
*/