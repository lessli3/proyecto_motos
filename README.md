# Aplicación Django - Administrar motocicletas.
<p>Esta es una aplicación que permite gestionar la información de motocicletas, a través de un sistema CRUD, permitiendo acceder a su contenido por medio de una API.</p>

## Fucionamiento

### Templates 
<p>Encontraremos las plantillas HTML que permitirán mostrar el Inicio de Sesión y la vista principal.
</p>

- `templates/index.html`
- `templates/login.html`

### Static - Archivos estáticos 
<p>Podemos acceder al archivo  CSS para estilos de las plantillas y a los archivos JS relacionados con el login y la vista principal.
</p>

- Vista principal: `static/app.js`

- Inicio sesión : `static/login.js`

- CSS : `static/css/style.css`

### URL
<p>Contiene la configuración de las URLs de la aplicación web en `urls.py`, ideales para reconocer las vistas que deben manejar las solicitudes.</p>

### Models
<p>En el archivo `models.py` se crea la estructura de la tabla en la base de datos, en donde se definen los campos, en este caso, de las motocicletas.
</p>

### Serializers
<p>El archivo  `serializers.py`  permite la relación entre los datos en la base de datos y el formato que se envía o recibe a través de una API, también permite convertir datos en formatos como JSON.
</p>

### Views
<p>En `views.py` encontramos las clases/funciones que permiten manejar las operaciones CRUD para el modelo, usando el serializer.</p>

## Ejecución del proyecto
>Ejecuta en tu terminal o linea de comandos:                   
### 1. Clonar el proyecto

```bash
git clone https://github.com/lessli3/proyecto_motos.git

```
### 2. Crear el entorno virtual
   
```bash
py -m venv venv

```
### 3. Activar el entorno virtual
   
```bash
cd venv\Scripts>activate
```
### 4. Verificar si se reconoce django y si no, instalarlo
   
```bash
pip install django

```
### 5. Instalar las dependencias
   
```bash
pip install -r requirements.txt

```
### 6. Ejecutamos Migraciones
   
```bash
py manage.py migrate

```
### 7. Creamos un administrador (para ingresar al aplicativo)
   
```bash
py manage.py createsuperuser

```
### 8. Ejecutamos el servidor
   
```bash
py manage.py runserver

```

## Visualización: 

>Inicio de sesión
![](https://github.com/lessli3/proyecto_motos/blob/b757519cc1fabc4cf5ac5f7621dc0354eeb8a04f/login.png)

>Página Principal
![](https://github.com/lessli3/proyecto_motos/blob/b757519cc1fabc4cf5ac5f7621dc0354eeb8a04f/index.png)

>Agregar Moto
![](https://github.com/lessli3/proyecto_motos/blob/b757519cc1fabc4cf5ac5f7621dc0354eeb8a04f/a%C3%B1adir.png)

>Editar Moto
![](https://github.com/lessli3/proyecto_motos/blob/b757519cc1fabc4cf5ac5f7621dc0354eeb8a04f/editar.png)

>Eliminar Moto
![](https://github.com/lessli3/proyecto_motos/blob/b757519cc1fabc4cf5ac5f7621dc0354eeb8a04f/eliminar.png)


