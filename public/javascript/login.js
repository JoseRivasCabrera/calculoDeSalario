function handleCredentialResponse(response) {
    console.log('ID token:', response.credential);
    
    // Enviar al backend para verificación
    fetch('/session/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_token: response.credential })
    })
    .then(r => r.json())
    .then(data => {
      console.log('Respuesta backend:', data);
      alert(`Bienvenido ${data.user.name} (${data.user.email})`);
    })
    .catch(err => console.error('Error:', err));
  }
  
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: '358858690615-vmfeph3nr3kq9kquadh92qj8uev72rk0.apps.googleusercontent.com',
      callback: handleCredentialResponse
    });
  
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large' }
    );
  
    // Muestra One Tap
    google.accounts.id.prompt();
  };