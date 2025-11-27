/*document.addEventListener('DOMContentLoaded', function() {
    const addUserForm = document.querySelector('#addUser form');

    addUserForm.addEventListener('submit', function(event) {
        event.preventDefault(); // מנע את שליחת הטופס הרגילה
        
        const formData = new FormData(addUserForm);

        // המרת הנתונים ל-JSON
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        // שליחה לשרת
        fetch('http://localhost:3000/login/addUser', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(message => {
            console.log('תשובת השרת:', message);
            alert(message); // מציג את ההודעה שהתקבלה מהשרת
        })
        .catch(error => {
            console.error('שגיאה:', error);
            alert('הייתה שגיאה בהוספת המשתמש.');
        });

        // ניקוי הטופס לאחר שליחה
        addUserForm.reset();
    });
});*/
document.getElementById('addUser').querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userData = {
        userName: document.getElementById('newUserName').value,
        pwd: document.getElementById('newUserPassword').value,
        email: document.getElementById('newUserEmail').value,
        city: document.getElementById('newUserCity').value,
        street: document.getElementById('newUserStreet').value,
        houseNum: document.getElementById('newUserHouseNumber').value
    };

    const token = sessionStorage.getItem('adminToken');
    if (!token) {
        window.location = '../html/loginDirec.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert('המשתמש נוסף בהצלחה');
            document.getElementById('addUser').querySelector('form').reset(); // מנקה את הטופס
        } else {
            const errorData = await response.json();
            alert(`שגיאה: ${errorData.message}`);
        }
    } catch (error) {
        alert('התרחשה שגיאה בעת שליחת הבקשה');
        console.error('Error:', error);
    }
});

document.getElementById('deleteUser').querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // קבלת כתובת האימייל מהטופס
    const email = document.getElementById('deleteUserEmail').value;

    // קבלת הטוקן מה-sessionStorage
    const token = sessionStorage.getItem('adminToken');
    if (!token) {
        window.location = '../html/loginDirec.html';
        return;
    }

    try {
        // שליחת בקשה למחיקת המשתמש לשרת
        const response = await fetch('http://localhost:3000/login/deleteUser', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ email })
        });

        // טיפול בתגובה מהשרת
        if (response.ok) {
            alert('המשתמש נמחק בהצלחה');
            document.getElementById('deleteUser').querySelector('form').reset(); // מנקה את הטופס
        } else {
            const errorData = await response.json();
            alert(`שגיאה: ${errorData.message}`);
        }
    } catch (error) {
        alert('התרחשה שגיאה בעת שליחת הבקשה');
        console.error('Error:', error);
    }
});


document.getElementById('addProduct').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('prodId', document.getElementById('newProductId').value);
    formData.append('prodName', document.getElementById('newProductName').value);
    formData.append('price', document.getElementById('newProductPrice').value);
    formData.append('available', document.getElementById('newProductQuantity').value);
    formData.append('thisWeek', document.getElementById('newProductAvailable').value);
  
    const imageFile = document.getElementById('newProductImage').files[0];
    if (imageFile) {
      formData.append('image', imageFile);
    }
     
    const token = sessionStorage.getItem('adminToken');
    if (!token){
        window.location='../html//loginDirec.html';
    }
    try {
      const response = await fetch('http://localhost:3000/prod/addProdToDB', {
        method: 'POST',
        headers: {
          'Authorization': token
          //'content-Type':'application/json' 
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
        alert('התרחשה שגיאה. בקש הרשאה או בדוק את הנתונים');
      }
  
      const data = await response;
      alert('מוצר נוסף בהצלחה!');
      location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('התרחשה שגיאה. בקש הרשאה או בדוק את הנתונים');

    }
});
  
  async function updateProduct() {
    const nameToUppdate = document.getElementById('ProductName').value;
    const productName = document.getElementById('updateProductName').value;
    const productPrice = document.getElementById('updateProductPrice').value;
    const productQuantity = document.getElementById('updateProductQuantity').value;
    const productAvailable = document.getElementById('updateProductAvailable').value;

    try {
      const token = sessionStorage.getItem('adminToken');
        const response = await fetch('http://localhost:3000/prod/updateProd', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                name: nameToUppdate,
                prodName: productName,
                price: productPrice,
                available: productQuantity,
                thisWeek: productAvailable
            })
        });

        if (response.ok) {
            alert('מוצר עודכן בהצלחה');
            location.reload();
        } else {
            const errorData = await response.json();
            alert(`התרחשה שגיאה בעת עדכון המוצר: ${errorData.message}`);
        }
    } catch (error) {
        alert('התרחשה שגיאה בעת שליחת הבקשה');
        console.error('Error:', error);
    }
}
//delete
async function deleteProd() {
  const productName = document.getElementById('deleteProductName').value;

  try {
      const token = sessionStorage.getItem('adminToken');
      const response = await fetch('http://localhost:3000/prod/deleteProd', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token
          },
          body: JSON.stringify({ prodName: productName })
      });

      if (response.ok) {
          alert('מוצר נמחק בהצלחה');
          location.reload();
      } else {
          const errorData = await response.json();
          alert(`התרחשה שגיאה בעת מחיקת המוצר: ${errorData.message}`);
      }
  } catch (error) {
      alert('התרחשה שגיאה בעת שליחת הבקשה');
      console.error('Error:', error);
  }
}

async function getOrders() {
    try {
        const token = sessionStorage.getItem('adminToken');
        const response = await fetch('http://localhost:3000/order/getOrders', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token
          },
          //body: JSON.stringify({ prodName: productName })
      });
        //const response = await fetch('http://localhost:3000/orders/getOrders'); // הנתיב להניח שהשרת מספק בו את ההזמנות
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const orders = await response.json();
        displayOrders(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        document.getElementById('ordersDisplay').innerHTML = '<p>אירור בעת קבלת ההזמנות</p>';
    }
}

function displayOrders(orders) {
    const ordersDisplay = document.getElementById('ordersDisplay');
    if (orders.length === 0) {
        ordersDisplay.innerHTML = '<p>אין הזמנות</p>';
    } else {
        let ordersHtml = '<ul>';
        orders.forEach(order => {
            ordersHtml += `
                <li class="one_order">
                    <strong>פרטי לקוח:</strong><br>
                    שם: ${order.user[0].userName}<br>
                    אימייל: ${order.user[0].email}<br>
                    עיר: ${order.user[0].city}<br>
                    רחוב: ${order.user[0].street}<br>
                    מספר בית: ${order.user[0].houseNum}<br>
                    <strong>פרטי פריטים:</strong><br>
                    ${order.items.map(item => `
                        פריט: ${item.prodName}<br>
                        מזהה: ${item.prodId}<br>
                        כמות: ${item.count}<br>
                    `).join('<hr>')}
                </li>
            `;
        });
        ordersHtml += '</ul>';
        ordersDisplay.innerHTML = ordersHtml;
    }
}