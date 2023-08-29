// Obtener referencias a elementos del DOM
const conceptInput = document.getElementById("concept-input");
const descriptionInput = document.getElementById("description-input");
const addConceptButton = document.getElementById("add-concept-button");
const conceptList = document.getElementById("concept-list");

// Obtener los datos almacenados en localStorage (si los hay)
let concepts = JSON.parse(localStorage.getItem("concepts")) || [];

// Función para renderizar la lista de conceptos
function renderConcepts() {
    conceptList.innerHTML = "";

    concepts.forEach((concept, index) => {
        const conceptItem = createConceptItem(concept, index);
        conceptList.appendChild(conceptItem);
    });
}

// Función para renderizar la lista de conceptos según la búsqueda
function renderConcepts(searchText = "") {
    conceptList.innerHTML = "";

    concepts.forEach((concept, index) => {
        if (concept.text.toLowerCase().includes(searchText.toLowerCase())) {
            const conceptItem = createConceptItem(concept, index);
            conceptList.appendChild(conceptItem);
        }
    });
}

// Función para manejar el cambio en el input de búsqueda
function handleSearchInput() {
    const searchText = conceptInput.value.trim();
    renderConcepts(searchText);
}

// Evento para escuchar cambios en el input de búsqueda
conceptInput.addEventListener("input", handleSearchInput);


// Función para crear un elemento de lista con el concepto y descripción
function createConceptItem(concept, index) {
    const listItem = document.createElement("li");
    listItem.classList.add("concept-item");

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("concept-title");
    titleContainer.textContent = concept.text;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("concept-buttons");

    const descriptionButton = document.createElement("button");
    descriptionButton.textContent = "📘";
    descriptionButton.classList.add("description-button");
    descriptionButton.addEventListener("click", () => toggleDescription(index));

    const editButton = document.createElement("button");
    editButton.textContent = "✎";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => editConcept(index));

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "🗑️";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => confirmDeleteConcept(index));

    buttonsContainer.appendChild(descriptionButton);
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    listItem.appendChild(titleContainer);
    listItem.appendChild(buttonsContainer);

    if (concept.descriptionVisible) {
        const description = document.createElement("p");
        description.classList.add("concept-description");
        description.textContent = concept.description;

        const editDescriptionButton = document.createElement("button");
        editDescriptionButton.textContent = "Edit Description";
        editDescriptionButton.classList.add("edit-description-button");
        editDescriptionButton.addEventListener("click", () => editDescription(index));

        listItem.appendChild(description);
        listItem.appendChild(editDescriptionButton);
    }

    return listItem;
}

// Función para editar un concepto
function editConcept(index) {
    const newConceptText = prompt("Enter the new concept text:", concepts[index].text);
    if (newConceptText !== null) {
        concepts[index].text = newConceptText;
        renderConcepts();
        updateLocalStorage();
    }
}

// Función para editar la descripción de un concepto
function editDescription(index) {
    const newDescription = prompt("Edit the description:", concepts[index].description);
    if (newDescription !== null) {
        concepts[index].description = newDescription;
        renderConcepts();
        updateLocalStorage();
    }
}

// Función para agregar un nuevo concepto con descripción
function addConcept() {
    const conceptText = conceptInput.value.trim();
    const descriptionText = descriptionInput.value.trim();

    if (conceptText !== "") {
        concepts.push({ text: conceptText, description: descriptionText, descriptionVisible: false });
        conceptInput.value = "";
        descriptionInput.value = "";
        renderConcepts();
        updateLocalStorage();
    }
}

// Función para mostrar u ocultar la descripción de un concepto
function toggleDescription(index) {
    concepts[index].descriptionVisible = !concepts[index].descriptionVisible;
    renderConcepts();
}

// Función para confirmar y borrar un concepto
function confirmDeleteConcept(index) {
    const confirmDelete = confirm("Are you sure you want to delete this concept?");
    if (confirmDelete) {
        concepts.splice(index, 1);
        renderConcepts();
        updateLocalStorage();
    }
}

// Función para actualizar los datos en localStorage
function updateLocalStorage() {
    localStorage.setItem("concepts", JSON.stringify(concepts));
}

// Evento para agregar un nuevo concepto al hacer clic en el botón
addConceptButton.addEventListener("click", addConcept);

// Llamar a la función para renderizar los conceptos al cargar la página
renderConcepts();


