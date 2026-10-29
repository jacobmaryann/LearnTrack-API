# LearnTrack API

A RESTful API built with **Node.js**, **Express**, **MongoDB**, and **Joi**, designed to power the LearnTrack platform. This backend handles secure user authentication, study goal management, and study session scheduling with built-in state-machine transitions and strict authorization rules.

---

## Live Base URL

* **Production API URL:** `https://learntrack-api-ehiu.onrender.com`

---

## Tech Stack

* **Runtime:** Node.js (v24+)
* **Framework:** Express.js (ES Modules)
* **Database:** MongoDB (via Mongoose ODM)
* **Validation:** Joi schema validation
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs
* **CORS:** Configured for local & cross-origin frontend integration
* **Deployment:** Render

---

## Key Features

* **Secure Authentication:** User registration, password encryption, JWT login, and profile fetching.
* **Goal Management:** CRUD operations allowing learners to define, update, and track study goals.
* **Session Tracking:** Create and manage dedicated study sessions linked to specific goals.
* **State Machine Validation:** Session statuses (`scheduled`, `completed`, `cancelled`) follow strict state transition logic and prevent modifications once finalized.
* **Ownership Security:** Strict query checks (`_id` + `userId`) prevent unauthorized modification of other learners' data.
* **JSON-Only Architecture:** Lightweight, clean payload structure designed for frontend decoupled workflows.

---

## Environment Variables

Create a `.env` file in the root of your project:

```env
PORT=8000
MONGODB_URI=mongodb+srv://
JWT_SECRET=your_jwt_secret_key_here

```

---

## Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/jacobmaryann/LearnTrack-API.git](https://github.com/jacobmaryann/LearnTrack-API.git)
   cd LearnTrack-API
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in your MongoDB Atlas credentials and JWT secret.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## API Endpoint Reference

### Authentication Routes (`/api/v1/users/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Public | Register a new user (`username`, `email`, `password`) |
| `POST` | `/login` | Public | Authenticate user & return JWT token |
| `GET` | `/myProfile` | Protected | Fetch current logged-in user details |

---

### Goal Routes (`/api/v1/goals`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Protected | Create a study goal (`title`, `description`, `targetDate`, `resourceLink`) |
| `GET` | `/` | Protected | Fetch all study goals for the authenticated user |
| `PATCH`| `/:id` | Protected | Update goal details by ID |

---

### Session Routes (`/api/v1/sessions`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Protected | Schedule a study session (`goalId`, `title`, `startTime`, `durationMinutes`) |
| `GET` | `/` | Protected | Retrieve user sessions (supports `?goalId=` and `?status=` filters) |
| `PUT` | `/:id` | Protected | Update/reschedule an active study session |
| `PATCH`| `/:id/status` | Protected | Update status transition (`scheduled`, `completed`, `cancelled`) |

---

## Testing Endpoints with Postman / Thunder Client

1. Register or Log in via `POST /api/v1/users/auth/login`.
2. Copy the `token` returned in the response body.
3. For all protected Goal and Session routes, add an HTTP Header:
   * **Key:** `Authorization`
   * **Value:** `Bearer <PASTE_YOUR_TOKEN_HERE>`