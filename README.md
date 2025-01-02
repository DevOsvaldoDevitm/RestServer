# WebServer API

Este proyecto es un servidor web básico utilizando Node.js, Express y la organización de rutas con Router. A continuación, se describe cómo configurarlo y ejecutarlo.

---

## Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Endpoints de la API](#endpoints-de-la-api)
6. [Scripts Disponibles](#scripts-disponibles)
7. [Tecnologías Usadas](#tecnologías-usadas)

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)

---

## Instalación

1. Clona este repositorio:

   ```bash
   git clone <URL-DEL-REPOSITORIO>
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd WebServer
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Crea un archivo `.env` basado en el archivo `.env.example` para configurar el puerto:

   ```env
   PORT=8080
   ```

---

## Uso

Para iniciar el servidor en modo de desarrollo, ejecuta el siguiente comando:

```bash
npm run dev
```

Para iniciar el servidor en producción:

```bash
npm start
```

El servidor estará disponible en `http://localhost:<PUERTO>`.

---

## Estructura del Proyecto

```
WebServer/
├── public/
│   └── index.html        #Se renderiza la informacion
├── controllers/
│   └── usuarios.js       #Se encarga de hacer las peticiones
├── models/
│   └── server.js         #Archivo que se dispara cuando se incia la aplicacion
├── routes/
│   └── router.js         # Archivo que contiene las rutas de la API
├── .env                  # Variables de entorno
├── .gitignore            # Archivos y carpetas a ignorar por Git
├── app.js                # Archivo principal del servidor
├── package.json          # Dependencias y scripts del proyecto
└── README.md             # Documentación del proyecto
```

---

## Endpoints de la API

### Base URL:

`http://localhost:<PUERTO>/api/usuarios`

### Endpoints:

| Método   | Endpoint     | Descripción                  |
|----------|--------------|------------------------------|
| **GET**  | `/get`       | Devuelve datos de prueba     |
| **POST** | `/post`      | Crea un nuevo recurso        |
| **PUT**  | `/put`       | Actualiza un recurso         |
| **DELETE** | `/delete`  | Elimina un recurso           |

Ejemplo de respuesta para `GET /get`:

```json
{
  "message": "get API"
}
```

---

## Scripts Disponibles

En el archivo `package.json` hay dos scripts principales:

- **`npm run dev`**: Inicia el servidor con `nodemon` para desarrollo.
- **`npm start`**: Inicia el servidor en modo de producción.

---

## Tecnologías Usadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework web para Node.js.
- **dotenv**: Para manejar variables de entorno.
