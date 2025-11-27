document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    const responseMessage = document.querySelector('#responseMessage');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // מניעת שליחת הטופס הרגילה
        
        const formData = new FormData(loginForm);
        
        // המרת הנתונים ל-JSON
        const loginData = {};
        formData.forEach((value, key) => {
            loginData[key] = value;
        });
        const token = sessionStorage.getItem('token');
        // שליחה לשרת
        fetch('http://localhost:3000/login/loginDirec', {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(loginData),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Network response was not ok: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Server response:', data);
            // הצגת הודעה על הצלחה
            responseMessage.textContent = `התחברות הצליחה! ברוך הבא, ${data.name}`;
            // שמירת הטוקן ב-sessionStorage
            sessionStorage.setItem('adminToken', data.token);
            // מעבר לדף הבא
            window.location.href = '../html/direc.html';
        })
        .catch(error => {
            console.error('Error:', error);
            responseMessage.textContent = 'הייתה שגיאה בהתחברות.';
        });

        // ניקוי הטופס לאחר שליחה
        loginForm.reset();
    });
});