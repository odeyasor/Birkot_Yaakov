function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const allSections = document.querySelectorAll('.form-section');

    allSections.forEach(sec => {
        if (sec !== section) {
            sec.style.display = 'none';
        }
    });

    section.style.display = (section.style.display === 'none' || section.style.display === '') ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    // קישור הטפסים לפונקציות המתאימות
    const addManagerForm = document.getElementById('addManagerForm');
    const deleteManagerForm = document.getElementById('deleteManagerForm');
    const searchManagerForm = document.getElementById('searchManagerForm');

    if (addManagerForm) {
        addManagerForm.addEventListener('submit', handleAddManager);
    }
    if (deleteManagerForm) {
        deleteManagerForm.addEventListener('submit', handleDeleteManager);
    }
    if (searchManagerForm) {
        searchManagerForm.addEventListener('submit', handleSearchManager);
    }

    // אם רוצים לטעון את כל המנהלים כברירת מחדל
    fetchAllDirectors();
});

async function handleAddManager(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const token = sessionStorage.getItem('adminToken');

    const data = {
        direcName: formData.get('direcName'),
        fullName: formData.get('fullName'),
        direcPwd: formData.get('direcPwd'),
        privatePwd: formData.get('privatePwd'),
        email: formData.get('email')
    };

    try {
        const response = await fetch('http://localhost:3000/admin/addDirec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('מנהל נוסף בהצלחה');
            event.target.reset();
        } else {
            const error = await response.text();
            alert(`שגיאה: ${error}`);
        }
    } catch (error) {
        console.error('Error adding manager:', error);
        alert('שגיאה בהוספת מנהל');
    }
}

async function handleDeleteManager(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const direcName = formData.get('direcName');
    const token = sessionStorage.getItem('adminToken');

    try {
        const response = await fetch('http://localhost:3000/admin/deleteDirec', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ direcName })
        });

        if (response.ok) {
            alert('מנהל נמחק בהצלחה');
            event.target.reset();
        } else {
            const error = await response.text();
            alert(`שגיאה: ${error}`);
        }
    } catch (error) {
        console.error('Error deleting manager:', error);
        alert('שגיאה במחיקת מנהל');
    }
}

async function handleSearchManager(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fullName = formData.get('searchDirecName');
    const token = sessionStorage.getItem('adminToken');

    try {
        const response = await fetch('http://localhost:3000/admin/getDirecByFullName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ fullName })
        });

        if (response.ok) {
           const director = await response.json();
            const table = createDirectorsTable(director);
            document.getElementById('searchResult').innerHTML = table;
             `
                <h3>תוצאות חיפוש:</h3>
                <pre>${table}</pre>
            `;
        } else {
            const error = await response.text();
            document.getElementById('searchResult').innerHTML = `<p>שגיאה: ${error}</p>`;
        }
    } catch (error) {
        console.error('Error searching manager:', error);
        document.getElementById('searchResult').innerHTML = '<p>שגיאה בחיפוש מנהל</p>';
    }
}

async function fetchAllDirectors() {
    const token = sessionStorage.getItem('adminToken');
    
    try {
        const response = await fetch('http://localhost:3000/admin/getDirecs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        if (response.ok) {
            const directors = await response.json();
            const table = createDirectorsTable(directors);
            document.getElementById('directorsList').innerHTML = table;
        } else {
            const error = await response.text();
            alert(`שגיאה: ${error}`);
        }
    } catch (error) {
        console.error('Error fetching all directors:', error);
        alert('שגיאה בהצגת מנהלים');
    }
}

function createDirectorsTable(directors) {
    if (!directors.length) {
        return '<p>לא נמצאו מנהלים.</p>';
    }

    let table = `
        <table>
            <thead>
                <tr>
                    <th>שם משתמש</th>
                    <th>שם מלא</th>
                    <th>אימייל</th>
                </tr>
            </thead>
            <tbody>
    `;

    directors.forEach(director => {
        table += `
            <tr>
                <td>${director.direcName}</td>
                <td>${director.fullName}</td>
                <td>${director.email}</td>
            </tr>
        `;
    });

    table += `
            </tbody>
        </table>
    `;

    return table;
}
