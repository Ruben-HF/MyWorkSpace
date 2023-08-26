const dateElement = document.getElementById('date');
const darkModeButton = document.getElementById('darkModeButton');
const footer = document.querySelector('footer');

function updateDateTime() {
    const now = new Date();
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Mexico_City' };
    const dateString = now.toLocaleDateString('es-ES', options);
    
    dateElement.textContent = dateString;
}


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    footer.classList.toggle('dark-mode');

    const darkModeButton = document.getElementById('darkModeButton');
    if (document.body.classList.contains('dark-mode')) {
        darkModeButton.textContent = '☀️';
    } else {
        darkModeButton.textContent = '🌙';
    }
}


const temperatureElement = document.getElementById('temperature');
const apiKey = '05103b6cbd8de0e32c07d237637d61df';

async function fetchTemperature() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Mexico%20City&appid=${apiKey}&units=metric`);
        const data = await response.json();
        const temperature = data.main.temp;
        temperatureElement.textContent = `Temperature: ${temperature}°C`;
    } catch (error) {
        console.error('Error fetching temperature:', error);
        temperatureElement.textContent = 'Temperature: N/A';
    }
}

// Llamar a la función de obtención de temperatura
fetchTemperature();

// Actualizar la fecha y hora cada segundo
setInterval(updateDateTime, 1000);

// Alternar el modo oscuro al hacer clic en el botón
darkModeButton.addEventListener('click', toggleDarkMode);

// Llamar a la función de actualización de fecha una vez al cargar la página
updateDateTime();


// Función para cambiar el tamaño de la sección Quick-Notes-App
const quickNotesButton = document.getElementById("quick-notes-button");
const quickNotesSection = document.querySelector(".Quick-Notes-App");

quickNotesButton.addEventListener("click", () => {
    if (quickNotesSection.style.width === "45%" || quickNotesSection.style.width === "") {
        quickNotesSection.style.width = "100%";
    } else {
        quickNotesSection.style.width = "45%";
    }
});

// Función para cambiar el tamaño de la sección Quick-Reminders-App
const quickRemindersButton = document.getElementById("quick-reminders-button");
const quickRemindersSection = document.querySelector(".Quick-Reminders-App");

quickRemindersButton.addEventListener("click", () => {
    if (quickRemindersSection.style.width === "45%" || quickRemindersSection.style.width === "") {
        quickRemindersSection.style.width = "100%";
    } else {
        quickRemindersSection.style.width = "45%";
    }
});
