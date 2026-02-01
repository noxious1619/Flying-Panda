

# Flying Panda | Visa Alert System

A full-stack tracking system built to manage visa status alerts with real-time feedback.

## Setup Steps

### 1. Clone & Install

```bash
git clone https://github.com/noxious1619/Flying-Panda
cd flying-panda

```

### 2. Backend Setup

```bash
cd backend
npm install
node server.js

```

*Runs on `http://localhost:5000*`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev

```

*Runs on `http://localhost:3000*`

---

## Design Decisions

* **MVC Pattern**: I divided the backend into `routes`, `controllers`, and `middleware`. Even for a small app, this keeps the logic separated
* **In-Memory Storage**: For this version, I used a simple JavaScript array (`let alerts = []`). This allowed for rapid prototyping of the API logic without the overhead of database connection strings.

---

## What I’d Improve for Production

1. **Persistent Database**: Move from a local array to **MongoDB** or **PostgreSQL** so data isn't lost on server restarts.
2. **Authentication**: Add JWT (JSON Web Tokens) so users can only see and edit their own alerts.
3. **Environment Variables**: Use a `.env` file to store the API URL and Port settings rather than hardcoding them.
4. **Unit Testing**: Add Jest or Vitest to test the controller logic, especially the status update transitions.

---

### Where AI Helped:

* **Boilerplate & Syntax**: AI was excellent at generating the initial Express server structure and the CSS for the navbar.
* **Error Debugging**: When I hit the `ERR_MODULE_NOT_FOUND` error, AI helped identify that Node.js ES Modules require the `.js` extension.
* **Structuring the README**: AI helped organize my thoughts into this professional format.

### Where I Had to Think:

* **Data Flow**: I had to decide when exactly to call `fetchAlerts()`. I chose to call it *after* the `await fetch` call to ensure the UI only updates once the backend confirms success.
* **Folder Organization**: I had to manually fix the "Nested Repo" issue when my frontend and backend Git histories collided.
* **Component Logic**: I designed the `createAlert` guard clause (`if (!form.country...)`) to ensure the user doesn't send broken data to my API.