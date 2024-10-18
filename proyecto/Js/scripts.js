// Validación de inicio de sesión
document.getElementById('loginForm')?.addEventListener('submit', function validarLogin(event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert("Todos los campos son obligatorios.");
    return false; // Evitar el envío del formulario
  }

  if (!validarEmail(email)) {
    alert("Por favor, introduce un email válido.");
    return false; // Evitar el envío del formulario
  }

  // Alerta de inicio de sesión exitoso
  ("Inicio de sesión exitoso");
  
  return false; // Permitir el envío si es necesario
});

// Función de validación de email
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}


// Validación de registro de usuario
document.getElementById('signupForm')?.addEventListener('submit', function validarRegistro(event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value.trim();  // Eliminar espacios en blanco
  const confirmPassword = document.getElementById('confirmPassword').value.trim();  // Eliminar espacios en blanco

  // Verificar que todos los campos estén completos
  if (!name || !email || !password || !confirmPassword) {
    alert("Todos los campos son obligatorios.");
    return false; // Evitar el envío del formulario
  }

  // Validar que el correo electrónico sea válido
  if (!validarEmail(email)) {
    alert("Por favor, introduce un email válido.");
    return false; // Evitar el envío del formulario
  }

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return false; // Evitar el envío del formulario
  }

  

  // Si todo está correcto, mostrar la alerta de registro exitoso
  alert("Registro exitoso");
  return true; // Permitir el envío del formulario
});

// Función para validar el formato de un correo electrónico
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Función para validar que la contraseña cumpla los criterios: 
// mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula, y un número.
function validarContrasena(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
}


// Validación de progreso de ejercicio
document.getElementById('progresoForm')?.addEventListener('submit', function validarRegistroProgreso(event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

  const fecha = document.getElementById('fecha').value;
  const ejercicio = document.getElementById('ejercicio').value;
  const duracion = document.getElementById('duracion').value;
  const calorias = document.getElementById('calorias').value;
  const alimentos = document.getElementById('alimentos').value || 'No registrado';

  if (!fecha || !ejercicio || !duracion || !calorias) {
    alert("Todos los campos obligatorios deben estar llenos.");
    return false; // Evitar el envío del formulario
  }

  alert("Progreso registrado con éxito");
  return true; // Permitir el envío si es necesario
});

// Función para validar la contraseña
function validarContrasena(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
}
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Validar login y redirigir
  if (email === "admin@test.com" && password === "admin") {
      window.location.href = "./Html/Admin/login.html";
  } else if (email === "user@test.com" && password === "user") {
      window.location.href = "./Html/User/login.html";
  } else {
      alert("Correo o contraseña incorrectos.");
  }
});
document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe normalmente



  // Obtener los valores de los campos
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Guardar los datos en localStorage
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("gender", gender);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password); // No es recomendable almacenar contraseñas de esta forma

  // Redirigir a la página del perfil
  window.location.href = 'profile.html'; // Asegúrate de que este sea el nombre correcto de tu archivo de perfil
});
console.log("Formulario enviado, redirigiendo a perfil...");
window.location.href = 'profile.html'; 
// Manejar el evento de envío del formulario de registro
document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que el formulario se envíe normalmente

  // Obtener los valores de los campos de registro
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Guardar los valores en el localStorage
  localStorage.setItem("name", name);
  localStorage.setItem("surname", surname);
  localStorage.setItem("gender", gender);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  // Redirigir a la página del perfil después del registro
  window.location.href = 'profile.html';
});
// Manejar el evento de envío del formulario de inicio de sesión
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que el formulario se envíe normalmente

  // Obtener los valores de los campos de inicio de sesión
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Obtener los datos almacenados en localStorage
  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");

  // Validar las credenciales
  if (email === storedEmail && password === storedPassword) {
      // Si las credenciales coinciden, redirigir a la página del perfil
      window.location.href = 'profile.html';
  } else {
      // Si no coinciden, mostrar un mensaje de error
      alert("Email o contraseña incorrectos. Inténtalo de nuevo.");
  }
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del formulario

  // Validar el formulario si es necesario, o simplemente redirigir
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const gender = document.getElementById('gender').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validaciones básicas (ejemplo)
  if (name && surname && gender && email && password) {
    // Aquí puedes hacer la lógica del registro si tienes un backend,
    // o simplemente redirigir después de simular un registro exitoso.

    // Simulamos el registro y redirigimos al perfil
    window.location.href = "perfil.html"; // Redirige a la página de perfil
  } else {
    alert("Por favor completa todos los campos.");
  }
});
