# NestJS User and Document Management Service

This project implements a backend service using **NestJS** for managing user authentication, roles, document CRUD operations, and ingestion triggers to a Python backend. The service includes:

- **Authentication APIs**: Register, Login, Logout, Role-based access.
- **User Management APIs**: Admin-only CRUD for users.
- **Document Management APIs**: CRUD operations with file upload.
- **Ingestion Management APIs**: Interaction with a Python backend for ingestion processing.
- **Swagger Documentation** for API reference.
- **Unit Tests** with Jest.

---

## Getting Started

### Prerequisites

- **Node.js**: Version 16+
- **npm**: Comes with Node.js
- **PostgreSQL**: For database integration
- **Python Backend**: Set up a separate Python backend to handle ingestion triggers

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd user-document-management
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the project root and configure the following:
   ```env
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
   JWT_SECRET=your_jwt_secret_key
   PYTHON_BACKEND_URL=http://<python-backend-host>:<port>
   ```

4. **Run Database Migrations**:
   ```bash
   npm run typeorm migration:run
   ```

5. **Start the Application**:
   ```bash
   npm run start:dev
   ```

6. **Access Swagger Documentation**:
   Open your browser and navigate to `http://localhost:3000/api` to view API documentation.

---

## Project Structure

```plaintext
src/
├── auth/                 # Authentication module
├── user/                 # User management module
├── document/             # Document management module
├── ingestion/            # Ingestion management module
├── common/               # Shared utilities, guards, interceptors
├── main.ts               # Application entry point
└── app.module.ts         # Root application module
```

---

## Key Features

### Authentication APIs

- **Register**:
  ```http
  POST /auth/register
  Body: { email, password, role }
  ```
- **Login**:
  ```http
  POST /auth/login
  Body: { email, password }
  ```
- **Logout** (Token-based): TBD if required.

### User Management APIs

- **Get All Users** (Admin only):
  ```http
  GET /users
  ```
- **Create User**:
  ```http
  POST /users
  Body: { email, password, role }
  ```
- **Delete User**:
  ```http
  DELETE /users/:id
  ```

### Document Management APIs

- **Create Document**:
  ```http
  POST /documents
  Body: { title, content, file }
  ```
- **Get Documents**:
  ```http
  GET /documents
  ```

### Ingestion Management APIs

- **Trigger Ingestion**:
  ```http
  POST /ingestion/trigger
  Body: { documentId }
  ```

---

## Testing

Run unit tests with Jest:

```bash
npm run test
```

---

## Tools and Libraries Used

- **NestJS**: Backend framework
- **TypeORM**: Database integration
- **PostgreSQL**: Database
- **JWT**: Authentication and role-based authorization
- **Multer**: File upload
- **Swagger**: API documentation
- **Jest**: Unit testing

---

## Deployment Steps

1. **Build the Application**:
   ```bash
   npm run build
   ```

2. **Run the Application in Production**:
   ```bash
   npm run start:prod
   ```

3. **Dockerize the Application**:
   Create a `Dockerfile`:
   ```dockerfile
   FROM node:16
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   CMD ["node", "dist/main"]
   EXPOSE 3000
   ```

   Build and run the Docker image:
   ```bash
   docker build -t user-doc-mgmt .
   docker run -p 3000:3000 user-doc-mgmt
   ```

---

## Notes

- Ensure your PostgreSQL server is running and accessible.
- Test the Python backend connection using tools like Postman before integrating.
- Customize API responses for better client-side handling.

---

For any issues or contributions, feel free to open a pull request or create an issue in the repository.

