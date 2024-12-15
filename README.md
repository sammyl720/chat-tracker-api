# Chat Tracker API

![Chat Tracker API](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen) ![Docker](https://img.shields.io/badge/docker-%3E%3D20.10.0-blue) ![PostgreSQL](https://img.shields.io/badge/postgresql-%3E%3D12.0-orange)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Configure Environment Variables](#2-configure-environment-variables)
  - [3. Docker Setup](#3-docker-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Projects](#projects)
  - [Users](#users)
  - [Messages](#messages)
- [Database Initialization](#database-initialization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **Chat Tracker API** is a RESTful service built with **Node.js**, **TypeScript**, and **Express**, backed by a **PostgreSQL** database. It allows you to manage **Projects** and **Users**, and track **Chat Completion Messages** associated with specific projects and users. The application is containerized using **Docker** and orchestrated with **Docker Compose** for seamless deployment and scalability.

---

## Features

- **CRUD Operations** for:
  - **Projects**: Create, Read, Update, Delete projects.
  - **Users**: Create, Read, Update, Delete users.
  - **Messages**: Create, Read, Update, Delete chat messages linked to projects and users.
- **Dockerized Setup**: Easily deploy the application and PostgreSQL database using Docker.
- **TypeScript**: Strongly typed JavaScript for enhanced developer experience and code reliability.
- **PostgreSQL**: Robust relational database for data persistence.
- **Express.js**: Fast and minimalist web framework for Node.js.

---

## Technologies Used

- **Node.js** (v14 or later)
- **TypeScript**
- **Express.js**
- **PostgreSQL** (v12 or later)
- **Docker**
- **Docker Compose**
- **pg**: PostgreSQL client for Node.js
- **dotenv**: Loads environment variables from `.env` file

---

## Project Structure

```
chat-tracker-api/
├── src/
│   ├── controllers/
│   │   ├── messageController.ts
│   │   ├── projectController.ts
│   │   └── userController.ts
│   ├── models/
│   │   ├── messageModel.ts
│   │   ├── projectModel.ts
│   │   └── userModel.ts
│   ├── routes/
│   │   ├── messageRoutes.ts
│   │   ├── projectRoutes.ts
│   │   └── userRoutes.ts
│   ├── db/
│   │   └── index.ts
│   ├── app.ts
│   └── server.ts
├── db-init/
│   └── init.sql
├── .env
├── package.json
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- **[Node.js](https://nodejs.org/en/download/)** (v14 or later)
- **[Docker](https://docs.docker.com/get-docker/)**
- **[Docker Compose](https://docs.docker.com/compose/install/)**
- **[Git](https://git-scm.com/downloads)** (optional, for version control)

---

## Installation

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/chat-tracker-api.git
cd chat-tracker-api
```

> **Note:** Replace `yourusername` with your actual GitHub username if applicable.

### 2. Configure Environment Variables

Create a `.env` file in the root directory to store environment variables:

```bash
PORT=8080
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=chat_tracker
```

**Explanation of Variables:**

- `PORT`: The port on which the application will run on the host machine. **Changed to `8080` to avoid conflicts with Apple services.**
- `DATABASE_HOST`: The hostname for the PostgreSQL service. **Set to `db` as defined in `docker-compose.yml`.**
- `DATABASE_PORT`: The port PostgreSQL listens on within the Docker network. **Default is `5432`.**
- `DATABASE_USER`: PostgreSQL username.
- `DATABASE_PASSWORD`: PostgreSQL password.
- `DATABASE_NAME`: Name of the PostgreSQL database.

> **Important:** Replace `your_db_user` and `your_db_password` with secure credentials of your choice.

### 3. Docker Setup

Ensure Docker and Docker Compose are installed and running on your machine. No additional setup is required beyond the provided `Dockerfile` and `docker-compose.yml`.

---

## Running the Application

### 1. Initialize the Database

Since you've chosen **Option 1** (reinitialize the database by removing the existing volume), ensure that your `db-init/init.sql` contains all necessary table creations and extensions.

**`db-init/init.sql`:**

```sql
-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Messages Table with Foreign Keys
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  project_id UUID NOT NULL,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 2. Remove Existing Docker Volumes (Data Loss Warning)

**⚠️ Warning:** This step **will delete all existing data** in your PostgreSQL database. Proceed only if you understand and accept the data loss.

```bash
docker-compose down
docker volume rm chat-tracker-api_db-data
```

> **Note:** Replace `chat-tracker-api_db-data` with the actual volume name if different. List all volumes using:

```bash
docker volume ls
```

### 3. Start Docker Containers

Build and start the Docker containers using Docker Compose:

```bash
docker-compose up --build
```

**Explanation:**

- `--build`: Rebuilds the Docker images based on the latest configurations and code changes.
- The application will now be accessible at `http://localhost:8080`.

### 4. Verify the Setup

- **Health Check:** Visit `http://localhost:8080` in your browser or use `curl`:

  ```bash
  curl http://localhost:8080
  ```

  **Expected Response:**

  ```
  Chat Tracker API is running.
  ```

- **Database Verification:** Connect to the PostgreSQL container and verify table creation:

  ```bash
  docker-compose exec db psql -U your_db_user -d chat_tracker
  ```

  Once in the `psql` shell, list the tables:

  ```sql
  \dt
  ```

  **Expected Output:**

  ```
           List of relations
   Schema |      Name      | Type  | Owner
  --------+----------------+-------+--------
   public | messages       | table | your_db_user
   public | projects       | table | your_db_user
   public | users          | table | your_db_user
  (3 rows)
  ```

  Exit the `psql` shell:

  ```sql
  \q
  ```

---

## API Documentation

The Chat Tracker API provides endpoints to manage **Projects**, **Users**, and **Messages**. Below is a comprehensive guide to each endpoint, including request and response examples.

### Base URL

```
http://localhost:8080/api
```

---

### Projects

#### 1. Create a New Project

- **Endpoint:** `POST /api/projects`
- **Description:** Creates a new project.
- **Request Body:**

  ```json
  {
    "name": "Project Alpha"
  }
  ```

- **Response:**

  ```json
  {
    "id": "e7f3c3e0-9c4f-4f5e-8b6a-2f4b9a6d8e72",
    "name": "Project Alpha",
    "created_at": "2024-12-15T12:34:56.789Z"
  }
  ```

#### 2. Get All Projects

- **Endpoint:** `GET /api/projects`
- **Description:** Retrieves a list of all projects.
- **Response:**

  ```json
  [
    {
      "id": "e7f3c3e0-9c4f-4f5e-8b6a-2f4b9a6d8e72",
      "name": "Project Alpha",
      "created_at": "2024-12-15T12:34:56.789Z"
    },
    {
      "id": "d1e2f3a4-5b6c-7d8e-9f0a-1b2c3d4e5f6a",
      "name": "Project Beta",
      "created_at": "2024-12-16T09:20:30.123Z"
    }
    // ... other projects
  ]
  ```

#### 3. Get a Project by ID

- **Endpoint:** `GET /api/projects/:id`
- **Description:** Retrieves a specific project by its ID.
- **Response:**

  ```json
  {
    "id": "e7f3c3e0-9c4f-4f5e-8b6a-2f4b9a6d8e72",
    "name": "Project Alpha",
    "created_at": "2024-12-15T12:34:56.789Z"
  }
  ```

#### 4. Update a Project by ID

- **Endpoint:** `PUT /api/projects/:id`
- **Description:** Updates the name of a specific project.
- **Request Body:**

  ```json
  {
    "name": "Project Alpha Updated"
  }
  ```

- **Response:**

  ```json
  {
    "id": "e7f3c3e0-9c4f-4f5e-8b6a-2f4b9a6d8e72",
    "name": "Project Alpha Updated",
    "created_at": "2024-12-15T12:34:56.789Z"
  }
  ```

#### 5. Delete a Project by ID

- **Endpoint:** `DELETE /api/projects/:id`
- **Description:** Deletes a specific project and all associated messages.
- **Response:**

  ```json
  {
    "message": "Project deleted successfully."
  }
  ```

---

### Users

#### 1. Create a New User

- **Endpoint:** `POST /api/users`
- **Description:** Creates a new user.
- **Request Body:**

  ```json
  {
    "name": "John Doe"
  }
  ```

- **Response:**

  ```json
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
    "name": "John Doe",
    "created_at": "2024-12-15T12:35:00.123Z"
  }
  ```

#### 2. Get All Users

- **Endpoint:** `GET /api/users`
- **Description:** Retrieves a list of all users.
- **Response:**

  ```json
  [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
      "name": "John Doe",
      "created_at": "2024-12-15T12:35:00.123Z"
    },
    {
      "id": "f6e5d4c3-b2a1-0f9e-8d7c-6b5a4e3d2c1b",
      "name": "Jane Smith",
      "created_at": "2024-12-16T10:15:20.456Z"
    }
    // ... other users
  ]
  ```

#### 3. Get a User by ID

- **Endpoint:** `GET /api/users/:id`
- **Description:** Retrieves a specific user by their ID.
- **Response:**

  ```json
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
    "name": "John Doe",
    "created_at": "2024-12-15T12:35:00.123Z"
  }
  ```

#### 4. Update a User by ID

- **Endpoint:** `PUT /api/users/:id`
- **Description:** Updates the name of a specific user.
- **Request Body:**

  ```json
  {
    "name": "Johnathan Doe"
  }
  ```

- **Response:**

  ```json
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
    "name": "Johnathan Doe",
    "created_at": "2024-12-15T12:35:00.123Z"
  }
  ```

#### 5. Delete a User by ID

- **Endpoint:** `DELETE /api/users/:id`
- **Description:** Deletes a specific user and all associated messages.
- **Response:**

  ```json
  {
    "message": "User deleted successfully."
  }
  ```

---

### Messages

#### 1. Create a New Message

- **Endpoint:** `POST /api/messages`
- **Description:** Creates a new chat message linked to a project and user.
- **Request Body:**

  ```json
  {
    "project_id": "e7f3c3e0-9c4f-4f5e-8b6a-2f4b9a6d8e72",
    "user_id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
    "message": "Hello, this is a test message."
  }
  ```

- **Response:**

  ```json
  {
    "id": 1,
    "project_id": "e7f3c3e0-9c4f-4f5e-8b6a-2f4b9a6d8e72",
    "user_id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
    "message": "Hello, this is a test message.",
    "created_at": "2024-12-15T12:35:10.456Z"
  }
  ```

#### 2. Get All Messages for a Project

- **Endpoint:** `GET /api/messages/project/:projectId`
- **Description:** Retrieves all messages associated with a specific project.
- **Response:**

  ```json
  [
    {
      "id": 1,
      "project_id": "e7f3c3e0-9c4f-4f5e-8b6a-2f4b9a6d8e72",
      "user_id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
      "message": "Hello, this is a test message.",
      "created_at": "2024-12-15T12:35:10.456Z"
    },
    {
      "id": 2,
      "project_id": "e7f3c3e0-9c4f-4f5e-8b6a-2f4b9a6d8e72",
      "user_id": "f6e5d4c3-b2a1-0f9e-8d7c-6b5a4e3d2c1b",
      "message": "Another message in Project Alpha.",
      "created_at": "2024-12-15T13:00:00.789Z"
    }
    // ... other messages
  ]
  ```

#### 3. Get a Single Message by ID

- **Endpoint:** `GET /api/messages/:id`
- **Description:** Retrieves a specific message by its ID.
- **Response:**

  ```json
  {
    "id": 1,
    "project_id": "e7f3c3e0-9c4f-4f5e-8b6a-2f4b9a6d8e72",
    "user_id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
    "message": "Hello, this is a test message.",
    "created_at": "2024-12-15T12:35:10.456Z"
  }
  ```

#### 4. Update a Message by ID

- **Endpoint:** `PUT /api/messages/:id`
- **Description:** Updates the content of a specific message.
- **Request Body:**

  ```json
  {
    "message": "Updated message content."
  }
  ```

- **Response:**

  ```json
  {
    "id": 1,
    "project_id": "e7f3c3e0-9c4f-4f5e-8b6a-2f4b9a6d8e72",
    "user_id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
    "message": "Updated message content.",
    "created_at": "2024-12-15T12:35:10.456Z"
  }
  ```

#### 5. Delete a Message by ID

- **Endpoint:** `DELETE /api/messages/:id`
- **Description:** Deletes a specific message.
- **Response:**

  ```json
  {
    "message": "Message deleted successfully."
  }
  ```

---

## Database Initialization

The PostgreSQL database is initialized using the `init.sql` script located in the `db-init/` directory. This script sets up the necessary tables and extensions required by the application.

### Initialization Steps:

1. **Reinitialize the Database (Option 1):**

   If you've made changes to the database schema and opted to reinitialize (as per your previous decision), follow these steps:

   ```bash
   docker-compose down
   docker volume rm chat-tracker-api_db-data
   docker-compose up --build
   ```

   - **`docker-compose down`**: Stops and removes the containers.
   - **`docker volume rm`**: Removes the existing PostgreSQL data volume, triggering a fresh initialization.
   - **`docker-compose up --build`**: Rebuilds and starts the containers, applying the `init.sql` script.

2. **Verify Initialization:**

   After running the above commands, ensure that the tables have been created successfully by connecting to the PostgreSQL container:

   ```bash
   docker-compose exec db psql -U your_db_user -d chat_tracker
   ```

   In the `psql` shell, list the tables:

   ```sql
   \dt
   ```

   You should see `projects`, `users`, and `messages` tables listed.

   Exit the `psql` shell:

   ```sql
   \q
   ```

> **Note:** The initialization script runs **only once**—during the first setup when the data volume is empty. Subsequent `docker-compose up` commands will not re-run the script unless the data volume is removed.

---

## Troubleshooting

### Common Issues & Solutions

#### 1. **Port Conflict Error**

**Error Message:**

```
Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:5432 -> 0.0.0.0:0: listen tcp 0.0.0.0:5432: bind: address already in use
```

**Solution:**

- **Change Host Port Mapping:**

  If port `5432` is occupied on your host machine, modify the `docker-compose.yml` to map PostgreSQL to a different host port (e.g., `5433:5432`).

  ```yaml
  services:
    db:
      image: postgres:14-alpine
      ports:
        - "5433:5432"  # Changed from "5432:5432" to "5433:5432"
      environment:
        POSTGRES_USER: your_db_user
        POSTGRES_PASSWORD: your_db_password
        POSTGRES_DB: chat_tracker
      volumes:
        - db-data:/var/lib/postgresql/data
        - ./db-init:/docker-entrypoint-initdb.d
      restart: unless-stopped
  ```

- **Update `.env` File (If Necessary):**

  If you need to access PostgreSQL from your host machine, adjust the `DATABASE_PORT` accordingly. However, within the Docker network, the PostgreSQL service still listens on `5432`.

  ```env
  DATABASE_PORT=5433
  ```

#### 2. **Database Connection Issues**

**Symptom:** Application cannot connect to the PostgreSQL database.

**Solution:**

- **Verify Environment Variables:**

  Ensure that `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`, and `DATABASE_NAME` in your `.env` file match the configurations in `docker-compose.yml`.

- **Check Docker Containers Status:**

  ```bash
  docker-compose ps
  ```

  Ensure both `app` and `db` services are `Up`.

- **Inspect Logs:**

  ```bash
  docker-compose logs db
  docker-compose logs app
  ```

  Look for any error messages that can help diagnose the issue.

#### 3. **Application Not Responding on Port 8080**

**Solution:**

- **Ensure Docker Containers Are Running:**

  ```bash
  docker-compose up --build
  ```

- **Check Port Mapping:**

  Confirm that `8080` on the host is mapped to `5000` in the container in `docker-compose.yml`:

  ```yaml
  services:
    app:
      build: .
      ports:
        - "8080:5000"  # External port changed to 8080
      ...
  ```

- **Verify Firewall Settings:**

  Ensure that your firewall allows traffic on port `8080`.

---

## Contributing

Contributions are welcome! If you have suggestions, improvements, or bug fixes, feel free to open an issue or submit a pull request.

### Steps to Contribute:

1. **Fork the Repository**

2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Make Changes and Commit**

   ```bash
   git commit -m "Add Your Feature"
   ```

4. **Push to Your Fork**

   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Create a Pull Request**

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [pg](https://node-postgres.com/)
- [dotenv](https://github.com/motdotla/dotenv)

---

## Contact

For any inquiries or support, please contact [your.email@example.com](mailto:your.email@example.com).

---

**Happy Coding! 🚀**