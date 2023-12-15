function fetchAndDisplayData(type) {
    let url = `http://localhost:8888/API/index.php/${type}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            appendDataToDisplay(data);
        })
        .catch(error => console.error('Erreur:', error));
}

function fetchAndDisplayDataById(type, id) {
    if (!id) {
        alert("Veuillez entrer un ID.");
        return;
    }

    let url = `http://localhost:8888/API/index.php/${type}/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            appendDataToDisplay(data);
        })
        .catch(error => console.error('Erreur:', error));
}

function appendDataToDisplay(data) {
    const displayDiv = document.getElementById('dataDisplay');
    displayDiv.innerHTML = '';

    if (Array.isArray(data)) {
        data.forEach(item => displayDiv.appendChild(createDataElement(item)));
    } else {
        displayDiv.appendChild(createDataElement(data));
    }
}

function fetchData(type) {
    let url = 'http://localhost:8888/API/index.php/' + type;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => console.error('Erreur:', error));
}

function fetchDataById(type, id) {
    if (!id) {
        alert("Veuillez entrer un ID.");
        return;
    }

    let url = `http://localhost:8888/API/index.php/${type}/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => console.error('Erreur:', error));
}

function displayData(data) {
    appendDataToDisplay(data);
}

function submitForm(method) {
    const formData = new FormData(document.getElementById('studentForm'));
    fetch('http://localhost:8888/API/index.php/student', {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Requête complétée: ' + JSON.stringify(data));
    })
    .catch(error => console.error('Erreur:', error));
}

function fetchGetData() {
    fetch('http://localhost:8888/API/index.php/student')
        .then(response => response.json())
        .then(data => {
            const displayDiv = document.getElementById('dataDisplay');
            displayDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        })
        .catch(error => console.error('Erreur:', error));
}

function showAddForm() {
    const type = document.getElementById('addType').value;
    const formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = '';

    if (type === 'student') {
        formContainer.appendChild(createStudentForm());
    } else if (type === 'classe') {
        formContainer.appendChild(createClassForm());
    }
}

function createStudentForm() {
    const form = document.createElement('form');
    form.id = 'studentForm';
    form.innerHTML = `
        <input type="text" name="lastname" placeholder="Nom de famille" required>
        <input type="text" name="firstname" placeholder="Prénom" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="tel" name="phone" placeholder="Téléphone" required>
        <input type="text" name="address" placeholder="Adresse" required>
        <input type="text" name="zip" placeholder="Code Postal" required>
        <input type="text" name="city" placeholder="Ville" required>
        <input type="text" name="class" placeholder="Classe" required>
        <button type="button" onclick="submitStudentForm()">Envoyer</button>
    `;
    return form;
}

function createClassForm() {
    const form = document.createElement('form');
    form.id = 'classForm';
    form.innerHTML = `
        <input type="text" name="name" placeholder="Nom de la classe" required>
        <input type="text" name="level" placeholder="Niveau" required>
        <button type="button" onclick="submitClassForm()">Envoyer</button>
    `;
    return form;
}

function submitStudentForm() {
    const formData = new FormData(document.getElementById('studentForm'));
    const data = JSON.stringify(Object.fromEntries(formData));

    fetch('http://localhost:8888/API/index.php/student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log('Réponse du serveur:', data);
        alert('Étudiant ajouté avec succès');
    })
    .catch(error => console.error('Erreur:', error));
}


function submitClassForm() {
    const formData = new FormData(document.getElementById('classForm'));
    const data = JSON.stringify(Object.fromEntries(formData));

    fetch('http://localhost:8888/API/index.php/classe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log('Réponse du serveur:', data);
        alert('Classe ajoutée avec succès');
    })
    .catch(error => console.error('Erreur:', error));
}


function createDataElement(item) {
    const element = document.createElement('div');
    element.classList.add('data-item');

    for (const key in item) {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${key}:</strong> ${item[key]}`;
        element.appendChild(p);
    }

    const editButton = document.createElement('button');
    editButton.textContent = 'Modifier';
    editButton.onclick = function() { editData(item); };
    element.appendChild(editButton);

    return element;
}