/*document.getElementById('confirmLogout').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/login/logoutUser', {
            method: 'POST',
            credentials: 'include' // This includes cookies with the request
        });

        if (response.ok) {
            const message = await response.text();
            alert(message);
            window.location.href = '../html/home.html'; // Redirect to login page or home page after logout
        } else {
            throw new Error('Failed to logout');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging out. Please try again.');
    }
});
*/
function clearSessionStorage() {
    sessionStorage.clear();
    window.location = "../html/home.html";
}
