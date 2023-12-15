function fetchAndDisplayData(type) {
    let url = `http://localhost:8888/API/index.php/${type}`; // Remplacez avec l'URL correcte
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

    let url = `http://localhost:8888/API/index.php/${type}/${id}`; // Remplacez avec l'URL correcte
    fetch(url)
        .then(response => response.json())
        .then(data => {
            appendDataToDisplay(data);
        })
        .catch(error => console.error('Erreur:', error));
}

function appendDataToDisplay(data) {
    const displayDiv = document.getElementById('dataDisplay');
    const newDataElement = document.createElement('div');
    newDataElement.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    displayDiv.appendChild(newDataElement);
}

function fetchData(type) {
    let url = 'http://localhost:8888/API/index.php/' + type; // Remplacez avec l'URL correcte
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

    let url = `http://localhost:8888/API/index.php/${type}/${id}`; // Remplacez avec l'URL correcte
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => console.error('Erreur:', error));
}

function displayData(data) {
    const displayDiv = document.getElementById('dataDisplay');
    displayDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
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

if (document.getElementById('dataDisplay')) {
    fetchGetData();
    setInterval(fetchGetData, 30000);
}