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