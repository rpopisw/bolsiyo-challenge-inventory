# Bolsiyo App Inventory ( DDD + CQRS + NestJS + MySQL )

crear un API Rest que permita generar la gestión de un inventario por usuarios
tipo Administrador

## Tecnologías Utilizadas 🛠️

Este proyecto ha sido creado con:

- **Lenguaje de Programación**: TypeScript
- **Framework Backend**: Nestjs
- **Base de Datos**: Mysql
- **Herramientas de Despliegue**: Docker
- **Técnicas de Desarrollo**: Clean Architecture, DDD, CQRS, SOLID

## Documentación 📚

* Luego de ejecutar el proyecto, la documentación de la API estará disponible en http://localhost:3000/api. 
Es altamente recomendable revisarla para entender a fondo las capacidades y restricciones de la API.

* La collecion de postman se encuentra en `/apiDocumentation`

## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en tu máquina local para propósitos de desarrollo y pruebas.

### Instrucciones Iniciales 📝

Antes de probar la API o el proyecto:

1. **Crear un Usuario**: Es esencial crear un usuario para acceder a todas las funcionalidades. Utiliza el endpoint `/user` para registrarte. Una vez registrado, puedes usar el endpoint `/user/sign-in` para iniciar sesión y obtener un token de autenticación.
2. **Migration and seeder**: Las migraciones se hacen automaticamenes al iniciar el proyecto, solo la tabla business se llena con un negocio con codigo B001 para pruebas esto tambien es automatico ejecutado el proyecto.

### Servicios Expuestos 🔌

A continuación, se describen brevemente los principales servicios que esta API expone:


- **Gestión de Usuarios**: Proporciona capacidades crear de usuarios y loguearte como usuario.

    - Endpoint: `/users`

- **Gestión de Inventario**: Permite la administración de productos en la plataforma.

    - Endpoint: `/inventory`

### Acceso al servicio 🌐

Una vez que el contenedor esté en funcionamiento, puedes acceder a la API a través de:
http://localhost:3000

## Instalacion 

1. Clona el repositorio:

```bash
git clone https://github.com/rpopisw/bolsiyo-challenge-inventory.git
cd bolsiyo-challenge-inventory
```

### Ejecución con Docker 🔧


1. Crea el archivo `.env`:

```bash
cp .env.example .env
```

2. Construye la imagen de Docker para api y base de datos:

```bash

docker build -t mysql-image:latest -f Dockerfile.db .
```
```bash
docker build -t nest-api:latest -f Dockerfile.app .
```

3. Ejecuta los contenedores para api y base de datos:

```bash
docker run -p 3308:3306 --name mysql-container -e MYSQL_ROOT_PASSWORD=12345678 -e MYSQL_DATABASE=inventory -d mysql-image:latest
```
```bash
docker run -p 3000:3000 nest-api:latest
```
### Ejecución LOCAl 🔧

1. Crea el archivo `.env`:

```bash
cp .env.example .env
```

2. Instala las dependencias:

```bash
yarn install
```
2. Construye la imagen de base de datos:

```bash

docker build -t mysql-image:latest -f Dockerfile.db .
```

3. Ejecuta los contenedores  base de datos:

```bash
docker run -p 3308:3306 --name mysql-container -e MYSQL_ROOT_PASSWORD=12345678 -e MYSQL_DATABASE=inventory -d mysql-image:latest
```

3. Ejecuta el proyecto:

```bash
yarn start:dev
```


## Autores ✒️

* **Robert Popi Requis** - [https://www.linkedin.com/in/robertpopi/](url)
