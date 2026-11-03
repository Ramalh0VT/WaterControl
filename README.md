# About this project

A derived repository from the branches and main github repository for the software responsible for making WaterControl work. This is a group project and here is the original link to the repository:

https://github.com/lvzangrande/projeto_integrador_3TD

Besides that, anything below this is so the reader can be aware of the basics about how our web application works

# Full Stack Base Project

Template for students to create forks with the same frontend, backend, and database stack.

## Default Stack

- **Frontend:** Next.js 16.2.10 with JavaScript, no Tailwind and no Bootstrap by default.
- **Backend:** Node.js with Express in JavaScript.
- **Database:** MySQL.
- **Deployment:** Separate Dockerfiles for frontend, backend, and database, making it easy to create services.

## Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── database/
│   ├── init/
│   │   └── 01-schema.sql
│   └── Dockerfile
├── frontend/
│   ├── src/app/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Running Locally

1. Install the dependencies:

   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

2. Copy the environment files:

   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   ```

3. Start MySQL with Docker (skip this step if you are running XAMPP or MySQL Community Server):

   ```bash
   docker compose up -d database
   ```

4. Run the backend:

   ```bash
   cd backend
   npm run dev
   ```

5. Run the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

Default URLs:

- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- API health check: http://localhost:8080/api/health
- MySQL: `localhost:3306`

## Running Everything with Docker Compose

```bash
docker compose up --build
```

This command starts:

- frontend on port 3000 by default
- backend on port 8080 by default
- database on port 3306 by default

## Environment Variables

**Root Docker Compose (`.env`):**

```env
FRONTEND_HOST_PORT=3000
BACKEND_HOST_PORT=8080
DATABASE_HOST_PORT=3306

FRONTEND_PORT=3000
BACKEND_PORT=8080

FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8080/api

MYSQL_ROOT_PASSWORD=root_password
MYSQL_DATABASE=app_db
MYSQL_USER=app_user
MYSQL_PASSWORD=app_password

DB_HOST=database
DB_PORT=3306
DB_USER=app_user
DB_PASSWORD=app_password
DB_NAME=app_db
```

To run several groups on the same server, change at least the ports published on the host and the public API URL. Example for a second group:

```env
FRONTEND_HOST_PORT=3001
BACKEND_HOST_PORT=8081
DATABASE_HOST_PORT=3307
FRONTEND_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

The internal ports can stay at their defaults (`FRONTEND_PORT=3000` and `BACKEND_PORT=8080`) in most cases. Only change the internal ports if Coolify or the chosen architecture requires it.

**Backend (`backend/.env`):**

```env
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=app_user
DB_PASSWORD=app_password
DB_NAME=app_db
```

**Frontend (`frontend/.env.local`):**

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

> With Docker Compose, the backend uses `DB_HOST=database`, because that is the name of the MySQL service on the Docker network.

## Backend

Main scripts:

```bash
npm run dev
npm start
```

Initial routes:

- `GET /` returns a basic API message.
- `GET /api/health` returns the API status and tests the MySQL connection.

Default folders:

- `src/config`: configuration and external connections.
- `src/controllers`: functions that handle requests.
- `src/routes`: HTTP route definitions.
- `src/middlewares`: shared middlewares.

## Frontend

Main scripts:

```bash
npm run dev
npm run build
npm start
npm run lint
```

The project comes without Tailwind and Bootstrap by default. Each student can install and configure the CSS library of their choice according to the project's needs.

## Database

The `database/init/01-schema.sql` file creates the initial database when the MySQL container starts for the first time.

To reset the local database from scratch:

```bash
docker compose down -v
docker compose up -d database
```

## Deploying on Coolify

Create separate services pointing to the Dockerfiles:

- **Frontend:** `frontend/Dockerfile`
- **Backend:** `backend/Dockerfile`
- **Database:** preferably use Coolify's managed MySQL service. If you want to use the image from this repo, use `database/Dockerfile`.

Configure the environment variables in Coolify equivalent to those in the `.env.example` files. In the backend, `DB_HOST` must point to the internal host/name of the MySQL service in Coolify.

For each group, configure different values for:

- `FRONTEND_HOST_PORT`
- `BACKEND_HOST_PORT`
- `DATABASE_HOST_PORT`, if publishing MySQL on the host
- `FRONTEND_URL`
- `NEXT_PUBLIC_API_URL`

When deploying with a domain/reverse proxy, `NEXT_PUBLIC_API_URL` must point to the real public URL of the backend, for example `https://api-grupo-01.seudominio.com/api`.

## Notes for Students

- Do not commit `.env` files.
- Do not commit `node_modules`, `.next`, or build files.
- Keep the backend in JavaScript.
- Install Tailwind or Bootstrap only if the project needs it.
