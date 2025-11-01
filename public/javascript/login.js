function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);
  console.log("Usuario autenticado:", data);
  alert(`Bienvenido ${data.name}`);
  // Redirige a la página principal o dashboard
  window.location.href = "home.html";
}