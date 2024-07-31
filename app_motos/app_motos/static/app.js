//Archivo js principal

//Ruta de api
const API_URL = 'http://127.0.0.1:8000/motos/api/motos/'; 
//Variable para almacenar el id de la moto a eliminar
let deleteId = null;


//Funcion para mostrar el nombre del usuario
const displayUsername = () => {
    //nombre del usuario asociado con "userbane" del almacenamiento local
    const username = localStorage.getItem('username');
    //Almacena la referencia al elemento en la variable usernameDisplay
    const usernameDisplay = document.getElementById('usernameDisplay');
    
    //Si username y userdisplay existen
    if (username && usernameDisplay) {
        //Esto actualiza la interfaz para mostrar el nombre de usuario
        usernameDisplay.textContent = `${username }`;
    } else {
        //si no se cumple mostrar
        console.warn('No se encontró el nombre de usuario o el elemento de visualización.');
    }
};

//Agrega un evento que escucha el momento en que el contenido del DOM está completamente cargado
window.addEventListener('DOMContentLoaded', () => {
    //Llama a la funcion para mostrar el nombre de usuario
    displayUsername();
    //Obtiene el valor asociado a la clave 'token' para la autenticación
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirige al login si no hay token
        window.location.href = 'login.html';
    } else {
        //Si hay token llamar a la funcion 
        getMotos();
    }
});

//Función para obtener las motos 
const getMotos = () => {
    //recupera el token
    const token = localStorage.getItem('token');

    //Realiza una solicitud HTTP a la URL 
    //especificada en API_URL usando el método GET
    fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    // Procesa la respuesta de la solicitud fetch
    .then(response => {
        //Si no es correcta lanza un error
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //Convierte la respuesta en json
        return response.json();
    })
    //Obtuvo el procesamiento json
    .then(data => {
        //Variable para almacenar los datos
        motos = data;
        //LLama a la funcion con(motos)
        renderResult(motos);
    })
    .catch(error => console.error('Error:', error));
};

//Funcion para renderizar y mostrar la lista de motos
const renderResult = (motos) => {
    // Selecciona el elemento HTML con el ID motosList
    const motosList = document.querySelector('#motosList');
    //Vacía el contenido HTML actual del contenedor motosList
    motosList.innerHTML = '';
    //Itera sobre cada elemento moto en el array
    motos.forEach(moto => {
        const motoItem = document.createElement('div');
        motoItem.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4'); // Ajusta las clases para diferentes tamaños de pantalla
         // Columna de tamaño medio para 3 tarjetas por fila
        motoItem.innerHTML = `
            <div class="card mb-4 ">
                <img src="${moto.image}" class="card-img-top" alt="Imagen de ${moto.reference}" style="ma">
                <div class="card-body">
                    <h5 class="card-title fw-bold mb-3 mt-2">${moto.reference}</h5>
                    <ul class="list-unstyled">
                        <li>
                            <p class="card-text"><b>Marca:</b>  ${moto.trademark}</p>
                        </li>
                        <li>
                            <p class="card-text"><b>Proveedor:</b> ${moto.supplier}</p>
                        </li>
                        <li>
                            <p class="card-text"><b>Modelo:</b>  ${moto.model}</p>
                        </li>
                        <li>
                            <p class="card-text"><b>Precio:</b>  ${moto.price}</p>
                        </li>
                    </ul>
                
                    <button class="btn btn-info" onclick="editMoto(${moto.id})">Editar</button>
                    <button class="btn btn-outline-danger" onclick="openModalConfirm(${moto.id})">Eliminar</button>
                </div>
            </div>
        `;
        //añade el nuevo ítem al final de la lista
        motosList.appendChild(motoItem);
    });
};

//Función para crear una moto
const createMoto = () => {
    //Recoge los datos del formulario #formadd en dorm data
    const formData = new FormData(document.querySelector('#formAdd'));

    //Verifica que todos los datos estén completos
    if (!formData.get('reference') || !formData.get('trademark') || !formData.get('price') || !formData.get('model') || !formData.get('image') || !formData.get('supplier')) {
        //Muestra el mensaje
        document.querySelector('#msgFormAdd').innerHTML = '* Llena todos los campos';
        return;
    }
    //si todos los datos están llenos no muestra el mensaje
    document.querySelector('#msgFormAdd').innerHTML = '';

    //Crea moto con todos los datos del formulario
    const moto = {
        reference: formData.get('reference'),
        trademark: formData.get('trademark'),
        model: formData.get('model'),
        image: formData.get('image'),
        price: formData.get('price'),
        supplier: formData.get('supplier'),
    };

    //rcupera el token
    const token = localStorage.getItem('token');

    //Utiliza la función fetch para enviar una solicitud POST al servidor. 
    fetch(API_URL, {
        method: 'POST',
        //los datos se envian en formato json
        body: JSON.stringify(moto),
        //Se configuran los encabezados (headers) 
        //para especificar que el contenido es JSON y para incluir el token de autenticación
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    //verifica si la respuesta es correcta
    .then(res => {
        if (!res.ok) {
            //Envía un mensaje de error
            throw new Error('La respuesta de la red no fue correcta');
        }
        return res.json();
    })
    //Respuesta es correcta
    .then(response => {
        //Alerta de moto agregada
        alertManager('success', 'Moto agregada exitosamente');
        //Actualiza la lista llamando la función
        getMotos();
        //Cierra el  modal
        closeModalAdd();
    })
    //Maneja los errores
    .catch(error => {
        //Muestra la alerta del error
        alertManager('error', 'Error al agregar la moto');
        console.error('There was a problem with the fetch operation:', error);
    });
};

//Funcion para llenar el formulario de edit
const editMoto = (id) => {
    //variable para encontrar la moto con el id seleccionado
    let moto = motos.find(m => m.id === id);

    //Utiliza document.querySelector para seleccionar cada campo 
    //del formulario de edición con el id formEdit
    //Asigna el valor correspondiente a cada campo
    document.querySelector('#formEdit #editID').value = moto.id;
    document.querySelector('#formEdit #editReference').value = moto.reference;
    document.querySelector('#formEdit #editTrademark').value = moto.trademark;
    document.querySelector('#formEdit #editModel').value = moto.model;
    document.querySelector('#formEdit #editImage').value = moto.image;
    document.querySelector('#formEdit #editSupplier').value = moto.supplier;
    document.querySelector('#formEdit #editPrice').value = moto.price;

    //Abre el modal con el formulario
    openModalEdit();
};

//Función para actualizar
const updateMoto = () => {
    //Recoge los valores de los campos del formulario de edición #formEdit
    //se asigna a una propiedad al objeto
    const moto = {
        reference: document.querySelector('#formEdit #editReference').value,
        trademark: document.querySelector('#formEdit #editTrademark').value,
        price: document.querySelector('#formEdit #editPrice').value,
        model: document.querySelector('#formEdit #editModel').value,
        image: document.querySelector('#formEdit #editImage').value,
        supplier: document.querySelector('#formEdit #editSupplier').value,
        id: document.querySelector('#formEdit #editID').value
    };

    //Verifica que ningun dato esté vacio
    if (!moto.reference || !moto.trademark || !moto.price || !moto.model || !moto.image || !moto.supplier) {
        //alerta de los datos vacios
        document.querySelector('#msgFormEdit').innerHTML = '* Los campos no deben estar vacíos';
        return;
    }
    //limpia la alerta
    document.querySelector('#msgFormEdit').innerHTML = '';

    //Recupera el token almacenado
    const token = localStorage.getItem('token');

    //Usa la función fetch para enviar una solicitud HTTP PUT al servidor
    //API_URL es la URL base del servidor 
    //moto.id se agrega al final para especificar el recurso que se va a actualizar
    fetch(`${API_URL}${moto.id}/`, {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        //Los encabezados (headers) indican que el contenido es JSON y se incluye el token de autenticación
        body: JSON.stringify(moto)
    })
    //Verifica si la solicitud es positiva
    .then(res => {
        if (!res.ok) {
            //Si no es positiva envia el mensaje de error
            return res.text().then(text => { throw new Error(text); });
        }
        return res.json();
    })
    //Si es positiva muestra la alerta 
    .then(response => {
        alertManager('success', 'Moto actualizada exitosamente');
        //Se llama a la funcion para actualizar las motos y cierra el modal
        getMotos();
        closeModalEdit();
    })
    //Si hay un error muestra el error
    .catch(error => {
        alertManager('error', `Error al actualizar la moto: ${error.message}`);
        console.error('Error:', error);
    });
};

//Funcion para eliminar moto
const deleteMoto = (id) => {
    //Recupera el token de autenticación local
    const token = localStorage.getItem('token');

    //Usa la función fetch para enviar una solicitud HTTP DELETE al servidor. 
    //API_URL es la URL base del servidor 
    //${id} se concatena a la URL para especificar la moto que se desea eliminar.
    return fetch(`${API_URL}${id}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    //Verifica la respuesta de la solicitud
    .then(res => {
        //Si la respuesta no es positiva lanza el error
        if (!res.ok) {
            return res.text().then(text => { throw new Error(text); });
        }
        //si la respuesta es correcta la convierte a json
        return res.json();
    })
    //Muestra la alerta de solicitud exitosa
    .then(response => {
        alertManager('success', 'Moto eliminada exitosamente');
        //actualiza las motos y cierra el modal
        getMotos();
        closeModalConfirm();
    })
    //Maneja el error y muestra la alerta de error
    .catch(error => {
        alertManager('error', `Error al eliminar la moto: ${error.message}`);
        console.error('Error:', error);
    });
};

//Alerta de confirmacion
const confirmDelete = (res) => {
    //si res es true (confirma la eliminacion)
    if (res) {
        //envia delete al servidor 
        deleteMoto(deleteId).then(() => {
            // Recargar la página después de la eliminación
            location.reload();
        });
    } else {
        //si la respuesta es false cierra el modal
        closeModalConfirm();
    }
};

//Funcion para cerrar el modal
const closeModalAdd = () => {
    //oculta el modal
    document.querySelector('#modalAdd').style.display = 'none';
    //limpia los campos y lo deja en su estado inicial
    document.querySelector('#formAdd').reset();
    //limpia el mensaje de error
    document.querySelector('#msgFormAdd').innerHTML = '';
};

//Funcion para abrir el modal
const openModalAdd = () => {
    //cambia el estilo del modal para mostrarlo
    document.querySelector('#modalAdd').style.display = 'block';
};

//Funcion para cerrar el modal de editar
const closeModalEdit = () => {
    //oculta el modal
    document.querySelector('#modalEdit').style.display = 'none';
    //limpia los campos y lo deja en su estado inicial
    document.querySelector('#formEdit').reset();
    //limpia el mensaje de error
    document.querySelector('#msgFormEdit').innerHTML = '';
};

//Funcion para abrir el modal de editar
const openModalEdit = () => {
    //cambia el estilo del modal para mostrarlo
    document.querySelector('#modalEdit').style.display = 'block';
};

//Funcion para cerrar el modal de eliminar
const closeModalConfirm = () => {
    //cambia el estilo para ocultarlo
    document.querySelector('#modalConfirm').style.display = 'none';
};

//Funcion para abrir el modal de eliminar
const openModalConfirm = (id) => {
    //variable para almacnar el id de la moto a eliminar
    deleteId = id;
    //cambia el estilo del modal para mostrarlo
    document.querySelector('#modalConfirm').style.display = 'block';
};

//Función para las alertas
const alertManager = (type, msg) => {
    //selecciona el elemento DOM con el id alert
    const alert = document.querySelector('#alert');
    //establece el contenido de la alerta con la alerta esperada 
    alert.innerHTML = msg;
    //Memsajes de error y de exito
    alert.classList.remove('error', 'success');
    //cambia el estilo de la alerta
    alert.classList.add(type);
    //cambia el estilo para que sea visible
    alert.style.display = 'block';
    //Oculta el elemento despues de 3 segundos
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
};




