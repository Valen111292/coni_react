# Gestión de Equipos (React + Java)

Este proyecto contiene dos partes:

- **Frontend** desarrollado en React (carpeta `frontend`)
- **Backend** desarrollado en Java con NetBeans (carpeta `backend`)

## 📦 Cómo ejecutar el Frontend

1. Abre una terminal o consola.
2. Ve a la carpeta del frontend:

cd frontend

Instala las dependencias:
npm install

Inicia el proyecto:

npm start

## 🗃️ Tabla de base de datos (MySQL)

Este proyecto necesita una tabla llamada `equipos`.

### Cómo crearla en phpMyAdmin:

1. Abre phpMyAdmin.
2. Entra a tu base de datos (por ejemplo, `coni`).
3. Haz clic en la pestaña **SQL**.
4. Ingresa el siguiente codigo.

  -- Crear tabla equipos_perifericos

CREATE TABLE IF NOT EXISTS equipos_perifericos (
  n_inventario VARCHAR(512) DEFAULT NULL,
  n_serie VARCHAR(512) DEFAULT NULL,
  clase VARCHAR(512) DEFAULT NULL,
  marca VARCHAR(512) DEFAULT NULL,
  ram VARCHAR(512) DEFAULT NULL,
  disco VARCHAR(512) DEFAULT NULL,
  procesador VARCHAR(512) DEFAULT NULL,
  estado VARCHAR(512) DEFAULT NULL
);

6. Haz clic en **Continuar**.

La tabla se creará automáticamente.
