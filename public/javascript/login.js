// --- ROTACIÓN ENTRE LOGIN Y REGISTRO ---
function flipCard() {
  const container = document.getElementById("cardContainer");
  container.classList.toggle("flipped");
}

// --- LOGIN MANUAL (botón ingresar) ---
document.getElementById("btnLogin").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Simulación simple (puedes conectar con backend real)
  alert(`Bienvenido ${email}`);
  window.location.href = "index.html";
});

// --- LOGIN CON GOOGLE ---
function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);
  console.log("Usuario autenticado:", data);
  alert(`Bienvenido ${data.name}`);
  window.location.href = "index.html";
}
