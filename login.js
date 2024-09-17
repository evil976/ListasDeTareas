// Seleccionamos los elementos de la página de inicio de sesión
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const loginError = document.getElementById("loginError");
const loadingSpinner = document.getElementById("loadingSpinner");

// Datos de ejemplo para usuario y contraseña
const validUsername = "admin";
const validPassword = "admin";

// Función para manejar el inicio de sesión
function handleLogin() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Mostrar el spinner antes de realizar la verificación
    loadingSpinner.style.display = "block";

    setTimeout(() => {
        // Ocultar el spinner después de la verificación
        loadingSpinner.style.display = "none";
        
        if (username === validUsername && password === validPassword) {
            // Guardar el estado de autenticación en localStorage
            localStorage.setItem("loggedIn", "true");
            // Redirigir a la página de la lista de tareas
            window.location.href = "index.html";
        } else {
            // Mostrar mensaje de error
            loginError.style.display = "block";
        }
    }, 2000); // Simula un retraso de 2 segundos
}

// Evento para manejar el clic en el botón de inicio de sesión
loginButton.addEventListener("click", handleLogin);

// Verificar si el usuario ya está autenticado
window.onload = function() {
    if (localStorage.getItem("loggedIn") === "true") {
        // Redirigir a la página de la lista de tareas si ya está autenticado
        window.location.href = "index.html";
    }
};
