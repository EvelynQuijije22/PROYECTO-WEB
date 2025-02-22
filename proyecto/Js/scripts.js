
document.getElementById('loginForm')?.addEventListener('submit', function validarLogin(event) {
  event.preventDefault(); 

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert("Todos los campos son obligatorios.");
    return false; 
  }

  if (!validarEmail(email)) {
    alert("Por favor, introduce un email válido.");
    return false; 
  }

  ("Inicio de sesión exitoso");
  
  return false; 
});


function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}



document.getElementById('signupForm')?.addEventListener('submit', function validarRegistro(event) {
  event.preventDefault(); 

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value.trim();  
  const confirmPassword = document.getElementById('confirmPassword').value.trim();  

 
  if (!name || !email || !password || !confirmPassword) {
    alert("Todos los campos son obligatorios.");
    return false; 
  }

 
  if (!validarEmail(email)) {
    alert("Por favor, introduce un email válido.");
    return false; 
  }

 
  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return false; 
  }

  

  alert("Registro exitoso");
  return true;
});


function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}


function validarContrasena(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
}



document.getElementById('progresoForm')?.addEventListener('submit', function validarRegistroProgreso(event) {
  event.preventDefault(); 

  const fecha = document.getElementById('fecha').value;
  const ejercicio = document.getElementById('ejercicio').value;
  const duracion = document.getElementById('duracion').value;
  const calorias = document.getElementById('calorias').value;
  const alimentos = document.getElementById('alimentos').value || 'No registrado';

  if (!fecha || !ejercicio || !duracion || !calorias) {
    alert("Todos los campos obligatorios deben estar llenos.");
    return false; 
  }

  alert("Progreso registrado con éxito");
  return true; 
});


function validarContrasena(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
}
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (email === "admin@test.com" && password === "admin") {
      window.location.href = "./Html/Admin/login.html";
  } else if (email === "user@test.com" && password === "user") {
      window.location.href = "./Html/User/login.html";
  } else {
      alert("Correo o contraseña incorrectos.");
  }
});
document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault(); 



  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;


  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("gender", gender);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password); 


  window.location.href = 'profile.html'; 
});
console.log("Formulario enviado, redirigiendo a perfil...");
window.location.href = 'profile.html'; 

document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault(); 

  
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

 
  localStorage.setItem("name", name);
  localStorage.setItem("surname", surname);
  localStorage.setItem("gender", gender);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

 
  window.location.href = 'profile.html';
});
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  
  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");

  if (email === storedEmail && password === storedPassword) {
      
      window.location.href = 'profile.html';
  } else {
      
      alert("Email o contraseña incorrectos. Inténtalo de nuevo.");
  }
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const gender = document.getElementById('gender').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (name && surname && gender && email && password) {
  

 
    window.location.href = "perfil.html"; 
  } else {
    alert("Por favor completa todos los campos.");
  }
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const gender = document.getElementById('gender').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;


  if (name && surname && gender && email && password) {
   

   
    window.location.href = "perfil.html"; 
  } else {
    alert("Por favor completa todos los campos.");
  }
});
document.getElementById('progreso-form').addEventListener('submit', function(event) {
  
  event.preventDefault();

  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const fecha = document.getElementById('fecha').value;
  const notas = document.getElementById('notas').value;

  
  if (isNaN(peso) || peso <= 0) {
      alert("Por favor, ingresa un peso válido mayor a 0.");
      return; 
  }

  if (isNaN(altura) || altura <= 0) {
      alert("Por favor, ingresa una altura válida mayor a 0.");
      return;
  }


  if (fecha === "") {
      alert("Por favor, selecciona una fecha.");
      return;
  }

  if (notas.trim() === "") {
      alert("Por favor, ingresa alguna observación en el campo de notas.");
      return;
  }


  alert("Se guardó exitosamente");
});


