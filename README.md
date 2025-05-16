# IDRD Materiales API

API REST para la gestión de materiales y proyectos del IDRD. Desarrollado con NestJS, TypeORM y PostgreSQL.

## Requisitos

- Node.js (v20.x o superior)
- PostgreSQL (v14.x o superior)
- Docker (opcional, para desarrollo con contenedores)

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/idrd-materials-api.git
cd idrd-materials-api
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

Copiar el archivo `.env.example` a `.env` y modificar según sea necesario.

```bash
cp .env.example .env
```

## Ejecución

### Modo desarrollo

```bash
npm run start:dev
```

### Modo producción

```bash
npm run build
npm run start:prod
```

### Con Docker

```bash
docker-compose up -d
```

## Migraciones

Las migraciones permiten gestionar los cambios en la estructura de la base de datos.

### Generar una migración

```bash
npm run migration:generate -- -n NombreMigracion
```

### Ejecutar migraciones

```bash
npm run migration:run
```

### Revertir migraciones

```bash
npm run migration:revert
```

## Documentación de la API

La documentación de la API está disponible en la ruta `/api` cuando el servidor está en ejecución.

## Pruebas

### Pruebas unitarias

```bash
npm run test
```

### Pruebas con cobertura

```bash
npm run test:cov
```

### Pruebas end-to-end

```bash
npm run test:e2e
```

## Estructura del Proyecto

```
idrd-materials-api/
├── src/
│   ├── main.ts                  # Punto de entrada de la aplicación
│   ├── app.module.ts            # Módulo principal
│   ├── materials/               # Módulo de materiales
│   │   ├── entities/            # Entidades
│   │   ├── dto/                 # DTOs (Data Transfer Objects)
│   │   ├── materials.controller.ts  # Controlador
│   │   ├── materials.service.ts     # Servicio
│   │   └── materials.module.ts      # Definición de módulo
│   ├── units/                   # Módulo de unidades
│   ├── departments/             # Módulo de departamentos
│   ├── cities/                  # Módulo de ciudades
│   ├── projects/                # Módulo de proyectos
│   ├── project-materials/       # Módulo de asignación de materiales a proyectos
│   └── migrations/              # Migraciones de base de datos
├── test/                        # Pruebas
├── .env.example                 # Ejemplo de configuración
├── .gitignore                   # Archivos ignorados por Git
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración de TypeScript
├── docker-compose.yml           # Configuración de Docker
└── README.md                    # Documentación
```

## Licencia

Este proyecto es propiedad del IDRD y su uso está restringido.