//selecciona el formulario con #loginForm
//eventlistener para recibir el submit cuando se envia el formulario
document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Previene el envío del formulario por defecto
    event.preventDefault(); 
    //Obtiene los valores de loss campos de usuario y contraseña
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //Utiliza fetch para enviar una solicitud HTTP POST a la URL 
    fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
            //encabezados para indicar que el contenido es JSON
            'Content-Type': 'application/json'
        },
        //usuario y contraseña en formato json
        body: JSON.stringify({ username, password })
    })
    //Respuesta de la solicitud a foemato json
    .then(response => response.json())
    .then(data => {
        //verificar si tiene un token de acceso
        if (data.access) {
            // Guarda el token y el nombre de usuario en el almacenamiento local
            localStorage.setItem('token', data.access);
            localStorage.setItem('username', username);
            // Redirige al índice de la lista de motos
            window.location.href = '/motos/'; // Asegúrate de que esta URL es correcta
        } else {
            //Si no hay token mostrar alerta
            alert('Falló el inicio de sesión');
        }
    })
    .catch(error => console.error('Error:', error));
});
