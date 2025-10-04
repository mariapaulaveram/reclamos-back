# Voz Ciudadana – Backend
Este proyecto Express.js gestiona la lógica del servidor para la aplicación Voz Ciudadana. Permite registrar vecinos, recibir reclamos municipales, encuesta de satisfaccion, administrar sesiones, almacenar datos en MySQL y servir vistas con Handlebars.

## Scripts disponibles
`npm start`      # Inicia el servidor con nodemon desde ./bin/www


## Requisitos técnicos
Node.js 

npm

MySQL (gestionado con MySQL Workbench)


## 🚀 Instalación y ejecución
### Clonar el repositorio
git clone https://github.com/mariapaulaveram/reclamos-back.git

# Ir al directorio del backend
cd reclamos-back

# Instalar dependencias
npm install

# Configurar variables de entorno (crear archivo .env)
- PORT=3000
- DB_URL=...

# Ejecutar el servidor
npm start


## Dependencias principales
- express – Framework web
- mysql2 – Conexión con base de datos MySQL
- express-session – Manejo de sesiones
- cors – Permite peticiones desde el frontend
- dotenv – Variables de entorno
- express-fileupload y multer – Manejo de archivos
- cloudinary y streamifier – Subida de imágenes
- hbs – Motor de plantillas Handlebars
- md5 – Encriptación de contraseñas
- nodemailer – Envío de correos electrónicos para recuperación de contraseña
- crypto – Generación de tokens seguros para restablecimiento
- cookie-parser, morgan, http-errors, debug – Utilidades varias



## Middleware y configuración
- cors() habilitado para permitir peticiones desde el frontend (http://localhost:5173)

- express.json() y express.urlencoded() para manejar JSON y formularios

- express-session para autenticación de usuarios

- hbs.registerHelper() con helpers personalizados (ifCond, range, add, subtract)

- express.static() para servir archivos públicos


## Estructura del proyecto

```
reclamos-back/
├── bin/
│   └── www
│
├── controllers/
│   └── reclamosController.js
│
├── models/
│   ├── bd.js
│   ├── encuestasModel.js
│   ├── reclamosModel.js
│   ├── usuariosModel.js
│   └── vecinosModel.js
│
├── public/
│   └── images/
│
├── routes/
│   ├── api.js
│   ├── index.js
│   ├── reclamos.js
│   ├── users.js
│   ├── vecinos.js
│   └── admin/
│       ├── admin-reclamos.js
│       ├── inicio.js
│       ├── login.js
│       ├── verEncuesta.js
│       └── verReclamos.js
│
├── services/
│   └── cloudinaryServices.js
│   └── enviarCorreo.js
│
├── views/
│   ├── error.hbs
│   ├── index.hbs
│   ├── layout.hbs
│   └── admin/
│       ├── inicio.hbs
│       ├── layout.hbs
│       ├── login.hbs
│       ├── modificar.hbs
│       ├── verEncuesta.hbs
│       └── verReclamos.hbs
│
├── app.js
├── .env
└── package.json 
```


## Autenticación
### Función secured protege rutas administrativas:

```js
secured = async (req, res, next) => {
  if (req.session.id_usuario) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}
```

## Rutas principales

```js
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reclamos', reclamosRouter);           // Reclamos desde el frontend
app.use('/admin/login', loginRouter);           // Login de administrador
app.use('/admin/inicio', inicioRouter);         // Panel de inicio
app.use('/admin/admin-reclamos', adminReclamosRouter); // Gestión de reclamos
app.use('/admin/verReclamos', verReclamosRouter);      // Visualización
app.use('/admin/verEncuesta', verEncuestaRouter);      // Resultados de encuesta
app.use('/api', apiRouter);                     // API general
app.use('/api', vecinosRouter);                 // API para vecinos
```

## Endpoints principales (Admin - para el panel de gestión interna)

| Método | Ruta                              | Descripción                                                           |
|--------|-----------------------------------|-----------------------------------------------------------------------|
| GET    | `/admin/login`                   | Renderiza el formulario de login                                       |
| POST   | `/admin/login`                   | Procesa credenciales y crea sesión                                     |
| GET    | `/admin/login/logout`            | Cierra sesión y redirige al login                                      |
| GET    | `/admin/inicio`                  | Muestra el panel de inicio del administrador (requiere sesión)         |
| GET    | `/admin/verReclamos`             | Lista reclamos con paginación y filtro por estado, tipo o fecha        |
| GET    | `/admin/verEncuesta`             | Lista encuestas con paginación                                         |
| GET    | `/admin/reclamos/modificar/:id`  | Renderiza formulario para modificar un reclamo específico              |
| POST   | `/admin/reclamos/modificar`      | Procesa la modificación de un reclamo                                  |


##  Endpoints públicos (están pensados para ser consumidos por el frontend público)

| Método | Ruta                          | Descripción                                                            |
|--------|-------------------------------|------------------------------------------------------------------------|
| GET    | `/`                           | Redirige al login de administrador (`/admin/login`)                    |
| POST   | `/reclamos`                   | Crea un nuevo reclamo con imagen (desde el frontend)                   |
| GET    | `/users`                      | Endpoint de prueba (responde con texto plano)                          |
| POST   | `/vecinos`                    | Login de vecino (guarda ID en sesión)                                  |
| POST   | `/vecinos/registro`           | Registro de nuevo vecino                                               |
| GET    | `/vecinos/reclamos`           | Obtiene los reclamos asociados a un vecino por ID                      |
| POST   | `/encuesta`                   | Registra una encuesta de satisfacción vinculada a un vecino            |



## Filtros disponibles en /admin/verReclamos
El panel administrativo permite visualizar los reclamos municipales aplicando filtros combinables para facilitar la gestión y el seguimiento. Estos filtros se aplican automáticamente al seleccionarlos y se mantienen activos durante la navegación paginada.

### Filtros disponibles:
***Estado*** Permite filtrar por el estado actual del reclamo: Nuevo, Cargado, En proceso, En revisión, Resuelto, Cerrado.

***Tipo*** Clasifica el tipo de reclamo según su naturaleza: basural, recoleccion, ramas, otros.

***Fecha*** Permite seleccionar una fecha específica en formato YYYY-MM-DD para visualizar reclamos registrados ese día.


## Variables de entorno
El archivo .env debe incluir las credenciales y configuración sensible:

DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=reclamosdb
CLOUDINARY_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

EMAIL_USER=vozciudadana.municipio@gmail.com   
EMAIL_PASSWORD= clave_secreta

Usá dotenv para cargar estas variables en app.js y en los módulos que lo necesiten.


## Conexión a la base de datos
La conexión a MySQL se realiza mediante un pool de conexiones usando mysql2 y dotenv para variables de entorno. El archivo bd.js expone una versión promisificada de pool.query para facilitar el uso con async/await.

```js
const mysql = require('mysql2');
const util = require('util');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME
});

pool.query = util.promisify(pool.query);

module.exports = pool;
```

## Seguridad
Las contraseñas se encriptan con md5.

Las rutas administrativas están protegidas con middleware secured.

Las sesiones se manejan con express-session.

### Notas de seguridad
Nota: md5 se utiliza por simplicidad en este proyecto. Para entornos productivos se recomienda usar algoritmos más seguros como bcrypt o argon2.


## Recuperación de contraseña
Se implementó una funcionalidad para que los vecinos puedan restablecer su contraseña en caso de olvido.

### Endpoints de recuperación de contraseña

| Método | Ruta                          | Descripción                                                |
|--------|-------------------------------|-----------------------------------------------------       |
| POST   | `/api/recuperar`              | Genera token y envía correo con enlace de restablecimiento |
| POST   | `/api/restablecer/:token`     | Valida token y actualiza la contraseña encriptada          |


### Detalles técnicos:
- Se utiliza nodemailer para enviar correos desde vozciudadana.municipio@gmail.com

- El token se genera con crypto.randomBytes y expira en 1 hora

- El token y su expiración se almacenan en la tabla vecinos (reset_token, reset_expiracion)

- Las contraseñas se encriptan con md5 antes de guardarse

- Las variables de entorno necesarias:

EMAIL_USER=vozciudadana.municipio@gmail.com
EMAIL_PASSWORD=tu_app_password

### **Flujo de recuperación:**
1. El vecino solicita recuperar su contraseña → `/api/recuperar`
2. Se genera un token y se envía por correo
3. El vecino accede al enlace → `/restablecer/:token`
4. Envía nueva contraseña → `/api/restablecer/:token`
5. Se actualiza la contraseña en la base de datos

## Modificación de reclamos y notificación al vecino
El administrador municipal puede modificar el estado y/o agregar comentarios a un reclamo desde el panel interno. Esta acción genera una notificación automática al vecino por correo electrónico y una alerta en pantalla para el municipal.

### Endpoint involucrado

| Método | Ruta                         | Descripción                                                                  |
|--------|------------------------------|------------------------------------------------------------------------------|
| POST   | `/admin/admin-reclamos/modificar` | Actualiza el estado y/o comentario de un reclamo. Notifica al vecino por mail |


### Lógica del proceso
Recepción de datos: Se espera id, estado y comentarios en el req.body.

Comparación de cambios: Se consulta el reclamo actual y se detecta si hubo modificación en el estado o comentario.

Actualización en base de datos: Se actualiza el reclamo si hubo cambios.

***Notificación por correo***
Si el estado o comentario cambió, se envía un correo al vecino informando la actualización.

El correo incluye el nuevo estado y/o comentario.

***Alerta en pantalla del municipal***
Se guarda un mensaje en req.session.notificacionCorreo que se muestra en la vista /admin/inicio.

### Ejemplo de correo enviado al vecino

Asunto: Actualización de tu reclamo – Voz Ciudadana

Hola [Nombre del vecino],

Tu reclamo ha sido actualizado por el municipio.

Nuevo estado: [estado]
Comentario: [comentarios]

Podés hacer seguimiento desde la plataforma Voz Ciudadana.

Gracias,
El equipo de Voz Ciudadana


### Tecnologías involucradas
nodemailer: para el envío de correos electrónicos.

express-session: para mostrar alertas en el panel del municipal.

reclamosModel: para obtener y modificar el reclamo en la base de datos.

modificar.hbs y inicio.hbs: vistas que permiten editar y visualizar el resultado.
