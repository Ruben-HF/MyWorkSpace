const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');
const darkModeButton = document.getElementById('darkModeButton');
const footer = document.querySelector('footer');

function updateDateTime() {
    const now = new Date();
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Mexico_City' };
    const dateString = now.toLocaleDateString('es-ES', options);
    
    const timeString = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Mexico_City' });
    
    dateElement.textContent = dateString;
    timeElement.textContent = timeString;
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

// Actualizar la fecha y hora cada segundo
setInterval(updateDateTime, 1000);

// Alternar el modo oscuro al hacer clic en el botón
darkModeButton.addEventListener('click', toggleDarkMode);

// Llamar a la función de actualización de fecha y hora una vez al cargar la página
updateDateTime();
