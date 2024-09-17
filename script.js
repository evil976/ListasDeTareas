// Seleccionamos los elementos de la página
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const prioritySelect = document.getElementById("priority");
const loadingSpinner = document.getElementById("loadingSpinner");
const passwordDialog = document.getElementById("passwordDialog");
const passwordInput = document.getElementById("passwordInput");
const confirmPasswordButton = document.getElementById("confirmPasswordButton");
const cancelPasswordButton = document.getElementById("cancelPasswordButton");
const passwordError = document.getElementById("passwordError");

// Mapa para asignar colores a las prioridades
const priorityColors = new Map([
    ["alta", "red"],
    ["media", "orange"],
    ["baja", "green"]
]);

// Contraseña para eliminar tareas
const correctPassword = "1234"; // Cambia esta contraseña según tus necesidades

// Función para agregar una tarea con prioridad
function addTaskWithDelay(taskText) {
    if (taskText === "") {
        alert("Por favor, ingrese una tarea.");
        return;
    }

    // Mostrar el spinner antes de agregar la tarea
    loadingSpinner.style.display = "block";

    // Usar setTimeout para simular la carga
    setTimeout(() => {
        // Después de la carga, agregar la tarea
        addTask(taskText);

        // Ocultar el spinner
        loadingSpinner.style.display = "none";
    }, 2000); // Simula un retraso de 2 segundos (puedes ajustarlo)
}

// Función para agregar la tarea (sin retraso)
function addTask(taskText, priority = prioritySelect.value) {
    if (taskText === "") {
        alert("Por favor, ingrese una tarea.");
        return;
    }

    // Crear un nuevo elemento <li>
    const taskItem = document.createElement("li");

    // Crear un span para el texto de la tarea
    const taskTextElement = document.createElement("span");
    taskTextElement.innerText = taskText;

    // Asignar el color basado en la prioridad
    setTaskPriority(taskItem, priority);

    // Crear el botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Eliminar";
    deleteButton.classList.add("delete-button");

    // Añadir evento al botón de eliminar
    deleteButton.addEventListener("click", function() {
        showPasswordDialog(() => {
            taskList.removeChild(taskItem);
            saveTasks(); // Guardar cambios en localStorage
        }); // Mostrar el cuadro de diálogo para ingresar la contraseña
    });

    // Añadir evento de clic para marcar la tarea como completada
    taskTextElement.addEventListener("click", function() {
        taskTextElement.classList.toggle("completed");
        saveTasks(); // Guardar cambios en localStorage
    });

    // Añadir el texto y el botón a la tarea
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(deleteButton);

    // Añadir la tarea a la lista
    taskList.appendChild(taskItem);

    // Limpiar el campo de entrada
    taskInput.value = "";

    // Guardar la tarea en localStorage
    saveTasks();
}

// Función para asignar color según la prioridad
function setTaskPriority(taskItem, priority) {
    switch (priority) {
        case "alta":
            taskItem.style.backgroundColor = priorityColors.get("alta");
            break;
        case "media":
            taskItem.style.backgroundColor = priorityColors.get("media");
            break;
        case "baja":
            taskItem.style.backgroundColor = priorityColors.get("baja");
            break;
        default:
            taskItem.style.backgroundColor = "white"; // Si no hay prioridad definida
    }
}

// Función para guardar las tareas en localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        const text = task.querySelector("span").innerText;
        const completed = task.querySelector("span").classList.contains("completed");
        const color = task.style.backgroundColor; // Guardamos el color (prioridad)
        const priority = [...priorityColors].find(([key, value]) => value === color)?.[0]; // Buscar la prioridad por color
        tasks.push({ text, completed, priority });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Función para cargar las tareas desde localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTask(task.text, task.priority);
        const taskElement = taskList.children[taskList.children.length - 1];
        taskElement.querySelector("span").classList.toggle("completed", task.completed);
    });
}

// Función para mostrar el cuadro de diálogo para ingresar la contraseña
function showPasswordDialog(callback) {
    passwordDialog.style.display = "block";

    // Manejar el clic en el botón de confirmar
    confirmPasswordButton.addEventListener("click", function() {
        const enteredPassword = passwordInput.value;
        if (enteredPassword === correctPassword) {
            // Ejecutar la función de callback y ocultar el cuadro de diálogo
            callback();
            passwordDialog.style.display = "none";
            passwordInput.value = "";
            passwordError.style.display = "none";
        } else {
            // Mostrar mensaje de error
            passwordError.style.display = "block";
        }
    });

    // Manejar el clic en el botón de cancelar
    cancelPasswordButton.addEventListener("click", function() {
        passwordDialog.style.display = "none";
        passwordInput.value = "";
        passwordError.style.display = "none";
    });
}

// Evento para añadir una nueva tarea cuando se hace clic en el botón
addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value;
    addTaskWithDelay(taskText);
});

// Evento para eliminar todas las tareas
document.getElementById("clearAllButton").addEventListener("click", function() {
    showPasswordDialog(() => {
        taskList.innerHTML = "";
        saveTasks(); // Guardar cambios en localStorage
    }); // Mostrar el cuadro de diálogo para ingresar la contraseña
});

// Cargar tareas al iniciar
loadTasks();
