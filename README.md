# Chat Tracker

**Chat Tracker** is a full-stack application designed to manage projects, users, and messages efficiently. It comprises a **Node.js** and **Express** backend API, a modern **React** frontend built with **Vite**, and a **PostgreSQL** database. The entire application is containerized using **Docker**, ensuring seamless deployment and scalability.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Environment Variables](#environment-variables)
7. [Running the Application](#running-the-application)
   - [Using Docker Compose](#using-docker-compose)
   - [Development Mode](#development-mode)
8. [Frontend Overview](#frontend-overview)
   - [Available Components](#available-components)
9. [Backend Overview](#backend-overview)
   - [API Endpoints](#api-endpoints)
10. [Contributing](#contributing)
11. [License](#license)
12. [Acknowledgements](#acknowledgements)

---

## Features

- **Projects Management:** Create, read, update, and delete projects.
- **Users Management:** Manage user profiles with CRUD operations.
- **Messages Management:** Handle messages linked to specific projects and users.
- **Responsive UI:** Intuitive and responsive frontend built with React and Material-UI.
- **Containerization:** Dockerized setup for easy deployment and scalability.
- **Type Safety:** Strong typing with TypeScript across both frontend and backend.
- **Environment Configuration:** Secure management of environment variables.

---

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/) with [Vite](https://vitejs.dev/) for fast development.
  - [TypeScript](https://www.typescriptlang.org/) for type safety.
  - [Material-UI (MUI)](https://mui.com/) for UI components and styling.
  - [Axios](https://axios-http.com/) for HTTP requests.

- **Backend:**
  - [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/) framework.
  - [TypeScript](https://www.typescriptlang.org/) for type safety.
  - [PostgreSQL](https://www.postgresql.org/) as the relational database.
  - [pg](https://node-postgres.com/) for PostgreSQL client.

- **DevOps:**
  - [Docker](https://www.docker.com/) for containerization.
  - [Docker Compose](https://docs.docker.com/compose/) for orchestrating multi-container applications.

---

## Project Structure

```
chat-tracker-api/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Messages/
│   │   │   │   └── MessageList.tsx
│   │   │   ├── Projects/
│   │   │   │   └── ProjectList.tsx
│   │   │   └── Users/
│   │   │       └── UserList.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── ...
│   ├── nginx.conf
│   ├── Dockerfile
│   ├── vite.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── db/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── db-init/
│   └── init.sql
├── .env
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

---

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/chat-tracker-api.git
   cd chat-tracker-api
   ```

2. **Navigate to the Frontend Directory**

   ```bash
   cd frontend
   ```

3. **Install Frontend Dependencies**

   ```bash
   npm install
   ```

4. **Navigate to the Backend Directory**

   ```bash
   cd ../backend
   ```

5. **Install Backend Dependencies**

   ```bash
   npm install
   ```

---

## Environment Variables

### Backend

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=8080
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=chat_tracker
```

### Frontend

Create a `.env` file in the `frontend/` directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

**Note:** Replace `your_db_user` and `your_db_password` with your desired PostgreSQL credentials.

---

## Running the Application

The application is containerized using Docker, allowing for easy setup and deployment.

### Using Docker Compose

1. **Navigate to the Root Directory**

   ```bash
   cd chat-tracker-api
   ```

2. **Build and Start the Containers**

   ```bash
   docker-compose up --build
   ```

   **Explanation:**
   
   - **Backend (`app`):** Builds the Node.js backend and exposes it on port `8080`.
   - **Frontend (`frontend`):** Builds the React frontend using Vite and serves it via Nginx on port `3000`.
   - **Database (`db`):** Sets up a PostgreSQL database on port `5432` and initializes it with `init.sql`.

3. **Verify the Setup**

   - **Frontend:** Visit [http://localhost:3000](http://localhost:3000) to access the Chat Tracker frontend.
   - **Backend Health Check:** Visit [http://localhost:8080](http://localhost:8080) or use `curl`:
   
     ```bash
     curl http://localhost:8080
     ```
     
     **Expected Response:**
     
     ```
     Chat Tracker API is running.
     ```

---

## Development Mode

For a better development experience with hot-reloading and live updates, you can run the frontend and backend separately without Docker.

### Backend

1. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```

2. **Start the Backend Server**

   ```bash
   npm run dev
   ```

   **Note:** Ensure that the `.env` file is properly configured.

### Frontend

1. **Navigate to the Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Start the Frontend Development Server**

   ```bash
   npm run dev
   ```

3. **Access the Application**

   Visit [http://localhost:5173](http://localhost:5173) to view the frontend with hot-reloading enabled.

---

## Frontend Overview

The frontend is built using **React** with **TypeScript** and **Vite** for rapid development. It utilizes **Material-UI (MUI)** for styling and components, ensuring a responsive and modern user interface.

### Available Components

1. **ProjectList**

   - **Path:** `frontend/src/components/Projects/ProjectList.tsx`
   - **Description:** Manage projects with CRUD operations.
   
2. **UserList**

   - **Path:** `frontend/src/components/Users/UserList.tsx`
   - **Description:** Manage users with CRUD operations.
   
3. **MessageList**

   - **Path:** `frontend/src/components/Messages/MessageList.tsx`
   - **Description:** Manage messages linked to projects and users with CRUD operations.

### API Service

- **Path:** `frontend/src/services/api.ts`
- **Description:** Centralized Axios instance for making HTTP requests to the backend API.

### Type Definitions

- **Path:** `frontend/src/types.ts`
- **Description:** TypeScript interfaces defining the structure of Projects, Users, and Messages.

---

## Backend Overview

The backend is built using **Node.js** and **Express** with **TypeScript**, providing a robust and type-safe RESTful API to manage Projects, Users, and Messages.

### API Endpoints

#### Projects

- **Create Project**

  - **Endpoint:** `POST /api/projects`
  - **Body:**
    ```json
    {
      "name": "Project Name"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "uuid",
      "name": "Project Name",
      "created_at": "timestamp"
    }
    ```

- **Get All Projects**

  - **Endpoint:** `GET /api/projects`
  - **Response:** Array of Project objects.

- **Get Project by ID**

  - **Endpoint:** `GET /api/projects/:id`
  - **Response:** Project object.

- **Update Project**

  - **Endpoint:** `PUT /api/projects/:id`
  - **Body:**
    ```json
    {
      "name": "Updated Project Name"
    }
    ```
  - **Response:** Updated Project object.

- **Delete Project**

  - **Endpoint:** `DELETE /api/projects/:id`
  - **Response:**
    ```json
    {
      "message": "Project deleted successfully."
    }
    ```

#### Users

- **Create User**

  - **Endpoint:** `POST /api/users`
  - **Body:**
    ```json
    {
      "name": "User Name"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "uuid",
      "name": "User Name",
      "created_at": "timestamp"
    }
    ```

- **Get All Users**

  - **Endpoint:** `GET /api/users`
  - **Response:** Array of User objects.

- **Get User by ID**

  - **Endpoint:** `GET /api/users/:id`
  - **Response:** User object.

- **Update User**

  - **Endpoint:** `PUT /api/users/:id`
  - **Body:**
    ```json
    {
      "name": "Updated User Name"
    }
    ```
  - **Response:** Updated User object.

- **Delete User**

  - **Endpoint:** `DELETE /api/users/:id`
  - **Response:**
    ```json
    {
      "message": "User deleted successfully."
    }
    ```

#### Messages

- **Create Message**

  - **Endpoint:** `POST /api/messages`
  - **Body:**
    ```json
    {
      "project_id": "project_uuid",
      "user_id": "user_uuid",
      "message": "Your message here."
    }
    ```
  - **Response:**
    ```json
    {
      "id": 1,
      "project_id": "project_uuid",
      "user_id": "user_uuid",
      "message": "Your message here.",
      "created_at": "timestamp"
    }
    ```

- **Get All Messages**

  - **Endpoint:** `GET /api/messages`
  - **Response:** Array of Message objects.

- **Get Message by ID**

  - **Endpoint:** `GET /api/messages/:id`
  - **Response:** Message object.

- **Get Messages by Project ID**

  - **Endpoint:** `GET /api/messages/project/:projectId`
  - **Response:** Array of Message objects related to the specified project.

- **Update Message**

  - **Endpoint:** `PUT /api/messages/:id`
  - **Body:**
    ```json
    {
      "project_id": "project_uuid",
      "user_id": "user_uuid",
      "message": "Updated message here."
    }
    ```
  - **Response:** Updated Message object.

- **Delete Message**

  - **Endpoint:** `DELETE /api/messages/:id`
  - **Response:**
    ```json
    {
      "message": "Message deleted successfully."
    }
    ```

---

## Contributing

Contributions are welcome! If you have suggestions, improvements, or bug fixes, feel free to open an issue or submit a pull request.

### Steps to Contribute

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
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Material-UI (MUI)](https://mui.com/)
- [Axios](https://axios-http.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [pg](https://node-postgres.com/)
- [dotenv](https://github.com/motdotla/dotenv)

---

## Contact

For any inquiries or support, please contact [your.email@example.com](mailto:your.email@example.com).

---

**Happy Coding! 🚀**

---

## Additional Notes

### Frontend Development

- **Running in Development Mode:**

  If you prefer to run the frontend separately for development purposes, navigate to the `frontend/` directory and start the development server:

  ```bash
  cd frontend
  npm run dev
  ```

  This will start the Vite development server with hot-reloading on [http://localhost:5173](http://localhost:5173).

### Backend Development

- **Running the Backend Separately:**

  Similarly, you can run the backend independently:

  ```bash
  cd backend
  npm run dev
  ```

  This will start the backend server on [http://localhost:8080](http://localhost:8080).

### API Service

The frontend uses a centralized API service (`frontend/src/services/api.ts`) configured with Axios to communicate with the backend API. Ensure that the `VITE_API_BASE_URL` in the frontend's `.env` file matches the backend's address.

### Docker Networking

In the provided `nginx.conf` for the frontend, API requests are proxied to the backend service (`app:8080`). Ensure that the service names in `docker-compose.yml` match when configuring proxying or environment variables.

### Testing

Implement unit and integration tests for both frontend and backend to ensure reliability and maintainability. Consider using tools like **Jest**, **React Testing Library**, and **Supertest**.

### Continuous Integration/Continuous Deployment (CI/CD)

Set up CI/CD pipelines using platforms like **GitHub Actions**, **GitLab CI**, or **Jenkins** to automate testing and deployment processes.

---

Feel free to reach out if you encounter any issues or need further assistance with the setup!