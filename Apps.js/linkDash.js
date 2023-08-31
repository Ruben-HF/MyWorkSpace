// Obtener referencias a elementos del DOM
const pageNameInput = document.getElementById("page-name-input");
const pageLinkInput = document.getElementById("page-link-input");
const addLinkButton = document.getElementById("add-link-button");
const linkList = document.getElementById("link-list");

// Obtener los datos almacenados en localStorage (si los hay)
let links = JSON.parse(localStorage.getItem("links")) || [];

// Función para renderizar la lista de links
function renderLinks() {
    linkList.innerHTML = "";

    links.forEach((link) => {
        const linkItem = createLinkItem(link.name, link.link);
        linkList.appendChild(linkItem);
    });
}

// Función para crear un elemento de div con el link y nombre
function createLinkItem(name, link, index) {
    const linkDiv = document.createElement("div");
    linkDiv.classList.add("link-item");

    const linkAnchor = document.createElement("a");
    linkAnchor.href = link;
    linkAnchor.target = "_blank";
    linkAnchor.textContent = name;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.classList.add("delete-link-button");
    deleteButton.addEventListener("click", () => deleteLink(index));

    linkDiv.appendChild(linkAnchor);
    linkDiv.appendChild(deleteButton);

    return linkDiv;
}

// Función para eliminar un link
function deleteLink(index) {
    links.splice(index, 1);
    renderLinks();
    updateLocalStorage();
}

// Función para agregar un nuevo link
function addLink() {
    const name = pageNameInput.value.trim();
    const link = pageLinkInput.value.trim();

    if (name !== "" && link !== "") {
        links.push({ name, link });
        pageNameInput.value = "";
        pageLinkInput.value = "";
        renderLinks();
        updateLocalStorage();
    }
}

// Función para actualizar los datos en localStorage
function updateLocalStorage() {
    localStorage.setItem("links", JSON.stringify(links));
}

// Evento para agregar un nuevo link al hacer clic en el botón
addLinkButton.addEventListener("click", addLink);

// Llamar a la función para renderizar los links al cargar la página
renderLinks();
