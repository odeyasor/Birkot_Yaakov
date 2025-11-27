document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:3000/login/loginUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, pwd: password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            const { token, name } = data;
            
            if (token) {
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("name", name);
                loginForm.classList.add("hidden");
               // animatedImage.classList.add("animate");

                // לאחר סיום האנימציה, נעבור לדף המוצרים
               // setTimeout(() => {
                    window.location = "../html/prod.html";
              //  }, 2000); // זמן האנימציה (2 שניות)


            } else {
                throw new Error("No token received");
            }

        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed: " + error.message);
        }
    });
});

   
   /* async function addToBasket(event) {
        event.preventDefault(); // עצור את שליחת הטופס
    
        // הנח ש-`prodId` נמצא בתכונת data-prod-id של הכפתור
        const prodId = parseInt(event.target.dataset.prodId, 10); // המרה למספר אם לא היה
    
        try {
            const response = await fetch("http://localhost:3000/basket/addToBasket", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // הכנס את הטוקן שלך כאן
                },
                body: JSON.stringify({
                    prodId: ProdId // ודא שה-`prodId` נכון
                })
            });
          
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('Product added to basket:', result);
        } catch (error) {
            console.error('Error adding product to basket:', error);
        }
    }
    
    document.querySelector('#add-to-basket-button').addEventListener('click', addToBasket);






     if (token) {
                sessionStorage.setItem("token", token);
                loginForm.classList.add("hidden");
                animatedImage.classList.add("animate");

                // לאחר סיום האנימציה, נעבור לדף המוצרים
                setTimeout(() => {
                    window.location = "../html/prod.html";
                }, 2000); // זמן האנימציה (2 שניות)


    */

