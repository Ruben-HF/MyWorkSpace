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






//FUNCIONES PARA CAMBIAR TAMAÑO DE LAS SECCIONES

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

// Función para cambiar el tamaño de la sección Concepts-App
const conceptsButton = document.getElementById("concepts-button");
const conceptsSection = document.querySelector(".Concepts-App");

conceptsButton.addEventListener("click", () => {
    if (conceptsSection.style.width === "45%" || conceptsSection.style.width === "") {
        conceptsSection.style.width = "100%";
    } else {
        conceptsSection.style.width = "45%";
    }
});

// Función para cambiar el tamaño de la sección LinkDash-App
const LinkDashButton = document.getElementById("linkdash-button");
const LinkDashSection = document.querySelector(".LinkDash-App");

LinkDashButton.addEventListener("click", () => {
    if (LinkDashSection.style.width === "45%" || LinkDashSection.style.width === "") {
        LinkDashSection.style.width = "100%";
    } else {
        LinkDashSection.style.width = "45%";
    }
});





//FUNCIONES PARA OCULTAR LAS SECCIONES


// Función para ocultar o mostrar la sección Quick-Notes-App al presionar el botón correspondiente
const quickNotesButtonView = document.getElementById("quicknotes-button-view");
const quickNotesSectionView = document.getElementById("quicknotes");

quickNotesButtonView.addEventListener("click", () => {
    if (quickNotesSectionView.style.display === "none") {
        quickNotesSectionView.style.display = "flex";
    } else {
        quickNotesSectionView.style.display = "none";
    }
});

// Función para ocultar o mostrar la sección Quick-Reminders-App al presionar el botón correspondiente
const remindersButtonView = document.getElementById("reminders-button-view");
const remindersSectionView = document.getElementById("reminders");

remindersButtonView.addEventListener("click", () => {
    if (remindersSectionView.style.display === "none") {
        remindersSectionView.style.display = "flex";
    } else {
        remindersSectionView.style.display = "none";
    }
});

// Función para ocultar o mostrar la sección Concepts al presionar el botón correspondiente
const conceptsButtonView = document.getElementById("concepts-button-view");
const conceptsSectionView = document.getElementById("concepts");

conceptsButtonView.addEventListener("click", () => {
    if (conceptsSectionView.style.display === "none") {
        conceptsSectionView.style.display = "flex";
    } else {
        conceptsSectionView.style.display = "none";
    }
});

// Función para ocultar o mostrar la sección LinkDash al presionar el botón correspondiente
const linkdashButtonView = document.getElementById("linkdash-button-view");
const linkdashSectionView = document.getElementById("linkdashSection");

linkdashButtonView.addEventListener("click", () => {
    if (linkdashSectionView.style.display === "none") {
        linkdashSectionView.style.display = "flex";
    } else {
        linkdashSectionView.style.display = "none";
    }
});

// Función para ocultar o mostrar la sección use-reminders
const useQRButton = document.getElementById("use-QR");
const useRemindersSection = document.getElementById("use-reminders");

useQRButton.addEventListener("click", () => {
    if (useRemindersSection.style.display === "none" || useRemindersSection.style.display === "") {
        useRemindersSection.style.display = "block";
    } else {
        useRemindersSection.style.display = "none";
    }
});





// TO-DO REMINDERS APP

// Obtener referencias a elementos del DOM
const reminderInput = document.getElementById("reminder-input");
const addReminderButton = document.getElementById("add-reminder-button");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");
const clearCompletedButton = document.getElementById("clear-completed-button");

// Obtener los datos almacenados en localStorage (si los hay)
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let completedTodos = JSON.parse(localStorage.getItem("completedTodos")) || [];

// Función para renderizar la lista de recordatorios
function renderTodos() {
    todoList.innerHTML = "";
    completedList.innerHTML = "";

    todos.forEach((todo, index) => {
        const listItem = createListItem(todo, index);
        todoList.appendChild(listItem);
    });

    completedTodos.forEach((todo, index) => {
        const listItem = createListItem(todo, index, true);
        completedList.appendChild(listItem);
    });
}

renderTodos();

// Función para crear un elemento de lista con la opción de completado
function createListItem(text, index, isCompleted = false) {
    const listItem = document.createElement("li");
    listItem.textContent = text;

    if (isCompleted) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.classList.add("delete-button"); // Aplica la clase delete-button
        deleteButton.addEventListener("click", () => deleteCompleted(index));

        listItem.appendChild(deleteButton);
        listItem.classList.add("completed");
    } else {
        listItem.addEventListener("click", () => completeTodo(index));
    }

    return listItem;
}

// Función para agregar un nuevo recordatorio
function addTodo() {
    if (reminderInput.value.trim() !== "") {
        todos.push(reminderInput.value);
        reminderInput.value = "";
        renderTodos();
        updateLocalStorage();
    }
}

// Función para marcar un recordatorio como completado
function completeTodo(index) {
    const completedTodo = todos.splice(index, 1)[0];
    completedTodos.push(completedTodo);
    renderTodos();
    updateLocalStorage();
}

// Función para borrar un recordatorio completado
function deleteCompleted(index) {
    completedTodos.splice(index, 1);
    renderTodos();
    updateLocalStorage();
}

// Función para actualizar los datos en localStorage
function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
}

// Función para borrar todos los recordatorios completados
function clearCompleted() {
    completedTodos = [];
    renderTodos();
    updateLocalStorage();
}

// Evento para agregar un nuevo recordatorio al hacer clic en el botón
addReminderButton.addEventListener("click", addTodo);

// Evento para borrar todos los recordatorios completados
clearCompletedButton.addEventListener("click", clearCompleted);

// Llamar a la función para renderizar los recordatorios al cargar la página
renderTodos();


