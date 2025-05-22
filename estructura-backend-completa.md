# Estructura de Archivos del Backend - NestJS (continuación)

## Migraciones (continuación)

- `1715279999999-SeedInitialData.ts`: Migración para cargar datos iniciales (unidades, departamentos, ciudades y materiales de ejemplo).

## Pruebas

- `app.e2e-spec.ts`: Pruebas end-to-end para probar la API completa.
- `jest-e2e.json`: Configuración de Jest para pruebas end-to-end.

# Endpoints de la API

A continuación, se detallan los endpoints expuestos por la API:

## Unidades (`/units`)

| Método | Ruta       | Descripción               | Cuerpo de la Solicitud              | Respuesta                      |
|--------|------------|---------------------------|------------------------------------|--------------------------------|
| GET    | /units     | Obtener todas las unidades | -                                  | Array de unidades              |
| GET    | /units/:id | Obtener una unidad por ID  | -                                  | Unidad                         |
| POST   | /units     | Crear una nueva unidad     | `{ name, description }`           | Unidad creada                  |
| PUT    | /units/:id | Actualizar una unidad      | `{ name?, description? }`         | Unidad actualizada             |
| DELETE | /units/:id | Eliminar una unidad        | -                                  | -                              |

## Materiales (`/materials`)

| Método | Ruta          | Descripción                  | Cuerpo de la Solicitud                     | Respuesta                      |
|--------|---------------|------------------------------|------------------------------------------|--------------------------------|
| GET    | /materials     | Obtener todos los materiales | -                                        | Array de materiales            |
| GET    | /materials/:id | Obtener un material por ID   | -                                        | Material                       |
| POST   | /materials     | Crear un nuevo material      | `{ code, description, unitId, price }`   | Material creado                |
| PUT    | /materials/:id | Actualizar un material       | `{ code?, description?, unitId?, price? }` | Material actualizado         |
| DELETE | /materials/:id | Eliminar un material         | -                                        | -                              |

## Departamentos (`/departments`)

| Método | Ruta              | Descripción                      | Cuerpo de la Solicitud  | Respuesta                      |
|--------|-------------------|----------------------------------|------------------------|--------------------------------|
| GET    | /departments      | Obtener todos los departamentos   | -                      | Array de departamentos         |
| GET    | /departments/:id  | Obtener un departamento por ID    | -                      | Departamento                   |
| GET    | /departments/:id/cities | Obtener ciudades de un departamento | -              | Array de ciudades              |
| POST   | /departments      | Crear un nuevo departamento       | `{ name }`             | Departamento creado            |
| PUT    | /departments/:id  | Actualizar un departamento        | `{ name? }`            | Departamento actualizado       |
| DELETE | /departments/:id  | Eliminar un departamento          | -                      | -                              |

## Ciudades (`/cities`)

| Método | Ruta        | Descripción               | Cuerpo de la Solicitud        | Respuesta                      |
|--------|-------------|---------------------------|------------------------------|--------------------------------|
| GET    | /cities     | Obtener todas las ciudades | -                            | Array de ciudades              |
| GET    | /cities/:id | Obtener una ciudad por ID  | -                            | Ciudad                         |
| POST   | /cities     | Crear una nueva ciudad     | `{ name, departmentId }`     | Ciudad creada                  |
| PUT    | /cities/:id | Actualizar una ciudad      | `{ name?, departmentId? }`   | Ciudad actualizada             |
| DELETE | /cities/:id | Eliminar una ciudad        | -                            | -                              |

## Proyectos (`/projects`)

| Método | Ruta                          | Descripción                                 | Cuerpo de la Solicitud    | Respuesta                      |
|--------|-----------------------------|---------------------------------------------|--------------------------|--------------------------------|
| GET    | /projects                    | Obtener todos los proyectos                 | -                        | Array de proyectos             |
| GET    | /projects/:id                | Obtener un proyecto por ID                  | -                        | Proyecto                       |
| GET    | /projects/:id/materials      | Obtener materiales asignados a un proyecto  | -                        | Array de asignaciones          |
| GET    | /projects/:id/materials/report | Obtener reporte de materiales de un proyecto | -                    | Reporte de materiales          |
| POST   | /projects                    | Crear un nuevo proyecto                     | `{ name, cityId }`       | Proyecto creado                |
| PUT    | /projects/:id                | Actualizar un proyecto                      | `{ name?, cityId? }`     | Proyecto actualizado           |
| DELETE | /projects/:id                | Eliminar un proyecto                        | -                        | -                              |

## Asignación de Materiales a Proyectos (`/project-materials`)

| Método | Ruta                       | Descripción                         | Cuerpo de la Solicitud                   | Respuesta                      |
|--------|----------------------------|-------------------------------------|----------------------------------------|--------------------------------|
| GET    | /project-materials          | Obtener todas las asignaciones      | -                                      | Array de asignaciones          |
| GET    | /project-materials/:id      | Obtener una asignación por ID       | -                                      | Asignación                     |
| POST   | /project-materials          | Asignar un material a un proyecto   | `{ projectId, materialId, quantity }`  | Asignación creada              |
| PUT    | /project-materials/:id      | Actualizar una asignación           | `{ quantity? }`                        | Asignación actualizada         |
| DELETE | /project-materials/:id      | Eliminar una asignación             | -                                      | -                              |

# Diagrama de Entidad-Relación

A continuación, se presenta un diagrama simplificado de entidad-relación que muestra las relaciones entre las diferentes entidades del sistema:

```
+-------------+       +-------------+       +-------------+
|    Unit     |       |  Material   |       |  Project    |
+-------------+       +-------------+       +-------------+
| id          |<----->| id          |       | id          |
| name        |       | code        |       | name        |
| description |       | description |<----->| city        |
+-------------+       | unit        |       +-------------+
                      | price       |             ^
                      +-------------+             |
                            ^                     |
                            |                     |
                            |                     |
                            v                     v
                     +----------------+    +-------------+
                     |ProjectMaterial |    |    City     |
                     +----------------+    +-------------+
                     | id             |    | id          |
                     | project        |    | name        |
                     | material       |    | department  |
                     | quantity       |    +-------------+
                     +----------------+           ^
                                                 |
                                                 |
                                                 v
                                          +-------------+
                                          | Department  |
                                          +-------------+
                                          | id          |
                                          | name        |
                                          +-------------+
```

## Relaciones

- **Material - Unit**: Un material pertenece a una unidad, y una unidad puede tener muchos materiales (`ManyToOne`/`OneToMany`).
- **Project - City**: Un proyecto pertenece a una ciudad, y una ciudad puede tener muchos proyectos (`ManyToOne`/`OneToMany`).
- **City - Department**: Una ciudad pertenece a un departamento, y un departamento puede tener muchas ciudades (`ManyToOne`/`OneToMany`).
- **Project - Material**: La relación entre proyectos y materiales se establece a través de la entidad de unión `ProjectMaterial` (relación de muchos a muchos).

# Flujo de Trabajo Recomendado

Para trabajar con el backend, se recomienda seguir el siguiente flujo de trabajo:

1. **Clonar el repositorio y configurar el entorno**:
   ```bash
   git clone https://github.com/tu-usuario/idrd-materials-api.git
   cd idrd-materials-api
   cp .env.example .env
   # Editar .env según sea necesario
   npm install
   ```

2. **Ejecutar la aplicación en modo desarrollo**:
   ```bash
   npm run start:dev
   ```

3. **Acceder a la documentación de la API**:
   Abrir http://localhost:3000/api en el navegador para acceder a la documentación de Swagger.

4. **Ejecutar pruebas**:
   ```bash
   # Pruebas unitarias
   npm run test
   
   # Pruebas e2e
   npm run test:e2e
   ```

5. **Crear nuevas migraciones (si es necesario)**:
   ```bash
   npm run migration:generate -- -n NombreMigracion
   ```

6. **Ejecutar las migraciones**:
   ```bash
   npm run migration:run
   ```

# Configuración con Docker

Para ejecutar la aplicación en contenedores Docker:

1. **Construir y levantar los contenedores**:
   ```bash
   docker-compose up -d
   ```

2. **Ver los logs**:
   ```bash
   docker-compose logs -f
   ```

3. **Detener los contenedores**:
   ```bash
   docker-compose down
   ```

# Consideraciones Importantes

1. **Validación de Datos**: Todos los DTOs tienen validaciones usando `class-validator` para garantizar la integridad de los datos.

2. **Documentación API**: La documentación con Swagger proporciona una interfaz interactiva para probar los endpoints.

3. **Migraciones**: Las migraciones permiten gestionar los cambios en la base de datos de forma controlada.

4. **Relaciones en Cascada**: Las relaciones entre entidades tienen comportamientos de cascada para mantener la integridad referencial de los datos.

5. **Pruebas**: El proyecto incluye pruebas unitarias y end-to-end para garantizar la calidad del código.

6. **Dependencias Circulares**: Se utilizan `forwardRef()` para resolver las dependencias circulares entre módulos.

Con esta estructura y organización, el backend del proyecto IDRD está diseñado siguiendo las mejores prácticas de NestJS, facilitando el mantenimiento y la extensión del sistema en el futuro.